// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 🔧 Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyD7ouobvvAMBOg76rIdbFZiHEHzZH0q4FA",
  authDomain: "schoolapp-db.firebaseapp.com",
  projectId: "schoolapp-db",
  storageBucket: "schoolapp-db.appspot.com",
  messagingSenderId: "28108935218",
  appId: "1:28108935218:web:f60e76dbc3c0cca9586c2b"
};

// 🔄 初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, onAuthStateChanged, provider };
