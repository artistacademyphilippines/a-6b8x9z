import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, deleteUser} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
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

var sessEmail = sessionStorage.getItem("sessEmail");
var bodyBlue = document.getElementById('bodyBlue');


onAuthStateChanged(auth, (user) => {

    if (user) {
        
        if((sessEmail == user.email) && (sessEmail !== null)) {

            fetch("https://api.ipify.org/?format=text&callback=getIP/")
            .then(res => res.text())
            .then(IP => getIP(IP));

            function getIP(IP) {
                
                const path = ref(db, 'accounts/trainees/');
                onValue(path, (snapshot)=> {
                    snapshot.forEach((childSnapshot)=> {

                        var sessIP = childSnapshot.val().devices;

                        if (user.email == childSnapshot.val().email) {

                            if (IP == sessIP) {
                                
                                bodyBlue.style.visibility = "visible";
                            }
                        }
                    })
                })
            }
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

//--------------------------Load Course---------------------------
var dropCourse = document.getElementById('dropCourse');
var resources = document.getElementById('resources');

//-------------------------Play Videos---------------------------
const black = document.getElementById('black');
var btnPlayTrainingVids = document.getElementsByClassName('btnPlayTrainingVids');

//-------------------------Tables--------------------------------
const divAppTable = document.getElementsByClassName('divAppTable');
const btnExpand = document.getElementsByClassName('btnExpand');
const btnPlayFile = document.getElementsByClassName('btnPlayFile');
const btnDownloadFile = document.getElementsByClassName('btnDownloadFile');

function loadCourse() {
    var append = `<option value="Select Course" class="dropOption">Select Course</option>`;

    const path = ref(db, 'accounts/trainees/');
    get(path).then((snapshot)=> {
        snapshot.forEach((childSnapshot)=> {

            if(childSnapshot.val().email == sessEmail) {
                
                var sessID = childSnapshot.key;

                const path2 = ref(db, 'accounts/trainees/' + sessID + '/courses/');
                get(path2).then((snapshot)=> {
                    snapshot.forEach((childSnapshot)=> {
                        append+= `<option value="${childSnapshot.key}" class="dropOption">${childSnapshot.key}</option>`;
                    })
                    dropCourse.innerHTML = append;
                })

            }
        })
        
    })


}
loadCourse();

//-------------------------Load All Tables First------------------

function showTables() {
    if(dropCourse.value != "Select Course") {
        
        //add the first 2 default tables
        resources.innerHTML = 
        `<div class="frm" data-show = "false">
            <div class="entryHeader">
                <div class="leftHeader">
                <div class="appIconHeader"><img src="img-h6rv2c/imgCertificate.svg"></div>
                    <h1>Certificate</h1>
                </div>
                <img src="img-h6rv2c/btnExpand.svg" class="btnExpand">
            </div>
            <div class="bannerLine"></div>
            <div id="divCertiTable">
                            
            </div>        
        </div>
        <div class="frm" data-show = "false">
            <div class="entryHeader">
                <div class="leftHeader">
                <div class="appIconHeader"><img src="img-h6rv2c/imgLive.svg"></div>
                    <h1>Training Video</h1>
                </div>
                <img src="img-h6rv2c/btnExpand.svg" class="btnExpand">
            </div>
            <div class="bannerLine"></div>
            <div id="divTrainingTable">
                    
            </div>        
        </div>`; 

        // 1) add the apps related to course
        loadAppTable();
        
    }
    else {
        resources.innerHTML = "";
    }
}
dropCourse.addEventListener('change', showTables);

//----------------------------Add App Tables--------------------

function loadAppTable() {

    const path = ref(db, 'courses/' + dropCourse.value + '/resources/public/');
    get(path).then((snapshot)=> {
        var append = "";
        snapshot.forEach((childSnapshot)=> {
            
            append += 
                `<div class="frm" data-count = "${childSnapshot.key}" data-show = "false">
                    <div class="entryHeader">
                        <div class="leftHeader">
                            <div class="appIconHeader"><img src="${childSnapshot.val().appIcon}"></div>
                            <h1>${childSnapshot.val().appName}</h1>
                        </div>
                        <img src="img-h6rv2c/btnExpand.svg" class="btnExpand">
                    </div>
                    <div class="bannerLine"></div>
                    <div class="divAppTable">
                            
                    </div>        
                </div>`;        
                       
            }) 
            resources.innerHTML += append;

            // 2) next, add event listeners to btnExpand to all tables
            loadBtnExpand();
        })    
}

//--------------------------Load Certificate-----------------------

function loadCerti() {

    const divCertiTable = document.getElementById('divCertiTable');

    if(dropCourse.value != "Select Course") {

        var append = "";

        const path = ref(db, 'accounts/trainees/');
        get(path).then((snapshot)=> {
            
            snapshot.forEach((childSnapshot)=> {

                if(childSnapshot.val().email == sessEmail) {

                    var sessID = childSnapshot.key;

                    const path2 = ref(db, 'accounts/trainees/' + sessID + '/courses/' + dropCourse.value + '/batch/');
                    get(path2).then((snapshot)=> {
                        snapshot.forEach((childSnapshot)=> {
                            var sessBatch = childSnapshot.key;
                            const path3 = ref(db, 'courses/' + dropCourse.value + '/batch/' + sessBatch + '/');
                            get(path3).then((snapshot)=> {
                                
                                append+= 

                                `<div class="tableFileEntry">   
                                    <div class="tableFileID"></div>   
                                    <div class="tableFileTitle"><h1>${dropCourse.value}-${sessBatch}</h1></div>                        
                                    <div class="tableFileControls">
                                        <img src="img-h6rv2c/btnDownload.png" onclick="window.open('${snapshot.val().certificates}')">
                                
                                    </div>
                                </div>
                                <div class="bannerLine"></div>`;
                               
                                divCertiTable.innerHTML = append;
                            })
                           
                        })
                       
                    })
               
                }
                
            })
         
        })
    }

}

//---------------------------Training Videos-----------------------

function playTrainingVids() {

    var vidTitle = this.parentElement.parentElement.children[1].innerText;

    black.style.opacity = 1;
    black.style.background = "rgba(0,0,0,0.3)";
    black.style.visibility = "visible";
    black.style.transition = "opacity .5s";


    const path = ref(db, 'courses/' + dropCourse.value + '/batch/');
    get(path).then((snapshot)=> {

        snapshot.forEach((childSnapshot)=> {

            console.log(childSnapshot.key)
            var newKey = childSnapshot.key;

            const path2 = ref(db, 'courses/' + dropCourse.value + '/batch/' + newKey + '/trainingVideos/');
            get(path2).then((snapshot)=> {
                
                snapshot.forEach((childSnapshot)=> {

                //console.log(vidTitle + ' ' + childSnapshot.key + ' ' + childSnapshot.val().link + ' ' + childSnapshot.val().views);
                    
                if(childSnapshot.key == vidTitle) {
                        
                    black.innerHTML = `
                        <iframe src="${childSnapshot.val().link}" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>
                        `;

                    var oldViews = childSnapshot.val().views;

                    update(ref(db, 'courses/' + dropCourse.value + '/batch/' + newKey + '/trainingVideos/' + vidTitle + '/'), {
                        views: oldViews + 1
                    })
                }
            })
        })
    })

}

function loadTrainingVideos() {

    const divTrainingTable = document.getElementById('divTrainingTable');

    if(dropCourse.value != "Select Course") {

        var append = "";
    
        const path = ref(db, 'accounts/trainees/');
        get(path).then((snapshot)=> {
        
            snapshot.forEach((childSnapshot)=> {

                if(childSnapshot.val().email == sessEmail) {

                    var sessID = childSnapshot.key;

                    const path2 = ref(db, 'accounts/trainees/' + sessID + '/courses/' + dropCourse.value + '/batch/');
                    get(path2).then((snapshot)=> {
                        snapshot.forEach((childSnapshot)=> {
                            var sessBatch = childSnapshot.key;
                            const path3 = ref(db, 'courses/' + dropCourse.value + '/batch/' + sessBatch + '/trainingVideos/');
                            get(path3).then((snapshot)=> {
                                snapshot.forEach((childSnapshot)=> {
                                    append += 

                                    `<div class="tableFileEntry">     
                                        <div class="tableFileID"></div> 
                                        <div class="tableFileTitle"><h1>${childSnapshot.key}</h1></div>                        
                                        <div class="tableFileControls">
                                            <img src="img-h6rv2c/btnPlay.png" class="btnPlayTrainingVids">
                                        </div>
                                    </div>
                                    <div class="bannerLine"></div>`;
                                })

                                divTrainingTable.innerHTML = append;

                                for(var a = 0; a < btnPlayTrainingVids.length; a++) {
                                    btnPlayTrainingVids[a].addEventListener('click', playTrainingVids);
                                }
                                
                            })
                            
                        })
                        
                    })
                    
                }
                
            })
            
        })
    }
}

//----------------------------Load All App Data--------------------

function loadAppData() {

    const path = ref(db, 'courses/' + dropCourse.value + '/resources/public/');

    onValue(path, (snapshot)=> {

        for(var a = 1; a <= snapshot.size; a++) {
            var append = "";
            var append2 = [];
            const path2 = ref(db, 'courses/' + dropCourse.value + '/resources/public/' + a + '/files/');
            
            onValue(path2, (snapshot)=>{  

                snapshot.forEach((childSnapshot)=> {   
                    
                    if(childSnapshot.val().fileLink != "") {
                        append+= 
                        `<div class="tableFileEntry">     
                            <div class="tableFileID"></div>                        
                            <div class="tableFileTitle"><h1>${childSnapshot.val().videoTitle}</h1></div>
                            <div class="tableFileControls">
                                <img src="img-h6rv2c/btnDownload.png" class="btnDownloadFile">
                                <img src="img-h6rv2c/btnPlay.png" class="btnPlayFile">
                            </div>
                        </div>
                        <div class="bannerLine"></div>`;
                    }

                    else {
                        append+= 
                        `<div class="tableFileEntry">     
                            <div class="tableFileID"></div>                        
                            <div class="tableFileTitle"><h1>${childSnapshot.val().videoTitle}</h1></div>
                            <div class="tableFileControls">
                                <img src="img-h6rv2c/btnPlay.png" class="btnPlayFile">
                            </div>
                        </div>
                        <div class="bannerLine"></div>`;
                    }
                    
                })
                append2[a] = append;

                divAppTable[a-1].innerHTML = append2[a];
                
                for(var z = 0; z < tableFileControls.length; z++) {
                    btnPlayFile[z].addEventListener('click', playFile);
                    btnDownloadFile[z].addEventListener('click', downloadFile);
                }
            })
            
        }

    })

}

//---------------------------Expand & Collapse---------------------

function showHideRes() {
    var frmShow = this.parentElement.parentElement.dataset.show;

    if(frmShow == "false") {
        var newAppTable = this.parentElement.parentElement.children[2];
        this.style.transform = "rotate(-180deg)";
        newAppTable.style.display = "inline-flex";
        newAppTable.style.flexDirection = "column";
        this.parentElement.parentElement.dataset.show = "true"
    }
    else {
        
        var newAppTable = this.parentElement.parentElement.children[2];
        this.style.transform = "rotate(0deg)";
        newAppTable.style.display = "none";
        this.parentElement.parentElement.dataset.show = "false"
        
    }

     // 3) next, load the contents for all tables
    loadCerti();
    loadTrainingVideos();
    loadAppData();
}

function loadBtnExpand() {
    for(var a = 0; a < btnExpand.length; a++) {     
        btnExpand[a].addEventListener('click', showHideRes);
    }    
}


//------------------------Check IF Online (Multiple Tabs)--------------------------

function checkIfOnline() {

    var oAuth = sessionStorage.getItem("oAuth");
    var sessEmail = sessionStorage.getItem('sessEmail');

    if(oAuth == "out") {

        const path = ref(db, 'accounts/trainees/');
        get(path).then((snapshot)=> {
            snapshot.forEach((childSnapshot)=> {
                if(childSnapshot.val().email == sessEmail) {
                    var sessID = childSnapshot.key;

                    update(ref(db, 'accounts/trainees/' + sessID + '/'), {
                        status: "offline",
                        devices: 0
                    })
                    .then(()=> {
                        signOut(auth)
                        .then(()=> {
                            sessionStorage.clear();
                        })
                        .catch((error)=> {
                            alert(error.code);
                        })
                    })
                }
            })
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

                            if(childSnapshot.val().status == "suspended") {
                                signOut(auth)
                                .then(()=> {
                                    sessionStorage.clear();
                                })
                                .catch((error)=> {
                                    alert(error.code);
                                }) 
                            }

                            else if (childSnapshot.val().status == "deletion") {
    
                                sessionStorage.clear();
                                window.location.replace("https://artcademy.ph/login");

                            }

                            else {
                                var newDate = new Date();
                                var currMonth = newDate.getMonth() + 1;
                                var currDate = newDate.getDate();
                                var currYear = newDate.getFullYear();
            
                                fetch("https://api.ipify.org/?format=text&callback=getIP/")
                                .then(res => res.text())
                                .then(IP => getIP(IP));

                                function getIP(IP) {
                                    update(ref(db, 'accounts/trainees/' + sessID), {
                                        devices: IP,
                                        status: "online",
                                        lastOnline: currMonth + "." + currDate + "." + currYear
                                    })
                                    .catch((error)=> {
                                        alert(error.code);
                                    })
                                }
                            }
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
    
    const path = ref(db, 'accounts/trainees/');

    onValue(path, (snapshot)=> {
        var sessEmail = sessionStorage.getItem('sessEmail');
        snapshot.forEach((childSnapshot)=> {
            
            if(sessEmail == childSnapshot.val().email) {
                var sessID = childSnapshot.key;

                var checkCon = ref(db, 'accounts/trainees/' + sessID + '/');
                onDisconnect(checkCon).update({
                    status: "offline",
                    devices: 0
                })
            }
        })
    })
}

checkIfOffline();
