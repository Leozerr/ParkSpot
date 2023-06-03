import React, { createContext, useState } from "react";

export const SavePlaceContext = createContext();

export const SavePlaceProvider = ({ children }) => {
  const [placeItems, setPlaceItems] = useState([]);

  return (
    <SavePlaceContext.Provider value={{ placeItems, setPlaceItems }}>
      {children}
    </SavePlaceContext.Provider>
  );
};
