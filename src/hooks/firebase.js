import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// import InitAuthentication from "../firebase/firebase.init";
// import initAuthentication from "../firebase/firebase.init";
import InitAuthentication from "../firebase/firebase.init";

// initAuthentication();
InitAuthentication();

const useFirebase = () => {
  const [admin, setAdmin] = useState(false);

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //   const [admin, setAdmin] = useState(false);

  const auth = getAuth();

  const googleProvider = new GoogleAuthProvider();

  const signInUsingGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, [auth]);

  useEffect(() => {
    fetch(`http://localhost:7000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  return {
    user,
    admin,
    signInUsingGoogle,
    logOut,
    setIsLoading,
    isLoading,
  };
};

export default useFirebase;
