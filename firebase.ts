// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkAdM85RlzsZIcHFdgpfB-4TCMqJxN0Dw",
  authDomain: "hedra-a0ee1.firebaseapp.com",
  projectId: "hedra-a0ee1",
  storageBucket: "hedra-a0ee1.appspot.com",
  messagingSenderId: "369340362436",
  appId: "1:369340362436:web:7d8e639eee9e933ee9a391",
};

/* const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}; */

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
