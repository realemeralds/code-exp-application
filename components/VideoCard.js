// Basic react components
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

// Linking
import * as Linking from "expo-linking";

import styles from "../styles";

import * as Animatable from "react-native-animatable";

export default function VideoCard({
  index,
  link,
  source,
  type,
  typeColor,
  backgroundColor,
  header,
  description,
}) {
  return (
    <Animatable.View animation="fadeInUp" duration={1000} delay={index * 100}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => Linking.openURL(link)}
        style={[
          styles.libraryButton,
          {
            borderLeftWidth: 6,
            borderColor: typeColor,
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            backgroundColor: backgroundColor,
            elevation: 2,
          },
        ]}
      >
        <View style={styles.libraryImageContainer}>
          <Image
            style={styles.libraryImage}
            source={source}
            defaultSource={require("../assets/videoplaceholder.jpg")}
          />
        </View>
        <View
          style={[
            styles.libraryDocumentaryWrapper,
            { backgroundColor: typeColor },
          ]}
        >
          <Text style={styles.libraryDocumentaryText}>{type}</Text>
        </View>
        <Text style={styles.libraryHeader} numberOfLines={2}>
          {header}
        </Text>
        <Text style={styles.libraryDescription} numberOfLines={3}>
          {description}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}
