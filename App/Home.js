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
import { ShowMap } from "./ShowMap.js";


export function HomeScreen() {
  return (
    <View>
      <LoginButton />
      <RegisterButton />
      
    </View>
  );
}
function LoginButton() {
  const navigation = useNavigation();

  return <Button title="Login" onPress={() => navigation.navigate("Login")} />;
}

function RegisterButton() {
  const navigation = useNavigation();

  return (
    <Button title="Register" onPress={() => navigation.navigate("Register")} />
  );
}



export default HomeScreen;