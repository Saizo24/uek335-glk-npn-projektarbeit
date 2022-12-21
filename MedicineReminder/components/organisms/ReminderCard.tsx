import React, { useContext, useState } from "react";
import { Card, IconButton, Paragraph, Switch, Title } from "react-native-paper";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Reminder } from "../../types/Reminder.model";
import { WeekdayModel } from "../../types/weekday.model";
import { useNavigation } from "@react-navigation/native";
import ReminderContext from "../../contexts/ReminderContext";

type ReminderProps = {
  reminder: Reminder;
  switchState: boolean;
};

export default function ReminderCard(props: ReminderProps) {
  const { setActiveReminder, updateDeleteReminder, saveReminder } = useContext(ReminderContext)
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(props.switchState);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    saveReminder(props.reminder)
  }
  const [deleteActive, setDeleteActive] = useState(false)

  return (
    <TouchableWithoutFeedback
      delayLongPress={1000}
      onPress={() => {
        if (!deleteActive) {
          setActiveReminder(props.reminder)
          navigation.navigate("Edit Reminder");
        }
        if (deleteActive) {
          setDeleteActive(false)
        }
      }}
      onLongPress={() => {
        setDeleteActive(true)
      }}
      delayPressOut={5000}
      onPressOut={() => {
        setDeleteActive(false)
      }}
    >
      <Card
        style={styles.card}
      >
        <View style={styles.layout}>
          <IconButton
            icon={"delete"}
            iconColor="red"

            onPress={() => {
              updateDeleteReminder(props.reminder, "delete").then(() => {
                setDeleteActive(false)
              })
            }}
            style={{ display: deleteActive ? undefined : "none" }}
          />

          <Card.Content>
            <Title style={styles.cardText}>
              {props.reminder.hours.toString().padStart(2, "0")}:
              {props.reminder.minutes.toString().padStart(2, "0")} |{" "}
              {props.reminder.name}
            </Title>
            <Paragraph style={styles.cardText}>
              {props.reminder.days.map((day: number) => " " + WeekdayModel[day])}
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardAction}>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              style={styles.switch}
            />
          </Card.Actions>
        </View>
      </Card>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,

    backgroundColor: "#000",
  },
  layout: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    paddingLeft: 0,
  },
  cardText: { top: 0, color: "#fff" },
  cardContent: { flex: 5 },
  cardAction: { flex: 1, right: 0, top: 0, justifyContent: "center" },
  switch: {},
});
