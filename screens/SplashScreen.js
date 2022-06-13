import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// Custom Fonts
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 250, width: 250, paddingHorizontal: 20 }}
        source={require("../assets/boots.png")}
      />
      <Text
        style={{
          fontFamily: "SFProTextMedium",
          textAlign: "center",
          fontSize: 34,
          color: "#111111",
          paddingHorizontal: 40,
          marginTop: 10,
        }}
      >
        Master your NS experience
      </Text>
      <Text
        style={{
          marginTop: 10,
          marginBottom: 40,
          fontFamily: "SFProTextLight",
          fontSize: 20,
          paddingHorizontal: 40,
          color: "#111111",
          textAlign: "center",
        }}
      >
        Prepare in advance. Coordinate your schedule.
      </Text>
      <TouchableOpacity
        style={{
          width: 150,
          height: 50,
          backgroundColor: "#FBFBFB",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          paddingVertical: 6,
        }}
        activeOpacity={0.5}
      >
        <Text
          style={{
            fontFamily: "SFUITextRegular",
            fontSize: 24,
            color: "#111111",
          }}
          onPress={() => {
            navigation.navigate("SignInScreen");
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          width: 150,
          height: 50,
          backgroundColor: "#343950",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          paddingVertical: 6,
        }}
        activeOpacity={0.5}
      >
        <Text
          style={{
            fontFamily: "SFUITextRegular",
            fontSize: 24,
            color: "#FFFFFF",
          }}
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        >
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
