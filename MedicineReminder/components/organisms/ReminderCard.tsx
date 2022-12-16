import React, { useState, useEffect } from "react";
import { Card, Paragraph, Switch, Title } from "react-native-paper";
import { StyleSheet } from "react-native";
import { WeekdayModel } from "../types/weekday.model";
import StorageService from "../../services/StorageService";
import { Reminder } from "../types/Reminder.model";

type Props = {
  reminder: Reminder;
  switchState: boolean;
};

export default function ReminderCard(props: Props) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [time, setTime] = useState("");
  const [title, setTitle] = useState();
  const [days, setDays] = useState();

  useEffect(() => {
    StorageService.getData(`@${props.reminder.id}_timekey`).then((value) => {
      if (value) setTime(String(value));
    });
  }, []);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardText}>
          {time} | {title}
        </Title>
        <Paragraph style={styles.cardText}>{days}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.cardAction}>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          style={styles.switch}
        />
      </Card.Actions>
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
  cardText: { top: 0, color: "#fff" },
  cardAction: { flex: 1, position: "absolute", right: 0, top: 0 },
  switch: {},
});
