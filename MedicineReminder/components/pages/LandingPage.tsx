import React, { useState, useEffect } from "react";
import OurFAB from "../Atoms/OurFAB";
import ReminderCard from "../organisms/ReminderCard";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import StorageService from "../../services/StorageService";
import { Reminder } from "../types/Reminder.model";

export default function LandingPage() {
  const [reminders, setReminders] = useState<Reminder[]>();

  useEffect(() => {
    StorageService.getFullStorage().then((value) => {
      setReminders(JSON.parse(value));
    });
  }, []);

  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="auto" />
        {reminders.map((reminder: Reminder) => (
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
