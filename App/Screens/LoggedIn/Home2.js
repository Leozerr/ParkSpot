import React, { FC, ReactElement, useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  useWindowDimensions,
} from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { ShowMap } from "../../Components/ShowMap.js";
import { BottomSheet, rBottomSheetStyle } from "../../Components/BottomSheet.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomHeaderLoggedIn } from "../../Components/HeaderLoggedIn.js";


export function HomeScreenLoggedIn() {
  const navigation = useNavigation();
  const {height} = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const openHandler = useCallback(
    () => {
      bottomSheetRef.current.expand()
    }, []);
  const closeHandler = useCallback(
    () => {
      bottomSheetRef.current.close()
    }, []);


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
        <BottomSheet activeHeight={height*0.5} ref={bottomSheetRef} />
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
