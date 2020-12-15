import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBa_DTb-CMVCtzZ9etA45OLfTpR0v9Km-A",
  authDomain: "dividendtracker-e1403.firebaseapp.com",
  projectId: "dividendtracker-e1403",
  storageBucket: "dividendtracker-e1403.appspot.com",
  messagingSenderId: "225539677721",
  appId: "1:225539677721:web:41106d6d71e299fdbd9488",
  measurementId: "G-L3PK11PDSM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
export const firestore = firebase.firestore();
