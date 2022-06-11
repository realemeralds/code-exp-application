import { useFonts } from "expo-font";

const [loaded] = useFonts({
  SFUITextRegular: require("../assets/fonts/SFUITextRegular.otf"),
  SFProTextLight: require("../assets/fonts/SFProTextLight.otf"),
  SFProTextSemibold: require("../assets/fonts/SFProTextSemibold.otf"),
});

export default loaded;
