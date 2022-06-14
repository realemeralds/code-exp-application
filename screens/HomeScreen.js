// Basic styles and components
import React, { useEffect, useState, useCallback } from "react";
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
import { TextInput } from "react-native-paper";

// Custom icons and font and loading
import { Feather, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

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
import { ItemsContext } from "../components/ItemsContext";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// UUID
const { v4: uuidv4, v4 } = require("uuid");
import "react-native-get-random-values";

const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  // Grab fonts
  const [loaded] = useFonts({
    SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
    SFProTextMedium: require("../assets/fonts/SFProTextMedium.otf"),
    SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
    SFProDisplayMedium: require("../assets/fonts/SFProDisplayMedium.otf"),
  });

  // Update the header when loaded, including the add event and search event stuff
  return loaded ? (
    <Stack.Navigator initialRouteName="Calendar">
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen
        name="Events"
        component={AddEventScreen}
        options={{ headerTitle: "Add Event" }}
      />
    </Stack.Navigator>
  ) : (
    <AppLoading />
  );
}

// -------------------------------------------------------------------------CALENDAR STRIP-------------------------------------------------------------------

function CalendarScreen({ screenName, navigation, route }) {
  const window = useWindowDimensions();
  const { getItemsFromDatabase, localItems } = React.useContext(ItemsContext);

  useEffect(() => {
    getItemsFromDatabase("hello", "world");
    navigation.setOptions({
      title: "",
      headerRight: () => <AddEvent />,
      headerLeft: () => <SearchEvent />,
    });
  }, [screenName]);

  // This is timetable functionality
  const [currentDate, setCurrentDate] = useState(new Date());
  const [items, setItems] = useState([]); // Backend stuff

  useEffect(() => {
    setItems(localItems);
  }, [localItems]);

  useEffect(() => {
    console.log(`items are ${JSON.stringify(items)}`);
    setMarkedDates(
      items.map((element) => {
        let eventDate = moment(element.startDate);
        return {
          date: eventDate,
          dots: [{ color: "#185CDE" }],
        };
      })
    );
  }, [items]);

  // Turn into get request
  useFocusEffect(
    useCallback(() => {
      if (typeof route.params !== "undefined") {
        const { newItem, event } = route.params;
        if (newItem) {
          event.startDate = moment(
            event.startDate,
            "DD-MM-YYYY HH:mm"
          ).toDate();
          event.endDate = moment(event.endDate, "DD-MM-YYYY HH:mm").toDate();
          setItems([...items, event]);
        }
        route.params = undefined;
      }
    }, [route])
  );

  // This is strip functionality
  let [markedDates, setMarkedDates] = useState([]);

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
          scrollable
          scrollToOnSetSelectedDate={false}
          selectedDate={currentDate}
          scrollerPaging
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
          markedDatesStyle={{ marginTop: -1, paddingBottom: 1 }}
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
        />
      </View>
      <ScrollView style={{ top: 84, marginBottom: 109 }}>
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
              backgroundColor: "#FbFbFb",
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
  const navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePickerType, setDatePickerType] = useState("");
  const [eventName, setEventName] = React.useState("");
  const [eventDescription, setEventDescription] = React.useState("");
  const [currentPicker, setCurrentPicker] = React.useState("");
  const [datePicked, setdatePicked] = React.useState(moment());
  const [startTime, setStartTime] = React.useState(moment());
  const [endTime, setEndTime] = React.useState(moment().add("1", "hour"));
  const [eventColor, setEventColor] = React.useState("#ECDDFF");
  const [eventBorderColor, setEventBorderColor] = React.useState("#A361EB");
  const [selectedElement, setSelectedElement] = React.useState(0);
  const eventBorderColorArray = [
    "#A361EB",
    "#1FC3D2",
    "#F5C978",
    "#0CD195",
    "#FE5E9B",
  ];
  const eventColorArray = [
    "#EDDDFE",
    "#E1E8FF",
    "#FFF4E4",
    "#D6F9F0",
    "#FEE4ED",
  ];

  const showDatePicker = (datePicker, currentPicker) => {
    setDatePickerType(datePicker);
    setCurrentPicker(currentPicker);
    setDatePickerVisibility(true);
    console.log("test");
  };

  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn(`A ${currentPicker} has been picked: ${date}`);
    if (currentPicker === "date") {
      setdatePicked(moment(date));
    } else if (currentPicker === "startTime") {
      setStartTime(moment(date));
      if (endTime.diff(moment(date, "minutes")) < 60) {
        setEndTime(moment(date).add("1", "hour"));
      }
    } else {
      setEndTime(moment(date));
      if (startTime.diff(moment(date, "minutes")) > 45) {
        setStartTime(moment(date).subtract("1", "hour"));
      }
    }
    hideDatePicker();
  };

  const eventAdded = () => {
    if (!eventName || !eventDescription) {
      alert("Please fill up all fields.");
      return null;
    }
    let interStartTime =
      datePicked.format("DD-MM-YYYY") + " " + startTime.format("HH:mm");
    let interEndTime =
      datePicked.format("DD-MM-YYYY") + " " + endTime.format("HH:mm");
    console.log({
      newItem: true,
      event: {
        title: eventName,
        description: eventDescription,
        backgroundColor: eventColor,
        borderColor: eventBorderColor,
        attachments: undefined,
        startDate: interStartTime,
        endDate: interEndTime,
      },
    });
    navigation.navigate("Calendar", {
      newItem: true,
      event: {
        title: eventName,
        description: eventDescription,
        backgroundColor: eventColor,
        borderColor: eventBorderColor,
        attachments: { "pain and suffering": "hello world!" },
        startDate: interStartTime,
        endDate: interEndTime,
      },
    });
  };
  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: 40, alignItems: "flex-start", marginTop: -10 },
      ]}
    >
      <Text style={styles.eventTitle}>Create an Event</Text>
      <View
        style={{
          flex: 0,
          alignItems: "flex-start",
          justifyContent: "flex-end",
          height: 50,
          alignSelf: "stretch",
        }}
      >
        <TextInput
          placeholder="Title"
          value={eventName}
          onChangeText={(text) => setEventName(text)}
          activeUnderlineColor="#222222"
          underlineColor="#6e6c7896"
          dense={true}
          style={{
            marginTop: 6,
            fontFamily: "SFProTextMedium",
            fontSize: 22,
            color: "#222222",
            paddingTop: 10,
            backgroundColor: "#FcFcFc",
            textAlign: "left",
            paddingHorizontal: 2,
            alignSelf: "stretch",
          }}
        />
      </View>
      <View
        style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }}
      >
        <Text style={styles.eventColor}>Color</Text>
        {eventBorderColorArray.map((element, index) => {
          return (
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: element,
                borderColor: "#6E6C78",
                borderWidth: index === selectedElement ? 2 : 0,
                marginHorizontal: 5,
              }}
              onPress={() => {
                setEventBorderColor(element);
                setSelectedElement(index);
                setEventColor(eventColorArray[index]);
              }}
              key={v4()}
            ></TouchableOpacity>
          );
        })}
      </View>
      <Text
        style={[
          styles.eventColor,
          { marginTop: 20, fontSize: 16, fontFamily: "SFProTextMedium" },
        ]}
      >
        Date
      </Text>
      <View
        style={{
          backgroundColor: "#EFEFEF",
          paddingHorizontal: 15,
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          height: 60,
          borderRadius: 5,
          elevation: 2,
          marginTop: 8,
        }}
      >
        <Text
          style={{
            flex: 1,
            textAlign: "left",
            fontFamily: "SFProTextLight",
            fontSize: 16,
            color: "#000000",
          }}
        >
          {datePicked.format("dddd, D MMMM YYYY")}
        </Text>
        <TouchableOpacity
          style={{
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderColor: "#222222",
            paddingLeft: 12,
          }}
          onPress={() => showDatePicker("date", "date")}
        >
          <Feather name="calendar" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.eventTimeContainer}>
        <View style={[styles.eventTimeSelect, { marginRight: 5 }]}>
          <Text style={styles.eventTimeText}>{startTime.format("k:mm")}</Text>
          <TouchableOpacity
            style={styles.eventTimeSelectButton}
            onPress={() => showDatePicker("time", "startTime")}
          >
            <Feather name="chevron-down" size={22} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.eventTimeSelect, { marginLeft: 5 }]}>
          <Text style={styles.eventTimeText}>{endTime.format("k:mm")}</Text>
          <TouchableOpacity
            style={styles.eventTimeSelectButton}
            onPress={() => showDatePicker("time", "endTime")}
          >
            <Feather name="chevron-down" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.eventDescriptionText}>Description</Text>
      <View style={{ alignSelf: "stretch", height: 80 }}>
        <TextInput
          value={eventDescription}
          onChangeText={(text) => setEventDescription(text)}
          type="outlined"
          multiline
          selectionColor="#222222"
          activeOutlineColor="#222222"
          outlineColor="#6e6c7896"
          numberOfLines={4}
          style={styles.eventDescriptionInput}
        />
      </View>
      <TouchableOpacity
        style={styles.eventAddEventButtonContainer}
        onPress={eventAdded}
      >
        <Text style={styles.eventAddEventButtonText}>Add Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.eventAttachButtonContainer}>
        <Ionicons name="attach-sharp" size={16} color="white" />
        <Text style={styles.eventAttachButtonText}>Attach Files...</Text>
      </TouchableOpacity>
      {isDatePickerVisible ? (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={datePickerType}
          onConfirm={handleConfirm}
          onCancel={hideDateTimePicker}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
