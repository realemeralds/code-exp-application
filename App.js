// Basic react components
import React, { useEffect, useMemo, useState } from "react";

// React Navigation + Icons
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import the Screen (compnents)
import MyTabBar from "./components/CustomTabBar";
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import ProfileScreen from "./screens/ProfileScreen";

// Login implementation
import LoginRootScreen from "./screens/LoginRootScreen";
import { AuthContext } from "./components/Context";
import * as SecureStore from "expo-secure-store";

// Custom fonts + loading
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

// Items Context
import { ItemsContext } from "./components/ItemsContext";

// Flashbars
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import styles from "./styles";

// moment.js
import moment from "moment";

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  // To fix the useEffect() hook
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 200);

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
      console.log("stored cred in cache");
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

  const authContext = useMemo(() => {
    return {
      loginState: loginState,
      signIn: async (userName, password) => {
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
        // status message
        if (typeof loading === "undefined") {
          var loadingLogin = true;
        } else {
          loadingLogin = true;
        }

        // actual body
        const queryBody = JSON.stringify({
          username: userName,
          password: password,
        });

        const res = await fetch("https://code-exp-2022.herokuapp.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: queryBody,
        });
        if (res.status == 200) {
          hideMessage();
          loadingLogin = false;
          console.log(res);

          // ["alice", "bob", "charlie", "realemeralds", "casper", "matthew"]

          const pfp = { uri: `../../../../../../assets/${userName}.jpg` };
          const platoon = res;
          dispatch({
            type: "LOGIN",
            id: userName,
            password: password,
            pfp: pfp,
            platoon: platoon,
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
          hideMessage();
          dispatch({
            type: "REGISTER",
            id: userName,
            password: password,
            pfp: pfp,
            platoon: platoon,
          });
          storeLoginInCache(userName, password);
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

  const itemsSync = useMemo(() => {
    return {
      localItems: [],
      getItemsFromDatabase: async (username, password) => {
        const queryBody = JSON.stringify({
          username: username,
          password: password,
        });
        const res = await fetch(
          `https://code-exp-2022.herokuapp.com/events?username=${username}&password=${password}`,
          {
            method: "GET",
          }
        );
        console.log("getting items...");
        console.log(res.status);
        console.log(res.url);
        if (res.status == 200) {
          const parsedJSON = res;
          parsedJSON.startDate = new Date(parsedJSON.startDate);
          parsedJSON.endDate = new Date(parsedJSON.startDate);
          console.log(parsedJSON);
          itemsSync.localItems == parsedJSON;
          console.log(JSON.stringify(itemsSync.localItems));
          showMessage({
            message: "Successful login!",
            description: "cached credentials and synced events",
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
            message: "Unsuccessful GET",
            description: "could not get your events from database",
            type: "warning",
            position: "bottom",
            titleStyle: styles.statusTitle,
            textStyle: styles.statusDescription,
            style: styles.statusContainer,
            floating: true,
            icon: "auto",
          });
        }
      },
      postItemsToDatabase: async (event) => {
        console.log(`event is ${event}`);
        event.startDate = moment(event.startDate, "DD-MM-YYYY HH:mm").format(
          "x"
        );
        event.endDate = moment(event.endDate, "DD-MM-YYYY HH:mm").format("x");
        const query = {
          username: loginState.userName,
          password: loginState.password,
          body: event,
        };
        const queryBody = JSON.stringify(query);
        const res = await fetch("https://code-exp-2022.herokuapp.com/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: queryBody, // dummy username and password (should recieve 200)
        });
        console.log(queryBody);
        console.log("sending POST");
        console.log(res.status);
        if (res.status == 201) {
          showMessage({
            message: "Success!",
            description: "Created new event",
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
            message: "Unsuccessful sync with database",
            description: "The event will only be stored locally",
            type: "warning",
            position: "bottom",
            titleStyle: styles.statusTitle,
            textStyle: styles.statusDescription,
            style: styles.statusContainer,
            floating: true,
            icon: "auto",
          });
        }
      },
    };
  }, [loading]);

  // Check for token in SecureStore and sync localItems
  useEffect(() => {
    async () => {
      console.log("started");
      try {
        const parsedUsername = await SecureStore.getItemAsync("notAUserName");
        const parsedPassword = await SecureStore.getItemAsync("notAPassword");
        console.log(parsedUsername, parsedPassword);
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
        console.log("error");
        console.log(e);
      }
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
