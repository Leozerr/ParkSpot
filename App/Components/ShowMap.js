import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import { StyleSheet, Image, TextInput } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet from "./BottomSheet";
import { Feather } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';

import axios from "axios";
import api from "../../api/api";

import { SearchBox } from "./SearchBox.js";
import List from "./List.js";
// import { DataDisplay } from "../../model/mapData";

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
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [sheet, setSheet] = useState([]);

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
  }, []);

  const initialMapState = {
    markers: [],
  };

  const [state, setState] = useState(initialMapState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api.backend_URL + "/pins");
        const data = response.data;
        setState((prevState) => ({
          ...prevState,
          markers: transformDataToMarkers(data),
        }));
        setData(data);  
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // this.forceUpdate();
    
  }, [data]);

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCurrentLocation(location.coords);
    })();
  }, []);


  const route = useRoute();

  useEffect(() => {
    const { selectedMarkerId } = route.params || {};
    if (selectedMarkerId) {
      setSelectedMarkerId(selectedMarkerId);
    }
  }, []);

  const moveToCurrentLocation = () => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        1000
      );
    }
  };

  const transformDataToMarkers = (data) => {
    return data.map((item) => {
      let description = "";
      if (item.fullSlots == 0 || item.fullSlots === null) {
        description = "N/A";
      } else {
        var free  = item.fullSlots - item.cars
        if (item.cars > item.fullSlots){
          free = 0
        }
        description = free
      }

      return {
        id: item.id,
        coordinate: {
          latitude: item.latitude,
          longitude: item.longitude,
        },
        title: item.name,
        description: description,
        image: item.image,
        symbol: item.symbol,
        camfeed: item.camfeed,
      };
    });
  };

  let text = "Waiting..";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const mapRef = useRef(null);

  const mapAnimation = useRef(new Animated.Value(0)).current;

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

  const [clickedMarkerId, setClickedMarkerId] = useState(null);
  
  const onMarkerPress = useCallback((marker) => {
    const { latitude, longitude } = marker.coordinate || {};
    const markerID = marker.id - 1;

    if (markerID !== clickedMarkerId) {
      setClickedMarkerId(markerID);
    } else {
      setClickedMarkerId(null);
    }

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }
    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });

    if (latitude && longitude) {
      const region = {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      mapRef.current.animateToRegion(region);
    }
  }, []);

  const _map = useRef(null);
  const _scrollView = useRef(null);

  const { height } = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const openHandler = useCallback((marker) => {
    setSheet(marker);
    bottomSheetRef.current?.expand();
    
    //console.log(sheet);
  }, [sheet]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        initialRegion={{
          latitude: location ? location.coords.latitude : 13.726518,
          longitude: location ? location.coords.longitude : 100.775701,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
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
              onPress={() => onMarkerPress(marker)}
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
      <SearchBox
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {clicked && (
        <List
          searchPhrase={searchPhrase}
          data={data}
          setClicked={setClicked}
          handleItemPress={(item) =>
            handleItemPress(item, CARD_WIDTH, _scrollView)
          }
          onMarkerPress={onMarkerPress}
          style={{ zIndex: 3 }}
        />
      )}
      <View style={styles.myLocationButton}>
        <TouchableOpacity onPress={moveToCurrentLocation}>
          <Feather name="navigation" size={24} color="#808080" />
        </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.card}
            key={index}
            onPress={() => {
              openHandler(marker);
            }}
          >
            <Image
              //source={{uri: marker.image}}
              source={
                marker.image
                  ? { uri: marker.image }
                  : require("../../Image/ParkBG.jpg")
              }
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
                {/* <View style={styles.SecondRowTitle}> */}
                <Text
                  numberOfLines={1}
                  style={[
                    styles.cardDescription,
                    // marker.description === "Available" && { color: "#41A317" },
                    // marker.description === "Full" && { color: "red" },
                    // marker.description === "Almost Full" && { color: "#ffcc00" },
                    marker.description && marker.description === "N/A" ? { color: "#808080" } : { color: "#E35205" },
                  ]}
                >
                  {marker.description}
                </Text>
                {/* </View> */}
              </View>
              <Text style={styles.subDescription}>free</Text>
            {/* <GestureHandlerRootView style={{ flex: 1 }} /> */}
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      <BottomSheet
        activeHeight={height * 0.5}
        ref={bottomSheetRef}
        marker={sheet}
      />
    </View>
  );
}

export default ShowMap;


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    //backgroundColor: "#111",
    //flexDirection: "row",
    justifyContent: "space-between",
    flex: 2,
    padding: 10,
  },
  firstRowTitle: {
    //backgroundColor: "#111",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E35205",
  },
  cardDescription: {
    fontSize: 40,
    fontWeight: "bold",
    //backgroundColor: "#111",
    //paddingBottom: 12,
    //paddingTop: 15,
  },
  subDescription: {
    fontSize: 18,
    fontWeight: "bold",
    right: 5,
    alignSelf: "flex-end",
    color: "#808080",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
  },
  marker: {
    width: 35,
    height: 35,
  },
  button: {
    width: "40%",
    height: "90%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  myLocationButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 40,
    width: 40,
    top: "20%", // Adjust the top value as needed
    right: 10,    
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
  },
});
