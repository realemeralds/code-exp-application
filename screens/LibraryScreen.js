import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import styles from "../styles";

export default function LibraryScreen() {
  // Data to be fetched from the API
  const DATA = [
    {
      id: "asdas",
      title: "First Item",
      duration: "2 mins",
      description: "abcdefg..."
    },
    {
    
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      duration: "2 mins",
      description: "abcdefg..."
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      duration: "2 mins",
      description: "abcdefg..."
    },
  ];

  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <View style={{
            flex: 1,
            flexDirection: "row",
            padding: 20,
            borderLeftWidth: 6,
            borderColor: "#a361eb",
            marginVertical: 16,
            marginHorizontal: 20,
            backgroundColor: "#edddfe",
            alignItems: "center",
            justifyContent: "flex-start",
          }}>
            <Image style={styles.image} source={{uri:"https://picsum.photos/200", width:100,height:80 }}/>
            <View style={{marginLeft: 8, flex: 1, justifyContent: "space-evenly", flexDirection: "column",}}>
              <Text style={{fontSize: 10}}>Video Title: {item.title}</Text>
              <View style={{flexDirection: "row",}}>
                <Image source={{uri:"https://picsum.photos/200"}} style={{width: 20, height: 20, borderRadius: 20/ 2, marginRight: 4}}></Image>
                <Text style={{fontSize: 10, marginTop: 2}}>commander</Text>
              </View>
              <Text style={{fontSize: 10}}>Duration: {item.duration}</Text>
              <Text style={{fontSize: 10}}>Description: {item.description}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
