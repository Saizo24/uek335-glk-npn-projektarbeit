import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./components/pages/LandingPage";
import EditPage from "./components/pages/EditPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Reminder" component={LandingPage} />
        <Stack.Screen name="Edit" component={EditPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
