import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useState, useEffect} from 'react';
const axios = require('axios');

const useFirebase = () => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const [isUserLoading, setUserLoading] = useState(true);
  const auth = getAuth();

  

  const googleProvider = new GoogleAuthProvider();

  // register by email && password
  const registerEmail = (email, password, name) => {
    setUserLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      user.displayName = name;
      user.photoURL = "https://i.postimg.cc/DfgXwgYz/client.jpg";
      // save user to database
      axios.post("https://boiling-island-95834.herokuapp.com/users", user)
      .then(res => {
        console.log(res)
      })
      setUser(user)

      // update Profile
      updateProfile(auth.currentUser, {
        displayName: name, photoURL : "https://i.postimg.cc/DfgXwgYz/client.jpg"
      }).then(() => {
      }).catch((error) => {
        setError(error.message)
      });
       
    })
    .catch((error) => {
      setError(error.message);
      // ..
    })
    .finally(()=>{
      setUserLoading(false);
    });
  };

  // log in by email & password
  const logInEmail = (email, password) => {
    setUserLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setUser(user);
       
    })
    .catch((error) => {
      setError(error.message);
    }).finally(()=>{
      setUserLoading(false);
    });
  }

  // google login and register
  const googleLogin =() => {
    setUserLoading(true)
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token)
      const user = result.user;
      axios.put("https://boiling-island-95834.herokuapp.com/users", user)
      .then(res => {
        // console.log(res)
      })
      setUser(user);
      setUserLoading(false)
      // ...
    }).catch((error) => {
      setError(error.message);
    });
  }

  // observation of the use
  useEffect(()=>{
    setUserLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setUserLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  // log out user
  const logOut = () => {
    setUserLoading(true);
    signOut(auth).then(() => {
       
    }).catch((error) => {
      setError(error.message);
    })
    .finally(()=>{
    setUserLoading(false);
    });
  }


  return {
    user,
    error,
    setError,
    registerEmail,
    logInEmail,
    googleLogin,
    logOut,
    isUserLoading,
  }
}

export default useFirebase;