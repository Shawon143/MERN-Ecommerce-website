import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const InitAuthentication = () => {
  initializeApp(firebaseConfig);
};

export default InitAuthentication;
