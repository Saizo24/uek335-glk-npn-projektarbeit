import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Moment } from "moment";
import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Keyboard } from "react-native";
import { Button, Paragraph, TextInput, Title } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import ChooseWeekdaysDialog from "../organisms/ChooseWeekdaysDialog/ChooseWeekdaysDialog"

type CreateEditPageProp = {
  type: string
}

export const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const CreateEditPage = ({ type }: CreateEditPageProp) => {

  const [minutes, setMinutes] = React.useState(0)
  const [hours, setHours] = React.useState(0)
  const [timeOpen, setTimeOpen] = React.useState(false);
  const [weekdaysOpen, setWeekdaysOpen] = React.useState(false)
  const [weekdays, setWeekdays] = React.useState([1, 4]);
  const [weekdayNameShorts, setWeekdayNameShorts] = React.useState<String[]>([])
  const [repeatCount, setRepeatCount] = React.useState<number>(0)
  const [repeatInputActive, setRepeatInputActive] = React.useState(false)
  const [descriptionInputActive, setDescriptionInputActive] = React.useState(false)
  const [reminderTitle, setReminderTitle] = React.useState("")

  const navigation = useNavigation()

  React.useEffect(() => {
    generateWeekdayNames()
    if (weekdays.length === 0) {
      setRepeatCount(0)
    }
  }, [weekdays])

  const handleOpenChooseTime = () => {
    setTimeOpen(true)
  }

  const handleConfirmTime = ({ hours, minutes }) => {
    setHours(hours)
    setMinutes(minutes)
    setTimeOpen(false)
  }

  const handleDismissTime = () => {
    setTimeOpen(false)
  }

  const handleOpenChooseWeekdays = () => {
    setWeekdaysOpen(true)
  }

  const handleDismissWeekdays = () => {
    setWeekdaysOpen(false)
  }

  const generateWeekdayNames = () => {
    const selectedWeekdayNames: string[] = []
    weekdays.forEach((weekday) => selectedWeekdayNames.push(weekdayNames[weekday].substring(0, 2)))
    setWeekdayNameShorts(selectedWeekdayNames)
  }

  return (
    <View style={styles.page}>
      <StatusBar style="auto" />

      <ScrollView scrollEnabled={false} contentContainerStyle={styles.view} style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <View style={{ width: "100%", minHeight: "100%" }}>
          <View style={styles.topBar}>
            <Button onPress={() => {
              navigation.goBack()
            }}>
              Cancel
            </Button>
            <Button>
              Save
            </Button>
          </View>
          <View style={styles.timeView}>
            <TouchableOpacity style={styles.timeBox} onPress={handleOpenChooseTime}>
              <Paragraph style={styles.timeText}>{String(hours).padStart(2, '0')}</Paragraph>
            </TouchableOpacity>
            <Paragraph style={styles.timeText}>:</Paragraph>
            <TouchableOpacity style={styles.timeBox} onPress={handleOpenChooseTime}>
              <Paragraph style={styles.timeText}>{String(minutes).padStart(2, '0')}</Paragraph>
            </TouchableOpacity>
          </View>

          <View style={styles.textDataBox}>
            <TouchableOpacity style={styles.textBox} onPress={handleOpenChooseWeekdays}>
              <Paragraph>Repeat on:</Paragraph>
              <Paragraph style={styles.textValue}>{
                weekdayNameShorts.length !== 0 ? weekdayNameShorts.join(", ") : "Never"
              }</Paragraph>
            </TouchableOpacity>

            {
              repeatInputActive ?
                <TextInput
                  label="Repeat Count in Weeks"
                  keyboardType="decimal-pad"
                  autoFocus
                  returnKeyType="done"
                  value={repeatCount ? repeatCount.toString() : ""}
                  onChangeText={(value) => {
                    setRepeatCount(Number(value && value !== "" ? value : 0))
                  }}
                  onEndEditing={() => {
                    setRepeatInputActive(false)
                    Keyboard.dismiss()
                  }}
                />
                : <TouchableOpacity style={styles.textBox} disabled={weekdays.length === 0} onPress={() => setRepeatInputActive(true)}>
                  <Paragraph style={weekdays.length === 0 ? styles.textValue : {}}>Repeat Count in Weeks:</Paragraph>
                  <Paragraph style={styles.textValue}>{repeatCount}</Paragraph>
                </TouchableOpacity>
            }
            {
              repeatInputActive ?
                <TextInput
                  label="Title"
                  autoFocus
                  returnKeyType="done"
                  value={reminderTitle}
                  placeholder="Reminder"
                  onChangeText={(value) => {
                    setReminderTitle(value)
                  }}
                  onEndEditing={() => {
                    setRepeatInputActive(false)
                    Keyboard.dismiss()
                  }}
                />
                : <TouchableOpacity style={styles.textBox} disabled={weekdays.length === 0} onPress={() => setRepeatInputActive(true)}>
                  <Paragraph style={weekdays.length === 0 ? styles.textValue : {}}>Repeat Count in Weeks:</Paragraph>
                  <Paragraph style={styles.textValue}>{repeatCount}</Paragraph>
                </TouchableOpacity>
            }

          </View>

        </View>

      </ScrollView>
      <ChooseWeekdaysDialog weekdaysOpen={weekdaysOpen} handleDismissWeekdays={handleDismissWeekdays} weekdays={weekdays} setWeekdays={setWeekdays} />
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
    borderWidth: 1, borderColor: "black"
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
    borderWidth: 1, borderColor: "black",

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
    flexGrow: 1,
    padding: 10
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: "100%"
  },
  textValue: {
    color: "grey"
  }
});
