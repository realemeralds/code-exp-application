// Basic react components
import React, { useState, useMemo, useEffect } from "react";

// React Navigation + Icons
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import the Screen (compnents)
import MyTabBar from "./components/CustomTabBar";
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import ProfileScreen from "./screens/ProfileScreen";

// AppLoading splashScreen
import AppLoading from "expo-app-loading";
import { AuthContext } from "./components/AuthContext";

// Authentication
import RootStackScreen from "./screens/RootStackScreen";

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    signIn: () => {
      setUserToken("sfda");
      setIsLoading(false);
    };
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    };
    signUp: () => {
      setUserToken("asd");
      setIsLoading(false);
    };
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // *The application*
  return (
    <AuthContext.Provider value={authContext}>
      <RootStackScreen />
      {/* <NavigationContainer>
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
          options={{
            tabBarLabel: "Calendar",
            title: "",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{ title: "library" }}
        />
      </Tab.Navigator>
    </NavigationContainer> */}
    </AuthContext.Provider>
  );
}
