
//actual function to create pnlBoxProperties
var pnlTitlePattern = document.getElementsByClassName('pnlTitlePattern');
var pnlBoxPattern = document.getElementsByClassName('pnlBoxPattern');
var btnExpandCollapsePattern = document.getElementsByClassName('btnExpandCollapsePattern');
var btnShowHidePattern = document.getElementsByClassName('btnShowHidePattern');
var txtHeaderPattern = document.getElementsByClassName('txtHeaderPattern');
var thumbPickerPattern = document.getElementsByClassName('thumbPickerPattern');
var txtColorPattern = document.getElementsByClassName('txtColorPattern');
var rngPattern = document.getElementsByClassName('rngPattern');
var txtColorPattern = document.getElementsByClassName('txtColorPattern');
var txtOpacityPattern = document.getElementsByClassName('txtOpacityPattern');
var txtXPattern = document.getElementsByClassName('txtXPattern');
var txtYPattern = document.getElementsByClassName('txtYPattern');
var txtSizePattern = document.getElementsByClassName('txtSizePattern');
var txtSpacingPattern = document.getElementsByClassName('txtSpacingPattern');
var chkRandomSeed = document.getElementsByClassName('chkRandomSeed');
var txtRandomSpinPattern = document.getElementsByClassName('txtRandomSpinPattern');
var contentPattern = document.getElementsByClassName('contentPattern');
var frBottom = document.getElementsByClassName('frBottom');
var btnBasicPattern = document.getElementsByClassName('btnBasicPattern');
var btnStylePattern = document.getElementsByClassName('btnStylePattern');
var pnlBottomPatternThumb = document.getElementsByClassName('pnlBottomPatternThumb');
var optPatternBlend = document.getElementsByClassName('optPatternBlend');
var menuPatterns = document.getElementById('menuPatterns');
var hoverPattern = document.getElementsByClassName('hoverPattern');
var contPattern = document.getElementsByClassName('contPattern');
var txtSearchPattern = menuPatterns.querySelector('.txtSearch');
var btnDelSearchPattern = menuPatterns.querySelector('.btnDelSearch');

var boxSize = 60;




//=============ADD PATTERN CONFIGURATION==========

//this function will add pnlBoxPatterns after selecting a pattern

function addPatternListener() { 
    for(var a = 0; a < hoverPattern.length; a++) {
        hoverPattern[a].addEventListener('click', createPnlBoxPattern);
    }
}

//=============APPEND ALL VECTORS=============

function resetAllPatterns() {

    //append first all the categories
    var append = "";

    for(var a = 0; a < patternCategory.length; a++) {
        append += `<div class="patTitle"><h2>${patternCategory[a]}</h2></div>
                  <div class="contPattern">
                    
                  </div>`
    }

    menuPatterns.querySelector('.dropOptionHeader').innerHTML = append;

    //now append all patterns under their categories
    var patTitle = document.getElementsByClassName('patTitle');

    for(var a = 0; a < patTitle.length; a++) {
        var findTag = patTitle[a].children[0].innerText.toLowerCase();

        for(var b = 0; b < patterns.length; b++) {
            //var patternTags = patterns[b].tags.split(', ');

            if(patterns[b].tags.includes(findTag) || findTag.includes(patterns[b].tags)) {
                var append2 = `
                    <div class="optPattern">
                        <div class="hoverPattern" id="${patterns[b].id}">
                            ${patterns[b].svg}
                        </div>                      
                    </div>`
                patTitle[a].nextElementSibling.innerHTML += append2;
            }
        }
    }

    addPatternListener();
}
resetAllPatterns();

//=============SEARCH ALL VECTORS=============

function searchAllPatterns() {
    
    this.nextElementSibling.style.visibility = "visible"
    
    if(this.value.length >= 3) {

        //open the dropoption
        this.closest('.pnlDropHeader').children[1].style.display = "block";

        var searchFound = false;
        //remove all results first
        menuPatterns.querySelector('.dropOptionHeader').innerHTML = 
        `<div class="contPattern"></div>`

        //search each patterns for tags
        for(var a = 0; a < patterns.length; a++) {
           
            if(patterns[a].tags.includes(this.value) || this.value.includes(patterns[a].tags)) {

                //append all options pattern
                menuPatterns.querySelector('.contPattern').innerHTML += 
                `<div class="optPattern">
                    <div class="hoverPattern" id="${patterns[a].id}">
                        ${patterns[a].svg}
                    </div>                      
                </div>`;
                searchFound = true;

                addPatternListener();
            }
        }

        if(!searchFound) {
            menuPatterns.querySelector('.dropOptionHeader').innerHTML = 
            `<div class="patTitle"><h2>No results found</h2></div>`;
        }
    }
    else {
        hideAllOptions();
    
    }

    if(this.value == "") {
        this.nextElementSibling.style.visibility = "hidden"
        resetAllPatterns();
    }
    
}
txtSearchPattern.addEventListener('input', searchAllPatterns)

//=============
btnDelSearchPattern.addEventListener('click', function() {
    this.previousElementSibling.value = "";
    this.previousElementSibling.focus();
    this.style.visibility = "hidden";
    resetAllPatterns();
})

//this will format the pnlBoxPatterns header name to avoid duplicate
var newPatternHeader = null;
function autoIncrementPattern(name) {

    var counter = 1;
    var arrName = null;

    for(var a = 0; a < txtHeaderPattern.length; a++) {
        arrName = txtHeaderPattern[a].value.split(" ");
        if(arrName[0] == name) {
            if(Number(arrName[1]) >= counter ) {
                counter = Number(arrName[1]) + 1;
            }
        }
    }
    
    return newPatternHeader = name + " " + counter;
}

//function to hide and show cnvPattern
function showHidePatterns() {

    var e = this.closest('.pnlBoxPattern').dataset.layer;

    if(cnvPatterns[e].style.visibility == "visible") {
        cnvPatterns[e].style.visibility = "hidden";
        this.style.opacity = .2;
    }
    else if(cnvPatterns[e].style.visibility == "hidden") {
        cnvPatterns[e].style.visibility = "visible";
        this.style.opacity = 1;
    }
}


function chooseBlend(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxPattern');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {

            
            //change dropoptionverti text
            
            focusPanel[a].querySelector('.dropdown').children[0].innerText = this.innerText;
            
            var e = Number(focusPanel[a].dataset.layer);
            //get the G tags of the SVG and manually override it
            for(var b = 0; b < cnvPatterns[e].childElementCount; b++) {
                for(var c = 0; c < cnvPatterns[e].children[b].children[0].childElementCount; c++) {
                    cnvPatterns[e].children[b].children[0].children[c].setAttribute('style', `mix-blend-mode:${this.innerText}`);   
                }
            }
        } 
    }
    
}

//function for choosing color
function choosePatternColor(e) {

    //validate hex format
    testHexCode(this);

    //get e, the actual layer count of the pnlBoxPattern you are controlling to be use to track the right cnvPattern count as well
    var e = this.closest('.pnlBoxPattern').dataset.layer;
    var boxesPattern = cnvPatterns[e].getElementsByClassName('boxesPattern');
    
    //get the path tags of the SVG and manually override it
    for(var a = 0; a < boxesPattern.length; a++) {

        for(var b = 0; b < boxesPattern[a].childElementCount; b++) {
            boxesPattern[a].children[0].children[0].children[b].setAttribute('fill', '#' + this.value);
        }
    }

    this.blur();

}

function chooseOpacity(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxPattern');
    
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

    //change opacity innertext from choses opacity

    var o = Number(this.value)/100; //convert to 0 to 1 decimal

    //get the G tags of the SVG and manually override it
    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {

            var e = focusPanel[a].dataset.layer;

            focusPanel[a].querySelector('.txtOpacityPattern').value = this.value;
            focusPanel[a].querySelector('.txtOpacityPattern').previousElementSibling.value = this.value;

            for(var b = 0; b < cnvPatterns[e].childElementCount; b++) {

                for(var c = 0; c < cnvPatterns[e].children[b].children[0].childElementCount; c++) {
                
                    cnvPatterns[e].children[b].children[0].children[c].setAttribute('opacity', `${o}`);   
                }
            }
        }
    }
    
}

function chooseSize(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxPattern');
 
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            var e = focusPanel[a].dataset.layer;

            focusPanel[a].querySelector('.txtSizePattern').value = this.value;
            focusPanel[a].querySelector('.txtSizePattern').previousElementSibling.value = this.value;

            var chkSeed = focusPanel[a].querySelector('.chkRandomSeed');

            if (chkSeed.dataset.value == "true") {
                patternSeeder(e, focusPanel[a])
            }

            else {

                var boxesPattern = cnvPatterns[e].getElementsByClassName('boxesPattern');
                var convertBoxes = this.value * 10; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%

                for(var b = 0; b < boxesPattern.length; b++) {
                    
                    boxesPattern[b].children[0].style.width = convertBoxes + "%";
                    boxesPattern[b].children[0].style.width = convertBoxes + "%";

                }
            }
        }
    }
    
}

function chooseSpacing(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxPattern');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {

            var e = focusPanel[a].dataset.layer;

            focusPanel[a].querySelector('.txtSpacingPattern').value = this.value;
            focusPanel[a].querySelector('.txtSpacingPattern').previousElementSibling.value = this.value;

            var spaceBoxes = Number(this.value) * boxSize;

            cnvPatterns[e].style.gridGap = spaceBoxes + "px";
        }
        
    }
    

}

function adjustX(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxPattern');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {

            var e = focusPanel[a].dataset.layer;

            focusPanel[a].querySelector('.txtXPattern').value = this.value;
            focusPanel[a].querySelector('.txtXPattern').previousElementSibling.value = this.value;

            var horizontalBoxes = Number(this.value) * boxSize;

            cnvPatterns[e].style.left = horizontalBoxes + "px";
        }
    }
}

function adjustY(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxPattern');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {

            var e = focusPanel[a].dataset.layer;

            focusPanel[a].querySelector('.txtYPattern').value = this.value;
            focusPanel[a].querySelector('.txtYPattern').previousElementSibling.value = this.value;

            var verticalBoxes = Number(this.value) * boxSize;

            cnvPatterns[e].style.top = verticalBoxes + "px";
        }
    }
}

function getRelatedPanelBox() {
    var e = this.closest('.pnlBoxPattern').dataset.layer;

    renderPattern(e);
}

function patternSeeder(e, panel) {

    var numBoxesX = Math.ceil(txtSizeWidth.value / boxSize) ;
    var boxesPattern = cnvPatterns[e].getElementsByClassName('boxesPattern');
    var maxSize = panel.querySelector('.txtSizePattern').value
    var mySize;

    for(var a = 0; a < boxesPattern.length; a++) {

        if(a == 0) {

            mySize = Math.floor(Math.random() * Number(maxSize)) + 1
            boxesPattern[a].children[0].style.width = mySize * 10 + '%';
            boxesPattern[a].children[0].style.height = 'auto';

        }

        else if(a > 0) {

            if(maxSize >= 3) {

                var sizeCheck = [];

                //check first if top box exist
                if(boxesPattern[a-numBoxesX] != null || !isNaN(boxesPattern[a-numBoxesX])) {
                    sizeCheck[0] = Number(boxesPattern[a-numBoxesX].children[0].style.width.replace('%', '')) / 10;
                }
                
                //check if right box exist
                if(boxesPattern[a-1] != null || !isNaN(boxesPattern[a-1])) {
                    sizeCheck[1] = Number(boxesPattern[a-1].children[0].style.width.replace('%', '')) / 10;
                }
                
                while (mySize == sizeCheck[0] && sizeCheck[0] != null && mySize != (sizeCheck[0] - 3) && mySize != (sizeCheck[0] + 3) || mySize == sizeCheck[1] && sizeCheck[1] != null && mySize != (sizeCheck[1] - 3) && mySize != (sizeCheck[1] + 3)) {
                    
                    mySize = Math.floor(Math.random() * Number(maxSize)) + 1

                    if(mySize > 5) {

                        var newMax = mySize;

                        mySize = Math.floor(Math.random() * Number(100)) + 1
                        if(mySize > 98) {
                            mySize = newMax;
                        }
                        else if(mySize > 95 && mySize <= 98) {
                            mySize = newMax - 1;
                        }
                        else if(mySize > 90 && mySize <= 95) {
                            mySize = newMax - 2;
                        }
                        else if(mySize > 80 && mySize <= 90) {
                            mySize = newMax - 3;
                        }
                        else if(mySize <= 80) {
                            mySize = newMax - 4;
                        }

                    }
                    
                }

                boxesPattern[a].children[0].style.width = mySize * 10 + '%';
                boxesPattern[a].children[0].style.height = 'auto';
            }
            else if(maxSize == 2) {
                
                mySize = Math.floor(Math.random() * Number(maxSize)) + 1

                boxesPattern[a].children[0].style.width = mySize * 10 + '%';
                boxesPattern[a].children[0].style.height = 'auto';
            
            }

            else if(maxSize == 1) {
                boxesPattern[a].children[0].style.width = maxSize * 10 + '%';
                boxesPattern[a].children[0].style.height = 'auto';
            }

        }

    }
}

function randomSeed(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadFlip = this;
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


    if(leadFlip.dataset.value == "true") {

        patternSeeder(l, leadPanel);
    }

    else if(this.dataset.value == "false") { 

        var boxesPattern = cnvPatterns[l].getElementsByClassName('boxesPattern');
        var convertBoxes = leadPanel.querySelector('.txtSizePattern').value * 10; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%

        for(var b = 0; b < boxesPattern.length; b++) {
            
            boxesPattern[b].children[0].style.width = convertBoxes + "%";
            boxesPattern[b].children[0].style.width = convertBoxes + "%";

        }

        leadFlip.removeEventListener('mouseover', chkBoxHover);
    }

    for(var z = 0; z < focusPanel.length; z++) {

        if(focusPanel[z] != null && focusPanel[z] != leadPanel) {

            e = Number(focusPanel[z].dataset.layer);
    
            if(leadFlip.dataset.value == "true") {
   
                patternSeeder(e, focusPanel[z]);
            }
            else {
                var boxesPattern = cnvPatterns[e].getElementsByClassName('boxesPattern');
                var convertBoxes = leadPanel.querySelector('.txtSizePattern').value * 10; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%

                for(var b = 0; b < boxesPattern.length; b++) {
                    
                    boxesPattern[b].children[0].style.width = convertBoxes + "%";
                    boxesPattern[b].children[0].style.width = convertBoxes + "%";

                }
            }
        
        }
    }
    
}

function randomSpin(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxPattern');
    
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

    for(var z = 0; z < focusPanel.length; z++) {

        if(focusPanel[z] != null) {
    
            e = Number(focusPanel[z].dataset.layer);
            //}
            focusPanel[z].querySelector('.txtRandomSpinPattern').value = this.value;
            focusPanel[z].querySelector('.txtRandomSpinPattern').previousElementSibling.value = this.value

            var boxesPattern = cnvPatterns[e].getElementsByClassName('boxesPattern');
            var getPnlBoxPattern = document.querySelector(`.pnlBoxPattern[data-layer="${e}"]`);
            var getSpin = getPnlBoxPattern.querySelector('.txtRandomSpinPattern');

            if(Number(getSpin.value) > 0) {
                for(var a = 0; a < boxesPattern.length; a++) {

                    function getRand(min, max) {
                        return Math.floor(Math.random() * (max - min + 1) ) + min;
                    }

                    var min = Number(getSpin.value) * -1; //get negative value of
                    var max = Number(getSpin.value);

                    var rand = getRand(min, max);

                    boxesPattern[a].children[0].style.rotate = rand + "deg";
                }
            }
        }
    }
    
}

function showBasicPattern(){

    this.closest('.pnlBoxPattern').querySelector('.tabSliderPattern').style.translate = "0%"; //slide tab
    this.closest('.pnlBoxPattern').querySelector('.pnlBottomPatternThumb').style.translate = "0%"; //slide scroll thumb
}

function showStylePattern() {
    
    this.closest('.pnlBoxPattern').querySelector('.tabSliderPattern').style.translate = "-100%"; //slide tab to left
    this.closest('.pnlBoxPattern').querySelector('.pnlBottomPatternThumb').style.translate = "100%"; //slide thumb to right

}

//actual function to add controls to pnlBoxPatterns
function addPnlBoxPatternControls(e) {
    
    for(var a = 0; a < pnlBoxPattern.length; a++) {
        
        if(Number(pnlBoxPattern[a].dataset.layer) == e) {

            //btnBasicPattern event listeners
            btnBasicPattern[a].addEventListener('click', btnBottomClick); //default the btnBasic to white
            btnBasicPattern[a].addEventListener('mouseover', btnBottomHover);
            btnBasicPattern[a].addEventListener('mouseleave', btnBottomLeave);
            btnBasicPattern[a].addEventListener('click', showBasicPattern);
            btnBasicPattern[a].children[0].style.filter = "saturate(0) brightness(2)";

            //btnStylePattern event listeners
            btnStylePattern[a].addEventListener('click', btnBottomClick);
            btnStylePattern[a].addEventListener('mouseover', btnBottomHover);
            btnStylePattern[a].addEventListener('mouseleave', btnBottomLeave);
            btnStylePattern[a].addEventListener('click', showStylePattern);

            //add the expand and collapse control
            btnExpandCollapsePattern[a].addEventListener('click', expandCollapseControls);

            //add pattern renaming control
            txtHeaderPattern[a].addEventListener('dblclick', renameTxtHeader);
            txtHeaderPattern[a].addEventListener('change', saveTxtHeader);
            txtHeaderPattern[a].addEventListener('click', blurTxtHeader);
            txtHeaderPattern[a].addEventListener('focusout', saveTxtHeader);

            //add the show and hide control
            btnShowHidePattern[a].addEventListener('click', showHidePatterns);

            //change pattern color from txtColor
            txtColorPattern[a].addEventListener('change', choosePatternColor);
            txtColorPattern[a].addEventListener('focus', selectAll);
            thumbPickerPattern[a].addEventListener('click', letsSummonColorPicker);

            //add function to all sliders to change textbox
            linkRangeToTextbox();
            
            //add function to all textbox to change slider
            linkTextboxToRange();

            //ajust opacity
            txtOpacityPattern[a].addEventListener('change', chooseOpacity);
            txtOpacityPattern[a].previousElementSibling.addEventListener('input', chooseOpacity);

            //adjust X 
            txtXPattern[a].addEventListener('change', adjustX);
            txtXPattern[a].previousElementSibling.addEventListener('input', adjustX);

            //adjust Y
            txtYPattern[a].addEventListener('change', adjustY);
            txtYPattern[a].previousElementSibling.addEventListener('input', adjustY);

            //adjust scale
            txtSizePattern[a].addEventListener('change', chooseSize);
            txtSizePattern[a].previousElementSibling.addEventListener('input', chooseSize);

            //adjust spacing 
            txtSpacingPattern[a].addEventListener('change', chooseSpacing);
            txtSpacingPattern[a].previousElementSibling.addEventListener('input', chooseSpacing);

            //adjust random spin
            txtRandomSpinPattern[a].addEventListener('change', randomSpin);
            txtRandomSpinPattern[a].previousElementSibling.addEventListener('input', randomSpin);
            
            //adjust random size
            chkRandomSeed[a].addEventListener('click', chkBoxPatternClick);
            chkRandomSeed[a].addEventListener('click', randomSeed);
            chkRandomSeed[a].addEventListener('mouseover', chkBoxHover);
            chkRandomSeed[a].addEventListener('mouseleave', chkBoxLeave);

            //assign dropOptionVerti selection for blend mode
            for(var a = 0; a < optPatternBlend.length; a++) {
                optPatternBlend[a].addEventListener('click', chooseBlend);
            }
         
        }
    }

    //after all assigned controls then create the actual pattern layer
    createCanvasPattern(Number(pnlBoxPattern[0].dataset.layer)) //always get the data-layer of the top pnlBoxPattern
}

function createPnlBoxPattern() {

    //reset txtSearch value
    menuPatterns.querySelector('.txtSearch').value = "";
    menuPatterns.querySelector('.btnDelSearch').style.visibility = "hidden";

    var e = pnlBoxPattern.length; //get the length of pnlBoxPatterns and use it as layer count
    var maxHori = Math.ceil(txtSizeWidth.value / boxSize);
    var maxVerti = Math.ceil(txtSizeHeight.value / boxSize);

    var newPattern = 
    `<div class="pnlBoxPattern" name="${this.id}" data-layer=${e}>
        <div class="pnlTitlePattern">
            <div class="btnExpandCollapsePattern" data-show="more">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.86603 7.5C5.48113 8.16667 4.51887 8.16667 4.13397 7.5L0.669874 1.5C0.284974 0.833333 0.766099 -8.94676e-07 1.5359 -8.27378e-07L8.4641 -2.21695e-07C9.2339 -1.54397e-07 9.71503 0.833333 9.33013 1.5L5.86603 7.5Z" fill="white"/>
                </svg>
            </div>
            <input type="text" class="txtHeaderPattern" value="${autoIncrementPattern(this.children[0].getAttribute("name"))}" readonly = "readonly">
            <div class="btnShowHidePattern">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.00014 2.71429C5.57998 2.71429 4.42871 3.86555 4.42871 5.28572C4.42871 6.70588 5.57998 7.85714 7.00014 7.85714C8.4203 7.85714 9.57157 6.70588 9.57157 5.28572C9.57157 3.86555 8.4203 2.71429 7.00014 2.71429Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9119 4.87535C12.4818 1.69741 9.79075 1.19209e-07 7 0C4.20925 -1.78814e-07 1.51815 1.69741 0.0880784 4.87535C-0.0293595 5.13632 -0.0293595 5.43511 0.0880784 5.69608C1.51815 8.87402 4.20925 10.5714 7 10.5714C9.79075 10.5714 12.4818 8.87401 13.9119 5.69608C14.0294 5.4351 14.0294 5.13632 13.9119 4.87535ZM7 8.57143C5.18342 8.57143 3.27797 7.53709 2.11033 5.28572C3.27797 3.03434 5.18342 2 7 2C8.81657 2 10.722 3.03434 11.8897 5.28571C10.722 7.53708 8.81657 8.57143 7 8.57143Z" fill="white"/>
                </svg>
            </div>
        </div>

        <div class="breaklineHeader"></div>   

        <div class="contentPattern">
            <div class="tabSliderPattern">
                <div class = "tabBasicPattern">
                    <div class="pnlDropPattern">
                            
                        <div class="dropdown">
                            <h2>Normal</h2>

                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L9 1" stroke="#647499" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>      
                            
                        </div>

                        <div class="dropOptionVerti">
                            <div class="optPatternBlend">Normal</div>
                            <div class="breaklineVerti"></div> 
                            <div class="optPatternBlend">Lighten</div>
                            <div class="optPatternBlend">Screen</div>
                            <div class="breaklineVerti"></div> 
                            <div class="optPatternBlend">Overlay</div>
                            <div class="optPatternBlend">Soft-light</div>
                            <div class="breaklineVerti"></div> 
                            <div class="optPatternBlend">Darken</div>
                            <div class="optPatternBlend">Multiply</div>
                            <div class="breaklineVerti"></div> 
                            <div class="optPatternBlend">Difference</div>
                            <div class="optPatternBlend">Exclusion</div>
                        </div>
                            
                    </div>
                    <div class="pnlEntry">
                        <h2>Color</h2>
                        <input type="text" class="txtColorPattern" value="949EFF">
                        <div class="thumbPickerPattern"></div>
                    </div>
                    <div class="pnlEntry">
                        <h2>Opacity</h2>
                        <input type="range" value="100" min="0" max="100" class="rngPattern">
                        <input type="number" class="txtOpacityPattern" value="100" min="0" max="100">
                    </div>
                    <div class="pnlEntry">
                        <h2>X-axis</h2>
                        <input type="range" value="0" min="${maxHori * -1}" max="${maxHori}" class="rngPattern">
                        <input type="number" class="txtXPattern" value="0" min="${maxHori * -1}" max="${maxHori}">
                    </div>
                    <div class="pnlEntry">
                        <h2>Y-axis</h2>
                        <input type="range" value="0" min="${maxVerti * -1}" max="${maxVerti}" class="rngPattern">
                        <input type="number" class="txtYPattern" value="0" min="${maxVerti * -1}" max="${maxVerti}">
                    </div>
                </div>

                <div class = "tabStylePattern">

                    <div class="pnlEntry">
                        <h2>Size</h2>
                        <input type="range" min="1" max="10" value="3" class="rngPattern">
                        <input type="number" class="txtSizePattern" value="3" min="1" max="10">
                    </div>
                    
                    <div class="pnlEntry">
                        <h2>Spacing</h2>
                        <input type="range" value="0" min="0" max="10" class="rngPattern">
                        <input type="number" class="txtSpacingPattern" value="0" min="0" max="10">
                    </div> 

                    <div class="breaklinePanel"></div>

                    <div class="pnlEntry">
                        <h2>Random Spin</h2>
                        <input type="range" value="0" min="0" max="90" class="rngPattern">
                        <input type="number" class="txtRandomSpinPattern" value="0" min="0" max="90">
                    </div>
                    <div class="pnlEntry">
                        <h2>Random Seed</h2>
                        <div class="chkRandomSeed" data-value="false"><div class="chkSwitch"></div></div>
                    </div>
                </div>
            </div>
        </div> 
        <div class="pnlBottomPatternTrack">
            <div class="pnlBottomPatternThumb"></div>
        </div>
        <div class="pnlBottomPattern">
            <div class="frBottom">
                <div class="btnBasicPattern">
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="2" width="11" height="2" rx="1" fill="#647499"/>
                        <rect x="13" y="2" width="5" height="2" rx="1" fill="#647499"/>
                        <rect x="9.5" y="0.5" width="5" height="5" rx="2.5" fill="#647499" stroke="#647499"/>
                        <rect width="11" height="2" rx="1" transform="matrix(-1 0 0 1 18 10)" fill="#647499"/>
                        <rect width="5" height="2" rx="1" transform="matrix(-1 0 0 1 5 10)" fill="#647499"/>
                        <rect x="0.5" y="-0.5" width="5" height="5" rx="2.5" transform="matrix(-1 0 0 1 9 9)" fill="#647499" stroke="#647499"/>
                    </svg>
                </div>
            </div>
            <div class="frBottom">
                <div class="btnStylePattern">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.6489 0.866369C12.0361 0.635613 12.5299 0.898202 12.5551 1.34822L12.8065 5.83676C12.8155 5.99777 12.889 6.14838 13.0103 6.25462L16.3926 9.21612C16.7317 9.51304 16.6345 10.0639 16.2143 10.2269L12.0232 11.853C11.8728 11.9113 11.7523 12.0277 11.6887 12.176L9.91735 16.3078C9.73975 16.7221 9.18586 16.7999 8.90096 16.4507L6.0593 12.9671C5.95736 12.8422 5.80941 12.7635 5.6488 12.7489L1.17178 12.341C0.722907 12.3001 0.477713 11.7974 0.72184 11.4185L3.15677 7.63944C3.24412 7.50388 3.27321 7.33886 3.2375 7.18159L2.24193 2.79765C2.14211 2.35811 2.54446 1.96957 2.98024 2.08467L7.32677 3.23263C7.48269 3.27381 7.64863 3.25049 7.78716 3.16793L11.6489 0.866369Z" fill="#647499"/>
                        <path d="M12.4441 12.4442C12.8346 12.0536 13.4678 12.0536 13.8583 12.4442L17.7157 16.3015C18.1062 16.6921 18.1062 17.3252 17.7157 17.7158C17.3252 18.1063 16.692 18.1063 16.3015 17.7158L12.4441 13.8584C12.0536 13.4678 12.0536 12.8347 12.4441 12.4442Z" fill="#647499"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    
    `;

    configScroll[1].insertAdjacentHTML('afterbegin', newPattern); //add the child on top of the previous one

    changeTextColor();
    addPnlBoxPatternControls(e);
    
}

//create pattern layer
function createCanvasPattern(e) {

    cnvPatterns[e] = document.createElement('div');
    cnvPatterns[e].style.width = "100%";
    cnvPatterns[e].style.height = "100%";
    cnvPatterns[e].style.display = "grid";
    cnvPatterns[e].style.gridTemplateColumns = "repeat(10, 10px)";
    cnvPatterns[e].style.gridGap = '0%';
    cnvPatterns[e].style.flexWrap = "wrap";
    cnvPatterns[e].style.position = "absolute";
    cnvPatterns[e].style.visibility = "visible";
    cnvPatterns[e].style.backgroundColor = "transparent"

    //after creating the main pattern layer, render the tiles
    renderPattern(e)
}

//render patterns inside the layer 
function renderPattern(e) {

    cnvPatterns[e].innerHTML = "";

    var numBoxesX = Math.ceil(txtSizeWidth.value / boxSize) ;
    var numBoxesY = Math.ceil(txtSizeHeight.value / boxSize);

    var numBoxesTotal = numBoxesX * numBoxesY;
   
    //get the pnlBoxPattern with the data-layer matching with 'e'
    var getPnlBoxPattern = document.querySelector(`.pnlBoxPattern[data-layer="${e}"]`);

    //get the scale data from the corresponding pnlBoxPattern array
    var getPatternSize = getPnlBoxPattern.querySelector('.txtSizePattern');
    //var convertPatternSize = ((getPatternSize.value * 10) + 30) * .7; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%
    var convertPatternSize = getPatternSize.value * 10; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%

    //get the spacing data from the corresponding pnlBoxPattern array
    var getPatternSpacing = getPnlBoxPattern.querySelector('.txtSpacingPattern');
    
    //get the horizontal and vertical spacing
    var getHorizontal = getPnlBoxPattern.querySelector('.txtXPattern');
    var getVertical = getPnlBoxPattern.querySelector('.txtYPattern');

    getHorizontal.max = numBoxesX;
    getHorizontal.min = numBoxesX * -1;
    getVertical.max = numBoxesY;
    getVertical.min = numBoxesY *-1;

    var getHorizontalRange = getHorizontal.previousElementSibling;
    var getVerticalRange = getVertical.previousElementSibling;

    getHorizontalRange.max = numBoxesX;
    getHorizontalRange.min = numBoxesX * -1;
    getVerticalRange.max = numBoxesY;
    getVerticalRange.min = numBoxesY *-1;

    //get the color data from the corresponding pnlBoxPattern array
    var getPatternColor = getPnlBoxPattern.querySelector('.txtColorPattern');

    //adjust the spacing/gap of each boxes
    cnvPatterns[e].style.gridGap = `${getPatternSpacing.value*boxSize}px`;

    //adjust the position of each boxes
    cnvPatterns[e].style.gridTemplateColumns = `repeat(${numBoxesX}, ${boxSize}px)`;

    //adjust the position of the entire layer
    cnvPatterns[e].style.left = `${getHorizontal.value*boxSize}px`;
    cnvPatterns[e].style.top = `${getVertical.value*boxSize}px`;

    //create the box container of this SVG
    var box = [];

    //get SVG from library-----------------------------------------
    var getSVG;

    for(var a=0; a < patterns.length; a++) {
        if(getPnlBoxPattern.getAttribute('name') == patterns[a].id) {
            getSVG = patterns[a].svg;
        }
    }

    //add the <g> tag
    //box[b].children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;
    
    for(var b = 0; b < numBoxesTotal; b++) { //start creating individial pattern
        box[b] = document.createElement('div');
        box[b].style.width = boxSize + "px"; //width from txtSizeWidth *percent as px
        box[b].style.height = boxSize + "px"; //height is the same as width in px
        box[b].style.display = "flex";
        box[b].classList.add('boxesPattern');

        //append the SVG xml string inside the box
        box[b].innerHTML = getSVG;
        
        //add the opacity and blend mode attributes SVG xml string
        var svgChild = "";
        for(var c = 0; c < box[b].children[0].childElementCount; c++) {
            svgChild += box[b].children[0].children[c].outerHTML;
        }

        //add the <g> tag
        box[b].children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;

        //add the svgChild back
        box[b].children[0].children[0].innerHTML = svgChild;

        //change the svg properties inside the box
        box[b].children[0].style.margin = "auto";
        box[b].children[0].style.width = `${convertPatternSize}%`;
        box[b].children[0].style.height = "auto";

        //randomSize(e, event); //trigger randomSize if the canvas will be resize again
        //randomSpin(e, event); ////trigger randomSpin if the canvas will be spin again
        
        //change color of svg inside the box;
        for(var a= 0; a < box[b].children[0].childElementCount; a++) {
            box[b].children[0].children[0].children[a].setAttribute('fill', '#' + getPatternColor.value);
            //box[b].children[0].children[0].children[a].setAttribute('stroke', '#' + getPatternColor.value);
        }

        cnvPatterns[e].appendChild(box[b]);
        
       
    }

    //insert before cnvLayers if there's any
    cnvGrpPatterns.appendChild(cnvPatterns[e]);
    
}

//===============DRAG AND DROP=================

function countdownPattern() {

    if(counter < 300) {
        counter+=100;
    }
    else {
        isDragging = true; //set boolean to true

        clearInterval(tmrDrag);
        tmrDrag = null;
        counter = 0;
    }
}   

function pointerDownPattern(e) {
    
    if((this != e.target) && (e.target.closest('.pnlTitlePattern'))) {
        e.preventDefault(); //remove the highlighting on texts
        
        clientY = e.clientY;

        //remove any current focus especially on the renaming
        var checkInputs = document.querySelectorAll('input[type="text"], input[type="number"]');
        checkInputs.forEach(function(input) {
            input.blur();
        })

        //start timer drag only if the current panel is part of focus panel
        for(var a = 0; a < focusPanel.length; a++) {
            if(focusPanel[a] != null) {
                if(focusPanel[a] == e.target.closest('.pnlBoxPattern')) {
                    tmrDrag = setInterval(countdownPattern, 100);
                    break;
                }
           
            }
        }
    }
}
configScroll[1].addEventListener('pointerdown', pointerDownPattern);

function pointerMovePattern(e) {
    e.preventDefault();

    if(isDragging) {
 
        //this.scrollTop = e.clientY;

        for(var a = 0; a < pnlBoxPattern.length; a++) {
           
            if(e.clientY < pnlBoxPattern[a].getBoundingClientRect().top + (pnlBoxPattern[a].clientHeight/2)) {
                
                patRank = a;

                breaklineDrag.style.display = "block";

                this.insertBefore(breaklineDrag, pnlBoxPattern[patRank]);
           
                break;
            }
            
            else if(e.clientY > pnlBoxPattern[pnlBoxPattern.length-1].getBoundingClientRect().top + (pnlBoxPattern[pnlBoxPattern.length-1].clientHeight /2)) {

                this.appendChild(breaklineDrag);

                break;

            }
            
        }
        
    }

}

configScroll[1].addEventListener('pointermove', pointerMovePattern);
configScroll[1].addEventListener('contextmenu', function(e){
    e.preventDefault();
})

function pointerUpPattern(e) {

    e.preventDefault();

    if(isDragging) {

        isDragging = false;

        for(var a = focusPanel.length-1; a >= 0; a--) {
            if(focusPanel[a] != null) {
                this.insertBefore(focusPanel[a], breaklineDrag);
            }
            
        }

        breaklineDrag.style.display = "none";
        
        patRank = null;

        rearrangeCanvasPatterns()
    }

    counter = 0;
    clientY = null;
    clearInterval(tmrDrag);
    
}
configScroll[1].addEventListener('pointerup', pointerUpPattern);


//================REARRANGE CANVAS DEPENDING ON THE LAYER ARRANGEMENT=======

function rearrangeCanvasPatterns() {
    
    //first rearrange all cnvPatterns
    for(var a = 0; a < pnlBoxPattern.length; a++) {
        
        var e = pnlBoxPattern[a].dataset.layer;
        
        cnvGrpPatterns.prepend(cnvPatterns[e]);

    }
}
