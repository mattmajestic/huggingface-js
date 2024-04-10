// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(app);

// Create a GitHub auth provider instance
const githubProvider = new GithubAuthProvider();

// Function to sign in with GitHub
const signInWithGithub = () => signInWithPopup(auth,githubProvider);

export { db, auth, signInWithGithub, storage };