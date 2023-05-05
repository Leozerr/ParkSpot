import React, { FC, ReactElement, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Image,
  TextInput,
  Icon,
} from "react-native";
import "react-native-gesture-handler";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RegisterScreen } from "./Register.js";
import { LoginScreen } from "./Login.js";
import { HomeScreen, LoginButton } from "./Home.js";
import { ForgotPasswordScreen } from "./ForgotPassword.js";
import { ShowMap } from "./ShowMap.js";
import { DrawerContent } from "./LoggedOutComponents.js";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackItems() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function App({ navigation }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          drawerStyle: {
            headerShown: false,
            backgroundColor: "#E35205",
            width: "60%",
          },
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerContent {...props} />
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          name="Main"
          component={StackItems}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
