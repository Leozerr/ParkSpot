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

function ShowMap() {
  // const [pin, setPin] = React.useState({
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  // });
  const [region, setRegion] = React.useState({
    latitude: 13.727156,
    longitude: 100.77485,
  });
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 13.727156,
          longitude: 100.77485,
        }}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        >
          <Image
            source={require("./marker1.png")}
            style={{ height: 35, width: 35 }}
          />
        </Marker>
      </MapView>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: "AIzaSyCC2ONx9Tr4pzoiW4mDGBa8yJYXjTZ8Tx0",
          language: "th",
          components: "country:th",
          types: "establishment",
          radius: 30000,
          // location: `${region.latitude}, ${region.longitude}`,
        }}
        style={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { BackgroundColor: "white" },
        }}
      />
    </View>
  );
}

function HomeScreen() {
  return (
    <View>
      <LoginButton />
      <RegisterButton />
    </View>
  );
}
function LoginButton() {
  const navigation = useNavigation();

  return <Button title="Login" onPress={() => navigation.navigate("Login")} />;
}
function RegisterButton() {
  const navigation = useNavigation();

  return (
    <Button title="Register" onPress={() => navigation.navigate("Register")} />
  );
}
function LoginScreen() {
  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
}
export const RegisterScreen = (props) => {
  const { onPress, title = "Sign Up" } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <Text style={styles.titleText}>Sign In to KMITL Parking</Text>
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
const styles = StyleSheet.create({
  input: {
    height: 30,
    width: 300,
    borderRadius: 16,
    paddingLeft: 10,
    backgroundColor: "#EFF3F8",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: 300,
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
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#343434",
    marginTop: 5,
    marginBottom: 10,
  },
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <ShowMap />

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
