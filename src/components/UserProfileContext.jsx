import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '/authContext'; 

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (currentUser) {

      const storedProfile = JSON.parse(localStorage.getItem(`profile_${currentUser.uid}`)) || {};
      setProfile(storedProfile);
    } else {
     
      setProfile({});
    }
  }, [currentUser]);

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    if (currentUser) {
      localStorage.setItem(`profile_${currentUser.uid}`, JSON.stringify(newProfile));
    }
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
