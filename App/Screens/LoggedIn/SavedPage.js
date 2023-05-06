import React, { FC, ReactElement, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function SavedScreen(props) {
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
        This is Saved Page
      </Text>
    </View>
  );
}

export default SavedScreen;