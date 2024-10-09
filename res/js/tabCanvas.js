//==============DROPDOWN SIZE===========================

var optSize = document.getElementsByClassName('optSize');
var dropSize = document.getElementById('dropSize');
var txtSizeWidth = document.getElementById('txtSizeWidth');
var txtSizeHeight = document.getElementById('txtSizeHeight');

//===============RESIZE CANVAS=========================

function resizeBoxCanvas() {
    
    cnvBox.style.width = txtSizeWidth.value + "px";
    cnvBox.style.height = txtSizeHeight.value + "px";
    
    for(var a=0; a < pnlBoxPattern.length; a++) {
        renderPattern(a);
    }
    
    zoomMainCanvas();
}

//hover and leave  function for glowing border-bottom

function hoverSize() {
    this.style.borderBottom = "1px solid #647499";
}

function leaveSize() {
    this.style.borderBottom = "1px solid #515E7B";
}

function validateCustomSize() {

    var max = 4000;
    var min = 1;

    if(this.value > max) {
        this.value = max;
    }
    else if(this.value < min) {
        this.value = min;
    }

    resizeBoxCanvas()
}

function enterCustomSize(e) {
    if(e.key === "Enter") {
        this.blur();
        this.value = Math.round(Number(this.value));
        resizeBoxCanvas();
    }
}
 
function chooseSize() {

    this.closest('.pnlDrop').children[0].children[0].innerText = this.innerText;

    if(this.innerText == "Instagram Post") {
   
        txtSizeWidth.value = 1080;
        txtSizeHeight.value = 1080;

        //remove selectall function
        txtSizeWidth.removeEventListener('click', selectAll); 
        txtSizeHeight.removeEventListener('click', selectAll);

        //add readonly for editing
        txtSizeWidth.setAttribute('readonly', 'readonly');
        txtSizeHeight.setAttribute('readonly', 'readonly');
        
        //hide border underline
        txtSizeWidth.style.borderBottom = "1px solid transparent";
        txtSizeHeight.style.borderBottom = "1px solid transparent";

        //remove hover effect to txtSizeWidth
        txtSizeWidth.removeEventListener('mouseover', hoverSize);
        txtSizeHeight.removeEventListener('mouseover', hoverSize);

        //remove leave effect to txtSizeHeight
        txtSizeWidth.removeEventListener('mouseleave', leaveSize);
        txtSizeHeight.removeEventListener('mouseleave', leaveSize);
    }

    else if(this.innerText == "Facebook Page Cover") {

        txtSizeWidth.value = 1640;
        txtSizeHeight.value = 608;

        //remove selectall function
        txtSizeWidth.removeEventListener('click', selectAll); 
        txtSizeHeight.removeEventListener('click', selectAll);

        //add readonly for editing
        txtSizeWidth.setAttribute('readonly', 'readonly');
        txtSizeHeight.setAttribute('readonly', 'readonly');
        
        //hide border underline
        txtSizeWidth.style.borderBottom = "1px solid transparent";
        txtSizeHeight.style.borderBottom = "1px solid transparent";

        //remove hover effect to txtSizeWidth
        txtSizeWidth.removeEventListener('mouseover', hoverSize);
        txtSizeHeight.removeEventListener('mouseover', hoverSize);

        //remove leave effect to txtSizeHeight
        txtSizeWidth.removeEventListener('mouseleave', leaveSize);
        txtSizeHeight.removeEventListener('mouseleave', leaveSize);

    }

    else if(this.innerText == "Youtube Thumbnail") {

        txtSizeWidth.value = 1280;
        txtSizeHeight.value = 720;

        //remove selectall function
        txtSizeWidth.removeEventListener('click', selectAll); 
        txtSizeHeight.removeEventListener('click', selectAll);

        //add readonly for editing
        txtSizeWidth.setAttribute('readonly', 'readonly');
        txtSizeHeight.setAttribute('readonly', 'readonly');
        
        //hide border underline
        txtSizeWidth.style.borderBottom = "1px solid transparent";
        txtSizeHeight.style.borderBottom = "1px solid transparent";

        //remove hover effect to txtSizeWidth
        txtSizeWidth.removeEventListener('mouseover', hoverSize);
        txtSizeHeight.removeEventListener('mouseover', hoverSize);

        //remove leave effect to txtSizeHeight
        txtSizeWidth.removeEventListener('mouseleave', leaveSize);
        txtSizeHeight.removeEventListener('mouseleave', leaveSize);

    }

    else if(this.innerText == "Custom Size") {

        //add readonly for editing
        txtSizeWidth.removeAttribute('readonly');
        txtSizeHeight.removeAttribute('readonly');

        //show border underline
        txtSizeWidth.style.borderBottom = "1px solid #515E7B";
        txtSizeHeight.style.borderBottom = "1px solid #515E7B";
    
        //add hover effect and leave to txtSizeWidth
        txtSizeWidth.addEventListener('mouseover', hoverSize);
        txtSizeHeight.addEventListener('mouseover', hoverSize);

        txtSizeWidth.addEventListener('mouseleave', leaveSize);
        txtSizeHeight.addEventListener('mouseleave', leaveSize);
        
        //add change event to the txtSizeWidth
        txtSizeWidth.addEventListener('change', validateCustomSize);
        //add change event to the txtSizeHeight
        txtSizeHeight.addEventListener('change', validateCustomSize);

        //add focus event to the txtSizeWidth
        txtSizeWidth.addEventListener('focus', selectAll);
        //add focus event to the txtSizeHeight
        txtSizeHeight.addEventListener('focus', selectAll);

        //add outfocus event to the txtSizeWidth
        txtSizeWidth.addEventListener('focusout', validateCustomSize);
        //add outfocus event to the txtSizeHeight
        txtSizeHeight.addEventListener('focusout', validateCustomSize);

        txtSizeWidth.addEventListener('keydown', enterCustomSize);
        txtSizeHeight.addEventListener('keydown', enterCustomSize);


    }

    resizeBoxCanvas()

}

for(var i = 0; i < optSize.length; i++) { //dropdown background option
    optSize[i].addEventListener('click', chooseSize);
}

//============CREATE BG CANVAS==================

/*
cnvBG = document.createElement('div');
cnvBG.style.width = "100%";
cnvBG.style.height = "100%"
cnvBG.style.overflow = "hidden";
cnvBG.style.backgroundColor = "white";
cnvBG.style.position = "absolute";
cnvMain.appendChild(cnvBG);
*/

//===========DROPDOWN BACKGROUND===============

var optBG = document.getElementsByClassName('optBG');
var dropBackground = document.getElementById('dropBackground');

function chooseBackground() {

    this.closest('.pnlDrop').children[0].children[0].innerText = this.innerText;

    if(this.innerText == "Solid Color") {
       
        document.getElementById('contSolid').style.display = "block";
        document.getElementById('contGradient').style.display = "none";
        chooseSolidColor();
    }

    else if(this.innerText == "Gradient Color") {

        document.getElementById('contGradient').style.display = "block";
        document.getElementById('contSolid').style.display = "none";
        chooseGradientColors();
    }
} 

for(var i = 0; i < optBG.length; i++) { //dropdown background option
    optBG[i].addEventListener('click', chooseBackground)
}

//===========VALIDATE HEX CODES ================

var pckSolidColor = document.getElementById('pckSolidColor');
var txtSolidColor = document.getElementById('txtSolidColor');

//============SOLID BG COLOR PICKER=============

function chooseSolidColor() {

    testHexCode(txtSolidColor)

    //change thumbpick color
    pckSolidColor.style.backgroundColor = '#' + this.value;
    //change the cnvBG color now
    cnvBG.style.backgroundColor = '#' + this.value;
    cnvBG.style.backgroundImage = "none";

    txtSolidColor.blur();
}
txtSolidColor.addEventListener('change', chooseSolidColor);
txtSolidColor.addEventListener('focus', selectAll);

pckSolidColor.addEventListener('click', letsSummonColorPicker)

//============GRADIENT BG COLOR PICKER===========

var txtGradient1 = document.getElementById('txtGradient1');
var txtGradient2 = document.getElementById('txtGradient2');
var pckGradient1 = document.getElementById('pckGradient1');
var pckGradient2 = document.getElementById('pckGradient2');

var txtGradientScale = document.getElementById('txtGradientScale');
var rngGradientScale = document.getElementById('rngGradientScale');

var txtGradientRotation = document.getElementById('txtGradientRotation');
var rngGradientRotation = document.getElementById('rngGradientRotation');

function createGradient() { //create canvas gradient
    
    var scaleGradient = txtGradientScale.value * 0.5;
    
    var rotateGradient = Number(txtGradientRotation.value) + 180;

    cnvBG.style.backgroundImage = `linear-gradient(${rotateGradient}deg , ${'#' + txtGradient1.value} ${scaleGradient}%, ${'#' + txtGradient2.value} ${100-scaleGradient}%)`;
}

function chooseGradientColors() {

   testHexCode(txtGradient1) //if invalid format
   testHexCode(txtGradient2) //if invalid format
 
    this.blur();
    createGradient();
}
txtGradient1.addEventListener('focus', selectAll)
txtGradient2.addEventListener('focus', selectAll)
txtGradient1.addEventListener('change', chooseGradientColors);
txtGradient2.addEventListener('change', chooseGradientColors);
pckGradient1.addEventListener('click', letsSummonColorPicker);
pckGradient2.addEventListener('click', letsSummonColorPicker);

//deal with scaling

function changeScale() {
    txtGradientScale.value = rngGradientScale.value; // change text scale
    createGradient();
}
rngGradientScale.addEventListener('input', changeScale);

function validateScale() {

    var max = 100;
    var min = 1
    
    if(txtGradientScale.value < min) {
        txtGradientScale.value = min;
        rngGradientScale.value = min;
    }
    else if(txtGradientScale.value > max) {
        txtGradientScale.value = max;
        rngGradientScale.value = max;
    }

    else {
        rngGradientScale.value = txtGradientScale.value;
        
    }

    createGradient();
}
txtGradientScale.addEventListener('change', validateScale)

//deal with rotation

function changeRotation() {
    txtGradientRotation.value = rngGradientRotation.value; // change text scale
    createGradient();
}
rngGradientRotation.addEventListener('input', changeRotation);

function validateRotation() {

    var max = 360;
    var min = 0;

    if(Number(txtGradientRotation.value) < min) {
        txtGradientRotation.value = min;
        rngGradientRotation.value = min;
    }
    else if(Number(txtGradientRotation.value) > max) {
        txtGradientRotation.value = max;
        rngGradientRotation.value = max;
    }
    else {
        rngGradientRotation.value = txtGradientRotation.value;
    }
    createGradient();

}
txtGradientRotation.addEventListener('change', validateRotation)


function swapGradient() {

    var swap1 = txtGradient1.value;
    var swap2 = txtGradient2.value;

    txtGradient1.value = swap2;
    txtGradient2.value = swap1;

    pckGradient1.style.backgroundColor = '#' + txtGradient1.value;
    pckGradient2.style.backgroundColor = '#' + txtGradient2.value;

    createGradient();
}

//pckSwap.addEventListener('click', swapGradient)





