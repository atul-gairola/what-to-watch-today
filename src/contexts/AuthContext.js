import React, { createContext, useContext, useEffect, useState } from "react";

import { firebaseAuth, googleAuthProvider, db } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(name, email, password) {
    return firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return db.collection("users").add({
          email: email,
          name: name,
          authUid: user.user.uid,
        });
      })
      .catch((e) => console.log(e));
  }

  function login(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  function loginWithGoogle() {
    return firebaseAuth
      .signInWithPopup(googleAuthProvider)
      .then((user) => {
        if (user.additionalUserInfo.isNewUser) {
          return db.collection("users").add({
            email: user.user.email,
            name: user.user.displayName,
            authUid: user.user.uid,
            profilePicture: user.user.photoURL,
          });
        }
      })
      .catch((e) => console.log(e));
  }

  function logout() {
    return firebaseAuth.signOut();
  }

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .where("authUid", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            let data = {};
            querySnapshot.forEach((doc) => {
              data = doc.data();
              data.id = doc.id;
            });
            console.log(data);
            setCurrentUser(data);
          })
          .catch((e) => console.log(e));
      } else {
        setCurrentUser(user);
      }
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
