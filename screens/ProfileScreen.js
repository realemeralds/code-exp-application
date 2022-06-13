import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles";

import { AuthContext } from "../components/Context";

export default function ProfileScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FCFCFC",
      }}
    >
      <Text
        style={{
          fontFamily: "SFProTextMedium",
          fontSize: 30,
          color: "#111111",
          marginBottom: 20,
        }}
      >
        Profile
      </Text>
      <Image
        source={require("../assets/pfpjpg.jpg")}
        style={{ width: 220, height: 220, borderRadius: 125, marginBottom: 10 }}
      />
      <Text
        style={{
          fontFamily: "SFProDisplayMedium",
          fontSize: 26,
          color: "#111111",
          textAlign: "center",
          paddingHorizontal: 70,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        Welcome back, Matthew Chan
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "SFProTextMedium",
            fontSize: 20,
            color: "#111111",
            marginRight: 6,
          }}
        >
          Platoon:
        </Text>
        <Text
          style={{
            fontFamily: "SFProTextLight",
            fontSize: 20,
            color: "#111111",
          }}
        >
          Apache
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#52555B",
          paddingHorizontal: 15,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 5,
          borderWidth: 0,
          elevation: 3,
          marginTop: 40,
        }}
      >
        <MaterialCommunityIcons size={30} color="#FFFFFF" name="account-edit" />
        <Text
          style={{
            fontFamily: "SFProTextLight",
            fontSize: 16,
            color: "#FFFFFF",
            marginLeft: 10,
          }}
        >
          Edit Personal Details
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#040F24",
          paddingHorizontal: 15,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 5,
          borderWidth: 0,
          elevation: 3,
          marginTop: 20,
        }}
      >
        <MaterialCommunityIcons size={30} color="#FFFFFF" name="cogs" />
        <Text
          style={{
            fontFamily: "SFProTextLight",
            fontSize: 16,
            color: "#FFFFFF",
            marginLeft: 10,
          }}
        >
          Tweak Preferences
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#E890AF",
          paddingHorizontal: 15,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 5,
          borderWidth: 0,
          elevation: 3,
          marginTop: 20,
        }}
        onPress={() => signOut()}
      >
        <MaterialCommunityIcons size={30} color="#111111" name="exit-to-app" />
        <Text
          style={{
            fontFamily: "SFProTextLight",
            fontSize: 16,
            color: "#111111",
            marginLeft: 10,
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
