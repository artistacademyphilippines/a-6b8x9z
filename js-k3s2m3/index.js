//------------------------Firebase--------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

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

var bodyBlue = document.getElementById('bodyBlue');
bodyBlue.style.visibility = "visible";

const rightCard = document.getElementById('rightCard');
const imgCloud = document.getElementById('imgCloud');
const divParticles = document.getElementById('divParticles');

imgCloud.style.transform = "translate("+ (rightCard.clientWidth * -1) + "px, 0px)";

window.addEventListener('resize', ()=> {
    imgCloud.style.transform = "translate("+ (rightCard.clientWidth * -1) + "px, 0px)";
})
