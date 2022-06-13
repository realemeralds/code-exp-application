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

<<<<<<< Updated upstream
=======
// Login implementation
import RootStackScreen from "./screens/RootStackScreen";
import { AuthContext } from "./components/Context";

>>>>>>> Stashed changes
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setUserToken("sfda");
        setIsLoading(false);
      },
      signOut: () => {
        setUserToken(null);
        setIsLoading(false);
      },
      signUp: () => {
        setUserToken("asd");
        setIsLoading(false);
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(authContext.signIn);
      setIsLoading(false);
    }, 1000);
  }, []);

  // *The application*
  return (
<<<<<<< Updated upstream
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
    </NavigationContainer>
=======
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
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
>>>>>>> Stashed changes
  );
}
