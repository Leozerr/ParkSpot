// import { StyleSheet, Text, View, useWindowDimensions, TouchableWithoutFeedback } from 'react-native'
// import React, { useCallback, forwardRef, useImperativeHandle } from 'react'
// import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated'

// export const BottomSheet = forwardRef(({activeHeight}, ref) => {
//   const height = useWindowDimensions().height;
//   const newActiveHeight = height - activeHeight;
//   const topAnimation = useSharedValue(height);
//   const animationStyle = useAnimatedStyle(() => {
//     const top = topAnimation.value;
//     return {
//       top,
//     };
//   });

//   const expand = useCallback(() => {
//     topAnimation.value = withSpring(newActiveHeight, {
//       damping: 100,
//       stiffness: 400,
//     });
//   }, []);
  
//   const close = useCallback(() => {
//     topAnimation.value = withSpring(height, {
//       damping: 100,
//       stiffness: 400,
//     });
//   }, []);

//   useImperativeHandle(
//     ref, 
//     () => ({
//       expand, close,
//     }), 
//     [expand, close],
//   );

//   return (
//     <>
//     {/* <TouchableWithoutFeedback>
//       <View style={styles.backDrop} />
//     </TouchableWithoutFeedback> */}
//       <Animated.View style={[styles.container, animationStyle]}>
//         <View style={styles.lineContainer}>
//           <View style={styles.line} />

//         </View>
//       </Animated.View>
//     </>
//   );
// });

// export default BottomSheet

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#E35205",
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     borderTopRightRadius: 25,
//     borderTopLeftRadius: 25,
//   },
//   lineContainer: {
//      marginVertical: 10,
//      alignItems: 'center',
//   },
//   line: {
//     width: 75,
//     height: 5,
//     backgroundColor: '#EFF3F8',
//     borderRadius: 2,
//   },
//   backDrop: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     display: 'none',
//   },
// })

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
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeaderLoggedIn />
        <Button title="open" onPress={() => {
          openHandler();
        }}/>
        <Button title="close" onPress={() => {
          closeHandler();
        }}/>
        <ShowMap />
        <BottomSheet activeHeight={height*0.7} ref={bottomSheetRef} />
      </SafeAreaView>
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