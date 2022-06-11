import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// React Navigation + Icons
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Custom fonts
import { useFonts } from "expo-font";

// Custom icon
import CalendarIcon from "./components/CustomIcon";

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
      >
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "profile" }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "calendar" }}
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
  const [loaded] = useFonts({
    SFUITextRegular: require("./assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("./assets/fonts/SFProTextLight.otf"),
    SFProTextSemibold: require("./assets/fonts/SFProTextSemibold.otf"),
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        alignSelf: "stretch",
        height: 69,
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
          return <Ionicons name={iconName} size={33} color="#222222" />;
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

        {
          console.log(icon);
        }

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
              flex: 1,
              alignItems: "center",
              marginTop: route.name === "Home" ? -40 : 0,
              marginHorizontal: route.name === "Home" ? -60 : 0,
            }}
          >
            {icon({ route })}
            <Text
              style={{
                color: isFocused ? "#673ab7" : "#222",
                textAlign: "center",
                fontFamily: "SFProTextLight",
                fontSize: route.name === "Home" ? 12 : 10,
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
