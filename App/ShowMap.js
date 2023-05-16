import React, { FC, useCallback, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { Button, StyleSheet, Image, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { markers } from "../model/mapData.js";
import * as Location from "expo-location";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "./BottomSheet.js";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 210;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

// api key = "AIzaSyCC2ONx9Tr4pzoiW4mDGBa8yJYXjTZ8Tx0"

export function ShowMap() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [location]);

  // console.log({ location });
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  // console.log(location);
  // console.log(location.coords.latitude + "", location.coords.longitude + "");
  const mapRef = useRef(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  const initialMapState = {
    markers,
  };
  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });
  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const a = true;

  const { height } = useWindowDimensions();
  const bottomSheetRef = useRef();

  const pressHandler = useCallback(() => {
    bottomSheetRef.current.expand();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* <GestureHandlerRootView> */}

      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        ref={mapRef}
        initialRegion={{
          latitude: 13.727156,
          longitude: 100.77485,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          ></Marker>
        )} */}
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../Image/parkpin.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="search here"
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          style={{ flex: 1, paddingLeft: 10 }}
        />
        <Ionicons name="ios-search" size={29} />
      </View>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />

            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              {/* <TouchableOpacity style={styles.card} onPress={handleButtonPress}>
                <Text>Click me to show bottom sheet</Text>
              </TouchableOpacity> */}
              {/* {bottomSheetVisible && <BottomSheet />}{" "} */}
              {/* show BottomSheet if bottomSheetVisible is true */}
              {/* <BottomSheet /> */}
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    borderColor: "#FF6347",
                    borderWidth: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#FF6347",
                    },
                  ]}
                >
                  View
                </Text>
              </TouchableOpacity>

              <GestureHandlerRootView style={{ flex: 1 }} />

              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
              <Text numberOfLines={1} style={styles.cardSubDescription}>
                {marker.sub_description}
              </Text>
            </View>
          </View>
        ))}

        {/* <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheet />
        </GestureHandlerRootView> */}
      </Animated.ScrollView>

      {/* <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Button title="Blank" onPress={() => pressHandler()} />
          <Button title="Example 1" onPress={() => pressHandler2()} />
          <Button title="Example 2" onPress={() => pressHandler3()} />
          <BottomSheet
            ref={bottomSheetRef}
            activeHeight={height * 0.5}
            backgroundColor={"white"}
            backDropColor={"black"}
          />
          <BottomSheet
            ref={bottomSheetRef2}
            activeHeight={height * 0.5}
            backgroundColor={"#D           backDropColor={"black"}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View style={styles.imageContaier}>
                <Image
                  source={require("../assets/icon.png")}
                  style={styles.image}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Royal Palm Sofa</Text>
                <Text style={styles.text}>
                  Vissle dark Blue/Kabusa dark Navy
                </Text>
                <Text style={styles.textPrice}>Price: $100</Text>
              </View>
              <View>
                <View>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>ADD TO CHART</Text>
                  </View>
                </View>
              </View>
            </View>
          </BottomSheet>
          <BottomSheet
            ref={bottomSheetRef3}
            activeHeight={height * 0.5}
            backgroundColor={"#FFFFFF"}
            backDropColor={"black"}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View style={styles.textContainer}>
                <Text style={styles.textExample2}>Good Evening</Text>
                <Text style={styles.textExample2}>Everyday is a good day</Text>
              </View>
              <View style={styles.imageContaierExample2}>
                <Text style={styles.textExample2}>Recommend</Text>
                <Image
                  source={require("../assets/icon.png")}
                  style={styles.imageExample2}
                />
              </View>
            </View>
          </BottomSheet>
        </SafeAreaView>
      </GestureHandlerRootView> */}
    </View>
  );
}

export default ShowMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 10 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    marginBottom: 20,
    elevation: 2,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 30,
    // marginTop: 5,
    fontWeight: "bold",
    color: "#E35205",
  },
  cardDescription: {
    alignSelf: "flex-end",
    fontSize: 30,
    color: "#E35205",
  },
  cardSubDescription: {
    alignSelf: "flex-end",
    fontSize: 15,
    color: "#676666",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 40,
    height: 40,
  },
  button: {
    // alignItems: "center",
    // // marginTop: 10,
    // backgroundColor: "black",
    // borderRadius: 30,
    width: "40%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  signIn: {
    width: "40%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
