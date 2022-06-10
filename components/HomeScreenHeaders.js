import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles";

export default function HomeScreenHeaders() {
  return (
    <View style={{ justifyContent: "space-between", flex: 1 }}>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          color: "black",
        }}
        onPress={() => {
          alert("Hello World!");
        }}
      >
        <MaterialIcons
          name="search"
          size={24}
          color="black"
          style={{ marginLeft: 6 }}
        />
        <Text style={{ fontFamily: "sans-serif", fontSize: 20 }}>
          Search Event
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          color: "black",
        }}
        onPress={() => {
          alert("Hello World!");
        }}
      >
        <Text style={{ fontFamily: "sans-serif", fontSize: 600 }}>
          Add Event
        </Text>
        <MaterialIcons name="add" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
