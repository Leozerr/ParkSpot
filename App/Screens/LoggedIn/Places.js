// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import logo from "../../../Image/parkpin.png"

// const Places = ({ text, onPress }) => {
//   // const navigation = useNavigation();

//   // const navigateWithPin = () => {
//   //   navigation.navigate("Home");
//   //   //onMarkerPress(item, mapEventData);
//   // };
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <View style={styles.mainBox}>
//         <Image source={logo} style={styles.logo} />
//         <View style={styles.item}>
//           <Text style={styles.itemText}>{text}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

//   const styles = StyleSheet.create({
//     mainBox:{
//       flexDirection: "row",
//       alignItems: "center",
//     },
//     item: {
//       backgroundColor: '#fff',
//       borderBottomWidth: 1.5,
//       borderBottomColor: "#EBEBEB",
//       padding: 10,
//       paddingVertical: 30,
//       flex:1
//     },
//     logo: {
//       width: 35,
//       height: 35,
      
//     },
//     itemText:{
//       fontSize: 20,
//       color: "#343434",

//     }
//     }
//   );

//   export default Places;


//Places.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../../Image/parkpin.png";

const Places = (props, { onMarkerPress, item, mapEventData }) => {
  const navigation = useNavigation();

  const navigateWithPin = () => {
    //navigation.navigate("Home");
    //onMarkerPress(item, mapEventData);
  };
  return (
    <TouchableOpacity onPress={navigateWithPin}>
      <View style={styles.mainBox}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.item}>
          <Text style={styles.itemText}>{props.text}</Text>
          <Text style={styles.itemText}>{props.free}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1.5,
    borderBottomColor: "#EBEBEB",
    padding: 10,
    paddingVertical: 30,
    flex: 1,
  },
  logo: {
    width: 35,
    height: 35,
  },
  itemText: {
    fontSize: 20,
    color: "#343434",
  },
});

export default Places;