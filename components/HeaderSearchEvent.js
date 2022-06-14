import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SearchEvent() {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 22,
      }}
    >
      <MaterialIcons name="search" size={30} color="black" />
      <Text
        style={{
          fontFamily: "SFUITextRegular",
          letterSpacing: 0,
          fontSize: 11,
          color: "black",
          alignSelf: "stretch",
          lineHeight: 27,
          marginLeft: 4,
        }}
      >
        Search Event
      </Text>
    </TouchableOpacity>
  );
}
