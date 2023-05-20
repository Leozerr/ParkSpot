import React, { FC, ReactElement, useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions, Alert} from "react-native";
import { RegisterScreen } from "./Register.js";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const Login = async () => {
    console.log("Login pressed");
    console.log(username);
    console.log(password);
    try {
      await axios
        .post("http://10.66.8.190:5001/login", {
          email: username,
          password: password,
        })
        .then((response) => {
          console.log("Login: ", response.data);
          if (response.data.message == "Login Successful") {
            onLogin();
          } else {
            Alert.alert("Sign In Failed", response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        height: ScreenHeight,
        width: ScreenWidth,
        backgroundColor: "#FFF",
      }}
    >
      <Text style={styles.headerText}>Sign In to KMITL Parking</Text>
      <Text style={styles.fieldText}>Email</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Email"}
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
        style={styles.forgotText}
        onPress={() => navigation.navigate("ForgotPassword")}
        // NAGIVATE TO FORGOT PASSWORD onPress={() => {}}
      >
        Forgot Password
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          Login();
        }}
      >
        <Text style={styles.text}>Sign In</Text>
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
    left: (ScreenWidth - 340) / 2,
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
    left: (ScreenWidth - 340) / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
    left: (ScreenWidth - 340) / 2,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#343434",
    marginTop: 10,
    marginBottom: 5,
  },

  headerText: {
    left: (ScreenWidth - 340) / 2,
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

  forgotText: {
    fontWeight: "bold",
    color: "#343434",
    textDecorationLine: "underline",
    top: 210,
    textAlign: "right",
    right: (ScreenWidth - 340) / 2,
  },
});

export default LoginScreen;
