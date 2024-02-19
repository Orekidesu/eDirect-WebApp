
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBtXE7z-n2A2iOMbKxZkQ8-LiKSg_lgV6c",
  authDomain: "edirect-b5a19.firebaseapp.com",
  projectId: "edirect-b5a19",
  storageBucket: "edirect-b5a19.appspot.com",
  messagingSenderId: "226969506103",
  appId: "1:226969506103:web:8d794ac9e9d960daad4ab2"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
export const auth = getAuth()
