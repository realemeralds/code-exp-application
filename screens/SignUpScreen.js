import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

// Custom Fonts + Loading
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

// React Navigation + Icons
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

// Authentication
import { AuthContext } from "../components/Context";
const Stack = createStackNavigator();

const SignUpScreen = () => {
  const [loaded] = useFonts({
    SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
    SFProTextMedium: require("../assets/fonts/SFProTextMedium.otf"),
    SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
  });

  // Update the header when loaded, including the add event and search event stuff
  return loaded ? (
    <Stack.Navigator
      screenOptions={{
        header: () => <></>,
      }}
      initialRouteName="SignUpFirstScreen"
    >
      <Stack.Screen name="SignUpFirstScreen" component={SignUpFirstScreen} />
      <Stack.Screen name="SignUpSecondScreen" component={SignUpSecondScreen} />
    </Stack.Navigator>
  ) : (
    <AppLoading />
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
    <View style={styles.container}>
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
          style={styles.textInput}
          selectionColor="#05375a"
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
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          selectionColor="#05375a"
          secureTextEntry={true}
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
          style={styles.textInput}
          selectionColor="#05375a"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
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
            alert("Please fill in all fields.");
            return;
          } else if (password !== confirmPassword) {
            alert("Passwords do not match, please key in again.");
            return;
          } else if (password.length < 8) {
            alert("Password must be at least 8 characters long");
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
  const navigation = useNavigation();

  const [platoon, setPlatoon] = useState("");

  return (
    <View style={styles.container}>
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
          style={styles.textInput}
          selectionColor="#05375a"
          onChangeText={setPlatoon}
          value={platoon}
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
        onPress={() => {
          if (platoon.length === 0) {
            alert("Key in a platoon name.");
          }
          signUp({
            ...route.params,
            platoon: platoon,
            pfp: { uri: "../../../../../../assets/pfpjpg.jpg" },
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

export default SignUpScreen;

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
