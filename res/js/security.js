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

console.log('hey')
//--check first if user is currently logged in
var sessEmail = sessionStorage.getItem("sessEmail");
var bodyBlue = document.getElementById('bodyBlue');


onAuthStateChanged(auth, (user) => {

    if (user) {
    
        if((sessEmail == user.email) && (sessEmail !== null)) {
            
            const path = ref(db, 'accounts/trainees/');
            onValue(path, (snapshot)=> {
                snapshot.forEach((childSnapshot)=> {
                    if (user.email == childSnapshot.val().email) {
                  
                        //bodyBlue.style.visibility = "visible";
                        
                    }
                })
            })
            
        }
        
        else {
          signOut(auth);
        }
        
    }

    else {
      
        window.location.replace('https://artcademy.ph/login');
      
    } 

});


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

                                update(ref(db, 'accounts/trainees/' + sessID), {
                                    status: "online",
                                    lastOnline: currMonth + "." + currDate + "." + currYear
                                })
                                .catch((error)=> {
                                    alert(error.code);
                                })
                                
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