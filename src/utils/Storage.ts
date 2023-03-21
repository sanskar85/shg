import AsyncStorage from '@react-native-async-storage/async-storage';

const getString = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const getObject = async (key: string): Promise<object | null> => {
  try {
    const data = await getString(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

const getNumber = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? Number(value) : null;
  } catch (e) {
    return null;
  }
};

const setString = async (key: string, value: string) => {
  try {
    AsyncStorage.setItem(key, value);
  } catch (ignored) {}
};

const setObject = async (key: string, value: object) => {
  try {
    const str = JSON.stringify(value);
    AsyncStorage.setItem(key, str);
  } catch (ignored) {}
};

const setNumber = async (key: string, value: number) => {
  try {
    setString(key, value.toString());
  } catch (ignored) {}
};

const remove = async (key: string) => {
  try {
    AsyncStorage.removeItem(key);
  } catch (ignored) {}
};

const merge = async (key: string, value: object) => {
  try {
    const str = JSON.stringify(value);
    AsyncStorage.mergeItem(key, str);
  } catch (ignored) {}
};

const Storage = {
  getString,
  getObject,
  getNumber,
  setString,
  setObject,
  setNumber,
  remove,
  merge,
};

export default Storage;
