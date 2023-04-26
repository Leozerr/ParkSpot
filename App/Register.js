import React, { FC, ReactElement, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Button, StyleSheet, Image, TextInput, Dimensions } from "react-native";



export const RegisterScreen = (props) => {
    const { onPress, title = "Sign Up" } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const ScreenWidth = Dimensions.get('screen').width;
    const ScreenHeight = Dimensions.get('screen').height;
    
    return (
      <View
        style={{
          height: ScreenHeight,
          width: ScreenWidth,
          // position: "absolute",
          // top: 200,
          // left: 20,
          // right: 0,
          // bottom: 0,
          // justifyContent: "center",
          // alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <Text style={styles.HeaderText}>Sign In to KMITL Parking</Text>
        <Text style={styles.fieldText}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          placeholder={"Username"}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={"none"}
        />
        <Text style={styles.fieldText}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder={"Password"}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.fieldText}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder={"Name"}
          onChangeText={(text) => setName(text)}
          autoCapitalize={"none"}
        />
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.text}>{title}</Text>
        </Pressable>
      </View>
    );
  };


    //Style
  export const styles = StyleSheet.create({
    input: {
      top: 200,
      left: 20,
      //alignItems: "center",
      //justifyContent: "center",
      height: 40,
      width: 340,
      borderRadius: 14,
      paddingLeft: 10,
      backgroundColor: "#EFF3F8",
    },
  
    button: {
      top: 200,
      left: 20,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      paddingVertical: 10,
      paddingHorizontal: 32,
      borderRadius: 14,
      width: 340,
      elevation: 3,
      backgroundColor: "#E35205",
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  
    HeaderText: {
      top: 200,
      left: 20,
      paddingLeft: 50,
      fontSize: 20,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "#343434",
      marginTop: -100,
      marginBottom: 20,
    },
  
    titleText: {
      fontSize: 20,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "#343434",
      marginTop: -100,
      marginBottom: 20,
    },
  
    fieldText: {
      top: 200,
      left: 20,
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "#343434",
      marginTop: 5,
      marginBottom: 10,
    },
  });


  export default RegisterScreen;