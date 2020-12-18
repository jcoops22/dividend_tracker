import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { setCurrentUser } from "../../redux/user/user-actions";

const firebaseConfig = {
  apiKey: "AIzaSyBa_DTb-CMVCtzZ9etA45OLfTpR0v9Km-A",
  authDomain: "dividendtracker-e1403.firebaseapp.com",
  projectId: "dividendtracker-e1403",
  storageBucket: "dividendtracker-e1403.appspot.com",
  messagingSenderId: "225539677721",
  appId: "1:225539677721:web:41106d6d71e299fdbd9488",
  measurementId: "G-L3PK11PDSM",
};

// REGISTER USER
export const creatUserProfileDocument = async (userAuth, addtionalData) => {
  if (!userAuth) {
    return;
  }
  console.log("creating the document");
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  let returnedUser = null;

  if (!snapshot.exists) {
    const { email } = userAuth;
    const { first, last } = addtionalData;
    const stocks = [];
    const id = userAuth.uid;
    const createdAt = new Date();

    const userObj = {
      first,
      last,
      email,
      createdAt,
      stocks,
      id,
      ...addtionalData,
    };

    try {
      await userRef.set({
        ...userObj,
      });
      returnedUser = userObj;
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return returnedUser;
  // return userRef;
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
