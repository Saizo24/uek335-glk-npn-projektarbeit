import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./components/pages/LandingPage";
import CreateEditPage from "./components/pages/CreateEditPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Reminder" component={LandingPage} />
        <Stack.Screen name="New Reminder">
          {() => <CreateEditPage type="New" />}
        </Stack.Screen>
        <Stack.Screen name="Edit Reminder">
          {() => <CreateEditPage type="Edit" />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
