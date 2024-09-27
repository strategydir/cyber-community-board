// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVo0MpISSvwU9NA1Ausuc1llAeilDbRoo",
  authDomain: "it-db-39383.firebaseapp.com",
  projectId: "it-db-39383",
  storageBucket: "it-db-39383.appspot.com",
  messagingSenderId: "761115392434",
  appId: "1:761115392434:web:ab3f6df69db56fc7958cab",
  measurementId: "G-9JD1TDD3JS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const docList = "docList"
