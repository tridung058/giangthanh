import { AsyncStorage } from 'react-native';

export async function getStorage(key){
    try {
        const value = await AsyncStorage.getItem('@'+key);
        if (value !== null) {
              console.log(value);
            return value;
        }
        
        return '';
    } catch (error) {
        return '';
    }
};

export async function saveStorage(key, value){
    try {
        await AsyncStorage.setItem('@'+key, value);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};