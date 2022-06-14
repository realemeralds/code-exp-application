import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { useFonts } from "expo-font";

import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../components/Context";
const Stack = createStackNavigator();

import { showMessage } from "react-native-flash-message";

import styles from "../styles";

const SignUpScreen = () => {
  const [loaded] = useFonts({
    SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
    SFProTextMedium: require("../assets/fonts/SFProTextMedium.otf"),
    SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
  });

  // Update the header when loaded, including the add event and search event stuff
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <></>,
      }}
      initialRouteName="SignUpFirstScreen"
    >
      <Stack.Screen name="SignUpFirstScreen" component={SignUpFirstScreen} />
      <Stack.Screen name="SignUpSecondScreen" component={SignUpSecondScreen} />
    </Stack.Navigator>
  );
};

const SignUpFirstScreen = () => {
  const navigation = useNavigation();

  const [loaded] = useFonts({
    SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
    SFProTextMedium: require("../assets/fonts/SFProTextMedium.otf"),
    SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
    SFProDisplayMedium: require("../assets/fonts/SFProDisplayMedium.otf"),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.signInContainer}>
      <Image
        style={{
          height: 150,
          width: 150,
          alignSelf: "center",
          marginBottom: 22,
        }}
        source={require("../assets/soldier.png")}
      />
      <Text
        style={{
          fontFamily: "SFProDisplayMedium",
          fontSize: 36,
          color: "#111111",
        }}
      >
        Sign Up
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
        Create an account to sync your calendar
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
          onChangeText={setUsername}
          value={username}
          style={styles.signInTextInput}
          selectionColor="#05375a"
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
        <MaterialIcons name="lock" size={34} color="#111111" />
        <TextInput
          placeholder="Password"
          style={styles.signInTextInput}
          onChangeText={setPassword}
          value={password}
          selectionColor="#05375a"
          secureTextEntry={true}
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
        <MaterialCommunityIcons color="#111111" name="lock-outline" size={34} />
        <TextInput
          placeholder="Reenter Password"
          style={styles.signInTextInput}
          selectionColor="#05375a"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
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
        // TODO: Implement hashing here
        onPress={() => {
          if (
            password.length === 0 ||
            username.length === 0 ||
            confirmPassword.length === 0
          ) {
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
            return;
          } else if (password !== confirmPassword) {
            showMessage({
              message: "Passwords do not match.",
              description: "Please key in again",
              type: "danger",
              position: "bottom",
              titleStyle: styles.statusTitle,
              textStyle: styles.statusDescription,
              style: [styles.statusContainer, { bottom: 10 }],
              floating: true,
              icon: "auto",
              autoHide: false,
            });
            return;
          } else if (password.length < 8) {
            showMessage({
              message: "Password too weak",
              description: "Make sure it is at least 8 characters long",
              type: "warning",
              position: "bottom",
              titleStyle: styles.statusTitle,
              textStyle: styles.statusDescription,
              style: [styles.statusContainer, { bottom: 10 }],
              floating: true,
              icon: "auto",
              autoHide: false,
            });
            return;
          }
          navigation.navigate("SignUpSecondScreen", {
            username: username,
            password: password,
          });
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

const SignUpSecondScreen = ({ route }) => {
  const { signUp } = React.useContext(AuthContext);

  const [platoon, setPlatoon] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  return (
    <View style={styles.signInContainer}>
      <Image
        style={{
          height: 150,
          width: 150,
          alignSelf: "center",
          marginBottom: 22,
        }}
        source={require("../assets/soldier.png")}
      />
      <Text
        style={{
          fontFamily: "SFProDisplayMedium",
          fontSize: 36,
          color: "#111111",
        }}
      >
        Almost there...
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontFamily: "SFProTextLight",
          fontSize: 15,
          color: "#111111",
          marginBottom: 25,
        }}
      >
        Just a few more details to add for proper syncing
      </Text>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 5,
        }}
      >
        <MaterialCommunityIcons
          color="#111111"
          name="account-multiple"
          size={34}
        />
        <TextInput
          placeholder="Platoon"
          placeholderTextColor={"#86848C"}
          style={styles.signInTextInput}
          selectionColor="#05375a"
          onChangeText={setPlatoon}
          value={platoon}
          maxLength={40}
        />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#52555B",
          borderRadius: 5,
          paddingLeft: 10,
          paddingVertical: 7,
          paddingRight: 13,
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        <MaterialIcons name="image" size={24} color="white" />
        <Text
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#52555B",
            borderRadius: 5,
            paddingLeft: 10,
            paddingVertical: 7,
            paddingRight: 13,
            alignSelf: "center",
            fontFamily: "SFUITextRegular",
            fontSize: 14,
            color: "#FFFFFF",
          }}
        >
          Attach Profile Picture...
        </Text>
      </TouchableOpacity>
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
          if (platoon.length === 0) {
            showMessage({
              message: "Fields empty:",
              description: "Key in a platoon name.",
              type: "warning",
              position: "bottom",
              titleStyle: styles.statusTitle,
              textStyle: styles.statusDescription,
              style: [styles.statusContainer, { bottom: 10 }],
              floating: true,
              icon: "auto",
              autoHide: false,
            });
            return;
          }
          setButtonDisabled(true);
          signUp({
            ...route.params,
            platoon: platoon,
            pfp: { uri: "../../../../../../assets/pfpjpg.jpg" },
          });
          setButtonDisabled(false);
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

export default SignUpScreen;
