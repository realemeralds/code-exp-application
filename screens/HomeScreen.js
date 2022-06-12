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
  useWindowDimensions,
} from "react-native";
import styles from "../styles";

import { createStackNavigator } from "@react-navigation/stack";

// Custom icons and font
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

// Calendar
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import Timetable from "react-native-calendar-timetable";
import MyItemCard from "../components/CalendarItem";

// Caching and Backend Integration
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

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
              fontFamily: loaded ? "SFUITextRegular" : "Roboto",
              letterSpacing: loaded ? 0 : -0.3,
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
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Calendar"
    >
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// -------------------------------------------------------------------------CALENDAR STRIP-------------------------------------------------------------------

function CalendarScreen({ screenName }) {
  const window = useWindowDimensions();

  const cache = new Cache({
    namespace: "LearnBetter",
    policy: {
      maxEntries: 50000, // if unspecified, it can have unlimited entries
      stdTTL: 0, // the standard ttl as number in seconds, default: 0 (unlimited)
    },
    backend: AsyncStorage,
  });

  // This is timetable functionality
  const [date] = React.useState(new Date());
  // This is strip functionality
  let [markedDates, setMarkedDates] = useState([
    {
      date: moment(),
      dots: [
        {
          color: "#185CDE",
          selectedcolor: "#185CDE",
        },
      ],
    },
  ]);
  // This is timetable functionality
  const [items, setItems] = React.useState([
    {
      title: "Physical Conditioning",
      description: "Run 2.4km around the camp",
      backgroundColor: "#ECDDFF",
      borderColor: "#A361EB",
      attachments: [{ me: "test" }], // array of objects
      startDate: moment().add(1, "hour").toDate(),
      endDate: moment().add(2, "hour").toDate(),
    },
  ]);

  let datesWhitelist = [
    {
      start: moment(),
      end: moment().add(3, "days"), // total 4 days enabled
    },
  ];
  let datesBlacklist = [moment().add(1, "days")]; // 1 day disabled
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          paddingHorizontal: 20,
        }}
      >
        <CalendarStrip
          // Container style
          style={{
            height: 110,
            paddingBottom: 35,
            paddingTop: 10,
          }}
          daySelectionAnimation={{
            type: "background",
            highlightColor: "#4fbe9e66",
            duration: 400,
          }}
          // Scroll
          scrollToOnSetSelectedDate={false}
          scrollable={true}
          // Array of whitelisted dates with moment()
          datesWhitelist={datesWhitelist}
          datesBlacklist={datesBlacklist}
          markedDates={markedDates}
          // selectedDate={new Date()}
          // Header
          calendarHeaderStyle={{
            color: "#222222",
            fontFamily: "SFProTextSemibold",
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
          iconStyle={{ height: "60%", width: "60%" }}
          iconLeft={require("../assets/chevron-left.png")}
          iconRight={require("../assets/chevron-right.png")}
          iconContainer={{
            flex: 0.1,
            justifyContent: "center",
            alignItems: "center",
          }}
          // Link to functions
          onDateSelected={console.log("date changed")}
          onWeekChanged={console.log("week changed")}
        />
      </View>
      <ScrollView style={{ top: 80, marginBottom: 105 }}>
        <Timetable
          // Docs: https://github.com/dorkyboi/react-native-calendar-timetable?ref=reactnativeexample.com#layout
          // Rendering stuff
          items={items}
          cardComponent={MyItemCard} // pass as a prop
          date={date}
          // Layout customisation
          width={window.width - 42}
          style={{
            headersContainer: {},
            lines: {
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderColor: "#A5A5A5",
            },
            time: {
              backgroundColor: "#FcFcFc",
              color: "#A5A5A5",
              fontFamily: "SFProTextLight",
            },
            nowLine: {
              dot: { backgroundColor: "#343950", height: 6, width: 6 },
              line: { backgroundColor: "#343950", height: 2 },
            },
          }}
          hourHeight={45}
          linesTopOffset={20}
          linesLeftInset={17}
          columnHorizontalPadding={0}
          enableSnapping
        />
      </ScrollView>
    </View>
    // **TODO: Finish calendar functionality**
  );
}

// ----------------------------------------------------------------- DETAILS SCREEN --------------------------------------------------
function DetailsScreen({}) {
  return (
    <View>
      <Text>Hello World!</Text>
    </View>
  );
}

// ----------------------------- misc stuff ---------------------------------
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
// ========================
// function componentDidMount() {
//   for (let i = 0; i < items.length; i++) {
//     const { startDate, endDate } = items;
//     let newDates = [];
//     if (moment(startDate).format("LL") === moment(endDate).format("LL")) {
//       // spagetti code
//       newDates.push({
//         date: startDate,
//         dots: [
//           {
//             color: "#185CDE",
//             selectedcolor: "#185CDE",
//           },
//         ],
//       });
//     } else {
//       newDates.push(
//         ...markedDates,
//         {
//           date: startDate,
//           dots: [
//             {
//               color: "#185CDE",
//               selectedcolor: "#185CDE",
//             },
//           ],
//         },
//         {
//           date: endDate,
//           dots: [
//             {
//               color: "#185CDE",
//               selectedcolor: "#185CDE",
//             },
//           ],
//         }
//       );
//     }
//     // push all the marks to the calendar
//     console.log("pushing new marks");
//     console.log(...newDates);
//     setMarkedDates([...markedDates, ...newDates]);
//   }
// }
