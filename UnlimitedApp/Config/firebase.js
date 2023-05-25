import firebase from 'firebase/compat/app'
import 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/auth'

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

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export {firebase}