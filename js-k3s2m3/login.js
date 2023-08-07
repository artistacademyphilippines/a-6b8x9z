//------------------------Firebase--------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, deleteUser } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, onValue, get, set, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

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

//--------------------------------Banner--------------------------------------

var t = .002*window.innerWidth;
var c = window.innerWidth;
var scrollingBannerText = document.getElementById('pBanner');
const scrollingBanner = document.getElementById('divBanner');
var bannerContainer = document.getElementById('bannerContainer');
bannerContainer.style.transform = "translateX(" + window.innerWidth +"px)";

//----------------------------Common Banner codes---------------------
function checkBanner() {
    
    const path = ref(db, 'settings/banner');
    onValue(path, (snapshot) => {
        if(snapshot.exists()) {

            scrollingBannerText.innerText = snapshot.val().message;
            if(snapshot.val().status === true) {
                scrollingBanner.style.visibility = "visible";
            }
            else {
                scrollingBanner.style.visibility = "hidden";
            }
        }
    });
}
checkBanner();

function bannerAnimation() {
    c -= .5;
    bannerContainer.style.transform = "translateX(" + c +"px)";
    if(c < (bannerContainer.offsetWidth*-1)) {
        c = window.innerWidth;
        bannerContainer.style.transform = "translateX(" + window.innerWidth +"px)";
    }
}
setInterval(bannerAnimation, t);


  //---------------------Functions---------------------
  var loginEmail = document.querySelector('#txtEmail');
  var loginPw = document.querySelector('#txtPw');
  const btnLogin = document.getElementById('btnLogin');
  var alertMsg = document.querySelector('#alertMessage');
  
  //--check first if user is currently logged in

var bodyBlue = document.getElementById('bodyBlue');

onAuthStateChanged(auth, (user) => {

  if (user) {
    
    var sessEmail = "";

    if((loginEmail.value != "") && (loginEmail.value != null)) {
      sessEmail = loginEmail.value;
    }
    else {
      sessEmail = sessionStorage.getItem('sessEmail');
    }
    
    const path = ref(db, 'accounts/trainees/');
    onValue(path, (snapshot)=> {
      snapshot.forEach((childSnapshot)=> {

        var sessID = childSnapshot.key;
        var sessWarning = childSnapshot.val().warning;

        if(childSnapshot.val().email == sessEmail) {

          //check if status is for deletion

           if (childSnapshot.val().status == "online") {
            //check if there are multiple warnings
            if(sessWarning < 2) {
              
              update(ref(db, 'courses/trainees/' + sessID), {
                warning: sessWarning + 1,
                status: "suspended"
              })
              .then(()=> {
                signOut(auth)
                .then(()=> {
                  alertMsg.innerText = "Account has been temporarily suspended";
                  alertMsg.style.opacity = "1";
                })
              })
            }

            else {
              update(ref(db, 'courses/trainees/' + sessID), {
                status: "deletion"
              })
            }
          }

          else if(childSnapshot.val().status == "offline") {
            window.location.replace('https://artcademy.ph/dashboard');
          }
        }
      })
    })

  }
    
  else {
      
    bodyBlue.style.visibility = "visible";
      
  } 

  });

  //---------------------validate login--------------------

  function validateLogin() {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if ((loginEmail.value.match(validRegex)) && (loginPw.value != "")) { //check if login fields valid

      signInWithEmailAndPassword(auth, loginEmail.value, loginPw.value)
      .then(()=> {
        sessionStorage.setItem("sessEmail", loginEmail.value);
        sessionStorage.setItem("sessPw", loginPw.value);

      })
      .catch((error)=> {
        alert(error.code + ", " + error.message);
      })
      

    }
    else {
      alertMsg.innerText = "Email or password is incorrect";
      alertMsg.style.opacity = "1";
    }
  }

  //-------------on enter, use function login---------------
  function pressEnter(e) {
    if(e.code === "Enter") {
      validateLogin();
    }
  }

  btnLogin.addEventListener("click", validateLogin);
  loginEmail.addEventListener("keydown", pressEnter);
  loginPw.addEventListener("keydown", pressEnter);

//-------------------------Reset Texts---------------------

function clearText() {
  document.querySelector('#txtEmail').value = "";
  document.querySelector('#txtPw').value = "";
}
window.addEventListener("pageshow", clearText);




//------------------SECURITY LAYERS--------------------


//security layers 

    //check if account status is for deletion

    //check if account status is suspended

    //check how many devices are currently online

    //if devices > 2 then warning + 1 and suspend the status

    //if warning == 2 then status: for deletion

    /*

    const path = ref(db, "accounts/trainees/");
    
    onValue(path, (snapshot)=> {
        snapshot.forEach((childSnapshot)=> {
            if(childSnapshot.val().email == loginEmail.value) {
                if(childSnapshot.val().status == "deletion") {
                    signOut(auth)
                    .then(()=>{
                        loginEmail.value = "";
                        loginPw.value = "";
                        alertMsg.innerText = "Account has been permanently removed";
                        alertMsg.style.opacity = "1";
                    })
                }

                else if(childSnapshot.val().status == "suspended") {
                    loginEmail.value = "";
                    loginPw.value = "";
                    alertMsg.innerText = "Account has been suspended due to multiple logins";
                    alertMsg.style.opacity = "1";
                }

                else if(childSnapshot.val().status == "online") {
                    
                    //check if devices
                   
                }   
            }
        })
    })
  */
