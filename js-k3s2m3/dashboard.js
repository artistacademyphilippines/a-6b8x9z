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

var bodyBlue = document.getElementById('bodyBlue');

onAuthStateChanged(auth, (user) => {

    if (user) {

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


//---------------------------Get Header---------------------------------------

var fullname = document.getElementById("fullname");
var traineeID = document.getElementById("traineeID");
var frm1 = document.getElementById("frm1");

function getHeader() {

    var append = "";

    const path = ref(db, 'accounts/trainees/');
    get(path).then((snapshot)=> {
        snapshot.forEach((childSnapshot=> {
            var sessEmail = sessionStorage.getItem('sessEmail');

            if(sessEmail == childSnapshot.val().email) {
                append = 

                `<div id="fullname">${childSnapshot.val().name}</div>
                <input id="traineeID" value = "${childSnapshot.key}" readonly>`;
            }
        }))
        frm1.innerHTML = append;
    })
}


//------------------------Check Conn--------------------------
function checkConn() {
    var sessEmail = sessionStorage.getItem('sessEmail');
    const path = ref(db, 'accounts/trainees/');
    get(path).then((snapshot)=> {
        snapshot.forEach((childSnapshot)=> {

            if(sessEmail == childSnapshot.val().email) {
                var sessID = childSnapshot.key;

                var checkCon = ref(db, 'accounts/trainees/' + sessID + '/status/');
                onDisconnect(checkCon).set("offline");
            }
        })
    })
}

checkConn();

//set(onDisconnect(ref(db, 'accounts/status/T230729180616/')), {
//    status: "offline"
//})
