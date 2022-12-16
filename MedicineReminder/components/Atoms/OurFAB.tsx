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
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default OurFAB;
