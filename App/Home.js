import React, { FC, ReactElement, useState, useRef, useEffect } from "react";
import { View, Text, Pressable, Button, StyleSheet, Image, TextInput } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
//import { PanGestureHandler } from "react-native-gesture-handler";
//import { useGestureHandlerRef } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import { RegisterScreen } from "./Register.js";
import { LoginScreen } from "./Login.js";
import { ShowMap } from "./ShowMap.js";


export function HomeScreen() {
    const sheetRef = useRef(null);

    useEffect(() => {
    if (sheetRef.current) {
        sheetRef.current.open();
    }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ShowMap/>
            <Button
                title="Open Bottom Sheet"
                onPress={() => {
                    if (sheetRef.current) {
                    sheetRef.current.open();
                }
            }}
                />
            <RBSheet
                ref={sheetRef}
            >
                <Text>Bottom Sheet Content</Text>
            </RBSheet>
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

const styles = StyleSheet.create({
    bottomSheetContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
});

export default HomeScreen;

