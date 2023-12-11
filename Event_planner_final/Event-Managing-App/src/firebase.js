// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwpj3yL1fH41JexTnZ20SBl2FgDiDZNBo",
  authDomain: "eventplanner-ef037.firebaseapp.com",
  projectId: "eventplanner-ef037",
  storageBucket: "eventplanner-ef037.appspot.com",
  messagingSenderId: "699120705356",
  appId: "1:699120705356:web:0c48325c1fbdaae854f9e9",
 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);