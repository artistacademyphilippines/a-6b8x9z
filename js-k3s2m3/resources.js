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

var sessEmail = sessionStorage.getItem("sessEmail");
var bodyBlue = document.getElementById('bodyBlue');

onAuthStateChanged(auth, (user) => {

    if (user) {

        if(sessEmail == user.email) {
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
    var append = `<option value="Select Course" class="dropOption">Select Course</option>`;

    const path = ref(db, 'accounts/trainees/');
    onValue(path, (snapshot)=> {
        snapshot.forEach((childSnapshot)=> {

            if(childSnapshot.val().email == sessEmail) {
                
                var sessID = childSnapshot.key;

                const path2 = ref(db, 'accounts/trainees/' + sessID + '/courses/');
                onValue(path2 ,(snapshot)=> {
                    snapshot.forEach((childSnapshot)=> {
                        append+= `<option value="${childSnapshot.key}" class="dropOption">${childSnapshot.key}</option>`;
                    })
                    
                })

            }
        })
        dropCourse.innerHTML = append;
    })

}
loadCourse();

//--------------------------Load Certificate-----------------------

function loadCerti() {

    var divCerti = document.getElementById('divCerti');
    
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
                                ` <div class="clickables">
                                    <h2>${dropCourse.value}_${sessBatch}</h2>
                                    <img src="img-h6rv2c/btnDownload.png" onclick="window.open('${snapshot.val().certificates}')">
                                </div>
                                <div class="clickLines"></div>`;
                                divCerti.innerHTML = append;
                            })
                           
                        })
                       
                    })
               
                }
                
            })
         
        })
    }

}

//---------------------------Training Videos-----------------------
const black = document.getElementById('black');
var btnPlayTrainingVids = document.getElementsByClassName('btnPlayTrainingVids');

function playTrainingVids() {
    var vidTitle = this.parentElement.children[0].innerText;
    
    black.style.opacity = 1;
    black.style.background = "rgba(0,0,0,0.3)";
    black.style.visibility = "visible";
    black.style.transition = "opacity .5s";
    
    
    const path = ref(db, 'accounts/trainees/');
    get(path).then((snapshot)=> {
    
        snapshot.forEach((childSnapshot)=> {

            if(childSnapshot.val().email == sessEmail) {

                var sessID = childSnapshot.key;

                const path2 = ref(db, 'accounts/trainees/' + sessID + '/courses/' + dropCourse.value + '/batch/');
                get(path2).then((snapshot)=> {
                    snapshot.forEach((childSnapshot)=> {

                        var sessBatch = childSnapshot.key;
                        const path3 = ref(db, 'courses/' + dropCourse.value + '/batch/' + sessBatch + '/trainingVideos/' + vidTitle + '/');
                        get(path3).then((snapshot)=> {
                            
                            black.innerHTML = `
                            <iframe src="${snapshot.val().link}" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>
                            `;

                            var oldViews = snapshot.val().views;

                            update(ref(db, 'courses/' + dropCourse.value + '/batch/' + sessBatch + '/trainingVideos/' + vidTitle + '/'), {
                                views: oldViews + 1
                            })
                        })
                    
                    })
                 
                })
                
            }
           
        })
     
    }) 
    
}

function loadTrainingVideos() {

    var divTrainingVids = document.getElementById('divTrainingVids');

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
                                    `<div class="clickables">
                                        <h2>${dropCourse.value + '_' + sessBatch + '_' + childSnapshot.key}</h2>
                                        <img src="img-h6rv2c/btnPlay.png" class="btnPlayTrainingVids">
                                    </div>
                                    <div class="clickLines"></div>`;
                                })

                                divTrainingVids.innerHTML = append;

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

//----------------------------Other Videos--------------------------

var btnPlayOtherVids = document.getElementsByClassName('btnPlayOtherVids');

function playOtherVids() {

    var vidTitle = this.parentElement.children[0].innerText;
    
    black.style.opacity = 1;
    black.style.background = "rgba(0,0,0,0.3)";
    black.style.visibility = "visible";
    black.style.transition = "opacity .5s";

    const path = ref(db, 'courses/' + dropCourse.value + '/resources/public/videos/' + vidTitle + '/');
    get(path).then((snapshot)=> {

        black.innerHTML = `
        <iframe src="${snapshot.val().link}" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>
        `;

        var oldViews = snapshot.val().views;

        update(ref(db, 'courses/' + dropCourse.value + '/resources/public/videos/' + vidTitle + '/') , {
            views: oldViews + 1
        })

    })
}

function loadOtherVideos() {

    var divOtherVids = document.getElementById('divOtherVids');

    if(dropCourse.value != "Select Course") {

        var append = "";
        const path = ref(db, 'courses/' + dropCourse.value + '/resources/public/videos/');

        get(path).then((snapshot)=> {
            snapshot.forEach((childSnapshot)=> {

                append += 
                `<div class="clickables">
                    <h2>${childSnapshot.key}</h2>
                    <img src="img-h6rv2c/btnPlay.png" class="btnPlayOtherVids">
                </div>
                <div class="clickLines"></div>`;
                
            })
            
            divOtherVids.innerHTML = append;
            for(var a = 0; a < btnPlayOtherVids.length; a++) {
                btnPlayOtherVids[a].addEventListener('click', playOtherVids);
            }
        })
        
    }

}

//-----------------------------Basic Files-------------------------

var btnBasicFiles = document.getElementsByClassName('btnBasicFiles');

function downloadBasicFiles() {
    var fileName = this.parentElement.children[0].innerText;

    const path = ref(db, 'courses/' + dropCourse.value + '/resources/public/files/' + fileName + '/');
    get(path).then((snapshot)=> {
        window.location.href = snapshot.val().link;

        newDownload = snapshot.val().downloads + 1;

        update(path, {
            downloads: newDownload
        })
    })
}

function loadBasicFiles() {

    var divBasicFiles = document.getElementById('divBasicFiles');

    if(dropCourse.value != "Select Course") {
        var append = "";

        const path = ref(db, 'courses/' + dropCourse.value + '/resources/public/files/');
        get(path).then((snapshot)=> {
            snapshot.forEach((childSnapshot)=> {
                append += 
                `<div class="clickables">
                    <h2>${childSnapshot.key}</h2>
                    <img src="img-h6rv2c/btnDownload.png" class="btnBasicFiles">
                </div>
                <div class="clickLines"></div>`;
            })

            divBasicFiles.innerHTML = append;
            for(var a = 0; a < btnBasicFiles.length; a++) {
                btnBasicFiles[a].addEventListener('click', downloadBasicFiles);
            }
        })
    }
}

function clearFields() {
    if(dropCourse.value == "Select Course") {
        document.getElementById('divBasicFiles').innerHTML = "";
        document.getElementById('divOtherVids').innerHTML = "";
        document.getElementById('divTrainingVids').innerHTML = "";
        document.getElementById('divCerti').innerHTML = "";
    }
}

dropCourse.addEventListener('change', loadCerti);
dropCourse.addEventListener('change', loadTrainingVideos);
dropCourse.addEventListener('change', loadOtherVideos);
dropCourse.addEventListener('change', loadBasicFiles);
dropCourse.addEventListener('change', clearFields);



//------------------------Check IF Online (Multiple Tabs)--------------------------

function checkIfOnline() {

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
