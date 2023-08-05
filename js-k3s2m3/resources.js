import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, onValue, update, get, onDisconnect, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

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
const auth = getAuth(app);
const db = getDatabase();


//--check first if user is currently logged in
var userEmail = "";
var bodyBlue = document.getElementById('bodyBlue');

onAuthStateChanged(auth, (user) => {

    if (user) {

        userEmail = user.email;
        console.log(userEmail);
        var sessEmail = sessionStorage.getItem("sessEmail");
        
        if((sessEmail != "") && (sessEmail != null)) {
            bodyBlue.style.visibility = "visible";

        }
        
        else {
          signOut(auth);
        }

    }

    else {
      
        window.location.replace('https://artcademy.ph/login');
      
    } 

});


//--------------------------Load Course---------------------------

var dropCourse = document.getElementById('dropCourse');

function loadCourse() {
    var append = `<option value="none" class="dropOption">Select Course</option>`;

    const path = ref(db, 'accounts/trainees/');

}

