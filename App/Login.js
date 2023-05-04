import React, { FC, ReactElement, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import { RegisterScreen } from "./Register.js";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function LoginScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onPress, title = "Sign in" } = props;
  const navigation = useNavigation();
  console.log(ScreenHeight);
  return (
    <View
      style={{
        height: ScreenHeight,
        width: ScreenWidth,
        backgroundColor: "#FFF",
      }}
    >
      <Text style={styles.headerText}>Sign In to KMITL Parking</Text>
      <Text style={styles.fieldText}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Username"}
        onChangeText={(text) => setUsername(text)}
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
      <Text
        style={{
          fontWeight: "bold",
          color: "#343434",
          textDecorationLine: "underline",
          top: 210,
          textAlign: "right",
          right: 25,
        }}
        // NAGIVATE TO FORGOT PASSWORD onPress={() => {}}
      >
        Forgot Password
      </Text>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>

      <Text style={styles.dontHaveText}>
        Not have account?{" "}
        <Text
          style={{ color: "#343434", textDecorationLine: "underline" }}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Sign up here
        </Text>
      </Text>
    </View>
  );
}

//Style
export const styles = StyleSheet.create({
  input: {
    top: 200,
    left: (ScreenWidth-340)/2,
    //alignItems: "center",
    //justifyContent: "center",
    height: 40,
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

  dontHaveText: {
    color: "#999",
    fontWeight: "bold",
    marginTop: 230,
    textAlign: "center",
  },
});

export default LoginScreen;
