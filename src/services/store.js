import { AsyncStorage } from 'react-native';

const set = (key, value) =>
    new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(key, value);
            return resolve({ key, value });
        } catch (error) {
            return reject(error);
        }
    });

const get = key =>
    new Promise(async (resolve, reject) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value !== null
                ? resolve(value)
                : reject(new Error('Invalid key'));
        } catch (error) {
            return reject(error);
        }
    });

export { set, get };
