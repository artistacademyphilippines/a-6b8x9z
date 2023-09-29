var bodyBlue = document.getElementById('bodyBlue');
bodyBlue.style.visibility = "visible";
var i = 5;
function redirect() {
    document.getElementById('frmHeader').firstElementChild.innerText = "Oops! Page Not Found (" + i + "s)"
    if(i == 0) {
        window.location.replace('https://artcademy.ph/');
    }
    else {
        i-=1;
    }
    
}
setInterval(redirect, 1000);
