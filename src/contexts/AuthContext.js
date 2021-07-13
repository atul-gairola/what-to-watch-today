import React, { createContext, useContext, useEffect, useState } from "react";

import { firebaseAuth, googleAuthProvider } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  function loginWithGoogle() {
    return firebaseAuth.signInWithPopup(googleAuthProvider);
  }

  function logout() {
    return firebaseAuth.signOut();
  }

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    loginWithGoogle,
    logout,
    login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
