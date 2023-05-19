import React, { FC, ReactElement, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import axios from "axios";
import api from "../../../api/api";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export const RegisterScreen = (props) => {
  const { onPress, title = "Sign up" } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (username.trim().length === 0) {
      errors.username = "Username is required";
    } else if (username.length > 12) {
      errors.username = "Username must not exceed 12 characters";
    }

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/\d/.test(password)) {
      errors.password = "Password must contain at least one numerical digit";
    }

    if (email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      errors.email = "Invalid email format";
    }

    if (confirmpassword.trim().length === 0) {
      errors.confirm = "Confirm Password is required";
    } else if (password !== confirmpassword) {
      errors.confirm = "Passwords do not match";
    }

    return errors;
  };

  const handleRegistration = async (event) => {
    console.log("Register Clicked");
    console.log(username);
    console.log(email);
    console.log(password);
    if (event) {
      event.preventDefault();
    }

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(api.backend_URL + "/create/users", {
        uname: username,
        email: email,
        password: password,
      });
    } catch (error) {
      // Handle registration error
      console.error("Registration error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ server: error.response.data.message });
      } else if (error.message) {
        setErrors({ server: error.message });
      } else {
        setErrors({ server: "An error occurred during registration" });
      }
    }
  };

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
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}
      <Text style={styles.fieldText}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder={"Email"}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize={"none"}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <Text style={styles.fieldText}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <Text style={styles.fieldText}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmpassword}
        placeholder={"Confirm Password"}
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {errors.confirm && <Text style={styles.errorText}>{errors.confirm}</Text>}
      <Pressable
        style={styles.button}
        onPress={() => {
          handleRegistration();
        }}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

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

  errorText: {
    top: 200,
    left: (ScreenWidth - 340) / 2,
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#FF0000",
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
});

export default RegisterScreen;
