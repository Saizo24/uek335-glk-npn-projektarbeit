import React from "react";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

/**
 * We decided to take the floating action button, that is used to add new reminders, from react-native-paper
 * and changed it for our own purpose.
 */

const OurFAB = () => {
  const navigation = useNavigation();

  return (
    <FAB
      icon="plus"
      style={styles.fab}
      size="medium"
      onPress={() => {
        navigation.navigate("New Reminder");
      }}
    ></FAB>
  );
};

const styles = StyleSheet.create({
  fab: {
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default OurFAB;
