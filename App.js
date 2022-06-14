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
import LoginRootScreen from "./screens/LoginRootScreen";
import { AuthContext } from "./components/Context";
import * as SecureStore from "expo-secure-store";

// Moment.js
import moment from "moment";

// Custom fonts + loading
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

// Items Context
import { ItemsContext } from "./components/ItemsContext";

export default function App() {
  const [loaded] = useFonts({
    SFUITextRegular: require("./assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("./assets/fonts/SFProTextLight.otf"),
    SFProTextMedium: require("./assets/fonts/SFProTextMedium.otf"),
    SFProTextSemibold: require("./assets/fonts/SFProTextSemibold.otf"),
    SFProDisplayMedium: require("./assets/fonts/SFProDisplayMedium.otf"),
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
  const authContext = useMemo(() => {
    return {
      signIn: async (userName, password) => {
        // replace user, pass and Alpha with the values from db
        if ((userName === "user" && password === "pass") || true) {

          // error here
          console.log('Logged in')
          const res = await fetch('https://code-exp-2022.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify({
              username: 'username',
              password: 'password'
            }) // dummy username and password (should recieve 200)
          })
          console.log(res) // 503 status code recieved
          // ----------

          const pfp = { uri: "../../../../../../assets/pfpjpg.jpg" };
          const platoon = "Alpha";
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
          await SecureStore.deleteItemAsync("notAUserName");
          await SecureStore.deleteItemAsync("notAPassword");
          console.log("removed stored creds");
        } catch (e) {
          console.log(e);
        }
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

  // Check for token in SecureStore and sync localItems
  useEffect(() => {
    setTimeout(async () => {
      try {
        const parsedUsername = await SecureStore.getItemAsync("notAUserName");
        const parsedPassword = await SecureStore.getItemAsync("notAPassword");
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

  const itemsSync = useMemo(() => {
    return {
      localItems: [],
      getItemsFromDatabase: (username, password) => {
        // Simualation of fetch req
        setTimeout(() => {
          console.log(username, password);
          const statusCode = "200";
          const requestedItems = JSON.parse(
            JSON.stringify([
              {
                title: "Physical Conditioning",
                description: "Run 2.4km around the camp",
                backgroundColor: "#ECDDFF",
                borderColor: "#A361EB",
                attachments: [{ me: "test" }], // array of objects
                startDate: moment().add(20, "hour").toDate(),
                endDate: moment().add(21, "hour").toDate(),
              },
            ])
          );
          if (statusCode == "200") {
            itemsSync.localItems = requestedItems;
          } else {
            console.log("unsuccessful get from db");
          }
        }, 1000);
      },
      postItemsToDatabase: () => {
        return null;
      },
    };
  }, []);

  // *The application*
  return loaded ? (
    <AuthContext.Provider value={authContext}>
      <ItemsContext.Provider value={itemsSync}>
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
                options={{ headerShown: false }}
              />
            </Tab.Navigator>
          ) : (
            <LoginRootScreen />
          )}
        </NavigationContainer>
      </ItemsContext.Provider>
    </AuthContext.Provider>
  ) : (
    <AppLoading />
  );
}
