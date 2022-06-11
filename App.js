import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// React Navigation + Icons
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CalendarIcon from "./components/CustomIcon";

// Custom fonts
import * as Font from "expo-font";
import { useFonts } from "expo-font";

// UUID
const { v4: uuidv4, v4 } = require("uuid");
import "react-native-get-random-values";

// Import the Screen (compnents)
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [loaded] = useFonts({
    SFUITextRegular: require("./assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("./assets/fonts/SFProTextLight.otf"),
    SFProTextSemibold: require("./assets/fonts/SFProTextSemibold.otf"),
  });

  // *The application*
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        initialRouteName="Home"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "profile" }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "Calendar", title: "" }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{ title: "library" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Custom TabBar
function MyTabBar({ state, descriptors, navigation }) {
  async function loadFonts() {
    await Font.loadAsync({
      SFUITextRegular: {
        uri: require("./assets/fonts/SFUITextRegular.otf"),
        display: Font.FontDisplay.FALLBACK,
      },
      SFProTextLight: {
        uri: require("./assets/fonts/SFProTextLight.otf"),
        display: Font.FontDisplay.FALLBACK,
      },
      SFProTextSemibold: {
        uri: require("./assets/fonts/SFProTextSemibold.otf"),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }

  function componentDidMount() {
    this.loadFonts();
  }

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
        // Set id?
        const { options } = descriptors[route.key];

        // label name (at bottom)
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // icon name
        const icon = ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            return <CalendarIcon />;
          } else if (route.name === "Profile") {
            iconName = focused
              ? "person-circle-outline"
              : "person-circle-sharp";
          } else if (route.name === "Library") {
            iconName = focused ? "library-outline" : "library";
          }
          return <Ionicons name={iconName} size={36} color="#222222" />;
        };
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
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
              marginTop: route.name === "Home" ? -40 : 0,
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
