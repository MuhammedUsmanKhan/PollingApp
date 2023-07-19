import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCF2yyZWvuhI8zi6xjjVSeXWDSThFBBcjs",
  authDomain: "pollingapp-77439.firebaseapp.com",
  projectId: "pollingapp-77439",
  storageBucket: "pollingapp-77439.appspot.com",
  messagingSenderId: "806113223674",
  appId: "1:806113223674:web:dc53f6fb392cc34cf1ba43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


let but = document.querySelector(`#but`)

but.addEventListener(`click`, () => {
  let email = document.querySelector(`#uemail`).value
  let password = document.querySelector(`#upass`).value
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("hogaya")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
})
