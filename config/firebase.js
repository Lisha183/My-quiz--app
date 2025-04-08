// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcs52BLDkwwK8JCDFWedOecBdV3FRNMfU",
  authDomain: "quiz-b2216.firebaseapp.com",
  projectId: "quiz-b2216",
  storageBucket: "quiz-b2216.firebasestorage.app",
  messagingSenderId: "845432455416",
  appId: "1:845432455416:web:517c000b2bfe642753bb0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);