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
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import api from "../../../api/api.js";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function ResetPasswordScreen(props) {
  const { onPress, title = "Submit" } = props;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const route = useRoute();
  const { email } = route.params;
  const navigation = useNavigation();

  const validateForm = () => {
    const errors = {};

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/\d/.test(password)) {
      errors.password = "Password must contain at least one numerical digit";
    }

    if (confirmPassword.trim().length === 0) {
      errors.confirm = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      errors.confirm = "Passwords do not match";
    }

    return errors;
  };

  const handleResetPassword = async (event) => {
    // Validate password and confirm password match here
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
      const response = await axios.patch(api.backend_URL + '/update/users/password/' + email, {
        newPassword: password
      });
      console.log(response.data.message); // Handle the response as needed
      Alert.alert("Reset Password Succussfully", "The password has reset.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Reset Password error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ server: error.response.data.message });
      } else if (error.message) {
        setErrors({ server: error.message });
      } else {
        setErrors({ server: "An error occurred during reset password" });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reset Password</Text>
      <Text style={styles.fieldText}>New Password</Text>
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
        value={confirmPassword}
        placeholder={"Confirm Password"}
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {errors.confirm && <Text style={styles.errorText}>{errors.confirm}</Text>}
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
