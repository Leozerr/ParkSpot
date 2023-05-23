import React, {
  FC,
  ReactElement,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import {
  Dimensions,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { ProfileImageContext } from "../ProfileImageContext";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../api/api";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

export function SignInDrawer() {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        width: "60%",
        height: 45,
        backgroundColor: "#DB7038",
        marginBottom: 40,
      }}
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={{ fontWeight: "bold", color: "#fff" }}>Sign In</Text>
    </Pressable>
  );
}

export function LogOutDrawer({ onLogout }) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        marginTop: ScreenHeight - 480,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        width: "60%",
        height: 45,
        backgroundColor: "#DB7038",
      }}
      onPress={onLogout}
    >
      <Text style={{ fontWeight: "bold", color: "#fff" }}>Sign Out</Text>
    </Pressable>
  );
}

export function ProfileDrawer() {
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  const [user, setUser] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem("userToken")
        const response = await axios.get(api.backend_URL+"/users/"+email );
        const data = response.data;
        setUser(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        marginBottom: 100,
        marginTop: 40,
        paddingRight: 20,
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
          marginRight: 10,
          borderRadius: 75,
        }}
        source={profileImage}
      />
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
          Hello,&nbsp;
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
          {user && user.username ? user.username : "Loading.."}

          </Text>
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#DADADA",
            textDecorationLine: "underline",
          }}
        >
          {user && user.email ? user.email : "Loading.."}
        </Text>
      </View>
    </View>
  );
}

export default SignInDrawer;
