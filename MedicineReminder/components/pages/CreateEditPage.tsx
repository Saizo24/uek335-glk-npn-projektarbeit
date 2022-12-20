import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button, Paragraph, Title } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";

type CreateEditPageProp = {
  type: string;
};

const CreateEditPage = ({ type }: CreateEditPageProp) => {
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [timeOpen, setTimeOpen] = React.useState(false);
  const [weekdaysOpen, setWeekdaysOpen] = React.useState(false);
  const [weekdays, setWeekdays] = React.useState([]);

  const navigation = useNavigation();

  const handleOpenChooseTime = () => {
    setTimeOpen(true);
  };

  const handleConfirmTime = ({ hours, minutes }) => {
    setHours(hours);
    setMinutes(minutes);
    setTimeOpen(false);
  };

  const handleDismissTime = () => {
    setTimeOpen(false);
  };

  const handleOpenChooseWeekdays = () => {
    setWeekdaysOpen(true);
  };

  const handleDismissWeekdays = () => {
    setWeekdaysOpen(false);
  };

  return (
    <View style={styles.view}>
      <View style={styles.page}>
        <StatusBar style="auto" />
        <View style={styles.topBar}>
          <Button
            mode="text"
            onPress={() => {
              navigation.goBack();
            }}
          >
            Cancel
          </Button>
          <Button mode="text">Save</Button>
        </View>
        <View style={styles.timeView}>
          <TouchableOpacity
            style={styles.timeBox}
            onPress={handleOpenChooseTime}
          >
            <Paragraph style={styles.timeText}>
              {String(hours).padStart(2, "0")}
            </Paragraph>
          </TouchableOpacity>
          <Paragraph style={styles.timeText}>:</Paragraph>
          <TouchableOpacity
            style={styles.timeBox}
            onPress={handleOpenChooseTime}
          >
            <Paragraph style={styles.timeText}>
              {String(minutes).padStart(2, "0")}
            </Paragraph>
          </TouchableOpacity>
        </View>
        <View style={styles.textDataBox}>
          <TouchableOpacity
            style={styles.textBox}
            onPress={handleOpenChooseWeekdays}
          >
            <Paragraph>Repeat on:</Paragraph>
            <Paragraph style={styles.textValue}>Mo, Su</Paragraph>
          </TouchableOpacity>
        </View>
        <TimePickerModal
          visible={timeOpen}
          onDismiss={handleDismissTime}
          onConfirm={handleConfirmTime}
          cancelLabel={"Cancel"}
          confirmLabel={"Confirm"}
          hours={hours}
          minutes={minutes}
        />
      </View>
    </View>
  );
};

export default CreateEditPage;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    height: 70,
    borderWidth: 1,
    borderColor: "black",
  },
  button: {
    flex: 1,
  },
  page: {
    width: "100%",
    height: "100%",
  },
  timeView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
  },
  timeBox: {
    padding: 0,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: "pink",
    margin: 10,
  },
  timeText: {
    fontSize: 30,
    lineHeight: 37,
  },
  textDataBox: {
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "stretch",
    flex: 1,
    padding: 10,
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textValue: {
    color: "grey",
  },
});
