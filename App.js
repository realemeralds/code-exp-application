// Basic react components
import React from "react";

// React Navigation + Icons
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import the Screen (compnents)
import MyTabBar from "./components/CustomTabBar";
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import ProfileScreen from "./screens/ProfileScreen";

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  const FocusedContext = React.createContext(null);

  // *The application*
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { height: 70 },
        }}
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
