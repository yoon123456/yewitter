import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxt2IkjAnrUOtV7WgOi08QzHrElgO53oY",
  authDomain: "yewitter-57cee.firebaseapp.com",
  projectId: "yewitter-57cee",
  storageBucket: "yewitter-57cee.appspot.com",
  messagingSenderId: "454944869454",
  appId: "1:454944869454:web:fec4d08b1dab55a7c8c71f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
