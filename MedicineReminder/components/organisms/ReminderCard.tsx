import React, { useState } from "react";
import { Card, Paragraph, Switch, Title } from "react-native-paper";
import { StyleSheet } from "react-native";
import { WeekdayModel } from "../../types/weekday.model";

type Props = {
  time: Date;
  title: string;
  days: WeekdayModel[];
  switchState: boolean;
};

export default function ReminderCard() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardText}>Time | Title</Title>
        <Paragraph style={styles.cardText}>Days for Reminder</Paragraph>
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
