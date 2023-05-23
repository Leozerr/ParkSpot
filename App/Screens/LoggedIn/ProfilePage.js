import React, { FC, ReactElement, useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import { styles } from "../LoggedOut/Register";
import * as ImagePicker from "expo-image-picker";
import { ProfileImageContext } from "../../ProfileImageContext";
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;
import axios from "axios";
import api from "../../../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ProfileScreen() {
  //const [name, setName] = useState("Somchai");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
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
          <Image source={profileImage} style={profileStyles.profileImage} />
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
        value={user && user.username ? user.username : "Loading.."}
        onChangeText={(text) => setName(text)}
        autoCapitalize={"none"}
      />
      <Text style={styles.fieldText}>Password</Text>
      <TextInput
        style={profileStyles.profile}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable style={styles.button} onPress={() => {}}>
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
});
export default ProfileScreen;