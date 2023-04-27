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
    <View style={{ flex: 1 }}>
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
            source={require("../Image/parkpin.png")}
            style={{ height: 35, width: 35 }}
          />
        </Marker>
      </MapView>
      
    </View>
  );
}

export default ShowMap;
