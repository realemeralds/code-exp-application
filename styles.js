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
    fontSize: 10,
    color: "#222222",
    marginLeft: 2,
    marginRight: -26,
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
    color: "#222222",
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
    color: "#222222",
  },
  eventTitle: {
    fontFamily: "SFProTextMedium",
    fontSize: 30,
    color: "#222222",
    alignSelf: "flex-start",
    paddingLeft: 0,
  },
  eventColor: {
    fontSize: 16,
    fontFamily: "SFProTextMedium",
    color: "#111111",
    marginRight: 20,
    flexDirection: "row",
  },
  eventTimeContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "stretch",
  },
  eventTimeText: {
    fontFamily: "SFProTextLight",
    fontSize: 16,
    color: "#111111",
    marginRight: 25,
  },
  eventTimeSelect: {
    flex: 1,
    paddingLeft: 20,
    paddingVertical: 10,
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    borderRadius: 5,
  },
  eventTimeSelectButton: {
    paddingRight: 15,
    paddingLeft: 25,
  },
  eventDescriptionInput: {
    fontFamily: "SFProTextLight",
    fontSize: 16,
    color: "#222222",
    alignSelf: "stretch",
    paddingVertical: 3,
  },
  eventDescriptionText: {
    marginTop: 20,
    fontFamily: "SFProTextMedium",
    fontSize: 16,
    marginBottom: 5,
    color: "#222222",
  },
  eventAddEventButtonText: {
    fontFamily: "SFProTextSemibold",
    fontSize: 24,
    color: "#FFFFFF",
    alignSelf: "center",
    marginHorizontal: "auto",
  },
  eventAddEventButtonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#343950",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 20,
  },
  eventAttachButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#52555B",
    borderRadius: 5,
    paddingLeft: 10,
    paddingVertical: 7,
    paddingRight: 13,
    alignSelf: "center",
  },
  eventAttachButtonText: {
    fontFamily: "SFProTextLight",
    fontSize: 12,
    color: "#FFFFFF",
    marginLeft: 5,
  },
});

export default styles;
