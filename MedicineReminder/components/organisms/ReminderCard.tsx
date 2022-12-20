import React from "react";
import { Card, Paragraph, Switch, Title } from "react-native-paper";
import { StyleSheet, View } from "react-native";

type Props = {
  time: Date;
  title: string;
};

export default function ReminderCard() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Card style={styles.card}>
      <View style={styles.layout}>
        <Card.Content style={styles.cardContent}>
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
    paddingLeft: 0
  },
  cardText: { top: 0, color: "#fff" },
  cardContent: { flex: 5 },
  cardAction: { flex: 1, right: 0, top: 0, justifyContent: "center" },
  switch: {},
});
