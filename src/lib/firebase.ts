// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqyWrrXNhsjBm65jyjuuMeRNzQiGF6t34",
  authDomain: "the-palazzo-29701.firebaseapp.com",
  projectId: "the-palazzo-29701",
  storageBucket: "the-palazzo-29701.appspot.com",
  messagingSenderId: "860702676609",
  appId: "1:860702676609:web:283a3d6b41a65b555d5f80"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
