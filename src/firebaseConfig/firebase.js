import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVgS9B5rOUNuABDSDVu6iKjku5COyn5kM",
  authDomain: "clase6-11.firebaseapp.com",
  projectId: "clase6-11",
  storageBucket: "clase6-11.appspot.com",
  messagingSenderId: "335127142456",
  appId: "1:335127142456:web:573b9728230745462806cd",
  measurementId: "G-6M6N4SNBXV"
};

const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);