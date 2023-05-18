import React, { FC, ReactElement, useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
  useWindowDimensions
} from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Image, TextInput } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { RegisterScreen } from "../Screens/LoggedOut/Register";
import { LoginScreen } from "../Screens/LoggedOut/Login.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { markers, mapDarkStyle, mapStandardStyle } from "../../model/mapData";
import { useTheme } from "@react-navigation/native";
import * as Location from "expo-location";
import { fetchtest } from "../../model/mapData";
import BottomSheet from "./BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
const CARD_HEIGHT = 210;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

// api key = "AIzaSyCC2ONx9Tr4pzoiW4mDGBa8yJYXjTZ8Tx0"

export function ShowMap() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  fetchtest;

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

  const {height} = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const openHandler = useCallback(
    () => {
      bottomSheetRef.current.expand()
    }, []);








  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        ref={mapRef}
        initialRegion={{
          latitude: 13.726518,
          longitude: 100.775701,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
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
                  source={require("../../Image/parkpin.png")}
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
          style={{ flex: 1, paddingLeft: 10, fontWeight: "bold" }}
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
                  {/* //Name of place */}
                <View style={styles.textContent}>
                  <View style={styles.firstRowTitle}>
                    <Text numberOfLines={1} style={styles.cardtitle}>
                      {marker.title}
                    </Text>
                     {/* //Available amount*/}
                    <Text numberOfLines={1} style={styles.cardDescription}>
                      {marker.description}
                    </Text>
                    <Text numberOfLines={1} style={styles.cardSubDescription}>
                      {marker.sub_description}
                    </Text>
                  </View>
                    <TouchableOpacity
                      onPress={() => {
                        openHandler();
                      }}
                      style={[
                        styles.button,
                        {
                          backgroundColor: "#fff",
                          borderColor: "#E35205",
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: "#E35205",
                            fontSize: 18,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        View
                      </Text>
                    </TouchableOpacity>
                  {/* <GestureHandlerRootView style={{ flex: 1 }} /> */}
                </View>
              </View>
            ))}
          </Animated.ScrollView>
          <BottomSheet activeHeight={height*0.5} ref={bottomSheetRef} />

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
    //backgroundColor: "#E35205",
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
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 2,
    padding: 10,
  },
  firstRowTitle: {
    flexDirection: "col",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardtitle: {
    fontSize: 22,
    //color: "#fff",
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 20,
    fontWeight: "bold",
    //color: "#444",
    color: "#41A317",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    width: "40%",
    height: "90%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    
  },
});
