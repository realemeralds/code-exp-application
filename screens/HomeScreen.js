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
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

// Calendar
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import Timetable from "react-native-calendar-timetable";

// Caching and Backend Integration
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
var loaded;

export default function HomeScreen({ navigation }) {
  [loaded] = useFonts({
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// -------------------------------------------------------------------------CALENDAR STRIP-------------------------------------------------------------------

function CalendarScreen() {
  const window = useWindowDimensions();
  [loaded] = useFonts({
    SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
    SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
  });

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
      title: "Some event",
      startDate: moment().add(25, "hour").toDate(),
      endDate: moment().add(26, "hour").toDate(),
    },
  ]);
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
          // datesBlacklist={datesBlacklist}
          markedDates={markedDates}
          // selectedDate={}
          // Header
          calendarHeaderStyle={{
            color: "#222222",
            fontFamily: { loaded } ? "SFProTextSemibold" : "Roboto",
            fontWeight: { loaded } ? "500" : "300",
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
          iconStyle={{ height: "50%", width: "50%" }}
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
          cardComponent={MyItemCard}
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
          columnHorizontalPadding={8}
          enableSnapping
        />
      </ScrollView>
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

// ----------------------------- misc stuff ---------------------------------
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

// let datesWhitelist = [
//   {
//     start: moment(),
//     end: moment().add(3, "days"), // total 4 days enabled
//   },
// ];
// let datesBlacklist = [moment().add(1, "days")]; // 1 day disabled
