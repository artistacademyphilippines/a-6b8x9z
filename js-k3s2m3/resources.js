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
    var append = `<option value="Select  Course" class="dropOption">Select Course</option>`;

    const path = ref(db, 'accounts/trainees/');
    onValue(path, (snapshot)=> {
        snapshot.forEach((childSnapshot)=> {

            if(childSnapshot.val().email == sessEmail) {
                
                var sessID = childSnapshot.key;

                const path2 = ref(db, 'accounts/trainees/' + sessID + '/courses/');
                onValue(path2, (snapshot)=> {
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
        const path = ref(db, 'accounts/trainees/');
        onValue(path, (snapshot)=> {
            
            var append = "";
            
            snapshot.forEach((childSnapshot)=> {

                if(childSnapshot.val().email == sessEmail) {

                    var sessID = childSnapshot.key;

                    const path2 = ref(db, 'accounts/trainees/' + sessID + '/courses/' + dropCourse.value + '/batch/');
                    onValue(path2, (snapshot)=> {
                        snapshot.forEach((childSnapshot)=> {
                            var sessBatch = childSnapshot.key;
                            const path3 = ref(db, 'courses/' + dropCourse.value + '/batch/' + sessBatch + '/');
                            onValue(path3, (snapshot)=> {
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

    else {

        console.log(dropCourse.value);
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
    
    /*
    const path = ref(db, 'accounts/trainees/');
    onValue(path, (snapshot)=> {
    
        snapshot.forEach((childSnapshot)=> {

            if(childSnapshot.val().email == sessEmail) {

                var sessID = childSnapshot.key;

                const path2 = ref(db, 'accounts/trainees/' + sessID + '/courses/' + dropCourse.value + '/batch/');
                onValue(path2, (snapshot)=> {
                    snapshot.forEach((childSnapshot)=> {

                        var sessBatch = childSnapshot.key;
                        const path3 = ref(db, 'courses/' + dropCourse.value + '/batch/' + sessBatch + '/trainingVideos/' + vidTitle + '/');
                        onValue(path3, (snapshot)=> {
                            
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
     
    }) */
    
}

function loadTrainingVideos() {

    var divTrainingVids = document.getElementById('divTrainingVids');

    if(dropCourse.value != "Select Course") {
        const path = ref(db, 'accounts/trainees/');
        onValue(path, (snapshot)=> {
            
            var append = "";
        
            snapshot.forEach((childSnapshot)=> {

                if(childSnapshot.val().email == sessEmail) {

                    var sessID = childSnapshot.key;

                    const path2 = ref(db, 'accounts/trainees/' + sessID + '/courses/' + dropCourse.value + '/batch/');
                    onValue(path2, (snapshot)=> {
                        snapshot.forEach((childSnapshot)=> {
                            var sessBatch = childSnapshot.key;
                            const path3 = ref(db, 'courses/' + dropCourse.value + '/batch/' + sessBatch + '/trainingVideos/');
                            onValue(path3, (snapshot)=> {
                                snapshot.forEach((childSnapshot)=> {
                                    append += 
                                    `<div class="clickables">
                                        <h2>${childSnapshot.key}</h2>
                                        <img src="img-h6rv2c/btnPlay.png" class="btnPlayTrainingVids">
                                    </div>
                                    <div class="clickLines"></div>`;
                                })

                                divTrainingVids.innerHTML = append;

                            })
                            
                        })
                        
                    })
                    
                }
                
            })
            
        })

        for(var a = 0; a < btnPlayTrainingVids.length; a++) {
            btnPlayTrainingVids[a].addEventListener('click', playTrainingVids);
        }

    }
    else {

        console.log(dropCourse.value);
    }
}

//-----------------------------------------------------------------

dropCourse.addEventListener('change', loadCerti);
dropCourse.addEventListener('change', loadTrainingVideos);
