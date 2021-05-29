import React, { createContext, useContext, useState } from "react";

const PreferenceContext = createContext();

export function usePreference() {
  return useContext(PreferenceContext);
}

export function PreferenceProvider({ children }) {
  const [preferences, setPreferences] = useState({
    typeOfContent: "",
    genre: "",
    rating: "",
  });

  const updatePreferences = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <PreferenceContext.Provider value={{preferences, updatePreferences}}>
      {children}
    </PreferenceContext.Provider>
  );
}
