import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import { Button, Paragraph, TextInput } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ChooseWeekdaysDialog from "../organisms/ChooseWeekdaysDialog/ChooseWeekdaysDialog"
import { Reminder } from "../../types/Reminder.model";

type CreateEditPageProp = {
  type: "New" | "Edit"
}

export const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const CreateEditPage = ({ type }: CreateEditPageProp) => {
  const route = useRoute()
  const reminder: Reminder = route.params.reminder

  const [minutes, setMinutes] = React.useState(reminder ? reminder.minutes : 0);
  const [hours, setHours] = React.useState(reminder ? reminder.hours : 0);
  const [weekdays, setWeekdays] = React.useState(reminder ? reminder.days : []);
  const [repeatCount, setRepeatCount] = React.useState<number>(reminder ? reminder.repeatCount : 0)
  const [reminderTitle, setReminderTitle] = React.useState(reminder ? reminder.name : "")
  const [reminderDescription, setReminderDescription] = React.useState(reminder ? reminder.description : "")

  const [timeDialogOpen, setTimeDialogOpen] = React.useState(false);
  const [weekdaysDialogOpen, setWeekdaysDialogOpen] = React.useState(false)

  const [weekdayNameShorts, setWeekdayNameShorts] = React.useState<String[]>([])
  const [repeatInputActive, setRepeatInputActive] = React.useState(false)
  const [reminderTitleInputActive, setReminderTitleInputActive] = React.useState(false)
  const [descriptionInputActive, setDescriptionInputActive] = React.useState(false)

  const navigation = useNavigation()

  React.useEffect(() => {
    generateWeekdayNames()
    if (weekdays.length === 0) {
      setRepeatCount(0)
    }
  }, [weekdays])

  const handleOpenChooseTime = () => {
    setTimeDialogOpen(true);
  };

  const handleConfirmTime = ({ hours, minutes }) => {
    setHours(hours);
    setMinutes(minutes);
    setTimeDialogOpen(false);
  };

  const handleDismissTime = () => {
    setTimeDialogOpen(false);
  };

  const handleOpenChooseWeekdays = () => {
    setWeekdaysDialogOpen(true);
  };

  const handleDismissWeekdays = () => {
    setWeekdaysDialogOpen(false)
  }

  const generateWeekdayNames = () => {
    const selectedWeekdayNames: string[] = []
    weekdays.forEach((weekday) => selectedWeekdayNames.push(weekdayNames[weekday].substring(0, 2)))
    setWeekdayNameShorts(selectedWeekdayNames)
  }

  return (


    <KeyboardAwareScrollView
      scrollEnabled={true}
      contentContainerStyle={{ ...styles.view, flexGrow: 1 }}
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      enableAutomaticScroll={true}
      scrollToOverflowEnabled={true}
    >
      <StatusBar style="auto" />
      <ScrollView>
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
                onSubmitEditing={() => {
                  setReminderTitleInputActive(true)
                  setRepeatInputActive(false)
                }}
                onBlur={() => {
                  setRepeatInputActive(false)
                  Keyboard.dismiss()
                }}
                blurOnSubmit={false}
                style={styles.inputField}
              />
              : <TouchableOpacity style={styles.textBox} disabled={weekdays.length === 0} onPress={() => setRepeatInputActive(true)}>
                <Paragraph style={weekdays.length === 0 ? styles.textValue : {}}>Repeat Count in Weeks:</Paragraph>
                <Paragraph style={styles.textValue}>{repeatCount}</Paragraph>
              </TouchableOpacity>
          }
          {
            reminderTitleInputActive ?
              <TextInput
                label="Title"
                returnKeyType="done"
                autoFocus
                value={reminderTitle}
                onChangeText={(value) => {
                  setReminderTitle(value)
                }}
                onSubmitEditing={() => {
                  setReminderTitleInputActive(false)
                  setDescriptionInputActive(true)
                }}
                onBlur={() => {
                  setReminderTitleInputActive(false)
                  Keyboard.dismiss()
                }}
                blurOnSubmit={false}
                style={{ ...styles.inputField }}
              />
              : <TouchableOpacity style={styles.textBox} onPress={() => { setReminderTitleInputActive(true) }}>
                <Paragraph style={weekdays.length === 0 ? styles.textValue : {}}>Title:</Paragraph>
                <Paragraph style={styles.textValue}>{reminderTitle === "" ? "Reminder" : reminderTitle}</Paragraph>
              </TouchableOpacity>
          }
          <TouchableOpacity style={{ ...styles.descriptionBox, }}>
            <Paragraph>Description</Paragraph>

            <TextInput
              multiline={true}
              numberOfLines={20}
              keyboardType="ascii-capable"
              value={reminderDescription}
              textAlignVertical="top"
              scrollEnabled={false}
              onChangeText={(value) => {
                setReminderDescription(value)
              }}
              onFocus={() => {
                setDescriptionInputActive(true)
              }}
              onBlur={() => {
                setDescriptionInputActive(false)
                Keyboard.dismiss()
              }}
            />

          </TouchableOpacity>
        </View>
      </ScrollView>
      <ChooseWeekdaysDialog weekdaysOpen={weekdaysDialogOpen} handleDismissWeekdays={handleDismissWeekdays} weekdays={weekdays} setWeekdays={setWeekdays} />
      <TimePickerModal
        visible={timeDialogOpen}
        onDismiss={handleDismissTime}
        onConfirm={handleConfirmTime}
        cancelLabel={"Cancel"}
        confirmLabel={"Confirm"}
        hours={hours}
        minutes={minutes}
      />
    </KeyboardAwareScrollView>
  );
};

export default CreateEditPage;

const styles = StyleSheet.create({
  view: {
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    height: 70,
  },
  button: {
  },
  page: {
  },
  timeView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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

    alignSelf: "stretch",
    padding: 10,
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  textValue: {
    color: "grey"
  },
  inputField: {
    marginHorizontal: 10,
  },
  descriptionBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  }
});
