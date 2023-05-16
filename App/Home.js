import React, {
  FC,
  ReactElement,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Image,
  TextInput,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
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
import { BottomSheet } from "./BottomSheet.js";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function HomeScreen() {
  const { height } = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const openHandler = useCallback(() => {
    bottomSheetRef.current.expand();
  }, []);
  const closeHandler = useCallback(() => {
    bottomSheetRef.current.close();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Button
          title="open"
          onPress={() => {
            openHandler();
          }}
        />
        <Button
          title="close"
          onPress={() => {
            closeHandler();
          }}
        />
        <ShowMap />
        <BottomSheet activeHeight={height * 0.5}  ref={bottomSheetRef} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export function LoginButton() {
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
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    //height: 1000,
    //borderRadius: 25,
  },
});

export default HomeScreen;
