import React, { FC, ReactElement, useState, useRef, useEffect } from "react";
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


export function SignInDrawer() {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        width: "60%",
        height: 45,
        backgroundColor: "#DB7038",
        marginBottom: 40,
      }}
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={{ fontWeight: "bold", color: "#fff" }}>Sign In</Text>
    </Pressable>
  );
}

export function LoginButton() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Login")}>
      <Text style={{ right: 20, fontSize: 18, fontWeight: "bold", width: 60 }}>
        Sign In
      </Text>
    </Pressable>
  );
}

export function DrawerButtonLoggedOut() {
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

export function CustomHeaderLoggedOut() {
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
      <DrawerButtonLoggedOut />
      <Image
        source={require("../../Image/logo.png")}
        style={{ width: 100, height: 25 }}
      />
      <LoginButton />
    </View>
  );
}

export default CustomHeaderLoggedOut;
