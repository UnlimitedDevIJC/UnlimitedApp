import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjB38BqwYIgrUKHv7eEffrqbCEInUZBpo",
  authDomain: "unlimitedfuture-772c5.firebaseapp.com",
  databaseURL: "https://unlimitedfuture-772c5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "unlimitedfuture-772c5",
  storageBucket: "unlimitedfuture-772c5.appspot.com",
  messagingSenderId: "555923754491",
  appId: "1:555923754491:web:398d61e2ec9ba2356f4f5e",
  measurementId: "G-D5LVW1D5CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Export Firestore as default
export default firestore;
