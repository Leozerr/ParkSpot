import React, { FC, ReactElement, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import Places from "./Places";
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function SavedScreen() {
  const [placeItems, setPlaceItems] = useState([]);
  const handleAddPlace = () => {
    setPlaceItems([...placeItems, "J Canteen"]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Saved Places</Text>
        <View style={styles.items}>
          {/* This is where the Saved Places wil go */}
          {placeItems.map((item, index) => {
            return <Places key={index} text={item} />;
          })}
          <Places text={"J Canteen"} />
        </View>
      </View>
      <Button
        onPress={() => handleAddPlace()}
        title="Add Place"
        color="#f194ff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 50,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  items: {},
});

export default SavedScreen;
