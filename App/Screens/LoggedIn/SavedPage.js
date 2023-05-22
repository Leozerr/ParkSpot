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
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          backgroundColor: "black",
          left: 40,
          right: 40,
          height: 80,
          marginTop: 30,
          fontSize: 19,
          fontWeight: "bold",
          color: "#343434",
          justifyContent: "center",
          alignItems: '"center',
        }}
      >
        <Text style={{ fontSize: 24 }}> J Canteen </Text>
      </View>
    </View>
  );
}

export default SavedScreen;
