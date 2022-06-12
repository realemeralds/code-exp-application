import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";

export default function AddEvent() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 22,
      }}
      onPress={() => {
        navigation.navigate("Events");
      }}
    >
      <Text
        style={{
          fontFamily: "SFUITextRegular",
          fontSize: 11,
          color: "black",
          alignSelf: "stretch",
          lineHeight: 27,
          marginRight: 4,
        }}
      >
        Add Event
      </Text>
      <MaterialIcons name="add" size={30} color="black" />
    </TouchableOpacity>
  );
}
