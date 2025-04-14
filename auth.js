import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7ouobvvAMBOg76rIdbFZiHEHzZH0q4FA",
  authDomain: "schoolapp-db.firebaseapp.com",
  projectId: "schoolapp-db",
  storageBucket: "schoolapp-db.appspot.com",
  messagingSenderId: "28108935218",
  appId: "1:28108935218:web:f60e76dbc3c0cca9586c2b"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// フォーム送信イベント
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    alert("ユーザーが見つかりません。");
    return;
  }

  let success = false;

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.password === password) {
      success = true;
      // ログイン状態を保存
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "home.html";
    }
  });

  if (!success) {
    alert("パスワードが間違っています。");
  }
});
