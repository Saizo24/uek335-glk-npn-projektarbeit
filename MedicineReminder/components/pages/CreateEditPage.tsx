import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Button, Paragraph, TextInput, useTheme } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ChooseWeekdaysDialog from "../organisms/ChooseWeekdaysDialog/ChooseWeekdaysDialog";
import { Reminder } from "../../types/Reminder.model";
import ReminderContext from "../../contexts/ReminderContext";

type CreateEditPageProp = {
  type: "New" | "Edit";
};

export const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * This functional component creates a new Reminder or edites an existing one, depending on the string value
 * of "type"
 *
 * @param type on "New" a new Reminder will be created from the entered data. On "Edit", an existing one will be
 * overwritten
 * @returns functional component
 */
const CreateEditPage = ({ type }: CreateEditPageProp) => {
  const {
    reminders,
    activeReminder,
    saveReminder,
    updateDeleteReminder,
    createNewTriggers,
  } = useContext(ReminderContext);

  //State variables for reminder
  const [chosenMinutes, setChosenMinutes] = React.useState(
    activeReminder ? activeReminder.minutes : 0
  );
  const [chosenHours, setChosenHours] = React.useState(
    activeReminder ? activeReminder.hours : 0
  );
  const [weekdays, setWeekdays] = React.useState(
    activeReminder ? activeReminder.days : []
  );
  const [repeatCount, setRepeatCount] = React.useState<number>(
    activeReminder ? activeReminder.repeatCount : 0
  );
  const [reminderTitle, setReminderTitle] = React.useState(
    activeReminder ? activeReminder.name : ""
  );
  const [reminderDescription, setReminderDescription] = React.useState(
    activeReminder ? activeReminder.description : ""
  );

  //State booleans for dialog
  const [timeDialogOpen, setTimeDialogOpen] = React.useState(false);
  const [weekdaysDialogOpen, setWeekdaysDialogOpen] = React.useState(false);

  //State variable for weekday shorts which are displayed in the "Repeat on" field
  const [weekdayNameShorts, setWeekdayNameShorts] = React.useState<string[]>(
    []
  );

  //State booleans for displaying input fields
  const [repeatInputActive, setRepeatInputActive] = React.useState(false);
  const [reminderTitleInputActive, setReminderTitleInputActive] =
    React.useState(false);

  const { colors } = useTheme();

  const navigation = useNavigation();

  React.useEffect(() => {
    generateWeekdayNames(weekdays);
    if (weekdays.length === 0) {
      setRepeatCount(0);
    }
  }, [weekdays]);

  /**
   * Opens the timepicker dialog
   */
  const handleOpenChooseTime = () => {
    setTimeDialogOpen(true);
  };

  /**
   * Saves the chosen time in the timepicker dialog
   * and closes it
   * @param hours This value takes the hours of the chosen time as a number
   * @param minutes This value takes the minutes of the chosen time as a number
   */
  const handleConfirmTime = ({ hours, minutes }) => {
    setChosenHours(hours);
    setChosenMinutes(minutes);
    setTimeDialogOpen(false);
  };

  /**
   * Closes the timepicker dialog
   */
  const handleDismissTime = () => {
    setTimeDialogOpen(false);
  };

  /**
   * Opens the chooseWeekday dialog
   */
  const handleOpenChooseWeekdays = () => {
    setWeekdaysDialogOpen(true);
  };

  /**
   * Closes the chooseWeekday dialog
   */
  const handleDismissWeekdays = () => {
    setWeekdaysDialogOpen(false);
  };

  /**
   * Generates a string array, containing the first two letters of all chosen weekdays and
   * saves it into the state variable "selectedWeekdayNameShorts"
   * @param weekdayArray Number array, containing all chosen weekdays as numbers
   */
  const generateWeekdayNames = (weekdayArray: number[]) => {
    const selectedWeekdayNames: string[] = [];
    weekdayArray.forEach((weekday) =>
      selectedWeekdayNames.push(weekdayNames[weekday].substring(0, 2))
    );
    setWeekdayNameShorts(selectedWeekdayNames);
  };

  /**
   * Saves or updates a reminder, depending on the type of this page. On creation of a
   * new reminder, it will set the id of the reminder as the highest of existing ids
   */
  const handleSaveUpdateReminder = () => {
    let newId = 0;
    reminders.forEach(
      (reminder) =>
      (newId =
        newId < Number(reminder.id) + 1 ? Number(reminder.id) + 1 : newId)
    );
    const newReminder: Reminder = {
      repeatCount,
      hours: chosenHours,
      minutes: chosenMinutes,
      id: type === "New" ? newId.toString() : activeReminder.id,
      active: true,
      name: reminderTitle,
      description: reminderDescription,
      days: weekdays,
    };
    if (type === "New") {
      saveReminder(newReminder).then(() => {
        createNewTriggers(newReminder).then(() => {
          navigation.goBack();
        });
      });
    }

    if (type === "Edit") {
      updateDeleteReminder(newReminder, "update").then(() => {
        createNewTriggers(newReminder).then(() => {
          navigation.goBack();
        });
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={true}
      contentContainerStyle={{ ...styles.view, flexGrow: 1 }}
      keyboardShouldPersistTaps={"always"}
      showsVerticalScrollIndicator={false}
      enableAutomaticScroll={true}
      scrollToOverflowEnabled={true}
    >
      <ImageBackground
        source={require("../../images/green-pharmacy-symbol.png")}
        resizeMode="contain"
        style={{ ...styles.imageBackground }}
      ></ImageBackground>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.topBar}>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              handleSaveUpdateReminder();
            }}
          >
            Save
          </Button>
        </View>
        <View style={styles.timeView}>
          <TouchableOpacity
            style={{ ...styles.timeBox, backgroundColor: colors.secondary }}
            onPress={handleOpenChooseTime}
          >
            <Paragraph
              style={{ ...styles.timeText, color: colors.onSecondary }}
            >
              {String(chosenHours).padStart(2, "0")}
            </Paragraph>
          </TouchableOpacity>
          <Paragraph style={styles.timeText}>:</Paragraph>
          <TouchableOpacity
            style={{ ...styles.timeBox, backgroundColor: colors.secondary }}
            onPress={handleOpenChooseTime}
          >
            <Paragraph
              style={{ ...styles.timeText, color: colors.onSecondary }}
            >
              {String(chosenMinutes).padStart(2, "0")}
            </Paragraph>
          </TouchableOpacity>
        </View>
        <View style={styles.textDataBox}>
          <TouchableOpacity
            style={styles.textBox}
            onPress={handleOpenChooseWeekdays}
          >
            <Paragraph>Repeat on:</Paragraph>
            <Paragraph style={styles.textValue}>
              {weekdayNameShorts.length !== 0
                ? weekdayNameShorts.join(", ")
                : "Never"}
            </Paragraph>
          </TouchableOpacity>

          {repeatInputActive ? (
            <TextInput
              label="Repeat Count in Weeks"
              keyboardType="decimal-pad"
              autoFocus
              returnKeyType="done"
              value={repeatCount ? repeatCount.toString() : ""}
              onChangeText={(value) => {
                setRepeatCount(Number(value && value !== "" ? value : 0));
              }}
              onSubmitEditing={() => {
                setReminderTitleInputActive(true);
                setRepeatInputActive(false);
              }}
              onBlur={() => {
                setRepeatInputActive(false);
                Keyboard.dismiss();
              }}
              blurOnSubmit={false}
              style={styles.inputField}
            />
          ) : (
            <TouchableOpacity
              style={styles.textBox}
              disabled={weekdays.length === 0}
              onPress={() => setRepeatInputActive(true)}
            >
              <Paragraph style={weekdays.length === 0 ? styles.textValue : {}}>
                Repeat Count in Weeks:
              </Paragraph>
              <Paragraph style={styles.textValue}>{repeatCount}</Paragraph>
            </TouchableOpacity>
          )}
          {reminderTitleInputActive ? (
            <TextInput
              label="Title"
              returnKeyType="done"
              autoFocus
              value={reminderTitle}
              onChangeText={(value) => {
                setReminderTitle(value);
              }}
              onSubmitEditing={() => {
                setReminderTitleInputActive(false);
              }}
              onBlur={() => {
                setReminderTitleInputActive(false);
                Keyboard.dismiss();
              }}
              blurOnSubmit={false}
              style={{ ...styles.inputField }}
            />
          ) : (
            <TouchableOpacity
              style={styles.textBox}
              onPress={() => {
                setReminderTitleInputActive(true);
              }}
            >
              <Paragraph style={weekdays.length === 0 ? styles.textValue : {}}>
                Title:
              </Paragraph>
              <Paragraph style={styles.textValue}>
                {reminderTitle === "" ? "Reminder" : reminderTitle}
              </Paragraph>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={{ ...styles.descriptionBox }}>
            <Paragraph>Description</Paragraph>

            <TextInput
              multiline={true}
              numberOfLines={20}
              keyboardType="ascii-capable"
              value={reminderDescription}
              textAlignVertical="top"
              scrollEnabled={false}
              onChangeText={(value) => {
                setReminderDescription(value);
              }}
              onBlur={() => {
                Keyboard.dismiss();
              }}
              placeholder="Add Description"
              style={{
                backgroundColor: colors.secondary,
                color: colors.onSecondary,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ChooseWeekdaysDialog
        weekdaysOpen={weekdaysDialogOpen}
        handleDismissWeekdays={handleDismissWeekdays}
        weekdays={weekdays}
        setWeekdays={setWeekdays}
      />
      <TimePickerModal
        visible={timeDialogOpen}
        onDismiss={handleDismissTime}
        onConfirm={handleConfirmTime}
        cancelLabel={"Cancel"}
        confirmLabel={"Confirm"}
        hours={chosenHours}
        minutes={chosenMinutes}
      />
    </KeyboardAwareScrollView>
  );
};

export default CreateEditPage;

const styles = StyleSheet.create({
  view: {},
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    height: 70,
  },
  button: {},
  page: {},
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
    color: "grey",
  },
  inputField: {
    marginHorizontal: 10,
  },
  descriptionBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    position: "absolute",
    opacity: 0.25,
    marginHorizontal: 30,
    paddingHorizontal: 30,
  },
});
