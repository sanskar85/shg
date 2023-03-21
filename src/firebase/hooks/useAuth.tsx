import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import User from '../types/User';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation;
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(state => {
      setLoading(false);
      setUser(state);
    });

    return unsubscribe;
  }, []);

  return {user, loading, login};
};

export default useAuth;
