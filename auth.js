// auth.js
import { auth, db, provider } from './firebase.js';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 🔐 ログイン処理（ユーザー名 + パスワード）
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  try {
    // ユーザー名からuid取得
    const snapshot = await getDocs(collection(db, "users"));
    let userDoc = null;

    snapshot.forEach((docData) => {
      if (docData.data().username === username) {
        userDoc = docData;
      }
    });

    if (!userDoc) throw new Error("ユーザーが見つかりません");

    const userEmail = `${userDoc.data().username}@schoolapp.jp`;

    // メール+パスワードでFirebaseログイン
    await signInWithEmailAndPassword(auth, userEmail, password);
    window.location.href = "home.html";
  } catch (err) {
    console.error("ログイン失敗:", err);
    document.getElementById("error-banner").style.display = "block";
  }
});

// 🧠 Googleログイン
window.loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const googleUser = result.user;
    const email = googleUser.email;

    // Firestore から全ユーザーを取得して照合
    const snapshot = await getDocs(collection(db, "users"));
    let found = false;

    snapshot.forEach((docData) => {
      const data = docData.data();
      if (data.googleLinked && data.googleEmail === email) {
        found = true;
      }
    });

    if (!found) {
      await signOut(auth);
      alert("このGoogleアカウントは未連携です");
      return;
    }

    window.location.href = "home.html";
  } catch (error) {
    console.error("Googleログイン失敗:", error.message);
    alert("Googleログインに失敗しました");
  }
};

// 🔐 ログイン状態チェック（ログインしてないならリダイレクト）
export function requireAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}

// 🚪 ログアウト
window.logout = () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
