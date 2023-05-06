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
import { HomeScreenLoggedIn } from "../Screens/LoggedIn/Home2";
import { ContactUsScreen } from "../Screens/contactUs.js";
import { SavedScreen } from "../Screens/LoggedIn/SavedPage";
import { ProfileScreen } from "../Screens/LoggedIn/ProfilePage";
import { LogOutDrawer } from "../Components/DrawerButtons";
import { ProfileDrawer } from "../Components/DrawerButtons";

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

export function HomePageLoggedIn() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={HomeScreenLoggedIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage"
        component={ProfileScreen}
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

export function SavedNav() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SavedScreen"
        component={SavedScreen}
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

export function LoggedInContents(props) {
  return (
    <DrawerContentScrollView {...props}>
      <ProfileDrawer {...props} />
      <DrawerItemList {...props} />
      <LogOutDrawer {...props} />
    </DrawerContentScrollView>
  );
}

export function LoggedInState() {
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
      drawerContent={LoggedInContents}
    >
      <Drawer.Screen
        name="Home"
        component={HomePageLoggedIn}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Saved"
        component={SavedNav}
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

export default LoggedInState;
