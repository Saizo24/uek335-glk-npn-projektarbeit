import React, { useState, useEffect, useContext } from "react";
import OurFAB from "../Atoms/OurFAB";
import ReminderCard from "../organisms/ReminderCard";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import StorageService from "../../services/StorageService";
import { Reminder } from "../../types/Reminder.model";
import ReminderContext from "../../contexts/ReminderContext";

export default function LandingPage() {

  const { reminders } = useContext(ReminderContext)
  const [shownReminders, setShownReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    StorageService.getFullStorage().then((value) => {
      setShownReminders(JSON.parse(value));
    });
  }, [reminders]);

  const generateTimeInMinutes = (hours: number, minutes: number) => {
    return hours * 60 + minutes;
  };

  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="auto" />
        {shownReminders
          .sort(
            (a, b) =>
              generateTimeInMinutes(a.hours, a.minutes) -
              generateTimeInMinutes(b.hours, b.minutes)
          )
          .map((reminder: Reminder, index) => (
            <ReminderCard key={index} reminder={reminder} switchState={reminder.active} />
          ))}
      </ScrollView>
      <OurFAB />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aaa",
    fontSize: 25,
  },
  view: {
    alignItems: "center",
  },
  scrollView: {
    height: "100%",
    width: "100%",
  },
});
