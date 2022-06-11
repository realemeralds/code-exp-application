// Basic styles and components
import React, { useEffect, useState } from "react";
import {
  View,
  AppRegistry,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import styles from "../styles";

import { createStackNavigator } from "@react-navigation/stack";

// Custom icons and font
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

// Calendar
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import Timetable from "react-native-calendar-timetable";

const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  const [loaded] = useFonts({
    SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
    SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
  });

  // Update the header when loaded, including the add event and search event stuff
  useEffect(() =>
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 22,
          }}
          onPress={() => {
            alert("Hello World!");
          }}
        >
          <Text
            style={{
              fontFamily: "SFUITextRegular",
              fontSize: 11,
              color: "black",
              alignSelf: "stretch",
              lineHeight: 27,
              marginRight: 4,
            }}
          >
            Add Event
          </Text>
          <MaterialIcons name="add" size={30} color="black" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 22,
          }}
          onPress={() => {
            alert("Hello World!");
          }}
        >
          <MaterialIcons name="search" size={30} color="black" />
          <Text
            style={{
              fontFamily: "SFUITextRegular",
              fontSize: 11,
              color: "black",
              alignSelf: "stretch",
              lineHeight: 27,
              marginLeft: 4,
            }}
          >
            Search Event
          </Text>
        </TouchableOpacity>
      ),
    })
  );

  // *The stack nav*
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function CalendarScreen() {
  const [date] = React.useState(new Date());

  // ** TO LOAD ITEMS @ CASPER**
  const [items] = React.useState([
    {
      title: "Some event",
      startDate: moment().subtract(1, "hour").toDate(),
      endDate: moment().add(1, "hour").toDate(),
    },
  ]);
  // let datesWhitelist = [
  //   {
  //     start: moment(),
  //     end: moment().add(3, "days"), // total 4 days enabled
  //   },
  // ];
  let datesBlacklist = [moment().add(1, "days")]; // 1 day disabled
  let markedDates = [
    {
      date: moment(),
      dots: [
        {
          color: "#185CDE",
          selectedcolor: "#185CDE",
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          paddingHorizontal: 40,
        }}
      >
        <CalendarStrip
          // Container style
          style={{
            height: 110,
            paddingBottom: 35,
            paddingTop: 10,
          }}
          // Scroll
          scrollable
          scrollerPaging
          shouldAllowFontScaling
          scrollToOnSetSelectedDate={false} // TODO: this doesnt work
          // Array of whitelisted dates with moment()
          // datesWhitelist={datesWhitelist}
          datesBlacklist={datesBlacklist}
          markedDates={markedDates}
          // selectedDate={}
          // Header
          calendarHeaderStyle={{
            color: "#222222",
            fontFamily: "SFProTextSemibold",
            fontSize: 14,
            alignSelf: "flex-start",
            marginLeft: 17,
          }}
          calendarHeaderContainerStyle={{
            alignSelf: "stretch",
            flex: 1,
          }}
          calendarHeaderFormat={"MMMM, YYYY"}
          calendarColor={"#FcFcFc"} // bg color
          // Number and day of week formatting
          dateNumberStyle={styles.dateNumberStyle}
          dateNameStyle={styles.dateNameStyle}
          // styleWeekend
          // weekendDateNameStyle={[
          //   styles.dateNameStyle,
          //   {
          //     color: "#ffffff",
          //   },
          // ]}
          // weekendDateNumberStyle={[
          //   styles.dateNameStyle,
          //   {
          //     color: "#ffffff",
          //   },
          // ]}
          highlightDateNumberContainerStyle={{
            backgroundColor: "rgba(79, 190, 158, 0.68)", // lime greenish
            height: 24,
            width: 24,
            borderRadius: 12,
            marginBottom: -2,
          }}
          highlightDateNameStyle={[
            styles.dateNameStyle,
            {
              color: "#222222",
            },
          ]}
          highlightDateNumberStyle={[
            styles.dateNumberStyle,
            {
              color: "#222222",
            },
          ]}
          disabledDateNameStyle={[
            styles.dateNameStyle,
            {
              color: "#353535",
            },
          ]}
          disabledDateNumberStyle={[
            styles.dateNumberStyle,
            {
              color: "#353535",
            },
          ]}
          // Left and right icons
          iconLeft={require("../assets/chevron-left.png")}
          iconRight={require("../assets/chevron-right.png")}
          iconContainer={{
            flex: 0.05,
            justifyContent: "center",
            alignItems: "center",
          }}
          // Marked dates marker style
          // markedDatesStyle={{ marginTop: -2, marginBottom: 2 }}
          iconStyle={{ height: "50%", width: "50%" }}
          // Link to functions
          onDateSelected={console.log("hi")}
          onWeekChanged={console.log("hi")}
        />
      </View>
      {/* <ScrollView>
        <Timetable
          // these two are required
          items={items}
          cardComponent={MyItemCard}
          date={date} // optional
        />
      </ScrollView> */}
    </View>
    // **TODO: Finish calendar functionality**
  );
}

/**
 * Example item component
 * @param style Object with pre-calculated values, looks like {position: 'absolute', zIndex: 3, width: Number, height: Number, top: Number, left: Number}
 * @param item One of items supplied to Timetable through 'items' property
 * @param dayIndex For multiday items inicates current day index
 * @param daysTotal For multiday items indicates total amount of days
 */
function MyItemCard({ style, item, dayIndex, daysTotal }) {
  return (
    <View
      style={{
        ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
        backgroundColor: "red",
        borderRadius: 10,
        elevation: 5,
      }}
    >
      <Text>{item.title}</Text>
      <Text>
        {dayIndex} of {daysTotal}
      </Text>
    </View>
  );
}

// ----------------------------------------------------------------- DETAILS SCREEN --------------------------------------------------
function DetailsScreen() {
  return <View />;
}
