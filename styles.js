import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

function loadFonts() {
  const [loaded] = useFonts({
    SFRegular: require("./assets/fonts/SFUITextRegular.otf"),
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FcFcFc",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: { fontFamily: "SFRegular", fontSize: 160, color: "#222222" },
  stripContainer: { flex: 1 },
  dateNumberStyle: { color: "#222222", fontSize: 14 },
  dateNameStyle: { color: "#222222", fontSize: 9 },
});

export default styles;
