import React, { FC, ReactElement, useState } from "react";
import { View, Text, Pressable } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Image, TextInput } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { RegisterScreen } from "./Register.js";
import { LoginScreen } from "./Login.js";


export function ShowMap() {
  // const [pin, setPin] = React.useState({
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  // });
  const [region, setRegion] = React.useState({
    latitude: 13.727156,
    longitude: 100.77485,
  });
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <MapView
          style={{ flex: 1 }}
          initialRegion={{
          latitude: 13.727156,
          longitude: 100.77485,
        }}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        >
          <Image
            source={require("../Image/marker1.png")}
            style={{ height: 35, width: 35 }}
          />
        </Marker>
      </MapView>
      
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: "AIzaSyCC2ONx9Tr4pzoiW4mDGBa8yJYXjTZ8Tx0",
          language: "th",
          components: "country:th",
          types: "establishment",
          radius: 30000,
          // location: `${region.latitude}, ${region.longitude}`,
        }}
        style={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { BackgroundColor: "white" },
        }}
      /> */}
    </View>
  );
}

export default ShowMap;