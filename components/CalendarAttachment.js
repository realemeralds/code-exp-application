import { useState } from "react";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";

export default function CalendarAttachment({ attachments, attachmentsShown }) {
  const [loaded] = useFonts({
    SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
    SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
  });
  if (typeof attachments === "object" && attachments.length !== 0) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: -5,
          marginEnd: 10,
          flex: 2,
        }}
      >
        <Ionicons name="attach-sharp" size={20} color="black" />
        {attachmentsShown ? (
          <Text style={styles.calendarAttachment}>
            {Object.keys(attachments).length} attachment
            {attachments.length > 1 ? "s" : ""}
          </Text>
        ) : (
          <></>
        )}
      </View>
    );
  } else {
    return <></>;
  }
}
