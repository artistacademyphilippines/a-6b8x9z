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

/*
onAuthStateChanged(auth, (user) => {

  if (user) {
    
    var sessEmail = "";
    const currUser = auth.currentUser;

    if((loginEmail.value != "") && (loginEmail.value != null)) {
      sessEmail = loginEmail.value;
    }
    else if (sessionStorage.getItem('sessEmail') !== null) {
      sessEmail = sessionStorage.getItem('sessEmail');
    }
    else {
      sessEmail = user.email;
    }
    
    const path = ref(db, 'accounts/trainees/');
    onValue(path, (snapshot)=> {
      snapshot.forEach((childSnapshot)=> {

        if(childSnapshot.val().email == sessEmail) {

          var sessID = childSnapshot.key;
          var sessIP = childSnapshot.val().devices;
          var sessWarning = childSnapshot.val().warning;

          //check if status is for deletion

          if(childSnapshot.val().status == "deletion") { //if account status is for deletion
            
            //delete courses and batches records first
            const path2 = ref(db, 'courses/');
            onValue(path2, (snapshot)=> {
            
                snapshot.forEach((childSnapshot)=> {
                  //get course name
                  var sessCourses = childSnapshot.key;

                  const path3 = ref(db, 'courses/' + sessCourses + '/batch/');
                  get(path3).then((snapshot)=> {
                     
                      snapshot.forEach((childSnapshot)=> {
                        //get batch no.
                        var sessBatch = childSnapshot.key;

                        const path4 = ref(db, 'courses/' + sessCourses + '/batch/' + sessBatch + '/trainees/' + sessID);
                        remove(path4);

                      })
                    
                  })
                })
              
                remove(ref(db, 'accounts/trainees/' + sessID))
                .then(()=> {
                  deleteUser(currUser)
                  .then(()=> {
                    
                      alertMsg.innerText = "Account has been permanently removed";
                      alertMsg.style.opacity = "1";
                      loginEmail.value = "";
                      loginPw.value = "";
                      sessionStorage.clear();
                    
                  })
                })
              
            })
          }

          else if (childSnapshot.val().status == "suspended") { // check if account is suspended
            signOut(auth)
            .then(()=> {
              alertMsg.innerText = "Account has been temporarily suspended";
              alertMsg.style.opacity = "1";
              loginEmail.value = "";
              loginPw.value = "";
              sessionStorage.clear();
            })
          }

          else if (childSnapshot.val().status == "online") {

            fetch("https://api.ipify.org/?format=text&callback=getIP/")
            .then(res => res.text())
            .then(IP => getIP(IP));

            function getIP(IP) {
              
              if(IP == sessIP) {
                sessionStorage.setItem('sessEmail', sessEmail);
                window.location.replace('https://artcademy.ph/dashboard');
              }

              else {
                //check if there are multiple warnings
                if(sessWarning < 2) {
                        
                  update(ref(db, 'accounts/trainees/' + sessID), {
                    warning: sessWarning + 1,
                    status: "suspended"
                  })
                  .then(()=> {
                    signOut(auth)
                    .then(()=> {
                        alertMsg.innerText = "Account has been temporarily suspended";
                        alertMsg.style.opacity = "1";
                        loginEmail.value = "";
                        loginPw.value = "";
                        sessionStorage.clear();
                      })
                    })
                  }

                  else {
                    update(ref(db, 'accounts/trainees/' + sessID), {
                    status: "deletion"
                    })
                  }
              }
            }
          }
          
          else if(childSnapshot.val().status == "offline") {
            
            fetch("https://api.ipify.org/?format=text&callback=getIP/")
            .then(res => res.text())
            .then(IP => getIP(IP));

            function getIP(IP) {
              update(ref(db, 'accounts/trainees/' + sessID + '/'), {
                devices: IP
              })
              .then(()=> {
                window.location.replace('https://artcademy.ph/dashboard');
              })
            }
          }
          }
        })
      
    })

  }
    
  else {

    bodyBlue.style.visibility = "visible";
      
  } 

  });
*/
  bodyBlue.style.visibility = "visible";

  //---------------------validate login--------------------

function validateLogin() {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if ((loginEmail.value.match(validRegex)) && (loginPw.value != "")) { //check if login fields valid

      signInWithEmailAndPassword(auth, loginEmail.value, loginPw.value)
      .then(()=> {
        sessionStorage.setItem("sessEmail", loginEmail.value);
      })
      .catch((error)=> {
        if((error.code == "auth/wrong-password") || (error.code == "auth/user-not-found")) {
          alertMsg.innerText = "Email or password is incorrect";
          alertMsg.style.opacity = "1";
          document.getElementById('txtEmail').value = "";
          document.getElementById('txtPw').value = "";
        }
      })
      

    }
    else {
      alertMsg.innerText = "Email or password is incorrect";
      alertMsg.style.opacity = "1";
      document.getElementById('txtEmail').value = "";
      document.getElementById('txtPw').value = "";
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

window.location.replace("dashboard.html")


