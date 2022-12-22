import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Dialog, Paragraph, useTheme } from "react-native-paper";
import WeekdayCheckbox from "../../molecules/weekdayCheckbox/WeekdayCheckbox";
import { weekdayNames } from "../../pages/CreateEditPage";

type ChooseWeekdaysDialogProps = {
  weekdaysOpen: boolean;
  handleDismissWeekdays: () => void;
  weekdays: number[];
  setWeekdays: (weekDays: number[]) => void;
};

/**
 * This dialog lists all days of a week. It also handles all chosen weekdays of a reminder, like
 * which days the notification is supposed to be active. On Submit, it will save it to the activereminder
 * 
 * @param weekdays number array, containing all chosen weekdays as numbers
 * @param setWeekdays updates the number array, containing chosen weekdays
 * @param weekdaysOpen boolean for showing the dialog if true
 * @param handleDismissWeekdays function for closing the dialog
 * @returns 
 */
const ChooseWeekdaysDialog = ({
  weekdays,
  setWeekdays,
  weekdaysOpen,
  handleDismissWeekdays,
}: ChooseWeekdaysDialogProps) => {
  const { colors } = useTheme();

  const [selectedWeekdays, setSelectedWeekdays] = React.useState(weekdays);

  /**
   * Saves the current chosen weekdays and closes the dialog 
   */
  const handleSaveWeekdays = () => {
    setWeekdays(selectedWeekdays);
    handleDismissWeekdays();
  };

  /**
   * Resets the chosen weekdays to its original value and closes the dialog
   */
  const handleCancelWeekdays = () => {
    handleDismissWeekdays();
    setSelectedWeekdays(weekdays);
  };

  /**
   * Function for adding or removing a chosen weekday from the weekday array.
   * 
   * @param check If true, the value will be added to the weekday array. If false, value will be removed
   * @param value Number of the weekday, which should be added or removed
   */
  const handleAddRemoveWeekDay = (check: boolean, value: number) => {
    const newWeekdays = Array.from(selectedWeekdays);
    if (check) {
      newWeekdays.push(value);
      newWeekdays.sort((a, b) => a - b);
    }
    if (!check) {
      newWeekdays.splice(newWeekdays.indexOf(value), 1);
    }
    setSelectedWeekdays(newWeekdays);
  };

  return (
    <Dialog
      visible={weekdaysOpen}
      onDismiss={handleCancelWeekdays}
      dismissable
      style={{ backgroundColor: colors.secondary }}
    >
      <Dialog.Content style={styles.dialog}>
        <View style={styles.title}>
          <Paragraph>Select Weekdays</Paragraph>
        </View>
        <View style={styles.weekdayBox}>
          {weekdayNames.map((weekday, index) => {
            return (
              <WeekdayCheckbox
                key={index}
                value={index}
                boxChecked={selectedWeekdays.includes(index)}
                handleCheck={handleAddRemoveWeekDay}
                title={`Every ${weekday}`}
              />
            );
          })}
        </View>
        <View style={styles.buttonBox}>
          <Button onPress={handleCancelWeekdays}>Cancel</Button>
          <Button onPress={handleSaveWeekdays}>Ok</Button>
        </View>
      </Dialog.Content>
    </Dialog>
  );
};

export default ChooseWeekdaysDialog;

const styles = StyleSheet.create({
  dialog: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
  title: {
    marginBottom: 20,
  },
  weekdayBox: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
