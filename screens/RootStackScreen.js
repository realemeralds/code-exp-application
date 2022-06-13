import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginSplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const RootStack = createStackNavigator();

<<<<<<< Updated upstream
const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </RootStack.Navigator>
);
=======
const RootStackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="SplashScreen" component={LoginSplashScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  );
};
>>>>>>> Stashed changes

export default RootStackScreen;
