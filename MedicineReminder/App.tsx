import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./components/pages/LandingPage";
import CreateEditPage from "./components/pages/CreateEditPage";
import { de, enGB, registerTranslation } from "react-native-paper-dates";
import "./i18n/config";
import { ReminderContextProvider } from "./contexts/ReminderContext";
import {
  MD3LightTheme as DefaultTheme,
  Provider as ThemeProvider,
} from "react-native-paper";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

registerTranslation("en-GB", enGB);
registerTranslation("de", de);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    //bright
    secondary: "rgb(132, 202, 132)",
    onSecondary: "rgb(0, 0, 0)",
    //main
    primary: "rgb(45, 136, 45)",
    onPrimary: "rgb(255, 255, 255)",
    //dark
    tertiary: "rgb(15, 100, 15)",
    onTertiary: "rgb(255, 255, 255)",

    surface: "rgb(255, 255, 255)",
  },
};

/**
 * To be able to navigate between our different pages, we use this stack navigator, due to its easy usage and integrated header on the page.
 * Also, the implementation of registerTranslation is necessary, so that we can use a timepicker to change times for the reminders.
 *
 */
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ReminderContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Reminder"
              component={LandingPage}
              options={{
                headerTitleStyle: styles.title,
                headerStyle: styles.header,
              }}
            />
            <Stack.Screen
              name="New Reminder"
              options={{
                headerTitleStyle: styles.title,
                headerStyle: styles.header,
              }}
            >
              {() => <CreateEditPage type="New" />}
            </Stack.Screen>
            <Stack.Screen
              name="Edit Reminder"
              options={{
                headerTitleStyle: styles.title,
                headerStyle: styles.header,
              }}
            >
              {() => <CreateEditPage type="Edit" />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ReminderContextProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.secondary,
  },
  title: {
    color: theme.colors.onSecondary,
  },
});
