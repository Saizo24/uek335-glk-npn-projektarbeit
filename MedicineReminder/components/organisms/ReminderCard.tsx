import React, { useContext, useState } from "react";
import { Card, IconButton, Paragraph, Switch, Title } from "react-native-paper";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Reminder } from "../../types/Reminder.model";
import { WeekdayModel } from "../../types/weekday.model";
import { useNavigation } from "@react-navigation/native";
import notifee, {
  AndroidImportance,
  EventType,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import ReminderContext from "../../contexts/ReminderContext";

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
  const { setActiveReminder, updateDeleteReminder, saveReminder } =
    useContext(ReminderContext);
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(props.switchState);
  const onToggleSwitch = () => {
    {
      setIsSwitchOn(!isSwitchOn);
      createNewTriggers();
      if (!isSwitchOn) {
        saveReminder(props.reminder);
      }
    }

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
          timestamp: date.getTime(),
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

        notifee.onForegroundEvent(({ type, detail }) => {
          const { notification } = detail;

          switch (type) {
            case EventType.DISMISSED:
              console.log("User dismissed notification", detail.notification);
              break;
          }
        });

        notifee.onBackgroundEvent(async ({ type, detail }) => {
          const { notification, pressAction } = detail;

          switch (type) {
            case EventType.PRESS:
              // handle the notification and do something
              break;
          }
          // Check if the user pressed the "Mark as read" action
          if (
            type === EventType.ACTION_PRESS &&
            pressAction.id === "mark-as-read"
          ) {
            // Update external API
            // Remove the notification
            await notifee.cancelNotification(notification.id);
          }
        });
      });
    }
  };
  const [deleteActive, setDeleteActive] = useState(false);

  return (
    <TouchableWithoutFeedback
      delayLongPress={1000}
      onPress={() => {
        if (!deleteActive) {
          setActiveReminder(props.reminder);
          navigation.navigate("Edit Reminder");
        }
        if (deleteActive) {
          setDeleteActive(false);
        }
      }}
      onLongPress={() => {
        setDeleteActive(true);
      }}
      delayPressOut={5000}
      onPressOut={() => {
        setDeleteActive(false);
      }}
    >
      <Card style={styles.card}>
        <View style={styles.layout}>
          <IconButton
            icon={"delete"}
            iconColor="red"
            onPress={() => {
              updateDeleteReminder(props.reminder, "delete").then(() => {
                setDeleteActive(false);
              });
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
              {props.reminder.days.map(
                (day: number) => " " + WeekdayModel[day]
              )}
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
