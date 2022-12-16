import React from "react";
import OurFAB from "../Atoms/OurFAB";
import ReminderCard from "../organisms/ReminderCard";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";

export default function LandingPage() {
  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="auto" />
        <ReminderCard></ReminderCard>
        <ReminderCard></ReminderCard>
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
