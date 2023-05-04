// import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import React, { FC, ReactElement, useState, useRef, useEffect } from "react";
// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

// const { screenHeight } = Dimensions.get("window");

// export const BottomSheet =() => {
//     const translateY = useSharedValue(0)

//     const gesture = Gesture.Pan().onUpdate((event) => {
//         translateY.value = event.translationX
//     });

//     const rBottomSheetStyle = useAnimatedStyle(() => {
//         //'worklet';
//         return {
//             transform: [{ translateY: translateY.value }],

//         };
//     });


//     return(
//         <GestureDetector gesture={gesture}>
//             <Animated.View style={[ styles.bottomSheetContainer, {top: sheetHeight}, rBottomSheetStyle ]}>
//                 <View style={styles.line} />
//                 <Text>Bottomdgsd</Text>
//             </Animated.View>
//         </GestureDetector>
//     );
// }

// const styles = StyleSheet.create({
//     bottomSheetContainer: {
//         height: screenHeight,
//         width: '100%',
//         backgroundColor: 'white',
//         position: 'absolute',
//         top: screenHeight * 0.66,
//         borderRadius: 25,
//     },
//     line: {
//         width: 75,
//         height: 4,
//         backgroundColor: 'grey',
//         alignSelf: 'center',
//         marginVertical: 15,
//         borderRadius: 2,
//     },
// });

// export default BottomSheet;

import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { FC, ReactElement, useState, useRef, useEffect } from "react";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const ScreenHeight = Dimensions.get("screen").height;

export const BottomSheet = () => {
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan().onUpdate((event) => {
    translateY.value = event.translationX
    console.log(ScreenHeight);
  });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    //'worklet';
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[ styles.bottomSheetContainer, rBottomSheetStyle ]}>
        <View style={styles.line} />
        <Text>Bottom Sheet</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: ScreenHeight,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: ScreenHeight / 1.5,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
