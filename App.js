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
import * as SecureStore from "expo-secure-store";

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
        if (userName === "user" && password === "pass") {
          try {
            await SecureStore.setItemAsync("notAUserName", userName);
            await SecureStore.setItemAsync("notAPassword", password);
          } catch (e) {
            console.log(e);
          }
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

  // Items Syncing
  const itemsSync = useMemo(() => {
    // const [localItems, setLocalItems] = useState([]);
    // const [statusCode, setStatusCode] = useState("");
    // return {
    //   getItemsFromDatabase: () => {
    //     return null;
    //   },
    //   postItemsToDatabase: () => {
    //     return null;
    //   },
    // };
  }, []);

  // *The application*
  return loaded ? (
    <AuthContext.Provider value={authContext}>
      {/* <ItemsContext.Provider value={itemsSync}> */}
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
      {/* </ItemsContext.Provider> */}
    </AuthContext.Provider>
  ) : (
    <AppLoading />
  );
}
