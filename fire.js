import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
 
const firebaseConfig = {
  apiKey: "AIzaSyBR5q84V1TTVQN83OVbu-29gltbi3A3NG4",
  authDomain: "playground-b71d5.firebaseapp.com",
  databaseURL:
    "https://playground-b71d5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "playground-b71d5",
  storageBucket: "playground-b71d5.appspot.com",
  messagingSenderId: "429815700774",
  appId: "1:429815700774:web:7fff91fd677c71a7a335e7",
};
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
console.log(database);
const moviesDb = ref(database, "movies");

let btn = document.getElementById("add-button");
let input = document.getElementById("input-field");
const shop = document.getElementById("shop");

onValue(moviesDb, function (snapshot) {
  if (snapshot.exists() == true) {
    let items = Object.entries(snapshot.val());
    clrshop();

    for (let i = 0; i < items.length; i++) {
      let currentitem = items[i];
      let currentitemval = currentitem[1];
      let currentitemid = currentitem[0];
      appenditem(currentitem);
    }
  } else {
    shop.innerHTML = "";
  }
});

btn.addEventListener("click", (e) => {
  let inputvalue = input.value;
  push(moviesDb, inputvalue);
  clear();
  // appenditem(inputvalue);
});
function clear() {
  input.value = " ";
}
function appenditem(inputitem) {
  // shop.innerHTML+=` <li>${inputvalue} </li>`;
  let inputvalue = inputitem[1];
  let inputid = inputitem[0];
  let newli = document.createElement("li");
  newli.textContent = inputvalue;
  newli.addEventListener("click", () => {
    console.log(inputid);
    let exactloc = ref(database, `movies/${inputid}`);
    remove(exactloc);
  });
  shop.appendChild(newli);
}
function clrshop() {
  shop.innerHTML = "";
}
