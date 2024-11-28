import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const PreferencesContext = createContext();

export const usePreferences = () => {
  return useContext(PreferencesContext);
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(null);

  const updatePreferences = async (userId, newPreferences) => {
    const userPreferencesRef = doc(db, 'preferences', userId);
    await setDoc(userPreferencesRef, newPreferences);
    setPreferences(newPreferences);
  };

  const fetchPreferences = async (userId) => {
    const userPreferencesRef = doc(db, 'preferences', userId);
    const docSnap = await getDoc(userPreferencesRef);
    if (docSnap.exists()) {
      setPreferences(docSnap.data());
    } else {
      // Initialize preferences for new user
      const initialPreferences = { favoriteCategories: [], viewedProducts: [] };
      await setDoc(userPreferencesRef, initialPreferences);
      setPreferences(initialPreferences);
    }
  };

  useEffect(() => {
    // Fetch user preferences on component mount
    if (userId) {
      fetchPreferences(userId);
    }
  }, [userId]);

  const value = {
    preferences,
    updatePreferences
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};