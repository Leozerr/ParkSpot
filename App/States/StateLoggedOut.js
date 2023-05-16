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
import Icon from "react-native-vector-icons/Ionicons.js";
import { RegisterScreen } from "../Screens/LoggedOut/Register.js";
import { LoginScreen } from "../Screens/LoggedOut/Login.js";
import { HomeScreen, LoginButton } from "../Screens/LoggedOut/Home.js";
import { ForgotPasswordScreen } from "../Screens/LoggedOut/ForgotPassword.js";
import { ContactUsScreen } from "../Screens/contactUs.js";
import { SignInDrawer } from "../Components/HeaderLoggedOut.js";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function ContactUsNav() {
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
              source={require("../../Image/logo.png")}
              style={{ width: 100, height: 25 }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Main")}
              style={{
                right: 15,
              }}
            >
              <Icon name="chevron-back" size={31} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export function LoggedOutContents(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SignInDrawer {...props} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export function HomePageLoggedOut() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
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
              source={require("../../Image/logo.png")}
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
              source={require("../../Image/logo.png")}
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
              source={require("../../Image/logo.png")}
              style={{ width: 100, height: 25 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export function SettingsLoggedOut() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerScreen"
        component={LoginScreen}
        options={{
          headerTintColor: "black",
          headerBackTitle: "",
          headerTitle: () => (
            <Image
              source={require("../../Image/logo.png")}
              style={{ width: 100, height: 25 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="DrawerRegister"
        component={RegisterScreen}
        options={{
          headerTintColor: "black",
          headerBackTitle: "",
          headerTitle: () => (
            <Image
              source={require("../../Image/logo.png")}
              style={{ width: 100, height: 25 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DrawerForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerTintColor: "black",
          headerBackTitle: "",
          headerTitle: () => (
            <Image
              source={require("../../Image/logo.png")}
              style={{ width: 100, height: 25 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export function LoggedOutState() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "white",
        drawerStyle: {
          backgroundColor: "#E35205",
          width: "60%",
        },
      }}
      drawerContent={LoggedOutContents}
    >
      <Drawer.Screen
        name="Home"
        component={HomePageLoggedOut}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsNav}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

export default LoggedOutState;
