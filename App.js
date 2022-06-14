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

// Flashbars
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import styles from "./styles";

export default function App() {
  const [loaded] = useFonts({
    SFUITextRegular: require("./assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("./assets/fonts/SFProTextLight.otf"),
    SFProTextMedium: require("./assets/fonts/SFProTextMedium.otf"),
    SFProTextSemibold: require("./assets/fonts/SFProTextSemibold.otf"),
    SFProDisplayMedium: require("./assets/fonts/SFProDisplayMedium.otf"),
  });

  const initalLoginState = {
    isLoading: false,
    userName: null,
    password: null,
    pfp: null,
    platoon: null,
  };

  const storeLoginInCache = async (userName, password) => {
    try {
      await SecureStore.setItemAsync("notAUserName", userName);
      await SecureStore.setItemAsync("notAPassword", password);
    } catch (e) {
      console.log(e);
    }
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_CREDS":
        console.log("Successfully retrieved creds");
        return {
          ...prevState,
          isLoading: true,
          userName: action.id,
          password: action.password,
        };
      case "LOGIN":
        console.log("Successfully logged in");
        return {
          ...prevState,
          isLoading: true,
          userName: action.id,
          password: action.password,
          platoon: action.platoon,
          pfp: action.pfp,
        };
      case "LOGOUT":
        console.log("Successfully logged out.");
        return {
          ...prevState,
          isLoading: false,
          userName: null,
          password: null,
          pfp: null,
          platoon: null,
        };
      case "REGISTER":
        console.log("Successfully registered.");
        return {
          ...prevState,
          isLoading: true,
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
      loginState: loginState,
      signIn: async (userName, password) => {
        const queryBody = JSON.stringify({
          username: userName,
          password: password,
        });
        // status message
        if (typeof loading === "undefined") {
          var loadingLogin = true;
        } else {
          loadingLogin = true;
        }
        // for deactivating the button
        setTimeout(() => {
          if (loadingLogin) {
            showMessage({
              message: "Wait a bit...",
              description: "getting data from server",
              type: "info",
              position: "bottom",
              titleStyle: styles.statusTitle,
              textStyle: styles.statusDescription,
              style: [styles.statusContainer, { bottom: 10 }],
              floating: true,
              icon: "auto",
              autoHide: false,
            });
          }
        }, 200);

        const res = await fetch("https://code-exp-2022.herokuapp.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: queryBody, // dummy username and password (should recieve 200)
        });
        console.log(res.status); // 503 status code recieved
        if (res.status == 200) {
          loadingLogin = false;
          const platoonArray = ["Alpha", "Beta", "Gamma", "Theta", "Mu", "Nu"];
          // ["alice", "bob", "charlie", "realemeralds", "casper", "matthew"]
          const pfp = { uri: `../../../../../../assets/${userName}.jpg` };
          const platoon =
            platoonArray[Math.floor(Math.random() * platoonArray.length)];
          dispatch({
            type: "LOGIN",
            id: userName,
            password: password,
            pfp: pfp,
            platoon: platoon,
          });
          showMessage({
            message: "Logged in!",
            description: "credentials cached securely",
            type: "success",
            position: "bottom",
            titleStyle: styles.statusTitle,
            textStyle: styles.statusDescription,
            style: styles.statusContainer,
            floating: true,
            icon: "auto",
          });
          storeLoginInCache(userName, password);
        } else {
          showMessage({
            message: "Credentials Incorrect",
            description: "username and password do not match",
            type: "danger",
            position: "bottom",
            titleStyle: styles.statusTitle,
            textStyle: styles.statusDescription,
            style: [styles.statusContainer, { bottom: 10 }],
            floating: true,
            icon: "danger",
            autoHide: false,
          });
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
      signUp: async (userName, password, pfp, platoon) => {
        console.log(userName, password, pfp, platoon);
        const queryBody = JSON.stringify({
          username: userName,
          password: password,
        });
        console.log("Signing up...");
        const res = await fetch(
          "https://code-exp-2022.herokuapp.com/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: queryBody, // dummy username and password (should recieve 200)
          }
        );
        console.log(res.status);
        if (res.status == 200) {
          try {
            await SecureStore.setItemAsync("notAUserName", userName);
            await SecureStore.setItemAsync("notAPassword", password);
          } catch (e) {
            console.log(e);
          }
          dispatch({
            type: "REGISTER",
            id: userName,
            password: password,
            pfp: pfp,
            platoon: platoon,
          });
          showMessage({
            message: "Successfully registered!",
            description: "credentials cached securely",
            type: "success",
            position: "bottom",
            titleStyle: styles.statusTitle,
            textStyle: styles.statusDescription,
            style: styles.statusContainer,
            floating: true,
            icon: "auto",
          });
        } else {
          showMessage({
            message: "Registration failed",
            description: "try again in a few minutes",
            type: "danger",
            position: "bottom",
            titleStyle: styles.statusTitle,
            textStyle: styles.statusDescription,
            style: [styles.statusContainer, { bottom: 10 }],
            floating: true,
            icon: "danger",
            autoHide: false,
          });
        }
      },
    };
  }, [loginState]);

  // Check for token in SecureStore and sync localItems
  useEffect(() => {
    async () => {
      try {
        const parsedUsername = await SecureStore.getItemAsync("notAUserName");
        const parsedPassword = await SecureStore.getItemAsync("notAPassword");
        if (parsedPassword !== null && parsedUsername !== null) {
          showMessage({
            message: "Logged in",
            description: "with cached credentials",
            type: "success",
            position: "bottom",
            titleStyle: styles.statusTitle,
            textStyle: styles.statusDescription,
            style: styles.statusContainer,
            floating: true,
            icon: "auto",
          });
          dispatch({
            type: "LOGIN",
            id: parsedUsername,
            password: parsedPassword,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
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
        <FlashMessage position="top" />
      </ItemsContext.Provider>
    </AuthContext.Provider>
  ) : (
    <AppLoading />
  );
}
