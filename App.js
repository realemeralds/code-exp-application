// Basic react components
import React, { useState, useEffect, useMemo } from "react";

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

// Login implementation
import RootStackScreen from "./screens/RootStackScreen";
import { AuthContext } from "./components/Context";

// Custom fonts + loading
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded, setLoaded] = useFonts({
    SFUITextRegular: require("./assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("./assets/fonts/SFProTextLight.otf"),
    SFProTextMedium: require("./assets/fonts/SFProTextMedium.otf"),
    SFProTextSemibold: require("./assets/fonts/SFProTextSemibold.otf"),
  });
  const [userToken, setUserToken] = useState(null);

  // initalLoginState = {
  //   isLoading: true,
  //   userName: null,
  //   password: null,
  //   pfp: null,
  //   platoon: null,
  // };

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setUserToken("sfda");
      },
      signOut: () => {
        setUserToken(null);
      },
      signUp: () => {
        setUserToken("asd");
      },
    };
  }, []);

  // *The application*
  return loaded ? (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken !== null ? (
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
              options={{
                title: "Profile",
                headerShown: false,
              }}
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
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  ) : (
    <AppLoading />
  );
}
