// Replace with your own Firebase config
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6A0FxhC4P_iwieOLXfqLa_6SlQL9dGgU",
  authDomain: "travel-934d2.firebaseapp.com",
  projectId: "travel-934d2",
  storageBucket: "travel-934d2.firebasestorage.app",
  messagingSenderId: "297440741761",
  appId: "1:297440741761:web:f20c30c3e288f528240080",
  measurementId: "G-DKS0264MR3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
