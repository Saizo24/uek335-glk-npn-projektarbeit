import React, { useState, useEffect, useContext } from "react";
import OurFAB from "../Atoms/OurFAB";
import ReminderCard from "../organisms/ReminderCard";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import StorageService from "../../services/StorageService";
import { Reminder } from "../../types/Reminder.model";
import ReminderContext from "../../contexts/ReminderContext";

/**
 * Once a user opens the application, this page will be displayed. The user will see his/her reminders that they set previously.
 * If the user has not yet set any reminders, the only thing shown will be a floating action button to add reminders.
 * All Reminders are displayed in order, sorted by time and stored in the local storage of the phone.
 */
export default function LandingPage() {
  const { reminders } = useContext(ReminderContext);
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
      <ImageBackground
        source={require("../../images/green-pharmacy-symbol.png")}
        resizeMode="contain"
        style={styles.imageBackground}
      ></ImageBackground>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="auto" />
        {shownReminders
          .sort(
            (a, b) =>
              generateTimeInMinutes(a.hours, a.minutes) -
              generateTimeInMinutes(b.hours, b.minutes)
          )
          .map((reminder: Reminder, index) => (
            <ReminderCard
              key={index}
              reminder={reminder}
              switchState={reminder.active}
            />
          ))}
      </ScrollView>
      <OurFAB />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  scrollView: {
    height: "100%",
    width: "100%",
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    position: "absolute",
    opacity: 0.5,
    paddingHorizontal: 30,
    marginHorizontal: 30,
    transform: [{ translateX: 30 }],
  },
});
