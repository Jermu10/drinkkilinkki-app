// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp4sIrNJSx8VPGvsmzw8njZ-w-ZHpkmYc",
  authDomain: "drinkkilinkkimobile.firebaseapp.com",
  databaseURL: "https://drinkkilinkkimobile-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "drinkkilinkkimobile",
  storageBucket: "drinkkilinkkimobile.appspot.com",
  messagingSenderId: "121138650579",
  appId: "1:121138650579:web:221189fd575b05456e2326",
  measurementId: "G-VKY51P8H7D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);