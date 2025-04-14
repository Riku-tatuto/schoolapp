import { auth, db } from './firebase.js';
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    const content = document.getElementById("content");
    content.innerHTML = `
      <h2>アカウント</h2>
      <p>ユーザー名: ${data.username}</p>
      <p>名前: ${data.name}</p>
      <p>コース: ${data.course}コース</p>
      <p>Google連携: ${data.googleLinked ? `✔️ ${data.googleEmail}` : '❌ なし'}</p>
      ${data.googleLinked ? `
        <button id="unlink">Google連携を解除</button>
      ` : `
        <button id="link">Googleと連携</button>
      `}
    `;

    document.getElementById("link")?.addEventListener("click", async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
      const googleUser = result.user;

      await updateDoc(userRef, {
        googleLinked: true,
        googleEmail: googleUser.email
      });
      alert("Googleと連携しました");
      location.reload();
    });

    document.getElementById("unlink")?.addEventListener("click", async () => {
      await updateDoc(userRef, {
        googleLinked: false,
        googleEmail: ""
      });
      alert("連携を解除しました");
      location.reload();
    });
  }
});
