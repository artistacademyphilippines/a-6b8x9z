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

var frm1 = document.getElementById("frm1");
var frm2 = document.getElementById("frm2");

function copyMe() {
    var copyText = this;
    copyText.focus();
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
}

function getHeader() {

    var append = "";

    const path = ref(db, 'accounts/trainees/');
    onValue(path, (snapshot)=> {
        var sessEmail = sessionStorage.getItem('sessEmail');
        snapshot.forEach((childSnapshot=> {
    
            if(sessEmail == childSnapshot.val().email) {
                append = 

                `<div id="fullname">${childSnapshot.val().name}</div>
                <input type="text" id="traineeID" value = "ID: ${childSnapshot.key}" readonly>`;
            }
        }))
        frm1.innerHTML = append;
        document.getElementById('traineeID').addEventListener('click', copyMe);
    })
}
getHeader();


//-----------------------------------CARDS----------------------------------------

const dot1 = document.getElementById('dot1');
dot1.style.backgroundColor = "white";
const dot2 = document.getElementById('dot2');
const dot3 = document.getElementById('dot3');
var card1, card2, card3 = null;

//--------------------------------Load Cards---------------------------------------

function loadCards() {
    var append = "";

    const path = ref(db, 'settings/cards/');
    onValue(path, (snapshot)=> {
        snapshot.forEach((childSnapshot)=> {
            
            append+=`<div id="card${childSnapshot.key}" class="cards"><img src="${childSnapshot.val().link}" class="imgCards"></div>`;
        })
        frm2.innerHTML = append;
        card1 = document.getElementById('card1');
        card2 = document.getElementById('card2');
        card3 = document.getElementById('card3');
    })
}
loadCards();

//--------------------------------Slide Cards--------------------------------------

function slideCards() {
    var a = frm2.scrollLeft;
    var b = frm2.scrollWidth - frm2.clientWidth;
    var c = (a / b) * 100;

    if (c < 25) {
        dot1.style.backgroundColor = "white";
        dot2.style.backgroundColor = "transparent";
        dot3.style.backgroundColor = "transparent";
    }

    else if((c >= 25) && (c <= 75)) {
        dot1.style.backgroundColor = "transparent";
        dot2.style.backgroundColor = "white";
        dot3.style.backgroundColor = "transparent";
    }

    else if(c > 75) {
        dot1.style.backgroundColor = "transparent";
        dot2.style.backgroundColor = "transparent";
        dot3.style.backgroundColor = "white";
    }

}
frm2.addEventListener("scroll", slideCards);


//----------------------------------Tap Cards-----------------------------------
var newCard = 1;

function tapCards() {
    if(this.id == 'dot1') {
        card1.scrollIntoView();
        newCard = 1;
    }
    else if(this.id == 'dot2') {
        card2.scrollIntoView();
        newCard = 2;
    }
    else if(this.id == 'dot3') {
        card3.scrollIntoView();
        newCard = 3;
    }
}
dot1.addEventListener('click', tapCards);
dot2.addEventListener('click', tapCards);
dot3.addEventListener('click', tapCards);


//----------------------------------Autoplay Cards--------------------------------

function playCards() {
    if(newCard == 1) {
        card1.scrollIntoView();
        newCard +=1;
    }
    else if(newCard == 2) {
        card2.scrollIntoView();
        newCard +=1;
    }
    else if(newCard == 3) {
        card3.scrollIntoView();
        newCard = 1;
    }
}
setInterval(playCards, 3000);

//------------------------Check IF Online (Multiple Tabs)--------------------------

function checkIfOnline() {

    var oAuth = sessionStorage.getItem("oAuth");
    if(oAuth == "out") {
        signOut(auth)
        .then(()=> {
            sessionStorage.clear();
        })
        .catch((error)=> {
            alert(error.code);
        })
    }

    else {

        var path = ref(db, ".info/connected");
        onValue(path, (snap) => {
            if (snap.val() === true) {
                
                var path2 = ref(db, 'accounts/trainees/');
                
                get(path2).then((snapshot)=> {
                    snapshot.forEach((childSnapshot)=> {
                        
                        var sessEmail = sessionStorage.getItem('sessEmail');

                        if(childSnapshot.val().email == sessEmail) {

                            var sessID = childSnapshot.key;
                            
                            update(ref(db, 'accounts/trainees/' + sessID), {
                                status: "online"
                            })
                            .catch((error)=> {
                                alert(error.code);
                            })
                        }
                    })
                })

            } 
            
        });

    }
}
setInterval(checkIfOnline, 500);


//------------------------Check IF Offline--------------------------

function checkIfOffline() {
    var sessEmail = sessionStorage.getItem('sessEmail');
    const path = ref(db, 'accounts/trainees/');
    get(path).then((snapshot)=> {
        snapshot.forEach((childSnapshot)=> {
            
            if(sessEmail == childSnapshot.val().email) {
                var sessID = childSnapshot.key;

                var checkCon = ref(db, 'accounts/trainees/' + sessID + '/status/');
                onDisconnect(checkCon).set("offline")
                .then(()=> {
                    var newDate = new Date();
                    var currMonth = newDate.getMonth() + 1;
                    var currDate = newDate.getDate();
                    var currYear = newDate.getFullYear();

                    const path2 = ref(db, 'accounts/trainees/' + sessID + '/');
                    update(path2, {
                        lastOnline: currMonth + "." + currDate + "." + currYear
                    })
                })
            }
        })
    })
}

checkIfOffline();
