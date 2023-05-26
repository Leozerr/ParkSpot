import React, {
  FC,
  ReactElement,
  useState,
  useContext,
  useEffect,
} from "react";

import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import Places from "./Places";
import { SavePlaceContext } from "../../SavePlaceContext";
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;
import axios from "axios";
import api from "../../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { onMarkerPress } from "../../Components/ShowMap.js"

export function SavedScreen() {
  const { placeItems, setPlaceItems } = useContext(SavePlaceContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem("userToken");
        const response = await axios.get(api.backend_URL + "/fav/" + email);
        const data = response.data;
        setPlaceItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handlePlacePress = (item) => {
    // Handle the place press event here
    onMarkerPress(item, mapEventData);
    // setClicked(false);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Saved Places</Text>
        <View style={styles.items}>
          {/* This is where the Saved Places wil go */}
          {placeItems.map((item, index) => {
            return <Places key={index} text={item.name} onPress={() => handlePlacePress(item)} />;
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
