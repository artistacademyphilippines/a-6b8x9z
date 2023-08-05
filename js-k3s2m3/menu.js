
//--------------------------Show Menu---------------------------------

var boolSwitch = false;
const black = document.getElementById('black');
const menu = document.getElementById('menu');
const btnMenu = document.getElementById('btnMenu');

function showMenu() {
    var newPos = window.innerWidth - menu.offsetWidth;
    menu.style.transform = "translateX(" + newPos +"px)";
    menu.style.transition = "transform .5s";
    black.style.opacity = 1;
    black.style.background = "rgba(0,0,0,0.3)";
    black.style.visibility = "visible";
    black.style.transition = "opacity .5s";
}

function hideMenu() {
    var newPos = window.innerWidth;
    menu.style.transform = "translateX(" + newPos +"px)";
    menu.style.transition = "transform .5s";  

    if(black.childElementCount == 0) {
        black.style.opacity = 0;  
        black.style.visibility = "hidden"; 
        black.style.background = "rgba(0,0,0,0)";
        black.style.transition = "opacity .5s";
    }
}

function switchMenu() {
    if(boolSwitch == false) {
        showMenu();
        boolSwitch = true;
    }
    else {
        hideMenu();
        boolSwitch = false;
    }
}
btnMenu.addEventListener('click', switchMenu);

function adjustMenu() {
    
    if(boolSwitch == true) {
        var newPos = window.innerWidth - menu.offsetWidth;
        menu.style.transform = "translateX(" + newPos +"px)";
        menu.style.transition = null;
    }
    else {
        var newPos = window.innerWidth;
        menu.style.transform = "translateX(" + newPos +"px)";
        menu.style.transition = null;
    }
}
window.addEventListener('resize', adjustMenu);

function checkVideoOrMenu() {
    if(black.childElementCount > 0) {
        black.style.opacity = 0;
        black.style.background = "rgba(0,0,0,0)";
        black.style.visibility = "hidden";
        black.style.transition = "opacity .5s";
        black.innerHTML = "";
    }
    else {
        switchMenu();
    }
}
black.addEventListener('click', checkVideoOrMenu)


//---------------------------Menu Navigation--------------------------

function navigateMenu(id) {
    if(id != 'btnLogout') {
        
        var nextPage = document.getElementById(id).innerText.toLowerCase();
        window.location.replace(nextPage);
    }
    else {
        sessionStorage.setItem("oAuth", "out");
    }
}
