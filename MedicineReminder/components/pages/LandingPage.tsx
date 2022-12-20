import React, { useState, useEffect } from "react";
import OurFAB from "../Atoms/OurFAB";
import ReminderCard from "../organisms/ReminderCard";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import StorageService from "../../services/StorageService";
import { Reminder } from "../../types/Reminder.model";

export default function LandingPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    StorageService.getFullStorage().then((value) => {
      //setReminders(JSON.parse(value));
      setReminders(exampleReminders);
    });
  }, []);

  const generateTimeInMinutes = (hours: number, minutes: number) => {
    return hours * 60 + minutes;
  };

  const exampleReminders: Reminder[] = [
    {
      id: "1",
      name: "Chopfweh",
      description: "ich han chopfweh",
      minutes: 26,
      hours: 17,
      repeatCount: 4,
      days: [0, 3],
    },
    {
      id: "2",
      name: "Buchweh",
      description: "ich han buchweh",
      minutes: 24,
      hours: 18,
      repeatCount: 2,
      days: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: "3",
      name: "alles",
      description: "ich han alles weh",
      minutes: 29,
      hours: 17,
      repeatCount: 1,
      days: [6],
    },
  ];

  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="auto" />
        {reminders
          .sort(
            (a, b) =>
              generateTimeInMinutes(a.hours, a.minutes) -
              generateTimeInMinutes(b.hours, b.minutes)
          )
          .map((reminder: Reminder) => (
            <ReminderCard reminder={reminder} switchState={false} />
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
