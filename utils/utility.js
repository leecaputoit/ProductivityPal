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

  export const toTimeString = (date) => {
    let hr = date.getHours();
    let min = date.getMinutes();
    if(('' + hr).length === 1){
        hr = '0' + hr;
    }
    if(('' + min).length === 1){
        min = '0' + min;
    }

    return hr + ':' + min;
};

export const calcUsrLvl = async () => {
  let usrExp = await retrieve('exp');
    if(usrExp != null){
        // for now each level requires 50 experience points
        let lvl = Math.floor(Number(usrExp) / 50);
        return lvl;
    }
}

export const calcLvlUpProgress = async () => {
  let usrExp = await retrieve('exp');
    if(usrExp != null){
        // for now each level requires 50 experience points
        let lvl = Math.floor(Number(usrExp) / 50);
        let nextLvl = lvl + 1;
        let nextLvlExp = nextLvl * 50;
        let progress = (Number(usrExp) - (lvl * 50)) / 50;
        return progress;
    }
}

export const initUsrStats = async () => {
    let usrExp = await retrieve('exp');
    if(usrExp == null){
        await save('exp', 0);
    }

    let usrGold = await retrieve('gold');
    if(usrGold == null){
      await save('gold', 0);
    }
}

export const addExp = async (amount) => {
  let usrExp = await retrieve('exp');
  if(usrExp != null){
    await save('exp', Number(usrExp) + amount);
  }
}

export const addGold = async (amount) => {
  let usrGold = await retrieve('gold');
  if(usrGold != null){
    await save('gold', Number(usrGold) + amount);
  }
}