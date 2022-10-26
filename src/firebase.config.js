// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBaf9zzOHp4TXsLWLIQ2LebQk6v0qikGU",
  authDomain: "estate-market-place.firebaseapp.com",
  projectId: "estate-market-place",
  storageBucket: "estate-market-place.appspot.com",
  messagingSenderId: "533556032745",
  appId: "1:533556032745:web:06b1ffa9aabe7c996b2c78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
