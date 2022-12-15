import React from "react";
import { Card, Paragraph, Switch, Title } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function ReminderCard() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Card>
      <Card.Content>
        <Title>Reminder Definition</Title>
        <Paragraph>Days for Reminder</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.switch}>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  switch: {
    flex: 1,
    position: "absolute",
    right: 0,
  },
});
