// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtXE7z-n2A2iOMbKxZkQ8-LiKSg_lgV6c",
  authDomain: "edirect-b5a19.firebaseapp.com",
  projectId: "edirect-b5a19",
  storageBucket: "edirect-b5a19.appspot.com",
  messagingSenderId: "226969506103",
  appId: "1:226969506103:web:8d794ac9e9d960daad4ab2"
};

// init firebase
initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()
export default db