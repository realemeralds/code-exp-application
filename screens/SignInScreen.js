<<<<<<< Updated upstream
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
=======
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
>>>>>>> Stashed changes

import { AuthContext } from "../components/Context";

const SignInScreen = () => {
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
<<<<<<< Updated upstream
      <Text>SignInScreen</Text>
      <Button title="Click Here" onPress={() => alert("Button Cliked")} />
=======
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
            signIn();
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
>>>>>>> Stashed changes
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
//     header: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         paddingHorizontal: 20,
//         paddingBottom: 50
//     },
//     footer: {
//         flex: 3,
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         paddingHorizontal: 20,
//         paddingVertical: 30
//     },
//     text_header: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 30
//     },
//     text_footer: {
//         color: '#05375a',
//         fontSize: 18
//     },
//     action: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f2f2f2',
//         paddingBottom: 5
//     },
//     actionError: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#FF0000',
//         paddingBottom: 5
//     },
//     textInput: {
//         flex: 1,
//         marginTop: Platform.OS === 'ios' ? 0 : -12,
//         paddingLeft: 10,
//         color: '#05375a',
//     },
//     errorMsg: {
//         color: '#FF0000',
//         fontSize: 14,
//     },
//     button: {
//         alignItems: 'center',
//         marginTop: 50
//     },
//     signIn: {
//         width: '100%',
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10
//     },
//     textSign: {
//         fontSize: 18,
//         fontWeight: 'bold'
//     }
//   });
