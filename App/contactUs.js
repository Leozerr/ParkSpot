import React, { FC, ReactElement, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import { styles } from "./Login.js";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function ContactUsScreen(props) {
  return (
    <View
      style={{
        height: ScreenHeight,
        width: ScreenWidth,
        backgroundColor: "#FFF",
      }}
    >
      <Text
        style={{
          left: (ScreenWidth - 340) / 2 - 20,
          marginTop: 30,
          fontSize: 19,
          fontWeight: "bold",
          color: "#343434",
        }}
      >
        Contact Us
      </Text>
      <Text
      style={{
        left: (ScreenWidth - 340) / 2,
        marginTop: 30,
        fontSize: 15,
        fontWeight: "bold",
        color: "#A5A5A5",
      }}
      >
        Email
      </Text>
      <Text
        style={{
          left: (ScreenWidth - 340) / 2,
          width: 290,
          marginTop: 30,
          fontSize: 19,
          fontWeight: "bold",
          color: "#343434",
        }}
      >
        smartparking@kmitl.ac.th
      </Text>
      <Text
      style={{
        left: (ScreenWidth - 340) / 2,
        marginTop: 30,
        fontSize: 15,
        fontWeight: "bold",
        color: "#A5A5A5",
      }}
      >
        Address
      </Text>
      <Text
        style={{
          left: (ScreenWidth - 340) / 2,
          marginTop: 30,
          fontSize: 19,
          fontWeight: "bold",
          color: "#343434",
          width: 276,
        }}
      >
        1 Chalong Krung, 1 Alley, Lat Krabang, Bangkok 10520
      </Text>
    </View>
  );
}

export default ContactUsScreen;
