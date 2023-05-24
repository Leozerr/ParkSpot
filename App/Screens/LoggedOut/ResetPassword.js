import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import axios from "axios";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function ResetPasswordScreen(props) {
  const { onPress, title = "Submit" } = props;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    // Validate password and confirm password match here

    try {
      const response = await axios.post("/api/reset-password", {
        password,
        confirmPassword,
      });
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error); // Handle any errors that occurred during the request
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reset Password</Text>
      <Text style={styles.fieldText}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        autoCapitalize="none"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.fieldText}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        autoCapitalize="none"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Pressable style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  input: {
    top: 200,
    left: (ScreenWidth - 340) / 2,
    height: 45,
    width: 340,
    borderRadius: 14,
    paddingLeft: 10,
    backgroundColor: "#EFF3F8",
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
  button: {
    top: 200,
    left: (ScreenWidth - 340) / 2,
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
});
