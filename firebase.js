// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7ouobvvAMBOg76rIdbFZiHEHzZH0q4FA",
  authDomain: "schoolapp-db.firebaseapp.com",
  projectId: "schoolapp-db",
  storageBucket: "schoolapp-db.appspot.com",
  messagingSenderId: "28108935218",
  appId: "1:28108935218:web:f60e76dbc3c0cca9586c2b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
