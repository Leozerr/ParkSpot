import React, { FC, ReactElement, useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Pressable, Alert, } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import { styles } from "../LoggedOut/Register";
import * as ImagePicker from "expo-image-picker";
import { ProfileImageContext } from "../../ProfileImageContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import api from "../../../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function ProfileScreen() {
  //const [name, setName] = useState("Somchai");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const validateForm = () => {
    const errors = {};

    if (username.trim().length === "") {
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

    if (confirmPassword.trim().length === 0) {
      errors.confirm = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      errors.confirm = "Passwords do not match";
    }

    return errors;
  };

  const handleChangePassword = async (event) => {
    // Validate password and confirm password match here
    console.log("name:"+username);
    console.log("pw:"+password);
    if (event) {
      event.preventDefault();
    }
    
    if((password || confirmPassword != "") && (username == "")) {
      const formErrors = validateForm();

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      try {
        const email = await AsyncStorage.getItem('userToken');
        const response = await axios.patch(api.backend_URL + '/update/users/password/' + email, {
          newPassword: password
        });
        console.log(response.data.message); // Handle the response as needed
        Alert.alert("Change Password Succussfully", "The password has reset.");
        navigation.navigate("Main");
      } catch (error) {
        console.error("Change Password error:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrors({ server: error.response.data.message });
        } else if (error.message) {
          setErrors({ server: error.message });
        } else {
          setErrors({ server: "An error occurred during change password" });
        }
      }
    }
    else if((username != "") && (password == "" && confirmPassword == ""))  {
      const formErrors = validateForm();

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
      
      try {
        const email = await AsyncStorage.getItem('userToken');
        const response = await axios.patch(api.backend_URL + '/update/users/username/' + email, {
          newUsername: username
        });
        console.log(response.data.message); // Handle the response as needed
        Alert.alert("Change Name Succussfully", "The name has changed.");
        navigation.navigate("Main");
      } catch (error) {
        console.error("Change name error:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrors({ server: error.response.data.message });
        } else if (error.message) {
          setErrors({ server: error.message });
        } else {
          setErrors({ server: "An error occurred during change name" });
        }
      }
    }
    else if(username != "" && password != "" && confirmPassword != "") {
      const formErrors = validateForm();

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
      
      try {
        const email = await AsyncStorage.getItem('userToken');
        const responseName = await axios.patch(api.backend_URL + '/update/users/username/' + email, {
          newUsername: username
        });
        const responsePW = await axios.patch(api.backend_URL + '/update/users/password/' + email, {
          newPassword: password
        });
        console.log(responseName.data.message, responsePW.data.message); // Handle the response as needed
        Alert.alert("Update Succussfully", "The name and password have updated.");
        navigation.navigate("Main");
      } catch (error) {
        console.error("Update error:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrors({ server: error.response.data.message });
        } else if (error.message) {
          setErrors({ server: error.message });
        } else {
          setErrors({ server: "An error occurred during update" });
        }
      }
    }
    else if(username == "" && password == "" && confirmPassword == "") {
      if (event) {
        event.preventDefault();
      }

      const formErrors = validateForm();

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
    }
  };
  
  const uploadImage = async (image) => {
    const email = await AsyncStorage.getItem("userToken");
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        type: image.type,
        name: email + ".jpg",
      });

      const response = await axios.post(
        api.backend_URL + "/uploadimg",
        formData
      );
      console.log("Image uploaded successfully!", response.data);
      const imgDB = await axios.patch(
        api.backend_URL + "/update/image/" + email,
        { img: response.data.imageUrl }
      );
      console.log(imgDB.data.message);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      uploadImage(result.assets[0]);
      setProfileImage(result.assets[0]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem("userToken")
        const response = await axios.get(api.backend_URL+"/users/"+email );
        const data = response.data;
        setUser(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View
      style={{
        height: ScreenHeight,
        width: ScreenWidth,
        backgroundColor: "#FFF",
      }}
    >
      <Text style={styles.headerText}>My Profile</Text>
      <TouchableOpacity onPress={pickImage}>
        {profileImage && (
          <Image
          // source={{ uri: user.image }}
          source={user.image ? { uri: user.image } : require("../../../Image/profilepic.png")}
          style={profileStyles.profileImage}
        />
        )}
        {/* <Image style={profileStyles.profileImage} source={profileImage} /> */}
      </TouchableOpacity>
      <Text
        style={{
          top: 200,
          fontWeight: "bold",
          left: (ScreenWidth - 340) / 2 + 150,
          marginTop: 5,
          marginBottom: 30,
        }}
      >
        Edit
      </Text>
      <Text style={styles.fieldText}>Name</Text>
      <TextInput
        style={profileStyles.profile}
        //value={user && user.username ? user.username : "Loading.."}
        value={user}
        placeholder={user && user.username ? user.username : "Loading.."}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
      />
      <Text style={styles.fieldText}>Password</Text>
      <TextInput
        style={profileStyles.profile}
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
        style={profileStyles.profile}
        value={confirmPassword}
        placeholder={"Confirm Password"}
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {errors.confirm && <Text style={styles.errorText}>{errors.confirm}</Text>}
      <Pressable style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.text}>Update</Text>
      </Pressable>
    </View>
  );
}

export const profileStyles = StyleSheet.create({
  profile: {
    top: 200,
    left: (ScreenWidth - 340) / 2,
    //alignItems: "center",
    //justifyContent: "center",
    height: 45,
    width: 340,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
    fontSize: 18,
    fontWeight: "bold",
  },

  profileImage: {
    top: 200,
    width: 110,
    height: 110,
    borderRadius: 75,
    left: (ScreenWidth - 340) / 2 + 110,
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
});
export default ProfileScreen;