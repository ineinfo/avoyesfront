"use client";
import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    gender: 'Female',
    profileImage: '/user.png', // Ensure this path is correct and accessible
  });

  const updateProfile = (newData) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
