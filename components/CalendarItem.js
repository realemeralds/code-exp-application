import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import React, { useState } from "react";
import CalendarAttachment from "./CalendarAttachment";
/**
 * Example item component
 * @param style Object with pre-calculated values, looks like {position: 'absolute', zIndex: 3, width: Number, height: Number, top: Number, left: Number}
 * @param item One of items supplied to Timetable through 'items' property
 * @param dayIndex For multiday items inicates current day index
 * @param daysTotal For multiday items indicates total amount of days
 */
export default function MyItemCard({
  style,
  item,
  dayIndex,
  daysTotal,
  currentPage,
}) {
  const navigation = useNavigation(item);
  const [attachmentsShown, setAttachmentsShown] = useState(true);
  return (
    <TouchableOpacity
      style={{
        ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
        backgroundColor: item.backgroundColor,
        borderColor: item.borderColor,
        borderRadius: 5,
        elevation: 1,
        borderLeftWidth: 5,
        paddingLeft: 5,
        paddingTop: 5,
        justifyContent: "space-between",
        alignItems: "stretch",
        flexDirection: "row",
        overflow: "hidden",
      }}
      onLayout={(event) => {
        setAttachmentsShown(event.nativeEvent.layout.width > 200);
      }}
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate("Details", item);
        currentPage;
      }}
    >
      <View style={{ flex: 3 }}>
        <Text style={styles.calendarTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.calendarDescription} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
      <View>
        <CalendarAttachment
          attachments={item.attachments}
          attachmentsShown={attachmentsShown}
        />
      </View>
    </TouchableOpacity>
  );
}
