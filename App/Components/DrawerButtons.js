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
        marginTop: 200,
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
        marginBottom: 100,
        marginTop: 40,
      }}
    >
      <Image
        style={{
          width: 70,
          height: 70,
          marginRight: 20,
        }}
        source={require("../../Image/profilepic.png")}
      />
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Hello,&nbsp;
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Joshua
        </Text>
        </Text>
        <Text
          style={{
            fontSize: 18,
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
