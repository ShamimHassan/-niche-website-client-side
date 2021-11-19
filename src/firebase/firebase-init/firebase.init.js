import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase-config/firebase.config";
import { getAnalytics } from "firebase/analytics";

const firebaseInit = () => {
  const app =initializeApp(firebaseConfig);
  getAnalytics(app);
};

export default firebaseInit;