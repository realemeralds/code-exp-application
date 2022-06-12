// Basic styles and components
import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import {
  View,
  AppRegistry,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Button,
} from "react-native";
import styles from "../styles";

// Paper Text Input
// import { TextInput } from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";

// Custom icons and font
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// Custom Search and Add event components
import SearchEvent from "../components/HeaderSearchEvent";
import AddEvent from "../components/HeaderAddEvent";

// Calendar
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import Timetable from "react-native-calendar-timetable";
import MyItemCard from "../components/CalendarItem";

// Date Picker
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Caching and Backend Integration
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cache } from "react-native-cache";
import { eventNames } from "npm";

const Stack = createStackNavigator();
const cache = new Cache({
  namespace: "myapp",
  policy: {
    maxEntries: 50000, // if unspecified, it can have unlimited entries
    stdTTL: 0, // the standard ttl as number in seconds, default: 0 (unlimited)
  },
  backend: AsyncStorage,
});

export default function HomeScreen({ navigation }) {
  const [loaded] = useFonts({
    SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
    SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
  });

  // Update the header when loaded, including the add event and search event stuff

  // *The stack nav*
  return (
    <Stack.Navigator initialRouteName="Calendar">
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Events" component={AddEventScreen} />
    </Stack.Navigator>
  );
}

// -------------------------------------------------------------------------CALENDAR STRIP-------------------------------------------------------------------

function CalendarScreen({ screenName, navigation }) {
  const forceUpdate = useForceUpdate();
  const window = useWindowDimensions();

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () => <AddEvent />,
      headerLeft: () => <SearchEvent />,
    });
  }, [screenName]);

  // This is timetable functionality
  const [currentDate, setCurrentDate] = useState(new Date());

  const setCachedItems = async (key, object) => {
    console.log(`Putting in ${JSON.stringify(object)}`);
    await cache.set(key, JSON.stringify(object));
  };

  const getCachedItems = async (key) => {
    let JSONValue = await cache.get(key);
    if (JSONValue !== null) {
      console.log(`Getting in ${JSON.parse(JSONValue)}`);
      let parsedJSON = JSON.parse(JSONValue, function (key, value) {
        if ((key === "startDate") | (key === "endDate")) {
          return new Date(value);
        } else {
          return value;
        }
      });
      for (var i = 0; i < parsedJSON.length; i++) {
        console.log(Object.getOwnPropertyNames(parsedJSON[i]));
      }
      setItems(
        JSON.parse(JSONValue, function (key, value) {
          if ((key === "startDate") | (key === "endDate")) {
            return new Date(value);
          } else {
            return value;
          }
        })
      );
    } else {
      setCachedItems(
        "cachedItems",
        JSON.stringify([
          {
            title: "Physical Conditioning",
            description: "Run 2.4km around the camp",
            backgroundColor: "#ECDDFF",
            borderColor: "#A361EB",
            attachments: [{ me: "test" }], // array of objects
            startDate: moment().add(20, "hour").toDate(),
            endDate: moment().add(21, "hour").toDate(),
          },
        ])
      );
    }
  };

  useEffect(() => {
    // setCachedItems(
    //   "cachedItems",
    //   JSON.stringify([
    //     {
    //       title: "Physical Conditioning",
    //       description: "Run 2.4km around the camp",
    //       backgroundColor: "#ECDDFF",
    //       borderColor: "#A361EB",
    //       attachments: [{ me: "test" }], // array of objects
    //       startDate: moment().add(20, "hour").toDate(),
    //       endDate: moment().add(21, "hour").toDate(),
    //     },
    //   ])
    // );
    // getCachedItems("cachedItems").then(forceUpdate());
  }, []);

  const [items, setItems] = React.useState([
    {
      title: "Physical Conditioning",
      description: "Run 2.4km around the camp",
      backgroundColor: "#ECDDFF",
      borderColor: "#A361EB",
      attachments: [{ me: "test" }], // array of objects
      startDate: moment().add(20, "hour").toDate(),
      endDate: moment().add(21, "hour").toDate(),
    },
  ]);

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
            duration: 200,
            animProperty: "opacity",
            animType: "easeIn",
          }}
          // Scroll
          scrollToOnSetSelectedDate={false}
          selectedDate={currentDate}
          scrollerPaging
          scrollable
          // Array of whitelisted dates with moment()
          // datesWhitelist={datesWhitelist}
          // datesBlacklist={datesBlacklist}
          markedDates={markedDates}
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
          dayContainerStyle={{ paddingBottom: 15, paddingTop: 3 }}
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
          // markedDatesStyle={{ marginBottom: 5 }}
          iconStyle={{ height: "60%", width: "60%" }}
          iconLeft={require("../assets/chevron-left.png")}
          iconRight={require("../assets/chevron-right.png")}
          iconContainer={{
            flex: 0.1,
            justifyContent: "center",
            alignItems: "center",
          }}
          // Link to functions
          onDateSelected={(date) => {
            setCurrentDate(date.toDate());
          }}
          // onWeekChanged={console.log("week changed")}
        />
      </View>
      <ScrollView style={{ top: 80, marginBottom: 105 }}>
        <Timetable
          // Docs: https://github.com/dorkyboi/react-native-calendar-timetable?ref=reactnativeexample.com#layout

          // Rendering stuff
          items={items}
          cardComponent={MyItemCard} // pass as a prop
          date={currentDate}
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
              dot: {
                backgroundColor: "#343950",
                height: 6,
                width: 6,
              },
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
function DetailsScreen({ route }) {
  const item = route.params;
  const [loaded] = useFonts({
    SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
    SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
  });

  /* {
      title: "Physical Conditioning",
      description: "Run 2.4km around the camp",
      backgroundColor: "#ECDDFF",
      borderColor: "#A361EB",
      attachments: [{ me: "test" }], // array of objects
      startDate: moment().add(1, "hour").toDate(),
      endDate: moment().add(2, "hour").toDate(),
    },
    */
  const timeText = () => {};
  return (
    <View style={styles.detailsContainer}>
      <View
        style={{
          borderColor: "#A5A5A5",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Text style={styles.detailsTitle}>{item.title}</Text>
        <Text style={styles.detailsTime}>{`${moment(item.startDate).format(
          "k:mm"
        )} - ${moment(item.endDate).format("k:mm")}`}</Text>
        <Text style={styles.detailsDescription}>{item.description}</Text>
      </View>
    </View>
    // TODO: Attachment functionality
  );
}
// ----------------------------- add event screen ---------------------------------
function AddEventScreen() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [eventName, setEventName] = React.useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  // const handleConfirm = (date) => {
  //   console.warn("A date has been picked: ", date);
  //   hideDatePicker();
  // };
  // const handleConfirm = (date) => {
  //   console.warn("A date has been picked: ", date);
  //   hideDatePicker();
  // };

  return (
    <View>
      <Text>Create an Event</Text>
      <View style={{ marginTop: 20 }}>
        {/* <TextInput
          placeholder="Event Name"
          value={eventName}
          onChangeText={(text) => setEventName(text)}
          activeUnderlineColor="#6260CE"
          underlineColor="#A5A5A5"
          numberOfLines={1}
          style={{
            fontFamily: "SFUIProLight",
            fontSize: 20,
            color: "#8A8A8A",
          }}
        /> */}
      </View>
      <Text>Date</Text>

      <TouchableOpacity onPress={showDatePicker}>
        <Feather name="calendar" size={24} color="black" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
