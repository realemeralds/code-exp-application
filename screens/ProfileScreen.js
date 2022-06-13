import React from "react";
import { Text, View, Image } from "react-native";
import styles from "../styles";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../assets/pfpjpg.jpg")}
        style={{ width: 250, height: 250 }}
      />
    </View>
  );
}
