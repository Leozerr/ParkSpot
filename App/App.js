import React, { FC, ReactElement, useState } from "react";
import "react-native-gesture-handler";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { LoggedOutState } from "./States/StateLoggedOut.js";
import { LoggedInState } from "./States/StateLoggedIn.js";
import { ProfileImageProvider } from './ProfileImageContext';
function App({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ProfileImageProvider>
    <NavigationContainer>
      {isLoggedIn ? (
        <LoggedInState onLogout={handleLogout} />
      ) : (
        <LoggedOutState onLogin={handleLogin} />
      )}
    </NavigationContainer>
    </ProfileImageProvider>
  );
}

export default App;
