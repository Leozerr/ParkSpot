import React, { FC, ReactElement, useState } from "react";
import { View, Text, Pressable, Button, StyleSheet, Image, TextInput } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RegisterScreen } from "./Register.js";
import { LoginScreen } from "./Login.js";
import { HomeScreen, LoginButton } from "./Home.js";
import { ShowMap } from "./ShowMap.js";


const Stack = createNativeStackNavigator();

function App() {
  return (
    
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen name="Home" component={HomeScreen}options={{
            headerTitle: () => (
              <Image
                source={require("../Image/logo.png")}
                style={{ width: 100, height: 25 }}
              />
            ),
            headerRight: () => <LoginButton />,
        }}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


export default App;


