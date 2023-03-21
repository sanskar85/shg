import React, { useState, useEffect, useCallback, useRef } from 'react';
import FirebaseApp from '../FirebaseApp';
import { Car } from '../types';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { singletonHook } from 'react-singleton-hook';

const initState: Car[] | null = null;
let setCars: React.Dispatch<React.SetStateAction<Car[] | null>> = () => {
	throw new Error('you must useCars before accessing setCars');
};

const useCarsImpl = () => {
	const db = useRef(FirebaseApp.getFirestore()).current;

	const [cars, _setCars] = useState<Car[] | null>(null);
	setCars = _setCars;

	const fetchCars = useCallback(
		async (id: string) => {
			const carsCollection = collection(db, 'users', id, 'cars');
			const carsSnapshot = await getDocs(carsCollection);

			const _cars: Car[] = [];
			carsSnapshot.forEach((carDoc) => {
				const car = carDoc.data();
				_cars.push({
					id: carDoc.id,
					manufacturer: car.manufacturer,
					model: car.model,
					type: car.type,
				});
			});
			_setCars(_cars);
		},
		[db]
	);

	useEffect(() => {
		const auth = FirebaseApp.getAuth();
		if (auth.currentUser === null) {
			return;
		}
		const id = auth.currentUser.uid;
		fetchCars(id);
	}, [fetchCars]);

	return cars;
};

export const useCars = singletonHook(initState, useCarsImpl);

export default useCars;

const addCar = async (car: Omit<Car, 'id'>, onComplete = () => {}) => {
	const auth = FirebaseApp.getAuth();
	const db = FirebaseApp.getFirestore();
	if (auth.currentUser === null || db === null) {
		return;
	}
	const id = auth.currentUser.uid;

	const carsCollection = collection(db, 'users', id, 'cars');
	const docRefPromise = addDoc(carsCollection, car);

	toast.promise(docRefPromise, {
		loading: 'Adding Car',
		success: (docRef) => {
			setCars((cars) => {
				const element = {
					id: docRef.id,
					manufacturer: car.manufacturer,
					model: car.model,
					type: car.type,
				};
				if (cars === null) return [element];
				return [...cars, element];
			});

			setTimeout(() => {
				onComplete();
			}, 500);

			return 'Car Added';
		},
		error: 'Error Adding Car',
	});
};

export { addCar };
