import React, { createContext, useState } from "react";

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppStateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppStateContext.Provider>
  );
};
