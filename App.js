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
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom fonts + loading
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    SFUITextRegular: require("./assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("./assets/fonts/SFProTextLight.otf"),
    SFProTextMedium: require("./assets/fonts/SFProTextMedium.otf"),
    SFProTextSemibold: require("./assets/fonts/SFProTextSemibold.otf"),
  });

  const initalLoginState = {
    userName: null,
    password: null,
    pfp: null,
    platoon: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_CREDS":
        console.log("Successfully retrieved creds");
        return {
          ...prevState,
          userName: action.id,
          password: action.password,
        };
      case "LOGIN":
        console.log("Successfully logged in");
        return {
          ...prevState,
          userName: action.id,
          password: action.password,
          platoon: action.platoon,
          pfp: action.pfp,
        };
      case "LOGOUT":
        console.log("Successfully logged out.");
        return {
          ...prevState,
          userName: null,
          password: null,
          pfp: null,
          platoon: null,
        };
      case "REGISTER":
        console.log("Successfully registered.");
        return {
          ...prevState,
          userName: action.id,
          password: action.password,
          pfp: action.pfp,
          platoon: action.platoon,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initalLoginState
  );

  // BACKEND CODE HERE
  // BACKEND CODE HERE
  // BACKEND CODE HERE
  // BACKEND CODE HERE
  const authContext = useMemo(() => {
    return {
      signIn: async (userName, password) => {
        // replace user, pass and Alpha with the values from db
        if (userName === "user" && password === "pass") {
          try {
            await AsyncStorage.setItem("notAUserName", userName);
            await AsyncStorage.setItem("notAPassword", password);
          } catch (e) {
            console.log(e);
          }
          pfp = { uri: "../../../../../../assets/pfpjpg.jpg" };
          platoon = "Alpha";
          dispatch({
            type: "LOGIN",
            id: userName,
            password: password,
            pfp: pfp,
            platoon: platoon,
          });
        } else {
          alert("Invalid Credentials.");
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("notAUserName");
          await AsyncStorage.removeItem("notAPassword");
        } catch (e) {
          console.log(e);
        }
        console.log("removed stored creds");
        dispatch({ type: "LOGOUT" });
      },
      signUp: (userName, password, pfp, platoon) => {
        dispatch({
          type: "REGISTER",
          id: userName,
          password: password,
          pfp: pfp,
          platoon: platoon,
        });
      },
    };
  }, []);

  // Check for token in AsyncStorage
  useEffect(() => {
    setTimeout(async () => {
      try {
        const parsedUsername = await AsyncStorage.getItem("notAUserName");
        const parsedPassword = await AsyncStorage.getItem("notAPassword");
        if (parsedPassword !== null && parsedUsername !== null) {
          dispatch({
            type: "LOGIN",
            id: parsedUsername,
            password: parsedPassword,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }, 200);
  }, []);

  // *The application*
  return loaded ? (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.pfp !== null ? (
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
