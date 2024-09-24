// src/components/LoginPage.jsx
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Firebase";

// Login admin
export const loginAdmin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error; // Re-throw the error to be caught in the component
  }
};

// Logout admin
export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out: ", error);
    throw error; // Re-throw the error to be caught in the component
  }
};
