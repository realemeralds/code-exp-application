import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";

const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  async function loadFonts() {
    await Font.loadAsync({
      SFUITextRegular: {
        uri: require("../assets/fonts/SFUITextRegular.otf"),
        display: Font.FontDisplay.FALLBACK,
      },
      SFProTextLight: {
        uri: require("../assets/fonts/SFProTextLight.otf"),
        display: Font.FontDisplay.FALLBACK,
      },
      SFProTextSemibold: {
        uri: require("../assets/fonts/SFProTextSemibold.otf"),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }

  function componentDidMount() {
    this.loadFonts();
  }

  // Load add event and search event
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
              fontSize: 12,
              color: "black",
              alignSelf: "stretch",
              lineHeight: 32,
              marginRight: 3,
            }}
          >
            Add Event
          </Text>
          <MaterialIcons name="add" size={35} color="black" />
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
          <MaterialIcons name="search" size={35} color="black" />
          <Text
            style={{
              fontFamily: "SFUITextRegular",
              fontSize: 12,
              color: "black",
              alignSelf: "stretch",
              lineHeight: 32,
              marginLeft: 3,
            }}
          >
            Search Event
          </Text>
        </TouchableOpacity>
      ),
    })
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function CalendarScreen() {
  return <View style={styles.container}>{/* <HomeScreenHeaders /> */}</View>;
}

function DetailsScreen() {
  return <View />;
}
