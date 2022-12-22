import { createContext, useEffect, useState } from "react";
import StorageService from "../services/StorageService";
import { Nullable } from "../types/Nullable";
import { Reminder } from "../types/Reminder.model";

export type ReminderContextType = {
  reminders: Reminder[];
  activeReminder: Nullable<Reminder>;
  setActiveReminder: (reminder: Reminder | null) => void;
  saveReminder: (reminder: Reminder) => Promise<void>;
  updateDeleteReminder: (
    reminder: Reminder,
    type: "delete" | "update"
  ) => Promise<void>;
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
};

const ReminderContext = createContext<ReminderContextType>(defaultContextValue);
export default ReminderContext;

type ReminderContextProviderProps = {
  children: React.ReactNode;
};

export const ReminderContextProvider = ({
  children,
}: ReminderContextProviderProps) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [activeReminder, setActiveReminder] = useState<Nullable<Reminder>>();

  useEffect(() => {
    StorageService.getFullStorage().then((value) => {
      if (value) {
        setReminders(JSON.parse(value));
      }
      if (!value) {
        setReminders([]);
      }
    });
  }, []);

  const saveReminder = async (reminder: Reminder) => {
    const newReminders = Array.from(reminders);
    newReminders.push(reminder);
    StorageService.storeDataInStorage(JSON.stringify(newReminders)).then(() => {
      setReminders(newReminders);
    });
  };

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
    StorageService.storeDataInStorage(JSON.stringify(newReminders)).then(() => {
      setReminders(newReminders);
    });
  };

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        activeReminder,
        setActiveReminder,
        saveReminder,
        updateDeleteReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
