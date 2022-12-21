import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * In this application, only one service with two different functions is needed. Since everything is stored in a single key-value pair
 * we only need a service that gets this pair and one that changes this pair. If we want to delete reminder, the setter can also
 * be used since it is only a change of the single key-value pair.
 */

const reminderKey : string = "ReminderKey";

const storeDataInStorage = async (value: string) => {
  try {
    await AsyncStorage.setItem(reminderKey, value);
  } catch (e) {
    console.error("Data could not be saved");
  }
};

const getFullStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(reminderKey);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log("No Data found")
  }
};


const StorageService = {
    storeDataInStorage,
    getFullStorage,
};

export default StorageService;