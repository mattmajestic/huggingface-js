// Auth.js

import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

// Initialize the Firebase Auth instance
const auth = getAuth();

// Create a new GitHub auth provider instance
const provider = new GithubAuthProvider();

// Function to handle GitHub sign-in
export const signInWithGithub = () => {
  // Trigger the GitHub login popup
  return signInWithPopup(auth, provider);
};
