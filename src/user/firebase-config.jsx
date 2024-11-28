// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCglKxkSaMASUMzdj-0Qlr0yK6KEvQ85YQ",
  authDomain: "joyboy-sk.firebaseapp.com",
  databaseURL: "https://joyboy-sk-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "joyboy-sk",
  storageBucket: "joyboy-sk.appspot.com",
  messagingSenderId: "524610463942",
  appId: "1:524610463942:web:5a41506d4a98aad8178fc7",
  measurementId: "G-SC4296ZW11"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };