import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Title } from "react-native-paper";

type CreateEditPageProp = {
  type: string
}

const CreateEditPage = ({ type }: CreateEditPageProp) => {
  return (
    <ScrollView style={StyleSheet.page}>
      <StatusBar style="auto" />
      <View style={styles.topBar}>
        <Button mode="text">
          Cancel
        </Button>
        <Button mode="text">
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

export default CreateEditPage;

const styles = StyleSheet.create({
  topBar: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  button: {
    flex: 1,
  },
  title: {
    flex: 2
  },
  page: {

  }

});
