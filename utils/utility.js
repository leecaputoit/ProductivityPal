import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (key, val) => {
    try {
        if(typeof val == 'string'){
            await AsyncStorage.setItem(key, val);
        }else{
            await AsyncStorage.setItem(key, JSON.stringify(val)); 
        }
    } catch (e) {
        console.log(e);
    }
  };

  export const retrieve = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? (typeof value == 'string' ? value : JSON.parse(value)) : null; 
    } catch (e) {
      console.log(e);
    }
  };

  export const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch(e) {
      console.log(e);
    }
  }