//==========DECLARE ZOOM VARIABLES=================

var cnvBox = document.getElementById('cnvBox');
var cnvMain = document.getElementById('cnvMain');
var cnvBG = document.getElementById('cnvBG');
var cnvGrpPatterns = document.getElementById('cnvGrpPatterns');
var cnvGrpLayers = document.getElementById('cnvGrpLayers');
var cnvPin = document.getElementById('cnvPin');

var cnvPatterns = [];
var cnvLayers = [];
var imgCold = [];
var imgWarm = [];
var fontSelected = "Stylish";

var pinBody = [];
var pinL = [];
var pinL2 = [];
var pinTL = [];
var pinTL2 = [];
var pinT = [];
var pinT2 = [];
var pinTR = []; 
var pinTR2 = []; 
var pinR = [];
var pinR2 = [];
var pinBR = [];
var pinBR2 = [];
var pinB = [];
var pinB2 = [];
var pinBL = [];
var pinBL2 = [];

var menu = document.getElementsByClassName('menu');
var mainBox = document.getElementById('mainBox');
var workArea = document.getElementById('workArea');
var canvasBorder = document.getElementById('canvasBorder');
var exportMe = document.getElementById('toolExport');
var rngZoom = document.getElementById('rngZoom');
var txtZoom = document.getElementById('txtZoom');
var dropOptionZoom = document.getElementById('dropdownZoom');
var dropOptionVerti = document.getElementsByClassName('dropOptionVerti');
var dropOptionHeader = document.getElementsByClassName('dropOptionHeader');
var txtSizeWidth = document.getElementById('txtSizeWidth');
var txtSizeHeight = document.getElementById('txtSizeHeight');
var zoomMultiplier = Number(rngZoom)/100;
var configScroll = document.getElementsByClassName('configScroll');
var configContainer = document.getElementsByClassName('configContainer');
var pnlBox = document.getElementsByClassName('pnlBox');
var pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');
var pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer'); //panelbox for mix layers
var configSlider = document.getElementsByClassName('configSlider');
var tabFontCategory = document.getElementById('tabFontCategory');
var tabSliderFont = document.getElementById('tabSliderFont');
var tabStylish = document.getElementById('tabStylish');
var tabSansSerif = document.getElementById('tabSansSerif');
var tabSerif = document.getElementById('tabSerif');

//==============DRAG AND DROP VARIABLES=============


var patRank;
var tmrDrag;
var counter = 0;
var spaceX;
var spaceY;
var clientX;
var clientY;

var breaklineDrag = document.createElement('div');
breaklineDrag.classList.add('breaklineDrag');

//==============RESIZING VARIABLES=================
var resX;
var resY;
var borderW = [];
var borderH = [];
var borderL = [];
var borderT = [];
var borderR = [];
var borderCenterX;
var borderCenterY;

var AB;
var AC;
var BC;
var angle1;
var angle2;
var leadRotate;
var leadDrag;

var leadDragX;
var leadDragY;
var leadType;
var leadMinW;
var leadMinH;

var layerW = [];
var layerH = [];
var layerL = [];
var layerT = [];
var aRatio = [];
var adjust;
var flipToRight = false;
var flipToLeft = false;
var isDragging = false;
var isResizing = false;
var isRotating = false;
var isScaling = false;
var isDragFromThumb = false;

//==============RESIZING VARIABLES================

//list of elements that affects vertical sizing
var header = 46; // headerUI
var submenu = 140; //submenu x2
var footer = 4; //footer
var cnvScrollH = 12;

//list of elements that affects horizontal sizing
var toolbox = 70; // toolbox
var tmenu = 280; // toolmenu
var border = 4;
var gap = 4;
var adsBox = 300;
var cnvPinW = 0;
var cnvPinH = 0;
var cnvScrollW = 12;

//================SAVING DEFAULT SCROLL POSITION===========

var defLeftScroll;
var defTopScroll;

//============ADJUST WORKAREA OVERFLOW==========

function containWorkArea() {
   
    //mainbox subtract adsbox and gap
    //mainbox includes toolbox and toolmenu
    mainBox.style.width = window.innerWidth - adsBox - gap + 'px';
    mainBox.style.maxWidth = window.innerWidth - adsBox - gap + 'px';
    
    //now from mainbox, get the workarea size
    //workarea includes submenu
    //workarea is the parent of canvasBorder and ancestor of all canvases
    //that's why we only get its width, height is unnecessary
    workArea.style.width = mainBox.clientWidth - toolbox - tmenu - border + 'px';
    workArea.style.maxWidth = mainBox.clientWidth - toolbox - tmenu - border + 'px';

    //get canvasBorder height by using workarea then subtract 2 subheaders
    var canvasBorderH = workArea.offsetHeight - 140; //140px is 2 subheaders top and bottom at 70px each

    canvasBorder.style.height = canvasBorderH + 'px';
    canvasBorder.style.maxHeight = canvasBorderH + 'px';

    //cnvPin resizing and loading
    cnvPinW = window.innerWidth - toolbox - tmenu - border - gap - adsBox;
    cnvPinH = window.innerHeight - header - submenu - footer;

    cnvPin.style.width = cnvPinW + 'px';
    cnvPin.style.height = cnvPinH + 'px';

    adjustBorder(); //readjust all selected borders

    //also adjust all the config scroll height under tool menu 
    for(var a= 0; a < configScroll.length; a++) {
        
        configScroll[a].style.height = (window.innerHeight - 160) + "px";
        configScroll[a].style.maxHeight = (window.innerHeight - 160) + "px";

        tabFontCategory.style.height = (window.innerHeight - 160) + "px";
        tabSliderFont.style.height = (window.innerHeight - 160) + "px";
        tabStylish.style.height = (window.innerHeight - 160) + "px";
        tabSansSerif.style.height = (window.innerHeight - 160) + "px";
        tabSerif.style.height = (window.innerHeight - 160) + "px";

        if(configContainer[a] != null) {
            configContainer[a].style.height = (window.innerHeight - 160) + "px";
            configContainer[a].style.maxHeight = (window.innerHeight - 160) + "px";
        }

        if (a == 4) {
            //configScroll[a].style.backgroundColor = "red";
            configScroll[a].style.height = (window.innerHeight - 208) + "px";
            configScroll[a].style.maxHeight = (window.innerHeight - 208) + "px";
        }
    }

}
window.addEventListener('load', containWorkArea);
window.addEventListener('resize', containWorkArea);

//==============ZOOM CONTROLS====================
function rangeZoomFormat() { //reformatting txtZoom removing %
    var getPercent = Math.round((Number(rngZoom.value) / Number(rngZoom.max))*100);
    rngZoom.style.background = `linear-gradient(to right, #2E3646 ${getPercent-4}%, transparent ${4}%)`;
    txtZoom.children[0].innerText = rngZoom.value + "%";

}
rangeZoomFormat()
rngZoom.addEventListener('input', rangeZoomFormat) //change format of slider

function adjustBorderZoom() {

    var z = rngZoom.value / 100;

    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            
            pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
            pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
            //check when zoomed out or zoomed in
            //zooming will make the cnvBox wider or taller than canvasBorder
            if((cnvBox.clientWidth * z + 96) > canvasBorder.clientWidth) { //96 total of 3em left and right
                pinBody[a].style.left = (cnvLayers[a].offsetLeft * z) + 48 + 'px'; // 48 total of 3em left
                
            }
            else {
                
                pinBody[a].style.left = (cnvBox.getBoundingClientRect().left) + (cnvLayers[a].offsetLeft * z) - 350 + 'px';
            }

            //check when zoomed out or zoomed in
            //zooming will make the cnvBox wider or taller than canvasBorder
            if((cnvBox.clientHeight * z + 96) > canvasBorder.clientHeight) { //96 total of 3em top and bottom
                
                pinBody[a].style.top = (cnvLayers[a].offsetTop * z) + 48 + 'px'; //48 total of 3em top
                 
            }
            else {
                pinBody[a].style.top = (cnvBox.getBoundingClientRect().top) + (cnvLayers[a].offsetTop * z) - 116 + 'px';

            }
            
        }
    }
}
//===============ZOOM CANVAS====================
function zoomMainCanvas() {

    var z = rngZoom.value / 100;

    cnvBox.style.zoom = txtZoom.children[0].innerText;
    txtZoom.children[0].style.color = "white";

    var actualCnvBoxH = cnvBox.clientHeight * (rngZoom.value/100) + 96;
    var scrollH = (actualCnvBoxH - canvasBorder.offsetHeight) / 2;
    var actualCnvBoxW = cnvBox.clientWidth * (rngZoom.value/100) + 96;
    var scrollW = (actualCnvBoxW - canvasBorder.offsetWidth) / 2;

    canvasBorder.scrollLeft = scrollW;
    canvasBorder.scrollTop = scrollH;
    
    if((cnvBox.clientWidth * z + 96) > canvasBorder.clientWidth) {
        
        cnvPin.style.width = cnvPinW + (canvasBorder.scrollWidth - cnvPinW)  + 'px';
        //for some reasons the width works when multiplied by 2
    }
    else {
        cnvPin.style.width = cnvPinW + 'px';
    }

    //if else statement for cnvPin resizing
    if((cnvBox.clientHeight * z + 96) > canvasBorder.clientHeight) {
        cnvPin.style.height = cnvPinH + (canvasBorder.scrollHeight - cnvPinH)  + 'px'; 
        //for some reasons the height works when multiplied by 2
        
    }
    else {
        cnvPin.style.height = cnvPinH + 'px';
    }
    
    adjustBorderZoom();
    //hide small pinbody
    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            if (pinBody[a].clientWidth <= 11 || pinBody[a].clientHeight <= 11) {
                pinTL[a].style.opacity = 0;
                pinTR[a].style.opacity = 0;
                pinBL[a].style.opacity = 0;
                pinBR[a].style.opacity = 0;
            }

            else if (pinBody[a].clientWidth > 11 || pinBody[a].clientHeight > 11) {
                pinTL[a].style.opacity = 100;
                pinTR[a].style.opacity = 100;
                pinBL[a].style.opacity = 100;
                pinBR[a].style.opacity = 100;
            }
        }
        
    }

}
cnvBox.style.zoom = txtZoom.children[0].innerText;
rngZoom.addEventListener('input', zoomMainCanvas); //resize canvas using rngzoom

//================HOVER ON ZOOM=================
dropdownZoom.addEventListener('mouseover', function() {
    txtZoom.children[0].style.color = "white";
})

dropdownZoom.addEventListener('mouseleave', function() { 
    txtZoom.children[0].style.color = "#647499";
})

//================CUSTOM ZOOM====================
function zoomCustomCanvas() {
    
    var z = rngZoom.value / 100;

    cnvBox.style.zoom = txtZoom.children[0].innerText;
    txtZoom.children[0].style.color = "white";

    //reset the default scroll value if zoomed out
    canvasBorder.scrollLeft = (defLeftScroll / 100) * canvasBorder.scrollWidth;
    canvasBorder.scrollTop = (defTopScroll / 100) * canvasBorder.scrollHeight;
    
    //if else statement for cnvPin resizing
    if((cnvBox.clientHeight * z + 96) > canvasBorder.clientHeight) {
        cnvPin.style.height = cnvPinH + (canvasBorder.scrollHeight - cnvPinH)  + 'px'; 
        //for some reasons the height works when multiplied by 2
    }
    else {
        cnvPin.style.height = cnvPinH + 'px';
    }
    if((cnvBox.clientWidth * z + 96) > canvasBorder.clientWidth) {
        cnvPin.style.width = cnvPinW + (canvasBorder.scrollWidth - cnvPinW)  + 'px';
        //for some reasons the width works when multiplied by 2
    }
    else {
        cnvPin.style.width = cnvPinW + 'px';
    }

    adjustBorderZoom(); //readjust all selected borders

    //hide small pinbody
    for(var a = 0; a < pinBody.length; a++) {

        if (pinBody[a].clientWidth <= 11 || pinBody[a].clientHeight <= 11) {
            pinTL[a].style.opacity = 0;
            pinTR[a].style.opacity = 0;
            pinBL[a].style.opacity = 0;
            pinBR[a].style.opacity = 0;
        }

        else if (pinBody[a].clientWidth > 11 || pinBody[a].clientHeight > 11) {
            pinTL[a].style.opacity = 100;
            pinTR[a].style.opacity = 100;
            pinBL[a].style.opacity = 100;
            pinBR[a].style.opacity = 100;
        }
        
    }
}

//================CTRL + SCROLL TO ZOOM===========

window.addEventListener('wheel', function(e) {

    if(e.ctrlKey) {
        e.preventDefault();

        if(e.deltaY < 0) {
            rngZoom.value = Number(rngZoom.value) + 2;
            rangeZoomFormat();
            zoomMainCanvas();
        }
        else if(e.deltaY > 0) {
            rngZoom.value = Number(rngZoom.value) - 2;
            rangeZoomFormat();
            zoomMainCanvas();
            
        }
    }

    else if(e.altKey) {
        e.preventDefault();

        if(e.deltaY < 0) {
            rngZoom.value = Number(rngZoom.value) + 2;
            rangeZoomFormat();
            zoomCustomCanvas();
        }
        else if(e.deltaY > 0) {
            rngZoom.value = Number(rngZoom.value) - 2;
            rangeZoomFormat();
            zoomCustomCanvas();
            
        }
    }

    else {
        blurZoomMainCanvas();
    }

}, {passive: false})

//================SIDE SCROLL ON ZOOM=============
function saveDefaultScroll() {

    defLeftScroll = (this.scrollLeft / this.scrollWidth) * 100;
    defTopScroll = (this.scrollTop / this.scrollHeight) * 100;

}

canvasBorder.addEventListener('scroll', saveDefaultScroll);
//===============OUT OF ZOOM======================

window.addEventListener('keyup', function(e) {
    if(e.key == "Control") {
        blurZoomMainCanvas();
    }
})
function blurZoomMainCanvas() {
    txtZoom.children[0].style.color = "#647499";
    var getPercent = Math.round((Number(rngZoom.value) / Number(rngZoom.max))*100);
    rngZoom.style.background = `linear-gradient(to right, #2E3646 ${getPercent-4}%, transparent ${4}%)`;
}
rngZoom.addEventListener('change', blurZoomMainCanvas); //resize canvas using rngzoom

//change zoom text and range via dropdown

function changeTextZoom() {
    rngZoom.value = Number(this.innerText.substr(0, this.innerText.length-1))
    rangeZoomFormat(); //change slider value too
    zoomMainCanvas();
}

//add event listener for all optZooms
var optZoom = document.querySelectorAll('.optZoom');
for(var a = 0; a < optZoom.length; a++) {
    optZoom[a].addEventListener('click', changeTextZoom);
}

//=============CHANGE COLOR OF ALL TEXTS===============
function changeTextColor() {
    var inputs = toolmenu.querySelectorAll('input');
    
    var testRng = /rng/;
    var testHeader = /Header/;
    var testColor = /Color/;

    inputs.forEach(function(input) {
 
        input.setAttribute('spellcheck', "false");
        input.setAttribute('data-gramm', "false");
        input.setAttribute('data-gramm_editor', "false");
        input.setAttribute('data-enable-grammarly', 'false');
        
        if(testHeader.test(input.className) || testColor.test(input.className) || testRng.test(input.className)) {
            input.style.color = "white";
        }
        else {
            input.style.color = "#647499";
            input.addEventListener('focus', function() {
                input.style.color = "white";
            })
            input.addEventListener('blur', function() {
                input.style.color = "#647499";
            })
        }

        if(testRng.test(input.className)) {
            input.addEventListener('input', function() {
                input.nextElementSibling.style.color = "white";
            })

            input.addEventListener('change', function() {
                input.nextElementSibling.style.color = "#647499";
            })
        }

        //add blur on enter

        input.addEventListener('keydown', function(e) {
            if(e.key == "Enter") {
                input.blur();
            }
        })
    })
}
changeTextColor();

//=============SELECT ALL TEXTS========================

function selectAll() { //auto highlight when clicked
    this.select();
}

//=============HIDE ALL DROPDOWN SELECTIONS=============

//declare zoom dropdown
var dropOptionZoom = document.querySelector('.dropOptionZoom');
var dropOptionLineStart = document.getElementsByClassName('dropOptionLineStart');
var dropOptionLineEnd = document.getElementsByClassName('dropOptionLineEnd');

function hideAllOptions() { // hide all verti options
    
    for(var a = 0; a < dropOptionVerti.length; a++) {
        
        dropOptionVerti[a].style.display = "none";
    }

    for(var a = 0; a < dropOptionHeader.length; a++) {
        
        dropOptionHeader[a].style.display = "none";
    }

    for(var a = 0; a < dropOptionLineStart.length; a++) {
        
        dropOptionLineStart[a].style.display = "none";
    }

    for(var a = 0; a < dropOptionLineEnd.length; a++) {
        
        dropOptionLineEnd[a].style.display = "none";
    }

    dropOptionZoom.style.display = "none";
} 
hideAllOptions()

//===============VALIDATE THE HEX IN TEXTBOX============

function testHexCode(me) {

    var match = false;

    var hex = me.value.toUpperCase();

    var regex = /^#?([0-9A-Fa-f]{6})$/;

    if(!regex.test(hex)) {
        for(var a = 0; a < colorName.length; a++) {
            if(colorName[a].name == hex.replace(" ", "").toLowerCase()) {

                match = true;

                me.value = colorName[a].hex;

                me.nextElementSibling.style.backgroundColor = "#" + me.value;
    
            }
        }
    
        if(match == false) {
       
            me.value = "FFFFFF";

            if(me.nextElementSibling != null) {
                me.nextElementSibling.style.backgroundColor = "#" + me.value;
            }
        }
    }
    else {

        if(hex.substring(0,1) == '#') {
            me.value = hex.substr(1,7).toUpperCase();
        }
        else {
            me.value = hex.toUpperCase();
        }
    
        me.nextElementSibling.style.backgroundColor = "#" + me.value;
    }
}

//================DISABLE TAB ON ALL INPUT=============
function disableTab(e) {
    if(e.key == "Tab") {
        e.preventDefault();
    }
}
document.addEventListener('keydown', disableTab);

//=================EXPAND AND COLLAPSE PANEL============

//function to expand and collapse pnlBoxProperties
function expandCollapseControls() {

    //var baseHeight = 378;
    var e = this.parentElement.parentElement;
    
    if(this.dataset.show == "more") {
        e.style.height = "40px"; //the panelboxPattern height itself
        e.children[1].style.opacity = "0"; //hide the breakline
        e.children[0].children[0].style.rotate = "-90deg";
        this.dataset.show = "less";
    }
    else {
        e.style.height = "auto"; //the panelboxPattern height itself
        e.children[1].style.opacity = "1"; //hide the breakline
        e.children[0].children[0].style.rotate = "0deg";
        this.dataset.show = "more";
    }
}

//================RENAMING PANEL HEADERS================
var renameDefault = null;
//function to rename txtHeader
function renameTxtHeader() {
    resetAllFocus();

    var e = Number(this.parentElement.parentElement.dataset.layer);
    focusPanel[e] = this.parentElement.parentElement;
    this.parentElement.parentElement.style.borderColor = "#6885CC";

    renameDefault = this.value;
    this.removeAttribute('readOnly');
    this.select();
    this.style.border= "1px solid #647499";
}

function blurTxtHeader() {
    this.blur();
}

//function to  save header's name
function saveTxtHeader() {
    if(this.value == "") {
        this.value = renameDefault;
    }
    //this.setAttribute("readonly", "readonly");
    this.style.border= "1px solid transparent";
}

//===============CHECKBOXES BUTTONS LISTENERS============

function chkBoxHover() {

    this.style.borderColor = "#647499";
    this.children[0].style.backgroundColor = "white";
        
}

function chkBoxLeave(e) {
    
    if(this.dataset.value == "false") {
        this.style.borderColor = "#3F4961";
        this.children[0].style.backgroundColor = "#647499";
    }
    
    else if(this.dataset.value == "true") {
        this.children[0].style.backgroundColor = "white";
    }
    
    this.addEventListener('mouseover', chkBoxHover)
}

function chkBoxClick(e) {
    var b = 0;
    var key = null;
    var leadFlip = this;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    var l = Number(leadPanel.dataset.layer)
    
    
    if(e.ctrlKey) {
        key = 'ctrl';
    }

    else if(e.shiftKey) {
        key = 'shift';
    }
    
    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            b++;
        }
        if(focusPanel[a] == leadPanel) {
            imFocus = true;
        }
    }

    if(b > 0 && key == null && imFocus == false) {
        //remove first all pnlboxlayer focus
        for(var a = 0; a < pnlBoxLayer.length; a++) {
            pnlBoxLayer[a].style.borderColor = "#3F4961";
            focusPanel[a] = null;
        }
    }
    
    if(leadFlip.dataset.value == "false") {
        
        leadFlip.dataset.value = "true";
        leadFlip.style.borderColor = "transparent";
        leadFlip.style.backgroundColor = "#6885CC";
        leadFlip.children[0].style.translate = "12px";
        leadFlip.children[0].style.backgroundColor = "white";
    }

    else if(this.dataset.value == "true") { 

        leadFlip.dataset.value = "false";
        leadFlip.style.borderColor = "#647499";
        leadFlip.style.backgroundColor = "transparent";
        leadFlip.children[0].style.translate = "0px";
        leadFlip.children[0].style.backgroundColor = "white";

        leadFlip.removeEventListener('mouseover', chkBoxHover);
    }

    
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null ) {

            var e = Number(focusPanel[a].dataset.layer);
            var newPanel = configScroll[5].querySelector(`[data-layer="${e}"]`);
            var leadFlipClass = leadFlip.className;
            var newFlip = newPanel.querySelector(`.${leadFlipClass}`);
        
            if(leadFlip.dataset.value == "true") {
                newFlip.dataset.value = "true";
                newFlip.style.borderColor = "transparent";
                newFlip.style.backgroundColor = "#6885CC";
                newFlip.children[0].style.translate = "12px";
                newFlip.children[0].style.backgroundColor = "white";
            }
        
            else if(leadFlip.dataset.value == "false") { 
        
                newFlip.dataset.value = "false";
                newFlip.style.borderColor = "#3F4961";
                newFlip.style.backgroundColor = "transparent";
                newFlip.children[0].style.translate = "0px";
                newFlip.children[0].style.backgroundColor = "#647499";
            }
        
        }
    }

    
}

function chkBoxPatternClick(e) {
    var b = 0;
    var key = null;
    var leadFlip = this;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxPattern');
    var l = Number(leadPanel.dataset.layer)
    
    
    if(e.ctrlKey) {
        key = 'ctrl';
    }

    else if(e.shiftKey) {
        key = 'shift';
    }
    
    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            b++;
        }
        if(focusPanel[a] == leadPanel) {
            imFocus = true;
        }
    }

    if(b > 0 && key == null && imFocus == false) {
        //remove first all pnlboxlayer focus
        for(var a = 0; a < pnlBoxPattern.length; a++) {
            pnlBoxPattern[a].style.borderColor = "#3F4961";
            focusPanel[a] = null;
        }
    }
    
    if(leadFlip.dataset.value == "false") {
        
        leadFlip.dataset.value = "true";
        leadFlip.style.borderColor = "transparent";
        leadFlip.style.backgroundColor = "#6885CC";
        leadFlip.children[0].style.translate = "12px";
        leadFlip.children[0].style.backgroundColor = "white";
    }

    else if(this.dataset.value == "true") { 

        leadFlip.dataset.value = "false";
        leadFlip.style.borderColor = "#647499";
        leadFlip.style.backgroundColor = "transparent";
        leadFlip.children[0].style.translate = "0px";
        leadFlip.children[0].style.backgroundColor = "white";

        leadFlip.removeEventListener('mouseover', chkBoxHover);
    }

    
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null ) {

            var e = Number(focusPanel[a].dataset.layer);
            var newPanel = configScroll[1].querySelector(`[data-layer="${e}"]`);
            var leadFlipClass = leadFlip.className;
            var newFlip = newPanel.querySelector(`.${leadFlipClass}`);
        
            if(leadFlip.dataset.value == "true") {
                newFlip.dataset.value = "true";
                newFlip.style.borderColor = "transparent";
                newFlip.style.backgroundColor = "#6885CC";
                newFlip.children[0].style.translate = "12px";
                newFlip.children[0].style.backgroundColor = "white";
            }
        
            else if(leadFlip.dataset.value == "false") { 
        
                newFlip.dataset.value = "false";
                newFlip.style.borderColor = "#3F4961";
                newFlip.style.backgroundColor = "transparent";
                newFlip.children[0].style.translate = "0px";
                newFlip.children[0].style.backgroundColor = "#647499";
            }
        
        }
    }

    
}

//===============PANEL BOTTOM BUTTONS LISTENERS==========
function btnBottomClick(){

    //don't change to 'this.closer' because it needs closer 'pattern' and closer 'layer'
    for(var b = 0; b < this.parentElement.parentElement.childElementCount; b++) {
        this.parentElement.parentElement.children[b].children[0].children[0].style.filter = "none";
    }
    this.children[0].style.filter = "saturate(0) brightness(2)";
}

function btnBottomHover() {
    if(this.children[0].style.filter != "saturate(0) brightness(2)") {
        this.children[0].style.filter = "saturate(1) brightness(1.5)";
    }
}

function btnBottomLeave() {
    if(this.children[0].style.filter != "saturate(0) brightness(2)") {
        this.children[0].style.filter = "none";
    }
}

//===============TEXT PANEL BUTTONS LISTENERS==========
function btnOptionClick(){

    //don't change to 'this.closer' because it needs closer 'pattern' and closer 'layer'
    for(var b = 0; b < this.parentElement.childElementCount; b++) {
        this.parentElement.children[b].children[0].style.filter = "none";
       
    }
    this.children[0].style.filter = "saturate(0) brightness(2)";
  
}

function btnOptionHover() {
    if(this.children[0].style.filter != "saturate(0) brightness(2)") {
        this.children[0].style.filter = "saturate(1) brightness(1.5)";

    }
}

function btnOptionLeave() {
    if(this.children[0].style.filter != "saturate(0) brightness(2)") {
        this.children[0].style.filter = "none";
    }
}

//===============TEXT PANEL BUTTONS TEXT LISTENERS==========
function btnTextClick(){

    //don't change to 'this.closer' because it needs closer 'pattern' and closer 'layer'
    for(var b = 0; b < this.parentElement.childElementCount; b++) {
       
        this.parentElement.children[b].children[0].style.color = "#647499";
        //this.parentElement.children[b].style.backgroundColor = "transparent";
    }

    this.children[0].style.color = "white";
    //this.style.backgroundColor = "#6885CC";
}

function btnTextHover() {
    if(this.children[0].style.color != "white") {
        this.children[0].style.color = "#9DAFDB";
    }
}

function btnTextLeave() {
    if(this.children[0].style.color != "#647499" && this.children[0].style.color != "white") {
        this.children[0].style.color = "#647499";
    }
}

//===============LINK TEXTBOXES TO RANGE================

function linkRangeToTextbox() {
    for(var a = 0; a < rngPattern.length; a++) {
        rngPattern[a].addEventListener('input', adjustRangeToTextbox)
    }

    for(var a = 0; a < rngLayer.length; a++) {
        rngLayer[a].addEventListener('input', adjustRangeToTextbox)
    }
}

function adjustRangeToTextbox(e) {
    this.nextElementSibling.value = this.value;
    
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel;

    if(this.closest('.pnlBoxPattern')) {
        leadPanel = this.closest('.pnlBoxPattern');
    }

    else if(this.closest('.pnlBoxLayer')) {
        leadPanel = this.closest('.pnlBoxLayer');
    }
    
    if(e.ctrlKey) {
        key = 'ctrl';
    }

    else if(e.shiftKey) {
        key = 'shift';
    }
    
    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            b++;
        }
        if(focusPanel[a] == leadPanel) {
            imFocus = true;
        }
    }

    if(b > 0 && key == null && imFocus == false) {
        //remove first all pnlboxlayer focus
        for(var a = 0; a < pnlBoxPattern.length; a++) {
            pnlBoxPattern[a].style.borderColor = "#3F4961";
            focusPanel[a] = null;
        }

        for(var a = 0; a < pnlBoxLayer.length; a++) {
            pnlBoxLayer[a].style.borderColor = "#3F4961";
            focusPanel[a] = null;
        }
    }

    if(this.closest('.pnlBoxPattern')) {

        var e = Number(leadPanel.dataset.layer);
        
        leadPanel.style.borderColor = "#6885CC";

        focusPanel[e] = leadPanel;
        
    }
    else if (this.closest('.pnlBoxLayer')) {

        var e = Number(leadPanel.dataset.layer);
        
        leadPanel.style.borderColor = "#6885CC";

        focusPanel[e] = leadPanel;
    }
}

function validateTextboxToRange() {
    this.value = Math.round(Number(this.value));

    var max = Number(this.max);
    var min = Number(this.min);
    var me = Number(this.value);

    if(me > max && max != 0) {
        this.value = max;
        this.previousElementSibling.value = max;
    }
    else if(me < min) {

        this.value = min;
        this.previousElementSibling.value = min;
    }
    
    else {
        this.value = me;
        this.previousElementSibling.value = me;
    }

}

function enterTextbox(e) {
    if(e.key === "Enter") {
        this.blur();
        
        this.value = Math.round(Number(this.value));

        var max = Number(this.max);
        var min = Number(this.min);
        var me = Number(this.value);

        if(me > max && max != 0) {
            me = max;
            this.previousElementSibling.value = max;
        }
        else if(me < min && min != 0) {
            me = min;
            this.previousElementSibling.value = min;
        }

        
        else {

            this.previousElementSibling.value = me;
        }

    }
}

function linkTextboxToRange() {

    for(var a = 0; a < pnlBoxPattern.length; a++) {
        var inputs = pnlBoxPattern[a].querySelectorAll('input[type="number"]');
        inputs.forEach(function(input) {

            input.addEventListener('change', validateTextboxToRange);
            input.addEventListener('focus', selectAll);
            input.addEventListener('focusout', validateTextboxToRange);
            input.addEventListener('keydown', enterTextbox);
        })

        var inputs = pnlBoxPattern[a].querySelectorAll('input[type="text"]');
        inputs.forEach(function(input) {

            input.addEventListener('focus', selectAll);

        })
    }

    
    for(var a = 0; a < pnlBoxLayer.length; a++) {
        var inputs = pnlBoxLayer[a].querySelectorAll('input[type="number"]');
        inputs.forEach(function(input) {

            input.addEventListener('change', validateTextboxToRange);
            input.addEventListener('focus', selectAll);
            input.addEventListener('focusout', validateTextboxToRange);
            input.addEventListener('keydown', enterTextbox);
        })

        var inputs = pnlBoxLayer[a].querySelectorAll('input[type="text"]');
        inputs.forEach(function(input) {

            input.addEventListener('focus', selectAll);
   
        })
    }
    
}

//===============PREVENT DROP ON DOCUMENTS==============


function stopDragDrop(e) {
    e.preventDefault();
    e.stopPropagation();
}

document.addEventListener('drop', stopDragDrop);
document.addEventListener('dragover', stopDragDrop);
document.addEventListener('dragenter', stopDragDrop);



//===============EXPORT=============================
function saveAs() {
    
    domtoimage.toPng(cnvMain, {width: txtSizeWidth.value, height: txtSizeHeight.value})
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        img.style.width = txtSizeWidth.value.toString() + "px";
        img.style.height = txtSizeHeight.value.toString() + "px";

        img.onload = function() {

            var a = document.createElement('a');
            a.href = img.src;
            a.download = "download.png";
            a.click();
            a.remove();

        }
 
    })
    .catch(function (error) {
        console.error('Error:', error);
    });


}
exportMe.addEventListener('click', saveAs);


