import { useState, useEffect, useCallback, useRef } from 'react';
import FirebaseApp from '../FirebaseApp';
import { Cart } from '../types';
import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { singletonHook } from 'react-singleton-hook';

const initState: Cart[] = [];
let setCart: React.Dispatch<React.SetStateAction<Cart[]>> = () => {
	throw new Error('you must useCart before accessing setCart');
};

const useCartImpl = () => {
	const db = useRef(FirebaseApp.getFirestore()).current;

	const [cart, _setCart] = useState<Cart[]>(initState);
	setCart = _setCart;

	const fetchCart = useCallback(
		async (id: string) => {
			const cartCollection = collection(db, 'users', id, 'cart');
			const cartSnapshot = await getDocs(cartCollection);

			const _cart: Cart[] = [];
			cartSnapshot.forEach((cartDoc) => {
				const cart = cartDoc.data();
				_cart.push({
					id: cartDoc.id,
					car: cart.car,
					catalog_category: cart.catalog_category,
					package: cart.package,
					user: cart.user,
				});
			});
			_setCart(_cart);
		},
		[db]
	);

	useEffect(() => {
		const auth = FirebaseApp.getAuth();
		if (auth.currentUser === null) {
			return;
		}
		const id = auth.currentUser.uid;
		fetchCart(id);
	}, [fetchCart]);

	return cart;
};

export const useCart = singletonHook(initState, useCartImpl);

export default useCart;

const addToCart = async (cart: Omit<Cart, 'id'>, onComplete = () => {}) => {
	const auth = FirebaseApp.getAuth();
	const db = FirebaseApp.getFirestore();
	if (auth.currentUser === null || db === null) {
		return;
	}
	const id = auth.currentUser.uid;

	const carsCollection = collection(db, 'users', id, 'cart');
	const docRefPromise = addDoc(carsCollection, cart);

	toast.promise(docRefPromise, {
		loading: 'Adding to Cart',
		success: (docRef) => {
			setCart((prev) => {
				const element = {
					id: docRef.id,
					car: cart.car,
					catalog_category: cart.catalog_category,
					package: cart.package,
					user: cart.user,
				};
				if (prev === null) return [element];
				return [...prev, element];
			});

			setTimeout(() => {
				onComplete();
			}, 500);

			return 'Added to Cart';
		},
		error: 'Error Adding to Cart',
	});
};

const clearCart = async () => {
	const auth = FirebaseApp.getAuth();
	const db = FirebaseApp.getFirestore();
	if (auth.currentUser === null || db === null) {
		return;
	}
	const id = auth.currentUser.uid;

	const cartCollection = collection(db, 'users', id, 'cart');
	const cartSnapshot = await getDocs(cartCollection);

	cartSnapshot.forEach(async (cartDoc) => {
		await deleteDoc(cartDoc.ref);
	});
	setCart([]);
};

export { addToCart, clearCart };
