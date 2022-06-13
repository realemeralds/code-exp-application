import React from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ height: 250, width: 250, paddingHorizontal: 20 }}
        source={require("../assets/helmet.png")}
      />
      <Text
        style={{
          fontFamily: "SFProDisplayMedium",
          fontSize: 36,
          color: "#111111",
        }}
      >
        Sign In
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontFamily: "SFProTextLight",
          fontSize: 15,
          color: "#111111",
          marginBottom: 10,
        }}
      >
        Welcome back! Sign in to sync your calendar...
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          paddingBottom: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 5,
        }}
      >
        <MaterialCommunityIcons color="#111111" name="account" size={34} />
        <TextInput
          placeholder="Username"
          placeholderTextColor={"#86848C"}
          style={styles.textInput}
          selectionColor="#05375a"
        />
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
});
