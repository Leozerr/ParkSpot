import { Image, Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, {
  FC,
  ReactElement,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  useCallback,
  forwardRef,
} from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";


const ScreenHeight = Dimensions.get("screen").height;

export const BottomSheet = forwardRef(({ activeHeight }, ref) => {
  const newActiveHeight = ScreenHeight - activeHeight;
  const translateY = useSharedValue(ScreenHeight);
  const animationStyle = useAnimatedStyle(() => {
    const top = translateY.value;
    return {
      top,
    };
  });
  const expand = useCallback(() => {
    translateY.value = withSpring(newActiveHeight, {
      damping: 100,
      stiffness: 400,
    });
  }, []);

  const close = useCallback(() => {
    translateY.value = withSpring(ScreenHeight, {
      damping: 100,
      stiffness: 400,
    });
  }, []);
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -ScreenHeight);
      //console.log(translateY.value)
    })
    .onEnd(() => {
      if (translateY.value > ScreenHeight / 2) {
        //translateY.value = withTiming(-ScreenHeight+(ScreenHeight/1.2));
        translateY.value = withTiming(ScreenHeight);
      }
      // else if (translateY.value < -ScreenHeight / 3 && translateY.value > -ScreenHeight / 1.5) {
      //   translateY.value = withTiming(ScreenHeight-1500);
      // }
      // else if (translateY.value < -ScreenHeight / 3) {
      //   translateY.value = withTiming(-ScreenHeight + ScreenHeight / 3);
      // } 
      else if (translateY.value < ScreenHeight / 2) {
        translateY.value = withTiming(80);
      }
    });

  useEffect(() => {
    translateY.value = withTiming(ScreenHeight);
  }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    //'worklet';
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useImperativeHandle(
    ref,
    () => ({
      expand,
      close,
    }),
    [expand, close]
  );
  
  const [isSaved, setIsSaved] = useState(false);

  const handleButtonPress = () => {
    setIsSaved(!isSaved);
  };

  return (
   //<Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, animationStyle]}>
          <View style={styles.header}>
            <View style={styles.line} />
            <View style={styles.groupHeader}>
              <View style={styles.headerContent}>
                <Text style={styles.headerText}>J Canteen</Text>
                <Text style={styles.slotText}>Available</Text>
              </View>
              <View style={styles.headerRightContent}>
              <TouchableOpacity style={styles.saveButton} onPress={handleButtonPress}>
                <Image
                  source={isSaved ? require("../../Image/unsaveIcon.png") : require("../../Image/saveIcon.png")}
                  style={styles.bookmarkIcon}
                />
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    //</Animated.View>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: ScreenHeight,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    // top: ScreenHeight,
    borderRadius: 25,
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  line: {
    width: 75,
    height: 5,
    backgroundColor: "#EFF3F8",
    alignSelf: "center",
    marginVertical: 12,
    borderRadius: 2,
  },
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#E35205",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerText: {
    fontSize: 19,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    //paddingLeft: 20,
  },
  slotText: {
    fontSize: 17,
    lineHeight: 25,
    letterSpacing: 0.25,
    color: "#DADADA",
    //paddingLeft: 20,
  },
  headerContent: {
    
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerRightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookmarkIcon: {
    width: 35,
    height: 35,
    top: 1,
    //marginLeft: 8,
  },
  saveButton: {
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    alignItems: "center",
    width: 37,
    height: 37,
    
  }
});

export default BottomSheet;