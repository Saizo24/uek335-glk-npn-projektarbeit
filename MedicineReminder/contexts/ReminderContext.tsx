import { createContext, useEffect, useState } from "react";
import StorageService from "../services/StorageService";
import { Nullable } from "../types/Nullable";
import { Reminder } from "../types/Reminder.model";
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";

export type ReminderContextType = {
  reminders: Reminder[];
  activeReminder: Nullable<Reminder>;
  setActiveReminder: (reminder: Reminder | null) => void;
  saveReminder: (reminder: Reminder) => Promise<void>;
  updateDeleteReminder: (
    reminder: Reminder,
    type: "delete" | "update"
  ) => Promise<void>;
  createNewTriggers: (reminder: Reminder) => Promise<void>;
};

const noContextProviderFound = () => {
  throw new Error("No provider for the ReminderContext found");
};

const defaultContextValue: ReminderContextType = {
  reminders: [],
  activeReminder: null,
  setActiveReminder: noContextProviderFound,
  saveReminder: noContextProviderFound,
  updateDeleteReminder: noContextProviderFound,
  createNewTriggers: noContextProviderFound,
};

const ReminderContext = createContext<ReminderContextType>(defaultContextValue);
export default ReminderContext;

type ReminderContextProviderProps = {
  children: React.ReactNode;
};

/**
 * This context handles all features concerning the reminder. It fetches all reminders from the storage and
 * saves it in a state variable, so all child elements have access to it. It also handles the active reminder,
 * which can be a to be created reminder or an existing one you're currently editing.
 *  
 */
export const ReminderContextProvider = ({
  children,
}: ReminderContextProviderProps) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [activeReminder, setActiveReminder] = useState<Nullable<Reminder>>();

  /**
   * This function deletes or updates a reminder by looking at the id. It will also save the reminders into the 
   * storage, after it is done.
   * 
   * @param reminder element, which is to be updated or deleted
   * @param type On "delete", will delete the given reminder. On "update", will search for reminder
   * with the same id and overwrites it
   */
  const updateDeleteReminder = async (
    reminder: Reminder,
    type: "delete" | "update"
  ) => {
    const newReminders = Array.from(reminders);
    const index = newReminders.findIndex(
      (searchReminder) => searchReminder.id === reminder.id
    );
    if (index < 0) {
      throw new Error(`${type}d Reminder couldn't be found`);
    }
    if (type === "delete") {
      newReminders.splice(index, 1);
    }
    if (type === "update") {
      newReminders.splice(index, 1, reminder);
    }
    StorageService.storeDataInStorage(JSON.stringify(newReminders));
  };

  useEffect(() => {
    StorageService.getFullStorage().then((value) => {
      if (value) {
        setReminders(JSON.parse(value));
      }
      if (!value) {
        setReminders([]);
      }
    });
  }, [reminders]);

  /**
   * Saves a reminder by pushing it into the reminders array and saving it to the storage.
   * 
   * @param reminder element to be saved to storage
   */
  const saveReminder = async (reminder: Reminder) => {
    const newReminders = Array.from(reminders);
    newReminders.push(reminder);
    StorageService.storeDataInStorage(JSON.stringify(newReminders)).then(() => {
      setReminders(newReminders);
    });
  };

  /**
   * This function creates triggers, depending on chosen days, time and repeat count 
   * of the given reminder.
   * 
   * @param reminder contains all necessary info to create triggers for notifications
   */
  async function createNewTriggers(reminder: Reminder) {
    let date = new Date(Date.now());
    reminder.days.forEach(async (day: number) => {
      date.setDate(date.getDate() - date.getDay() + day);
      date.setHours(reminder.hours);
      date.setMinutes(reminder.minutes);

      const channelId = await notifee.createChannel({
        id: "default",
        name: "Default Channel",
        importance: AndroidImportance.HIGH,
      });

      // Create a time-based trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
      };

      // Create a trigger notification
      await notifee.createTriggerNotification(
        {
          title: reminder.name,
          body: reminder.description,
          android: {
            channelId,
          },
        },
        trigger
      );
    });
  }

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        activeReminder,
        setActiveReminder,
        saveReminder,
        updateDeleteReminder,
        createNewTriggers,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
