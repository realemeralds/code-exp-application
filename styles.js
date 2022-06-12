import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

function loadFonts() {
  const [loaded] = useFonts({
    SFUITextRegular: require("./assets/fonts/SFUITextRegular.otf"),
    SFProTextLight: require("./assets/fonts/SFProTextLight.otf"),
    SFProTextSemibold: require("./assets/fonts/SFProTextSemibold.otf"),
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FcFcFc",
    alignItems: "center",
    justifyContent: "center",
  },
  stripContainer: { flex: 1 },
  dateNumberStyle: { color: "#222222", fontSize: 14 },
  dateNameStyle: { color: "#222222", fontSize: 9 },
  calendarTitle: {
    fontFamily: "SFProTextSemibold",
    fontSize: 12,
  },
  calendarDescription: {
    fontFamily: "SFUITextRegular",
    fontSize: 10,
    color: "#222222",
  },
  calendarAttachment: {
    fontFamily: "SFUITextRegular",
    fontSize: 12,
    color: "#222222",
    marginLeft: 2,
  },
});

export default styles;
