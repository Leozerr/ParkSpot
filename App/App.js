import React, { FC, ReactElement, useState } from "react";
import { View, Text, Pressable } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Image, TextInput } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { RegisterScreen } from "./Register.js";
import { LoginScreen } from "./Login.js";
import { HomeScreen } from "./Home.js";
import { ShowMap } from "./ShowMap.js";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Buttons() {
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
          title: "Sign in to KMITL Parking",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Sign Up to KMITL Parking",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen name="ShowMap" component={ShowMap} />
    </Stack.Navigator>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 70, height: 25, alignSelf: "center" }}
      source={require("../Image/KMITL.png")}
    />
  );
}

function SignIn({ navigation }) {
  return (
    <Pressable
      style={{
        alignSelf: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 16,
        width: "80%",
        backgroundColor: "#DB7038",
      }}
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={{ fontWeight: "bold", color: "#fff" }}>Sign In</Text>
    </Pressable>
  );
}

function App() {
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
              <SignIn {...props} />
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Buttons}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 70,
                  backgroundColor: "#fff",
                }}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={{ fontWeight: "bold" }}>Sign In</Text>
              </Pressable>
            ),
            headerTitle: () => <LogoTitle />,
            headerTitleAlign: "center",
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
