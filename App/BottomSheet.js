import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { FC, ReactElement, useState, useRef, useEffect } from "react";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const ScreenHeight = Dimensions.get("screen").height;

export const BottomSheet = () => {
  const translateY = useSharedValue(0);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -ScreenHeight);
    })
    .onEnd(() => {
      if (translateY.value > -ScreenHeight / 3) {
        //translateY.value = withTiming(-ScreenHeight+(ScreenHeight/1.2));
        translateY.value = withTiming(0);
      }
      // else if (translateY.value < -ScreenHeight / 3 && translateY.value > -ScreenHeight / 1.5) {
      //   translateY.value = withTiming(ScreenHeight-1500);
      // }
      else if (translateY.value < -ScreenHeight / 3) {
        translateY.value = withTiming(-ScreenHeight+(ScreenHeight/3))
        //console.log(ScreenHeight-990);
      }
    });

    useEffect(() => {
      translateY.value = withTiming(-ScreenHeight / 1.5);
    }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    //'worklet';
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[ styles.bottomSheetContainer, rBottomSheetStyle ]}>
        <View style={styles.header}>
          <View style={styles.line} />
          <Text style={styles.headerText}>J Canteen</Text>
          <Text style={styles.slotText}>Available 9 slots</Text>
        </View>

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
    top: ScreenHeight,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 5,
    backgroundColor: '#EFF3F8',
    alignSelf: 'center',
    marginVertical: 12,
    borderRadius: 2,
  },
  header: {
    width: "100%",
    height: 100,
    backgroundColor: '#E35205',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerText: {
    fontSize: 19,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: 'white',
    paddingLeft: 20,
    
  },
  slotText: {
    fontSize: 17,
    lineHeight: 25,
    letterSpacing: 0.25,
    color: '#DADADA',
    paddingLeft: 20,
  }
});

export default BottomSheet;
