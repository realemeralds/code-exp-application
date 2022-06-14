import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Authentication
import { AuthContext } from "../components/Context";

import { useFonts } from "expo-font";

const SignInScreen = () => {
  const { signIn } = React.useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: 250,
          width: 250,
          paddingHorizontal: 20,
          alignSelf: "center",
          marginBottom: 26,
        }}
        source={require("../assets/helmet.png")}
      />
      <Text
        style={{
          fontFamily: "SFProDisplayMedium",
          fontSize: 36,
          color: "#111111",
          marginBottom: 2,
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
          value={username}
          onChangeText={setUsername}
          maxLength={40}
        />
      </View>
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
        <MaterialCommunityIcons
          color="#111111"
          name="lock-open-check-outline"
          size={34}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"#86848C"}
          style={styles.textInput}
          selectionColor="#05375a"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          maxLength={40}
        />
      </View>
      <TouchableOpacity
        style={{
          width: 150,
          height: 50,
          backgroundColor: "#343950",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 30,
          borderRadius: 10,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "SFProTextLight",
            fontSize: 20,
            color: "#FFFFFF",
          }}
          onPress={() => {
            signIn(username, password);
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 45,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 10 : -2,
    marginLeft: 12,
    color: "#05375a",
    borderBottomColor: "#6E6C78",
    borderBottomWidth: 1,
    paddingHorizontal: -3,
    marginRight: 20,
    fontFamily: "SFProTextMedium",
    fontSize: 14,
    color: "#111111",
    paddingTop: 4,
    marginBottom: 10,
  },
});
