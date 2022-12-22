import React, { useContext } from "react";
import { FAB, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReminderContext from "../../contexts/ReminderContext";

/**
 * We decided to take the floating action button, that is used to add new reminders, from react-native-paper
 * and changed it for our own purpose.
 */

const OurFAB = () => {
  const navigation = useNavigation();
  const { setActiveReminder } = useContext(ReminderContext);
  const { colors } = useTheme();

  return (
    <FAB
      icon="plus"
      style={{ ...styles.fab, backgroundColor: colors.tertiary }}
      size="medium"
      onPress={() => {
        setActiveReminder(null);
        navigation.navigate("New Reminder");
      }}
      color={colors.onTertiary}
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
