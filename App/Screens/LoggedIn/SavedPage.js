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

  

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Saved Places</Text>
        <View style={styles.items}>
          {/* This is where the Saved Places wil go */}
          {placeItems.map((item, index) => {
            return <Places key={index} text={item.name} />;
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
