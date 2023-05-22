import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoggedOutState } from "./States/StateLoggedOut.js";
import { LoggedInState } from "./States/StateLoggedIn.js";
import { ProfileImageProvider } from './ProfileImageContext';
import LoginScreen from "./Screens/LoggedOut/Login.js";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token exists in AsyncStorage during app startup
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken'); 
      if (storedToken !== null){
        setIsLoggedIn(true); // Update isLoggedIn based on token presence
      }
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear the token from AsyncStorage during logout
      await AsyncStorage.removeItem('userToken');
      console.log("TokenClear: "+await AsyncStorage.getItem('userToken'))
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error removing token:', error);
    }
  };

  const handleLogin = async (token) => {
    try {
      // Store the token in AsyncStorage during login
      await AsyncStorage.setItem('userToken', token);
      setIsLoggedIn(true);
      console.log("Token: "+await AsyncStorage.getItem('userToken'))
    } catch (error) {
      console.log('Error storing token:', error);
    }
  };
  const onLogin = (email) => {
    // Call the onLogin prop with the email argument
    props.onLogin(email);
  };

  return (
    <ProfileImageProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <LoggedInState onLogout={handleLogout} />
        ) : (
          <LoggedOutState onLogin={(email) => handleLogin(email)} />
        )}
      </NavigationContainer>
    </ProfileImageProvider>
  );
}

export default App;
