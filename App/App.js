import React, { FC, ReactElement, useState } from "react";
import "react-native-gesture-handler";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { LoggedOutState } from "./States/StateLoggedOut.js";
import { LoggedInState } from "./States/StateLoggedIn.js";



function App({ navigation }) {
  return (<NavigationContainer>{LoggedOutState()}</NavigationContainer>);
}

export default App;
