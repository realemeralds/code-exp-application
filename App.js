import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "calendar-month-outline" : "calendar-month";
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={30}
                  color="black"
                />
              );
            } else if (route.name === "Profile") {
              iconName = focused
                ? "person-circle-outline"
                : "person-circle-sharp";
            } else if (route.name === "Library") {
              iconName = focused ? "library-outline" : "library";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={33} color="#222222" />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          // headerShown: false,
        })}
      >
        <Tab.Screen name="Settings" component={ProfileScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
