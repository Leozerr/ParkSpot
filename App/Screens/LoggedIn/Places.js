import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../../Image/parkpin.png"
const Places = (props, onPress) => {
  const navigation = useNavigation();

  const navigateWithPin = () => {
    navigation.navigate("Home");
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.mainBox}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.item}>
          <Text style={styles.itemText}>{props.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
      paddingVertical: 40,
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
