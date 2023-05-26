import React, { FC, ReactElement, useState, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import Places from "./Places";
import { SavePlaceContext } from "../../SavePlaceContext";
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function SavedScreen() {
  const { placeItems } = useContext(SavePlaceContext);
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Saved Places</Text>
        <View style={styles.items}>
          {/* This is where the Saved Places wil go */}
          {placeItems.map((item, index) => {
            return <Places key={index} text={item} />;
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  tasksWrapper: {
    //paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    left: (ScreenWidth - 340) / 2 - 20,
    marginTop: 30,
    fontSize: 19,
    fontWeight: "bold",
    color: "#343434",
  },
  items: {},
});

export default SavedScreen;
