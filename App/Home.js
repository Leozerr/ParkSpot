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
import { BottomSheet } from "./BottomSheet.js";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomHeaderLoggedOut } from "./LoggedOutComponents.js";
import { CustomHeaderLoggedIn } from "./LoggedInComponents.js";


export function HomeScreen() {
  const navigation = useNavigation();
    // const sheetRef = useRef(null);

    // useEffect(() => {
    // if (sheetRef.current) {
    //     sheetRef.current.open();
    // }
    // }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <CustomHeaderLoggedOut/>
                <ShowMap/>
                <BottomSheet />
            </View>
            
        </GestureHandlerRootView>

        // <View style={{ flex: 1 }}>
        //     <ShowMap/>
        //     <Button
        //         title="Open Bottom Sheet"
        //         onPress={() => {
        //             if (sheetRef.current) {
        //             sheetRef.current.open();
        //             }
        //         }}
        //     />
        //     <RBSheet
        //         ref={sheetRef}
        //     >
        //         <BottomSheet/>
        //         {/* <Text>Bottom Sheet Content</Text> */}
        //     </RBSheet>
        // </View>
        
  );
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#111',
      alignItems: "center",
      justifyContent: "center",
      //height: 1000,
      //borderRadius: 25,
    },
});

export default HomeScreen;

