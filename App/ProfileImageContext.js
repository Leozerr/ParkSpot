import React, { createContext, useState } from 'react';

export const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(require('../Image/profilepic.png'));

  return (
    <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};