import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
    let email = document.querySelector(`#Semail`).value
    let password = document.querySelector(`#Spass`).value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            location.href = `./poll.html`
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
})

const handleAuthStateChange = (user) => {
    if (user) {
      
      console.log('User is logged in:', user.email);

      location.href = `./poll.html`;

    } else {
    
      console.log('User is logged out');
    }
  };
  

onAuthStateChanged(auth, handleAuthStateChange);