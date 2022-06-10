import { React } from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreenHeaders from "../components/HomeScreenHeaders";
import { Agenda } from "react-native-calendars";

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
      <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          "2022-05-22": [{ name: "item 1 - any js object" }],
          "2022-05-23": [{ name: "item 2 - any js object", height: 80 }],
          "2022-05-24": [],
          "2022-05-25": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => {
          console.log("trigger items loading");
        }}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={(day) => {
          console.log("day pressed");
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => {
          console.log("day changed");
        }}
        // Initially selected day
        selected={"2022-05-16"}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={"2022-05-10"}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={"2022-05-30"}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        markedDates={{
          "2022-05-16": { selected: true, marked: true },
          "2022-05-17": { marked: true },
          "2022-05-18": { disabled: true },
        }}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        disabledByDefault={true}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log("refreshing...")}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        refreshControl={null}
        // Agenda theme
        theme={{
          agendaDayTextColor: "yellow",
          agendaDayNumColor: "green",
          agendaTodayColor: "red",
          agendaKnobColor: "blue",
        }}
        // Agenda container style
      />
      <HomeScreenHeaders />
    </View>
  );
}

function DetailsScreen() {
  return <View />;
}
