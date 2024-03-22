// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously as firebaseSignInAnonymously } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRNpE6Du0lHvgin-pikdGIOEQydTsnGNQ",
  authDomain: "huggingface-js.firebaseapp.com",
  projectId: "huggingface-js",
  storageBucket: "huggingface-js.appspot.com",
  messagingSenderId: "344640458078",
  appId: "1:344640458078:web:2a41bce9fbf6b1d2c913cf",
  measurementId: "G-LK2Y1C75CV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const signInAnonymously = () => firebaseSignInAnonymously(auth);

export { db, auth, signInAnonymously };