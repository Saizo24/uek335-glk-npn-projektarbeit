import React, { useState, useEffect } from "react";
import OurFAB from "../Atoms/OurFAB";
import ReminderCard from "../organisms/ReminderCard";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import StorageService from "../../services/StorageService";

export default function LandingPage() {
  const [reminders, setReminders] = useState<String>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [title, setTitle] = useState<String>();

  useEffect(() => {
    StorageService.getFullStorage().then((value) => {
      setReminders(value);
    });
  }, []);

  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="auto" />
        <ReminderCard
          reminder={{
            id: { id },
            name: { title },
            reminderTime: { time },
            days: { days },
          }}
          switchState={false}
        ></ReminderCard>
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
