import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import styles from "../styles";

import { createStackNavigator } from "@react-navigation/stack";

import VideoCard from "../components/VideoCard";

const Stack = createStackNavigator();

export default function LibraryScreen() {
  const [documentary, setDocumentary] = useState([
    {
      link: "https://youtu.be/jkqB8KRPp9I",
      source: "https://img.youtube.com/vi/jkqB8KRPp9I/hqdefault.jpg",
      type: "Documentary",
      typeColor: "#0CD195",
      header: "Why We Serve - Episode 1",
      description:
        "Tune in to these stories to hear about the challenges of building the Army, Navy and Air Force from scratch.",
    },
    {
      link: "https://youtu.be/r-McdN1P4M0",
      source: "http://img.youtube.com/vi/" + "r-McdN1P4M0" + "/hqdefault.jpg",
      type: "Documentary",
      typeColor: "#0CD195",
      header: "Why We Serve - Episode 2",
      description:
        "Find out more about this shared experience from those who have gone through Basic Military Training.",
    },
    {
      link: "https://youtu.be/vk8FyqlJxvQ",
      source: "http://img.youtube.com/vi/" + "vk8FyqlJxvQ" + "/hqdefault.jpg",
      type: "Documentary",
      typeColor: "#0CD195",
      header: "Why We Serve - Episode 3",
      description:
        "After Basic Military Training, Full-time National Servicemen (NSFs) proceed to take on different roles in the Army, Navy and Air Force. ",
    },
    {
      link: "https://www.youtube.com/watch?v=9c0Fko3xwuk",
      source: "http://img.youtube.com/vi/" + "9c0Fko3xwuk" + "/hqdefault.jpg",
      type: "Documentary",
      typeColor: "#0CD195",
      header: "Why We Serve - Episode 4",
      description:
        'Get to know some of our NSmen in Part 4 of "Why We Serve - Our NS Stories" and find out what it means for them to do what they do.',
    },
    {
      link: "https://www.youtube.com/watch?v=9hZoZQKcUa0",
      source: "http://img.youtube.com/vi/" + "9hZoZQKcUa0" + "/hqdefault.jpg",
      type: "Documentary",
      typeColor: "#0CD195",
      header: "Why We Serve - Episode 5",
      description:
        "In this final episode of “Why We Serve - Our NS Stories”, we spoke to different members of the community to understand their views on NS, and the reason behind their support for NS. This is their story.",
    },
  ]);

  const [webisodes, setWebisodes] = useState([
    {
      link: "https://www.youtube.com/watch?v=9fDvg2Y9OBU&list=PLbOSqJKglMt1CDbVB6uXgsSoo19cbSEyX&index=4",
      source: "http://img.youtube.com/vi/" + "9fDvg2Y9OBU" + "/hqdefault.jpg",
      type: "Webisodes",
      header: "Every Singaporean Son III - Mother's Day",
      description:
        "You've watched the boys going through BMT, now meet the mums whose love and support help to motivate them in their #NationalService journey.",
    },
    {
      link: "https://www.youtube.com/watch?v=gT88GkoB5Vo&list=PLbOSqJKglMt1CDbVB6uXgsSoo19cbSEyX",
      source: "http://img.youtube.com/vi/" + "gT88GkoB5Vo" + "/hqdefault.jpg",
      type: "Webisodes",
      header: "Every Singaporean Son III - 2WO Arun",
      description:
        "Get to know more about 2WO Arun, a Platoon Commander in Dragon Company! ",
    },
    {
      link: "https://www.youtube.com/watch?v=noncJeo36zk&list=PLbOSqJKglMt1CDbVB6uXgsSoo19cbSEyX&index=2",
      source: "http://img.youtube.com/vi/" + "noncJeo36zk" + "/hqdefault.jpg",
      type: "Webisodes",
      header: "Every Singaporean Son III - 3SG Galileo",
      description:
        "Find out how BMTC instructor 3SG Galileo motivates the recruits of Dragon Company and keeps their morale high!",
    },
    {
      link: "https://www.youtube.com/watch?v=wcavy5mJJ9M&list=PLbOSqJKglMt1CDbVB6uXgsSoo19cbSEyX&index=3",
      source: "http://img.youtube.com/vi/" + "wcavy5mJJ9M" + "/hqdefault.jpg",
      type: "Webisodes",
      header: "Every Singaporean Son III - 3SG Fauzi",
      description:
        "Good cop or bad cop? BMT instructor 3SG Fauzi may seem fierce, but he always has his recruits' well-being at heart.",
    },
  ]);

  const [drills, setDrills] = useState([
    {
      link: "https://www.youtube.com/watch?v=3pzwg85caW8&list=PLbOSqJKglMt1CDbVB6uXgsSoo19cbSEyX&index=8",
      source: "http://img.youtube.com/vi/" + "3pzwg85caW8" + "/hqdefault.jpg",
      type: "Drills",
      header: "Drill: Marksmanship",
      description:
        "What does it take to be a #marksman? Find out more from this video!",
    },
    {
      link: "https://www.youtube.com/watch?v=wZwUWtRnASM",
      source: "http://img.youtube.com/vi/" + "wZwUWtRnASM" + "/hqdefault.jpg",
      type: "Drills",
      header: "Drill: Grenade",
      description:
        "Nervous for your first live grenade throw? Fear not! Click this video to find out more.",
    },
    {
      link: "https://www.youtube.com/watch?v=xl1JWvEACR4&list=PLbOSqJKglMt1CDbVB6uXgsSoo19cbSEyX&index=11",
      source: "http://img.youtube.com/vi/" + "xl1JWvEACR4" + "/hqdefault.jpg",
      type: "Drills",
      header: "Drill: Field Camp",
      description:
        "Going to a field camp for the first time? Learn more about what to expect here.",
    },
    {
      link: "https://www.youtube.com/watch?v=pACSTT3baR8&list=PLbOSqJKglMt1CDbVB6uXgsSoo19cbSEyX&index=9",
      source: "http://img.youtube.com/vi/" + "pACSTT3baR8" + "/hqdefault.jpg",
      type: "Drills",
      header: "Drill: Enlistment",
      description:
        "Getting the Tekong buzzcut, meeting your BMT buddy — learn more about enlistment day with REC Isaac and the rest of the Dragon Company recruits!",
    },
  ]);

  const renderItem = ({ item, index }) => {
    const source = {
      uri: item.source,
    };
    const typeColor =
      item.type === "Documentary"
        ? "#0CD195"
        : item.type === "Webisodes"
          ? "#1FC3D2"
          : "#F5C978";
    const backgroundColor =
      item.type === "Documentary"
        ? "#C8F8EB"
        : item.type === "Webisodes"
          ? "#E1E8FF"
          : "#EFDFC8";

    return (
      <VideoCard
        index={index}
        link={item.link}
        source={source}
        type={item.type}
        typeColor={typeColor}
        backgroundColor={backgroundColor}
        header={item.header}
        description={item.description}
      />
    );
  };
  const [currentType, setCurrentType] = useState(documentary);
  const typeArray = ["Documentary", "Webisodes", "Drills"];
  const typeColorArray = ["#0CD195", "#1FC3D2", "#F5C978"];
  const backgroundColorArray = ["#C8F8EB", "#E1E8FF", "#EFDFC8"];

  return (
    <SafeAreaView style={styles.libraryContainer}>
      <Text
        style={{
          fontFamily: "SFProTextMedium",
          fontSize: 20,
          color: "#111111",
        }}
      >
        Filters
      </Text>
      <View
        style={{
          backgroundColor: "#FCFCFC",
          borderRadius: 40,
          paddingVertical: 8,
          paddingHorizontal: 3,
          flexDirection: "row",
        }}
      >
        {typeColorArray.map((element, index) => {
          const changeFlatList = (index) => {
            index === 0
              ? setCurrentType(documentary)
              : index === 1
              ? setCurrentType(webisodes)
              : setCurrentType(drills);
          };

          return (
            <TouchableOpacity
              style={{
                backgroundColor: backgroundColorArray[index],
                paddingHorizontal: 10,
                paddingVertical: 10,
                marginHorizontal: 7,
                borderRadius: 20,
              }}
              onPress={() => changeFlatList(index)}
              key={typeArray[index]}
            >
              <Text style={{ fontFamily: "SFProTextMedium", fontSize: 12 }}>
                {typeArray[index]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        data={currentType}
        renderItem={renderItem}
        keyExtractor={(item) => item.header}
        showsVerticalScrollIndicator={false}
        ListFooterComponentComponent={<View />}
        contentContainerStyle={{ paddingBottom: 40 }}
        initialScrollIndex={0}
      />
    </SafeAreaView>
  );
}
