import React from "react";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";

const OurFAB = () => {
  return (
    <FAB
      icon="plus"
      style={styles.fab}
      size="medium"
      onPress={() => {
        console.log("klick");
      }}
    ></FAB>
  );
};

const styles = StyleSheet.create({
  fab: {
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: "auto",
    left: "auto",
    marginBottom: 15,
    transform: [{ translateX: 28 }],
  },
});

export default OurFAB;
