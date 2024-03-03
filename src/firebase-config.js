// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw24KBcqW6NFSDaDGTvP9FmkiFh2wp6p8",
  authDomain: "let-s-chat-16a82.firebaseapp.com",
  projectId: "let-s-chat-16a82",
  storageBucket: "let-s-chat-16a82.appspot.com",
  messagingSenderId: "311785790781",
  appId: "1:311785790781:web:13b90527e05188136db954"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();