import React, { FC, ReactElement, useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import { styles } from "../LoggedOut/Register";
import ImagePicker from "react-native-image-picker";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function ProfileScreen(props) {
  const [name, setName] = useState("Somchai");
  const [password, setPassword] = useState("SomePasswordIDK");
  const [profileImage, setProfileImage] = useState(
    require("../../../Image/profilepic.png")
  );

  const handleImageChange = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image picker error:", response.error);
      } else {
        setProfileImage({ uri: response.uri });
      }
    });
  };

  return (
    <View
      style={{
        height: ScreenHeight,
        width: ScreenWidth,
        backgroundColor: "#FFF",
      }}
    >
      <Text style={styles.headerText}>My Profile</Text>
      <TouchableOpacity onPress={handleImageChange}>
        <Image style={profileStyles.profileImage} source={profileImage} />
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
        value={name}
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
        <Text style={styles.text}>Save</Text>
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
