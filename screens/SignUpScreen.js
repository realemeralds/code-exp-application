import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SignInScreen</Text>
      <Button title="Click Here" onPress={() => alert("Button Cliked")} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
});
