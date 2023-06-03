// import React, {
//   FC,
//   ReactElement,
//   useState,
//   useContext,
//   useEffect,
//   useCallback,
//   useRef,
// } from "react";

// import { View, Text, Pressable, ScrollView } from "react-native";
// import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
// import Places from "./Places";
// import { SavePlaceContext } from "../../SavePlaceContext";
// const ScreenWidth = Dimensions.get("screen").width;
// const ScreenHeight = Dimensions.get("screen").height;
// import axios from "axios";
// import api from "../../../api/api";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useIsFocused } from "@react-navigation/native";
// import { onMarkerPress } from "../../Components/ShowMap";
// import { useNavigation } from "@react-navigation/native";


// // const { width, height } = Dimensions.get("window");
// // const LATITUDE_DELTA = 0.015;
// // const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
// // const CARD_HEIGHT = 210;
// // const CARD_WIDTH = width * 0.8;
// // const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


// export function SavedScreen() {
//   const { placeItems, setPlaceItems } = useContext(SavePlaceContext);
//   const isFocused = useIsFocused();
//   const navigation = useNavigation();
//   // const _scrollView = useRef(null);
//   // const [scrollPosition, setScrollPosition] = useState(0);


//   // const onMarkerPress = useCallback((marker) => {
//   //   const { latitude, longitude } = marker.coordinate || {};
//   //   const markerID = marker.id - 1;
  
//   //   let x = markerID * CARD_WIDTH + markerID * 20;
//   //   if (Platform.OS === "ios") {
//   //     x = x - SPACING_FOR_CARD_INSET;
//   //   }
//   //   _scrollView.current.scrollTo({ x: x, y: 0, animated: false });
  
//   //   if (latitude && longitude && mapRef.current) {
//   //     const region = {
//   //       latitude,
//   //       longitude,
//   //       latitudeDelta: LATITUDE_DELTA,
//   //       longitudeDelta: LONGITUDE_DELTA,
//   //     };
//   //     mapRef.current.animateToRegion(region);
//   //   }
//   // }, []);
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const email = await AsyncStorage.getItem("userToken");
//         const response = await axios.get(api.backend_URL + "/fav/" + email);
//         const data = response.data;
//         setPlaceItems(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     if (isFocused) {
//       fetchData();
//     }
//   }, [isFocused]);

//   // const handleMarkerPress = (item, mapEventData) => {
//   //   // Handle the marker press event here
//   //   navigation.navigate("Home");
//   //   onMarkerPress(mapEventData)
//   //   console.log("Marker pressed:", mapEventData);
//   // };
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const { latitude, longitude } = currentLocation;
//   const handleMarkerPress = useCallback((marker) => {
//     // Handle the marker press event here
//     //navigation.navigate("Home");
//     console.log("Marker pressed:", marker);
//     if (latitude && longitude) {
//       const region = {
//         latitude,
//         longitude,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       };
//       mapRef.current.animateToRegion(region);
//     }
  
//     navigation.navigate('Home', { selectedMarkerId: marker.id });
//   }, []);

  

//   return (
// //     <ScrollView
// //   ref={_scrollView}
// //   horizontal
// //   pagingEnabled
// //   snapToInterval={CARD_WIDTH + 20}
// //   snapToAlignment="center"
// //   contentInset={{
// //     top: 0,
// //     left: SPACING_FOR_CARD_INSET,
// //     bottom: 0,
// //     right: SPACING_FOR_CARD_INSET,
// //   }}
// //   contentContainerStyle={{
// //     paddingHorizontal: Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
// //   }}
// //   onScroll={(event) => {
// //     const contentOffsetX = event.nativeEvent.contentOffset.x;
// //     setScrollPosition(contentOffsetX);
// //   }}
// //   scrollEventThrottle={16}
// // >


//     <View style={styles.container}>
//       <View style={styles.tasksWrapper}>
//         <Text style={styles.sectionTitle}>Saved Places</Text>
//         <View style={styles.items}>
//           {/* This is where the Saved Places wil go */}
//           {/* {placeItems.map((item, index, CARD_WIDTH, _scrollView) => {
//             return <Places key={index} text={item.name} onPress={(item) =>
//               handleMarkerPress(item, CARD_WIDTH, _scrollView)
//             } />; */}
//           {placeItems.map((item, index) => (
//           <Places
//             key={index}
//             text={item.name}
//             onPress={() => handleMarkerPress(item)}
//           />
//           ))}
//         </View>
//       </View>
//     </View>
//     // </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF",
//   },
//   tasksWrapper: {
//     //paddingTop: 30,
//     paddingHorizontal: 20,
//   },
//   sectionTitle: {
//     left: (ScreenWidth - 340) / 2 - 20,
//     marginTop: 30,
//     fontSize: 19,
//     fontWeight: "bold",
//     color: "#343434",
//   },
//   items: {},
// });

// export default SavedScreen;


//SavePage.js
import React, {
  FC,
  ReactElement,
  useState,
  useContext,
  useEffect,
} from "react";

import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import Places from "./Places";
import { SavePlaceContext } from "../../SavePlaceContext";
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;
import axios from "axios";
import api from "../../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export function SavedScreen() {
  const { placeItems, setPlaceItems } = useContext(SavePlaceContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem("userToken");
        const response = await axios.get(api.backend_URL + "/fav/" + email);
        const data = response.data;
        setPlaceItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Saved Places</Text>
        <View style={styles.items}>
          {/* This is where the Saved Places wil go */}
          {placeItems.map((item, index) => {
            let freetemp = "";
            if (item.fullSlots == 0 || item.fullSlots === null) {
              freetemp = "N/A";
            } else {
              if (item.cars > item.fullSlots) {
                freetemp = 0 + " free";
              } else {
                freetemp = item.fullSlots - item.cars;
                freetemp = freetemp + " free";
              }
            }
            return <Places key={index} text={item.name} free={freetemp} />;
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  tasksWrapper: {
    //paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    left: (ScreenWidth - 340) / 2 - 20,
    marginTop: 30,
    fontSize: 19,
    fontWeight: "bold",
    color: "#343434",
  },
  items: {},
});

export default SavedScreen;