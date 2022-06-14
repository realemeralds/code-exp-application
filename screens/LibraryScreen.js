// React Hooks and components
import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

// stylesheet
import styles from "../styles";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function LibraryScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainLibrary" component={MainLibrary} />
      <Stack.Screen name="WWSLibrary" component={WWSLibrary} />
      <Stack.Screen name="ESS3Library" component={ESS3Library} />
      <Stack.Screen name="JLNOLibrary" component={JLNOLibrary} />
    </Stack.Navigator>
  );
}

function MainLibrary() {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 26,
          fontFamily: "SFProTextMedium",
          alignSelf: "stretch",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 70,
        }}
      >
        Library
      </Text>
      <TouchableOpacity
        style={{
          height: 130,
          flexDirection: "row",
          marginHorizontal: 20,
          alignItems: "center",
          backgroundColor: "#E1E8FF",
          borderRadius: 20,
        }}
      >
        <View style={{ flex: 1, height: 100 }}>
          <Image
            style={{
              flex: 1,
              height: undefined,
              width: undefined,
              resizeMode: "contain",
            }}
            source={{
              uri: "https://img.youtube.com/vi/jkqB8KRPp9I/hqdefault.jpg",
            }}
            defaultSource={require("../assets/videoplaceholder.jpg")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 10, fontFamily: "SFProTextMedium" }}>
            documentary
          </Text>
          <Text>Why We Serve - Our NS Stories</Text>
          <Text>
            This series features stories and shared experiences of Singaporeans
            who have gone through National Service (NS).{" "}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity></TouchableOpacity>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
}

const WWSLibrary = () => {
  return <></>;
};

const ESS3Library = () => {
  return <></>;
};

const JLNOLibrary = () => {
  return <></>;
};
