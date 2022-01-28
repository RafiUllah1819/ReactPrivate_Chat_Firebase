import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqgUFAdDZKVLtffC3vt6VLp5TGmoglRhw",
  authDomain: "react-messenger-f81a6.firebaseapp.com",
  projectId: "react-messenger-f81a6",
  storageBucket: "react-messenger-f81a6.appspot.com",
  messagingSenderId: "748793314055",
  appId: "1:748793314055:web:8f2a4dc42d6764c34423a2",
  measurementId: "G-Z8X36THVYD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
