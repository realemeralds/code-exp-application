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
  dateNumberStyle: {
    color: "#222222",
    fontSize: 14,
    marginTop: -1,
    paddingTop: 2,
  },
  dateNameStyle: {
    color: "#222222",
    fontSize: 9,
    marginBottom: -5,
    paddingTop: 9.5,
  },
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
  // Details screen
  detailsContainer: {
    backgroundColor: "#FcFcFc",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingHorizontal: 30,
    flex: 1,
    paddingBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  detailsTitle: {
    fontFamily: "SFProTextSemibold",
    fontSize: 26,
    marginBottom: 5,
  },
  detailsTime: {
    fontFamily: "SFUIProLight",
    fontSize: 20,
    color: "#8A8A8A",
    marginBottom: 20,
  },
  detailsDescription: {
    fontFamily: "SFUITextRegular",
    fontSize: 14,
    marginBottom: 20,
  },
});

export default styles;
