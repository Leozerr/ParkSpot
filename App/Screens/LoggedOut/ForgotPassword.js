import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import api from "../../../api/api.js";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function ForgotPasswordScreen(props) {
  const { onPress, title = "Submit" } = props;
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(api.backend_URL + '/exist/email', {email: email});
      console.log(response.data)
      if (response.data.message == "Email already exist") {
        navigation.navigate("ResetPassword", { email: email });
      } else {
        Alert.alert("Email not found", "The email you entered does not exist.");
      }
    } catch (error) {
      console.error(error); // Handle any errors that occurred during the request
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Forgot Password</Text>
      <Text style={styles.fieldText}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder={"Email"}
        autoCapitalize={"none"}
        value={email}
        onChangeText={setEmail}
      />
      <Pressable style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
      <Text style={styles.noteText}>
        Please enter the email associated with your account.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  input: {
    top: 240,
    left: (ScreenWidth - 340) / 2,
    height: 45,
    width: 340,
    borderRadius: 14,
    paddingLeft: 10,
    backgroundColor: "#EFF3F8",
  },
  fieldText: {
    top: 240,
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
  noteText: {
    fontWeight: "bold",
    color: "#999",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    textAlign: "center",
  },
  button: {
    top: 240,
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
