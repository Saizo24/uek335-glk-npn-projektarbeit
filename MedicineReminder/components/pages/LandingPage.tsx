import React from "react";
import OurFAB from "../Atoms/OurFAB";
import ReminderCard from "../organisms/ReminderCard";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

export default function LandingPage() {
  return (
    <>
      <StatusBar style="auto" />
      <ReminderCard></ReminderCard>
      <ReminderCard></ReminderCard>
      <OurFAB />
    </>
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
});
