
//=============TOOLBOX CONTROLS===============

var tool = document.getElementsByClassName('tool');
const toolmenu = document.getElementById('toolmenu');

function hoverTool() {
    document.getElementById(this.id).children[0].style.filter = "saturate(1) brightness(1.5)";
}

function leaveTool() {
    document.getElementById(this.id).children[0].style.filter = "none";
}

function clickTool() {

    showToolMenu(this.id)
 
}

function addControlTool() {
    for(var a=0; a < tool.length; a++) {
        tool[a].addEventListener('click', clickTool)
        tool[a].addEventListener('mouseover', hoverTool)
        tool[a].addEventListener('mouseleave', leaveTool)
    }
}
addControlTool()

//===============TOOLMENU CONTROLS==============

function hideToolMenu() {

    //read controls to tool
    addControlTool()

    //reset the tools color to default
    for(var a=0; a< tool.length; a++) {
        tool[a].style.backgroundColor = "transparent";
        tool[a].children[0].style.filter = "none";
     }

      //hide toolmenu
    toolmenu.style.visibility = "none";
    toolmenu.style.transform = `translateX(${(toolmenu.offsetWidth) * -1}px)`;
    
}
hideToolMenu()

function escToolMenu(e) {
    if(e.keyCode === 27) {
        hideToolMenu();
    }
}
document.addEventListener('keydown', escToolMenu)

function clickOutside(e) {
    var clicked = e.target;

    if (clicked.id == "workArea" || clicked.id == "subHeader" || clicked.id == "canvasBorder" || clicked.id == "subFooter") {
        hideToolMenu();
    }
}
//document.addEventListener('click', clickOutside);

function showToolMenu(id) {

    addControlTool();

    for(var a=0; a< tool.length; a++) {
        tool[a].style.backgroundColor = "transparent";
        tool[a].children[0].style.filter = "none";
     }
 
    document.getElementById(id).style.backgroundColor = "#6885CC";
    document.getElementById(id).children[0].style.filter = "saturate(0) brightness(2)";
    
    document.getElementById(id).removeEventListener('mouseover', hoverTool);
    document.getElementById(id).removeEventListener('mouseleave', leaveTool);

    toolmenu.style.visibility = "visible";
    toolmenu.style.transform = `translateX(${0}px)`;

    appendMenu(id) //will append actual menu elements based on ID
}

function appendMenu(id) {
    id = id.substring(4);

    var menu = document.querySelectorAll('.menu');

    for(var a = 0; a < menu.length; a++) {
        menu[a].style.display = "none";
    }
    
    document.getElementById('menu' + id).style.display = "block";
}