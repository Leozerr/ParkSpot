import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import logo from "../../../Image/parkpin.png"
const Places = (props) => {
  return (
    <View style={styles.mainBox}>
    <TouchableOpacity><Image source={logo} style={styles.logo}/></TouchableOpacity>
    <View style={styles.item}>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  );
};

  const styles = StyleSheet.create({
    mainBox:{
      flexDirection: "row",
      alignItems: "center",
    },
    item: {
      backgroundColor: '#FFF',
      borderBottomWidth: 3,
      borderBottomColor: "#EBEBEB",
      padding: 10,
      paddingVertical: 20,
      flex:1
    },
    logo: {
      width: 35,
      height: 35,
      
    },
    itemText:{
      fontSize: 23,
    }
    }
  );

  export default Places;
