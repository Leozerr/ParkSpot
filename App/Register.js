import React, { FC, ReactElement, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export const RegisterScreen = (props) => {
  const { onPress, title = "Sign up" } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  return (
    <View
      style={{
        height: ScreenHeight,
        width: ScreenWidth,
        // position: "absolute",
        // top: 200,
        // left: 20,
        // right: 0,
        // bottom: 0,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <Text style={styles.headerText}>Sign Up to KMITL Parking</Text>
      <Text style={styles.fieldText}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Username"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
      />
      <Text style={styles.fieldText}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder={"Email"}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize={"none"}
      />
      <Text style={styles.fieldText}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.fieldText}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmpassword}
        placeholder={"Confirm Password"}
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

//Style
export const styles = StyleSheet.create({
  input: {
    top: 200,
    left: (ScreenWidth-340)/2,
    //alignItems: "center",
    //justifyContent: "center",
    height: 45,
    width: 340,
    borderRadius: 14,
    paddingLeft: 10,
    backgroundColor: "#EFF3F8",
  },

  button: {
    top: 200,
    left: (ScreenWidth-340)/2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 14,
    height: 45,
    width: 340,
    elevation: 3,
    backgroundColor: "#E35205",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  fieldText: {
    top: 200,
    left: (ScreenWidth-340)/2,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#343434",
    marginTop: 10,
    marginBottom: 5,
  },

  headerText: {
    left: (ScreenWidth-340)/2,
    marginTop: 30,
    marginBottom: -150,
    fontSize: 19,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#343434",

  },
});

export default RegisterScreen;
