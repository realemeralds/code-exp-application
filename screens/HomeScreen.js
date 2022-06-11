import { React } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreenHeaders from "../components/HomeScreenHeaders";

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function CalendarScreen() {
  return (
    <View>
      <HomeScreenHeaders />
    </View>
  );
}

function DetailsScreen() {
  return <View />;
}
