// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA22tARCRwrEJNEccjzA8nUfxRqAH493jA",
  authDomain: "asmreact-cfe70.firebaseapp.com",
  projectId: "asmreact-cfe70",
  storageBucket: "asmreact-cfe70.appspot.com",
  messagingSenderId: "785773154316",
  appId: "1:785773154316:web:36d01fd00998e867df1e29"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

