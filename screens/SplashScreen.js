import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Custom Fonts
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

// Splash screen while fonts loading
import * as SplashScreen from "expo-splash-screen";

const LoginSplashScreen = () => {
  const navigation = useNavigation();

  // Splash Screen Load Trigger
  const [loaded] = useFonts({
    SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
    SFProTextMedium: require("../assets/fonts/SFProTextMedium.otf"),
    SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
    SFProDisplayMedium: require("../assets/fonts/SFProDisplayMedium.otf"),
  });

  return (
    <View style={styles.container}>
      <Text>SignInScreen</Text>
      <Button title="Click Here" onPress={() => alert("Button Cliked")} />
    </View>
  );
};

export default LoginSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
});
