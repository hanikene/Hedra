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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
