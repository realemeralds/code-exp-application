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
    backgroundColor: "#FbFbFb",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: { fontFamily: "SFRegular", fontSize: 160, color: "#222222" },
});

export default styles;
