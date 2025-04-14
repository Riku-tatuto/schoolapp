import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyD7ouobvvAMBOg76rIdbFZiHEHzZH0q4FA",
  authDomain: "schoolapp-db.firebaseapp.com",
  projectId: "schoolapp-db",
  storageBucket: "schoolapp-db.appspot.com",
  messagingSenderId: "28108935218",
  appId: "1:28108935218:web:f60e76dbc3c0cca9586c2b"
};

// 初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// フォーム送信時の処理
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Firestoreでユーザーを検索
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    showError("ユーザーが見つかりません");
    return;
  }

  let matched = false;
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.password === password) {
      matched = true;
      // 🔐 ユーザーデータを保存してログイン状態を維持
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "home.html";
    }
  });

  if (!matched) {
    showError("パスワードが間違っています");
  }
});

// エラーバナー表示
function showError(msg) {
  const banner = document.getElementById("error-banner");
  banner.textContent = msg;
  banner.style.display = "block";
}
