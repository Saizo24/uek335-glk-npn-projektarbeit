import React, { useState } from "react";
import { Card, Paragraph, Switch, Title } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Reminder } from "../../types/Reminder.model";
import { WeekdayModel } from "../../types/weekday.model";
import { useNavigation } from "@react-navigation/native";
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";

type ReminderProps = {
  reminder: Reminder;
  switchState: boolean;
};
/**
 * This component serves as a single reminder for a medicine. It includes following parameters
 *
 * @param reminder : With all the necessary properties, such as time, name and description
 * @param switchState : A state to know wether or not the switch and therefore the reminder is turned on
 *
 * In this component, a trigger will be set if the switch is flipped to the "on" state and will be removed if it is switched to the "off" state
 * Other than that, it displays the title of the reminder, the time it is set to go off and the dates it should trigger on.
 *
 */
export default function ReminderCard(props: ReminderProps) {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    createNewTriggers();
  };

  async function createNewTriggers() {
    let date = new Date(Date.now());
    props.reminder.days.forEach(async (day: number) => {
      console.log(day);
      date.setDate(date.getDate() - date.getDay() + day);
      date.setHours(props.reminder.hours);
      date.setMinutes(props.reminder.minutes);
      console.log(date);

      const channelId = await notifee.createChannel({
        id: "default",
        name: "Default Channel",
        importance: AndroidImportance.HIGH,
      });

      // Create a time-based trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
      };

      // Create a trigger notification
      await notifee.createTriggerNotification(
        {
          title: props.reminder.name,
          body: props.reminder.description,
          android: {
            channelId,
          },
        },
        trigger
      );
      console.log(trigger);
      notifee
        .getTriggerNotificationIds()
        .then((ids) => console.log("All trigger notifications: ", ids));
    });
  }

  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.navigate("Edit Reminder", { reminder: props.reminder });
      }}
    >
      <View style={styles.layout}>
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
