import React, { FC, ReactElement, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { ShowMap } from "./ShowMap.js";
import { BottomSheet } from "./BottomSheet.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomHeaderLoggedIn } from "./HeaderLoggedIn.js";

export function HomeScreenLoggedIn() {
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
        <CustomHeaderLoggedIn />
        <ShowMap />
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
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    //height: 1000,
    //borderRadius: 25,
  },
});

export default HomeScreenLoggedIn;
