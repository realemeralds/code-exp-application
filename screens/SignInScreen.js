import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AuthContext } from "../components/Context";
import { showMessage } from "react-native-flash-message";

import styles from "../styles";

const SignInScreen = () => {
  const { signIn } = React.useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  return (
    <View style={styles.signInContainer}>
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
          style={styles.signInTextInput}
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
          style={styles.signInTextInput}
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
        disabled={buttonDisabled}
        onPress={() => {
          if (username !== "" && password !== "") {
            console.log("pressed!");
            setButtonDisabled(true);
            signIn(username, password);
            setButtonDisabled(false);
          } else {
            showMessage({
              message: "Insufficient Data",
              description: "Please make sure to fill up all fields",
              type: "warning",
              position: "bottom",
              titleStyle: styles.statusTitle,
              textStyle: styles.statusDescription,
              style: [styles.statusContainer, { bottom: 10 }],
              floating: true,
              icon: "auto",
              autoHide: false,
            });
          }
        }}
      >
        <Text
          style={{
            fontFamily: "SFProTextLight",
            fontSize: 20,
            color: "#FFFFFF",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
