import { auth, db } from './firebase.js';
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

document.getElementById("show-timetable")?.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  const userSnap = await getDoc(doc(db, "users", user.uid));
  if (!userSnap.exists()) return;

  const userData = userSnap.data();
  const course = userData.course.toUpperCase(); // AG/SG/本科
  const ttSnap = await getDoc(doc(db, "timetables", course));

  if (!ttSnap.exists()) {
    document.getElementById("content").innerHTML = "時間割が登録されていません";
    return;
  }

  const timetable = ttSnap.data().schedule;
  let html = `<h2>${course}コース 時間割</h2><table>`;
  for (let day in timetable) {
    html += `<tr><th>${day}</th>`;
    timetable[day].forEach((period) => {
      html += `<td>${period}</td>`;
    });
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("content").innerHTML = html;
});
