// Basic react components
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// React Navigation + Icons
import { Ionicons } from "@expo/vector-icons";
import CalendarIcon from "../components/CustomIcon";

// Custom fonts
import * as Font from "expo-font";
import { useFonts } from "expo-font";

// UUID
const { v4: uuidv4, v4 } = require("uuid");
import "react-native-get-random-values";

export default function MyTabBar({ state, descriptors, navigation }) {
  // Load fonts
  const [loaded] = useFonts({
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

  function componentDidMount() {
    this.loadFonts();
    alert("test");
  }

  // *Actual Tabbar*
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        height: 69,
        alignSelf: "center",
        borderColor: "black",
      }}
    >
      {state.routes.map((route, index) => {
        // Create an array, where each element is generated with the stuff below
        const { options } = descriptors[route.key]; // Get the options from the Tab.Screen component above

        // label name (at bottom)
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const icon = ({ route }) => {
          let iconName;
          if (route.name === "Home") {
            return <CalendarIcon />;
          } else if (route.name === "Profile") {
            iconName = isFocused
              ? "person-circle-outline"
              : "person-circle-sharp";
          } else if (route.name === "Library") {
            iconName = isFocused ? "library-outline" : "library";
          }
          return <Ionicons name={iconName} size={40} color="#222222" />;
        };

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              merge: true,
              focused: true,
            });
          }
        };

        // Probably don't need this
        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              flex: 0,
              alignItems: "center",
              justifyContent: "center",
              marginTop: route.name === "Home" ? -30 : 0,
              width: 70,
              marginHorizontal: 15,
            }}
            key={v4()}
          >
            {icon({ route })}
            <Text
              style={{
                color: isFocused ? "#673ab7" : "#222",
                fontFamily: "SFProTextLight",
                fontSize: route.name === "Home" ? 13 : 10,
                marginTop: route.name === "Home" ? 0 : -2,
                marginLeft: -1,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
