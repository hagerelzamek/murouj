import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAwgaPFEj1pMwcUnGnXfaK8IdQJWUIi4OA",
    authDomain: "murouj-solutions.firebaseapp.com",
    projectId: "murouj-solutions",
    storageBucket: "murouj-solutions.appspot.com",
    messagingSenderId: "184018888889",
    appId:"1:184018888889:web:883399bb2b89b9bdb61368",
    measurementId: "G-T3T631GEMM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
