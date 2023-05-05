import React, { FC, ReactElement, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
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
import Icon from "react-native-vector-icons/Ionicons.js";
import { RegisterScreen } from "./Register.js";
import { LoginScreen } from "./Login.js";
import { HomeScreen, LoginButton } from "./Home.js";
import { ForgotPasswordScreen } from "./ForgotPassword.js";
import { ContactUsScreen } from "./contactUs.js";
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
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTintColor: "black",
          headerBackTitle: "",
          headerTitle: () => (
            <Image
              source={require("../Image/logo.png")}
              style={{ width: 100, height: 25 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTintColor: "black",
          headerBackTitle: "",
          headerTitle: () => (
            <Image
              source={require("../Image/logo.png")}
              style={{ width: 100, height: 25 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerTintColor: "black",
          headerBackTitle: "",
          headerTitle: () => (
            <Image
              source={require("../Image/logo.png")}
              style={{ width: 100, height: 25 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ContactUsNav() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          headerTintColor: "black",
          headerBackTitle: "",
          headerTitle: () => (
            <Image
              source={require("../Image/logo.png")}
              style={{ width: 100, height: 25 }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}
            style={{
              right: 15,
            }}
            >
              <Icon name="chevron-back" size={31}/>
            </TouchableOpacity>
          ),
        }}
      />
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
          name="Map"
          component={StackItems}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Contact Us"
          component={ContactUsNav}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
