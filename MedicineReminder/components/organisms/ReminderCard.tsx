import React, { useState } from "react";
import { Card, Paragraph, Switch, Title } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Reminder } from "../../types/Reminder.model";
import { WeekdayModel } from "../../types/weekday.model";
import { useNavigation } from "@react-navigation/native";

type ReminderProps = {
  reminder: Reminder;
  switchState: boolean;
};

export default function ReminderCard(props: ReminderProps) {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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
