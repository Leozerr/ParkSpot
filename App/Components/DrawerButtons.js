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

export function LogOutDrawer() {
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
      }}
      onPress={() => {}}
    >
      <Text style={{ fontWeight: "bold", color: "#fff" }}>Sign Out</Text>
    </Pressable>
  );
}

export function ProfileDrawer() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        marginBottom: 80,
        marginTop: 20,
      }}
    >
      <Image
        style={{
          width: 55,
          height: 55,
          marginRight: 15,
        }}
        source={require("../../Image/profilepic.png")}
      />
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
          Joshua Daniel Sevilla
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#DADADA",
            textDecorationLine: "underline",
          }}
        >
          62011127@kmitl.ac.th
        </Text>
      </View>
    </View>
  );
}

export default SignInDrawer;
