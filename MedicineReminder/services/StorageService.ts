import AsyncStorage from "@react-native-async-storage/async-storage";

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