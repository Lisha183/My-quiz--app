// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD3BY5iVRmfmRNUKqOGcH1WzlPj4Wtd2g",
  authDomain: "quiz-747d0.firebaseapp.com",
  projectId: "quiz-747d0",
  storageBucket: "quiz-747d0.firebasestorage.app",
  messagingSenderId: "260778135600",
  appId: "1:260778135600:web:d5f1ed38a000e19653ddf5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
 export { auth, db };
