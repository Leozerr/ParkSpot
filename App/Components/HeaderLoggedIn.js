import React, { FC, ReactElement, useState, useRef, useEffect, useContext} from "react";
import {
  Dimensions,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { ProfileImageContext } from "../ProfileImageContext";

export function ProfilePage() {
  const navigation = useNavigation();
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  return (
    <Pressable
      onPress={() => navigation.navigate("ProfilePage")}
      style={{
        width: 60,
      }}
    >
      <Image
        style={{
          width: 35,
          height: 35,
          borderRadius: 75,
        }}
        source={profileImage}
      />
    </Pressable>
  );
}

export function DrawerButtonLoggedIn() {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.toggleDrawer()}
      style={{
        width: 60,
      }}
    >
      <Image
        style={{
          width: 25,
          height: 25,
          left: 20,
        }}
        source={require("../../Image/drawerIcon.png")}
      />
    </Pressable>
  );
}

export function CustomHeaderLoggedIn() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingTop: 45,
        flexDirection: "row",
        height: 90,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        color: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <DrawerButtonLoggedIn />
      <Image
        source={require("../../Image/logo.png")}
        style={{ width: 100, height: 25 }}
      />
      <ProfilePage />
    </View>
  );
}

export default CustomHeaderLoggedIn;
