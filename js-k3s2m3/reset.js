
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail }  from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyADks-XldL82do7F8_A46cAWb6ZnDjQ3Yk",
  authDomain: "projartcademyph-29663.firebaseapp.com",
  databaseURL: "https://projartcademyph-29663-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projartcademyph-29663",
  storageBucket: "projartcademyph-29663.appspot.com",
  messagingSenderId: "651674935886",
  appId: "1:651674935886:web:629aefbab24dd2a154991f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


var bodyBlue = document.getElementById('bodyBlue');
bodyBlue.style.visibility = "visible";

//----------------------Functions----------------------

var loginEmail = null;
var alertMsg = document.querySelector('#alertMessage');
var btnConfirm = document.querySelector('#btnConfirm');

const resetPw = async() => {
   loginEmail = document.querySelector('#txtEmail').value;

   sendPasswordResetEmail(auth, loginEmail)
   .then(() => {
       alertMsg.innerText = "Password reset was sent to your email";
       alertMsg.style.color = "Aquamarine";
       alertMsg.style.opacity = "1";
       document.querySelector('#txtEmail').value = "";
       setInterval(reLogin, 5000);
   })
   .catch(() => {
       alertMsg.innerText = "Account does not exist or has been removed";
       alertMsg.style.opacity = "1";
       
   })
}
btnConfirm.addEventListener("click", resetPw);

function reLogin() {
   window.location.replace('https://artcademy.ph/login');
}
