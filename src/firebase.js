// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRotQLODYhhsnV0DmyQyzLUe133PtC9C4",
  authDomain: "id-covid-tracker.firebaseapp.com",
  projectId: "id-covid-tracker",
  storageBucket: "id-covid-tracker.firebasestorage.app",
  messagingSenderId: "928913191007",
  appId: "1:928913191007:web:ec496999e9c20d4d2f2bea",
  measurementId: "G-P20K0EMPLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);