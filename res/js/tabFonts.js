
var tabSliderFont = document.getElementById('tabSliderFont');
var tabStylish = document.getElementById('tabStylish');
var tabSansSerif = document.getElementById('tabSansSerif');
var tabSerif = document.getElementById('tabSerif');
var breaklineThumbFonts = document.getElementById('breaklineThumbFonts');
var fontSelect = document.getElementsByClassName('fontSelect');
var pnlBoxStylish = document.getElementsByClassName('pnlBoxStylish');
var pnlBoxSerif = document.getElementsByClassName('pnlBoxSerif');
var pnlBoxSansSerif = document.getElementsByClassName('pnlBoxSansSerif');
var menuText = document.getElementById('menuText');
var optFonts = document.getElementsByClassName('optFonts');
var txtSearchText = menuText.querySelector('.txtSearch');
var btnDelSearchText = menuText.querySelector('.btnDelSearch');


configScroll[4].style.overflow = "hidden";

//=================SEARCH ALL VECTORS===============

function searchAllFonts() {
    
    this.nextElementSibling.style.visibility = "visible"
    
    if(this.value.length >= 3) {

        //open the dropoption
        this.closest('.pnlDropHeader').children[1].style.display = "block";

        var searchFound = false;
        //remove all results first
        menuText.querySelector('.dropOptionHeader').innerHTML = "";

        //search each serif for tags
        for(var a = 0; a < serif.length; a++) {
           
            if(serif[a].name.toLowerCase().includes(this.value) || this.value.includes(serif[a].name.toLowerCase()) || serif[a].tags.includes(this.value) || this.value.includes(serif[a].tags)) {

                
                    document.head.insertAdjacentHTML('beforeend', serif[a].source);
                    menuText.querySelector('.dropOptionHeader').innerHTML +=
                    `<div class="optFonts" data-font="${serif[a].name}" data-class="${serif[a].class}" style="font-family: ${serif[a].name};">${serif[a].name}</div>`
                
                
                searchFound = true;

                for(var b=0; b < optFonts.length; b++) {
                    
                    optFonts[b].addEventListener('click', function() {
                        createPnlBoxText(this);
                        
                    });
                }
            }
        }

        //search each sans serif for tags
        for(var a = 0; a < sansSerif.length; a++) {
           
            if(sansSerif[a].name.toLowerCase().includes(this.value) || this.value.includes(sansSerif[a].name.toLowerCase()) || sansSerif[a].tags.includes(this.value) || this.value.includes(sansSerif[a].tags)) {
                
                if(document.head.querySelector(`[href *= '${sansSerif[a].name}']`) == null) {
                    document.head.insertAdjacentHTML('beforeend', sansSerif[a].source);
                    menuText.querySelector('.dropOptionHeader').innerHTML +=
                    `<div class="optFonts" data-font="${sansSerif[a].name}" data-class="${sansSerif[a].class}" style="font-family: ${sansSerif[a].name};">${sansSerif[a].name}</div>`
                }
                else {  
                    menuText.querySelector('.dropOptionHeader').innerHTML +=
                    `<div class="optFonts" data-font="${sansSerif[a].name}" data-class="${sansSerif[a].class}" style="font-family: ${sansSerif[a].name};">${sansSerif[a].name}</div>`
                }

                searchFound = true;

                for(var b=0; b < optFonts.length; b++) {
                    
                    optFonts[b].addEventListener('click', function() {
                        createPnlBoxText(this);
                        
                    });
                }
            }
        }

        //search each stylish for tags
        for(var a = 0; a < stylish.length; a++) {
            
            if(stylish[a].name.toLowerCase().includes(this.value) || this.value.includes(stylish[a].name.toLowerCase()) || stylish[a].tags.includes(this.value) || this.value.includes(stylish[a].tags)) {

                //check first if the font is loaded
                var fontFace = new FontFace(`${stylish[a].name}`, `url(${stylish[a].source})`,);
                //add first the font to the document
                document.fonts.add(fontFace);
                
                fontFace.loaded.then(
                menuText.querySelector('.dropOptionHeader').innerHTML +=
                `<div class="optFonts" data-font="${stylish[a].name}" data-class="${stylish[a].class}" style="font-family: ${stylish[a].name};">${stylish[a].name}</div>`
                )

                searchFound = true;

                for(var b=0; b < optFonts.length; b++) {
                    
                    optFonts[b].addEventListener('click', function() {
                        createPnlBoxText(this);
                        
                    });
                }
            }
        }

        if(!searchFound) {
            menuText.querySelector('.dropOptionHeader').innerHTML = 
            `<div class="optResults">No results found</div>`;
        }
    }
    else {
        hideAllOptions();

    }

    if(this.value == "") {
        this.nextElementSibling.style.visibility = "hidden"
    }
    
}
txtSearchText.addEventListener('input', searchAllFonts)

//=============
btnDelSearchText.addEventListener('click', function() {
    this.previousElementSibling.focus();
    this.previousElementSibling.value = "";
    this.style.visibility = "hidden";
    
})

function fontSelectHover() {
    if(fontSelected != this.children[0].innerText) {
        this.children[0].style.color = "#9DAFDB";
    }
}

function fontSelectLeave() {
    if(fontSelected != this.children[0].innerText) {
        this.children[0].style.color = "#647499";
    }
}

function showStylish() {
    if(tabStylish.childElementCount == 0) {

        var appendResults = "";
 
        for(var a = 0; a < 16; a++) {

            if(stylish[a] != null) {

                var fontFace = new FontFace(`${stylish[a].name}`, `url(${stylish[a].source})`,);

                //add first the font to the document
                document.fonts.add(fontFace);
                fontFace.loaded.then( 
                    appendResults += `<div class="pnlBoxStylish" data-font="${stylish[a].name}" data-class="${stylish[a].class}"><h2 style="font-family: '${stylish[a].name}'; font-weight: 400; font-style:'normal'; font-display: swap;">${stylish[a].name.toUpperCase()}</h2></div>`
                )
            }
                
        }

        tabStylish.innerHTML = appendResults;
        
        for(var a=0; a < pnlBoxStylish.length; a++) {
            pnlBoxStylish[a].addEventListener('pointerenter', pnlBoxFontHover);
            pnlBoxStylish[a].addEventListener('pointerleave', pnlBoxFontLeave);
            pnlBoxStylish[a].addEventListener('dblclick', function() {
                this.style.borderColor = "#6885CC";
                createPnlBoxText(this);
            });
        }
        
    }
}
showStylish();

function showSansSerif() {
    if(tabSansSerif.childElementCount == 0) {

        var appendResults = "";
 
        for(var a = 0; a < 16; a++) {

            if(sansSerif[a] != null) {

                document.head.insertAdjacentHTML('beforeend', sansSerif[a].source)
                appendResults += `<div class="pnlBoxSansSerif" data-font="${sansSerif[a].name}" data-class="${sansSerif[a].class}"><h2 style="font-family: '${sansSerif[a].name}'; font-weight: 400; font-style:'normal'; font-display: swap;">${sansSerif[a].name.toUpperCase()}</h2></div>`
                
            }
                
        }

        tabSansSerif.innerHTML = appendResults;
        
        for(var a=0; a < pnlBoxSansSerif.length; a++) {
            pnlBoxSansSerif[a].addEventListener('pointerenter', pnlBoxFontHover);
            pnlBoxSansSerif[a].addEventListener('pointerleave', pnlBoxFontLeave);
            pnlBoxSansSerif[a].addEventListener('dblclick', function() {
                this.style.borderColor = "#6885CC";
                createPnlBoxText(this);
            });
        }
        
    }
}

function showSerif() {
    if(tabSerif.childElementCount == 0) {

        var appendResults = "";
 
        for(var a = 0; a < 16; a++) {

            if(serif[a] != null) {

                document.head.insertAdjacentHTML('beforeend', serif[a].source)
                appendResults += `<div class="pnlBoxSerif" data-font="${serif[a].name}" data-class="${serif[a].class}"><h2 style="font-family: '${serif[a].name}'; font-weight: 400; font-style:'normal'; font-display: swap;">${serif[a].name.toUpperCase()}</h2></div>`

            }
                
        }

        tabSerif.innerHTML = appendResults;
        
        for(var a=0; a < pnlBoxSerif.length; a++) {
            pnlBoxSerif[a].addEventListener('pointerenter', pnlBoxFontHover);
            pnlBoxSerif[a].addEventListener('pointerleave', pnlBoxFontLeave);
            pnlBoxSerif[a].addEventListener('dblclick', function() {
                this.style.borderColor = "#6885CC";
                createPnlBoxText(this);
            });
        }
        
    }
}

//----------START SELECTING FONT TAB-----------------
function fontSelectClick() {
    for(var a = 0; a < fontSelect.length; a++) {
        fontSelect[a].children[0].style.color = "#647499";
    }
    this.children[0].style.color = "white";
    fontSelected = this.children[0].innerText;

    if(fontSelected == "Stylish") {

        
        tabSansSerif.style.overflowY = "hidden";
        tabSerif.style.overflowY = "hidden";

        var timeOut = setTimeout(function() {
            tabStylish.style.overflowY = "auto";
            clearTimeout(timeOut);
        }, 200);

        breaklineThumbFonts.style.translate = "0%";
        tabSliderFont.style.translate = "0%";
        showStylish();
    }
    else if(fontSelected == "Sans Serif") {

        tabStylish.style.overflowY = "hidden";
        tabSerif.style.overflowY = "hidden";

        var timeOut = setTimeout(function() {
            tabSansSerif.style.overflowY = "auto";
            clearTimeout(timeOut);
        }, 200);

        breaklineThumbFonts.style.translate = "100%"
        tabSliderFont.style.translate = "-100%";
        showSansSerif();
    }
    else if(fontSelected == "Serif") {

        tabStylish.style.overflowY = "hidden";
        tabSansSerif.style.overflowY = "hidden";
       
        var timeOut = setTimeout(function() {
            tabSerif.style.overflowY = "auto";
            clearTimeout(timeOut);
        }, 200);

        breaklineThumbFonts.style.translate = "200%";
        tabSliderFont.style.translate = "-200%";
        showSerif();
    }
}

for(var a = 0; a < fontSelect.length; a++) {
    fontSelect[a].addEventListener('mouseover', fontSelectHover);
    fontSelect[a].addEventListener('mouseleave', fontSelectLeave);
    fontSelect[a].addEventListener('click', fontSelectClick);
}

function pnlBoxFontHover() {
    
    for(var a = 0; a < pnlBoxStylish.length; a++) {

        pnlBoxStylish[a].style.backgroundColor = "transparent";
        pnlBoxStylish[a].style.border = "1px solid transparent";
        pnlBoxStylish[a].children[0].style.color = "#9DAFDB";

    }

    for(var a = 0; a < pnlBoxSansSerif.length; a++) {

        pnlBoxSansSerif[a].style.backgroundColor = "transparent";
        pnlBoxSansSerif[a].style.border = "1px solid transparent";
        pnlBoxSansSerif[a].children[0].style.color = "#9DAFDB";
    }

    for(var a = 0; a < pnlBoxSerif.length; a++) {

        pnlBoxSerif[a].style.backgroundColor = "transparent";
        pnlBoxSerif[a].style.border = "1px solid transparent";
        pnlBoxSerif[a].children[0].style.color = "#9DAFDB";
    }

    this.style.backgroundColor = "#343C4F";
    this.style.border = "1px solid #6885CC";
    this.children[0].style.color = "white";

}

function pnlBoxFontLeave(){

    for(var a = 0; a < pnlBoxStylish.length; a++) {

        pnlBoxStylish[a].style.backgroundColor = "transparent";
        pnlBoxStylish[a].style.border = "1px solid transparent";
        pnlBoxStylish[a].children[0].style.color = "#9DAFDB";

    }

    for(var a = 0; a < pnlBoxSansSerif.length; a++) {

        pnlBoxSansSerif[a].style.backgroundColor = "transparent";
        pnlBoxSansSerif[a].style.border = "1px solid transparent";
        pnlBoxSansSerif[a].children[0].style.color = "#9DAFDB";
    }

    for(var a = 0; a < pnlBoxSerif.length; a++) {

        pnlBoxSerif[a].style.backgroundColor = "transparent";
        pnlBoxSerif[a].style.border = "1px solid transparent";
        pnlBoxSerif[a].children[0].style.color = "#9DAFDB";
    }
}

function pnlBoxFontClick() {
    this.style.border = "1px solid #6885CC";
}

function createPnlBoxText(me) {

    var newText;
    var e = pnlBoxLayer.length; //get the length of pnlBoxPatterns and use it as layer count
    
    newText = 
    `<div class="pnlBoxLayer" name="Text" data-layer="${e}" data-font="${me.dataset.font}" data-class="${me.dataset.class}" data-type = "text">
                <div class="pnlTitleLayer">
                    <div class="btnExpandCollapseLayer" data-show="more">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.86603 7.5C5.48113 8.16667 4.51887 8.16667 4.13397 7.5L0.669874 1.5C0.284974 0.833333 0.766099 -8.94676e-07 1.5359 -8.27378e-07L8.4641 -2.21695e-07C9.2339 -1.54397e-07 9.71503 0.833333 9.33013 1.5L5.86603 7.5Z" fill="white"/>
                        </svg>
                    </div>
                    <input type="text" class="txtHeaderLayer" value="${autoIncrementLayer('Text')}" readonly = "readonly">
                    <div class="btnShowHideLayer">
                        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.00014 2.71429C5.57998 2.71429 4.42871 3.86555 4.42871 5.28572C4.42871 6.70588 5.57998 7.85714 7.00014 7.85714C8.4203 7.85714 9.57157 6.70588 9.57157 5.28572C9.57157 3.86555 8.4203 2.71429 7.00014 2.71429Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9119 4.87535C12.4818 1.69741 9.79075 1.19209e-07 7 0C4.20925 -1.78814e-07 1.51815 1.69741 0.0880784 4.87535C-0.0293595 5.13632 -0.0293595 5.43511 0.0880784 5.69608C1.51815 8.87402 4.20925 10.5714 7 10.5714C9.79075 10.5714 12.4818 8.87401 13.9119 5.69608C14.0294 5.4351 14.0294 5.13632 13.9119 4.87535ZM7 8.57143C5.18342 8.57143 3.27797 7.53709 2.11033 5.28572C3.27797 3.03434 5.18342 2 7 2C8.81657 2 10.722 3.03434 11.8897 5.28571C10.722 7.53708 8.81657 8.57143 7 8.57143Z" fill="white"/>
                        </svg>
                    </div>
                </div>

                <div class="breaklineHeader"></div>   

                <div class="contentImages">
                    <div class="tabSliderLayer">
                        <div class = "tabBasicLayer">

                            <div class="pnlDropLayer">
                                    
                                <div class="dropdown">
                                    <h2>Normal</h2>

                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="#647499" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>      
                                    
                                </div>

                                <div class="dropOptionVerti">
                                    <div class="optLayerBlend">Normal</div>
                                    <div class="breaklineVerti"></div> 
                                    <div class="optLayerBlend">Lighten</div>
                                    <div class="optLayerBlend">Screen</div>
                                    <div class="breaklineVerti"></div> 
                                    <div class="optLayerBlend">Overlay</div>
                                    <div class="optLayerBlend">Soft-light</div>
                                    <div class="breaklineVerti"></div> 
                                    <div class="optLayerBlend">Darken</div>
                                    <div class="optLayerBlend">Multiply</div>
                                    <div class="breaklineVerti"></div> 
                                    <div class="optLayerBlend">Difference</div>
                                    <div class="optLayerBlend">Exclusion</div>
                                </div>
                                    
                            </div>

                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide">
                                    <h2>Width</h2>
                                    <input type="number" class="txtWidthLayer" min="0">
                                </div>
                                <div class="pnlEntrySide">
                                    <h2>Height</h2>
                                    <input type="number" class="txtHeightLayer" value="0">
                                </div>
                            </div>
                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide">
                                    <h2>X-axis</h2>
                                    <input type="number" class="txtXLayer" value="0">
                                </div>
                                <div class="pnlEntrySide">
                                    <h2>Y-axis</h2>
                                    <input type="number" class="txtYLayer" value="0">
                                </div>
                            </div>

                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide">
                                    <h2>Flip X</h2>
                                    <div class="chkFlipX" data-value="false"><div class="chkSwitch"></div></div>
                                </div>
                                <div class="pnlEntrySide">
                                    <h2>Flip Y</h2>
                                    <div class="chkFlipY" data-value="false"><div class="chkSwitch"></div></div>
                                </div>
                            </div>

                            <div class="breaklinePanel"></div>

                            <div class="pnlEntry">
                                <h2>Opacity</h2>
                                <input type="range" value="100" min="0" max="100" class="rngLayer">
                                <input type="number" class="txtOpacityLayer" value="100" min="0" max="100">
                            </div>

                            <div class="pnlEntry">
                                <h2>Rotation</h2>
                                <input type="range" value="0" min="0" max="359" class="rngLayer">
                                <input type="number" class="txtRotationLayer" value="0" min="0" max="359">
                            </div>
                            
                        </div>

                        <div class = "tabTextLayer">

                            <div class="pnlDropLayer">
                                    
                                <div class="dropdown">
                                    <h2>Regular</h2>

                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="#647499" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>      
                                    
                                </div>

                                <div class="dropOptionVerti">
                                    <div class="optTextWeight">Regular</div>
                                </div>
                                    
                            </div>

                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide">
                                    
                                    <svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00023 0H2.12034H2.00023V0.120117L-0.000976562 2.12132L0.70613 2.82843L2.00023 1.53433V12H3.00023V1.2941L4.53456 2.82843L5.24166 2.12132L3.12034 0L3.00023 0.120117V0ZM10.5473 12H9.00046L11.8169 4H13.6059L16.4262 12H14.8794L14.2166 10.0273H11.2089L10.5473 12ZM12.7426 5.64062L13.8254 8.86328H11.5993L12.6801 5.64062H12.7426ZM24 4H23V14.5858L21.5858 13.1716L20.8787 13.8787L23 16H24L26.1213 13.8787L25.4142 13.1716L24 14.5858V4Z" fill="#647499"/>
                                    </svg>

                                    <input type="number" class="txtResizeText" min="1" value="48">
                                </div>
                                <input type="text" class="txtTextColor" value="000000">
                                <div class="thumbPickerTextColor"></div>
                            </div>
                            
                            <div class="pnlEntryFold">
                            
                                <div class="pnlEntrySide">
                                
                                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.83643 12H7.28955L10.106 4H11.895L14.7153 12H13.1685L11.0317 5.64062H10.9692L8.83643 12ZM8.88721 8.86328H13.106V10.0273H8.88721V8.86328Z" fill="#647499"/>
                                        <path d="M0 0H1V16H0V0Z" fill="#647499"/>
                                        <path d="M21 0H22V16H21V0Z" fill="#647499"/>
                                    </svg>

                                
                                    <input type="number" class="txtLetterSpacing" min="0" value="0">
                                </div>
                                <div class="pnlEntrySide">

                                    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.83643 11H7.28955L10.106 3H11.895L14.7153 11H13.1685L11.0317 4.64063H10.9692L8.83643 11ZM8.88721 7.86328H13.106V9.02735H8.88721V7.86328Z" fill="#647499"/>
                                        <path d="M22 0V1L0 1L5.96046e-08 7.15256e-07L22 0Z" fill="#647499"/>
                                        <path d="M0 14V13L22 13V14L0 14Z" fill="#647499"/>
                                    </svg>

                                    <input type="text" class="txtLineHeight" min="0" value="Auto">
                                
                                </div>
                            </div>

                            <div class="breaklinePanel"></div>

                            <div class="pnlEntryFold">
                                <div class="pnlButtonSide">
                                    <div class="btnUpperCase"><h2>AB</h2></div>
                                    <div class="btnTitleCase"><h2>Ab</h2></div>
                                    <div class="btnLowerCase"><h2>ab</h2></div>
                                </div>

                                <div class ="pnlButtonSide">
                                    <div class="btnAutoWidth">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.89543 0 2V16C0 17.1046 0.89543 18 2 18H16C17.1046 18 18 17.1046 18 16V2C18 0.895431 17.1046 0 16 0H2ZM2 1C1.44772 1 1 1.44772 1 2V16C1 16.5523 1.44772 17 2 17H16C16.5523 17 17 16.5523 17 16V2C17 1.44772 16.5523 1 16 1H2Z" fill="#647499"/>
                                            <path d="M5 12L1 9L5 6L5 8H7V10H5V12Z" fill="#647499"/>
                                            <path d="M13 12L17 9L13 6V8H11V10H13V12Z" fill="#647499"/>
                                        </svg>
                                    </div>
                                    <div class="btnAutoHeight">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.89543 0 2V16C0 17.1046 0.89543 18 2 18H16C17.1046 18 18 17.1046 18 16V2C18 0.895431 17.1046 0 16 0H2ZM2 1C1.44772 1 1 1.44772 1 2V16C1 16.5523 1.44772 17 2 17H16C16.5523 17 17 16.5523 17 16V2C17 1.44772 16.5523 1 16 1H2Z" fill="#647499"/>
                                            <path d="M6 5L9 1L12 5H10V7H8V5H6Z" fill="#647499"/>
                                            <path d="M6 13L9 17L12 13L10 13V11H8L8 13H6Z" fill="#647499"/>
                                        </svg>
                                    </div>
                                    <div class="btnFixedSize">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="17" height="17" rx="1.5" stroke="#647499"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div class="pnlEntryFold">
                                <div class="pnlButtonSide">
                                    <div class="btnAlignLeft">
                                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0H8V2H0V0Z" fill="#647499"/>
                                            <path d="M0 10H16V12H0V10Z" fill="#647499"/>
                                            <path d="M0 5H16V7H0V5Z" fill="#647499"/>
                                        </svg>
                                    </div>
                                    <div class="btnAlignCenter">
                                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 0H13V2H3V0Z" fill="#647499"/>
                                            <path d="M3 10H13V12H3V10Z" fill="#647499"/>
                                            <path d="M0 5H16V7H0V5Z" fill="#647499"/>
                                        </svg>
                                    </div>
                                    <div class="btnAlignRight">
                                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 0H16V2H6V0Z" fill="#647499"/>
                                            <path d="M0 10H16V12H0V10Z" fill="#647499"/>
                                            <path d="M0 5H16V7H0V5Z" fill="#647499"/>
                                        </svg>
                                    </div>
                                </div>
                                <div class="pnlButtonSide">
                                    <div class="btnAlignTop">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 5H20V7H4V5Z" fill="#647499"/>
                                            <path d="M9 11L12 7L15 11H13V19H11V11H9Z" fill="#647499"/>
                                        </svg>
                                    </div>
                                    <div class="btnAlignMiddle">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 17L12 13L15 17H13V19H11V17H9Z" fill="#647499"/>
                                            <path d="M15 7L12 11L9 7L11 7V5L13 5V7H15Z" fill="#647499"/>
                                            <path d="M4 13H20V11H4V13Z" fill="#647499"/>
                                        </svg>
                                    </div>
                                    <div class="btnAlignBottom">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 13L12 17L9 13L11 13L11 5H13V13H15Z" fill="#647499"/>
                                            <path d="M4 19H20V17H4V19Z" fill="#647499"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div class = "pnlEntryFold">
                                <div class="pnlButtonSide">
                                    <div class="btnNoDecor"><div></div></div>
                                    <div class="btnUnderline"><h2>AB</h2></div>
                                    <div class="btnStrike"><h2>AB</h2></div>
                                </div>
                            </div>
                        </div>

                        <div class = "tabStyleLayer">
                            <div class="pnlDropLayer">
                                        
                                <div class="dropdown">
                                    <h2>Choose style</h2>

                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="#647499" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>      
                                    
                                </div>

                                <div class="dropOptionVerti">
                                    <div class="optLayerStyle">Outline</div>
                                    <div class="optLayerStyle">Glow</div>
                                    <div class="optLayerStyle">Shadow</div>
                                    <div class="optLayerStyle">Remove</div>
                                </div>
                                    
                            </div>
                            
                            <div class="tabOutlineLayer">
                                <div class="pnlEntry">
                                    <h2>Color</h2>
                                    <input type="text" class="txtOutlineColor" value="949EFF">
                                    <div class="thumbPickerOutline" style="background-color: #949EFF;"></div>
                                </div>
                                <div class="pnlEntry">
                                    <h2>Opacity</h2>
                                    <input type="range" value="100" min="0" max="100" class="rngLayer">
                                    <input type="number" class="txtOutlineOpacity" value="100" min="0" max="100">
                                </div> 
                                
                                <div class="pnlEntry">
                                    <h2>Size</h2>
                                    <input type="range" value="1" min="1" max="100" class="rngLayer">
                                    <input type="number" class="txtOutlineSize" value="1" min="1" max="100">
                                </div> 
                            
                            </div>

                            <div class="tabGlowLayer">
                                <div class="pnlEntry">
                                    <h2>Color</h2>
                                    <input type="text" class="txtGlowColor" value="949EFF">
                                    <div class="thumbPickerGlow"></div>
                                </div>
                                <div class="pnlEntry">
                                    <h2>Opacity</h2>
                                    <input type="range" value="100" min="0" max="100" class="rngLayer">
                                    <input type="number" class="txtGlowOpacity" value="100" min="0" max="100">
                                </div> 

                                <div class="pnlEntry">
                                    <h2>Spread</h2>
                                    <input type="range" value="50" min="0" max="100" class="rngLayer">
                                    <input type="number" class="txtGlowSpread" value="50" min="0" max="100">
                                </div> 
                            </div>

                            <div class="tabShadowLayer">
                                <div class="pnlEntry">
                                    <h2>Color</h2>
                                    <input type="text" class="txtShadowColor" value="000000">
                                    <div class="thumbPickerShadow"></div>
                                </div>
                                <div class="pnlEntry">
                                    <h2>Opacity</h2>
                                    <input type="range" value="100" min="0" max="100" class="rngLayer">
                                    <input type="number" class="txtShadowOpacity" value="100" min="0" max="100">
                                </div> 
                                
                                <div class="pnlEntry">
                                    <h2>Distance</h2>
                                    <input type="range" value="10" min="1" max="100" class="rngLayer">
                                    <input type="number" class="txtShadowSize" value="10" min="1" max="100">
                                </div> 

                                <div class="pnlEntry">
                                    <h2>Spread</h2>
                                    <input type="range" value="0" min="0" max="100" class="rngLayer">
                                    <input type="number" class="txtShadowSpread" value="0" min="0" max="100">
                                </div> 

                                <div class="pnlEntry">
                                    <h2>Rotation</h2>
                                    <input type="range" value="0" min="0" max="359" class="rngLayer">
                                    <input type="number" class="txtShadowRotation" value="0" min="0" max="359">
                                </div> 
                            </div>

                        </div>

                    </div>
                </div> 
                <div class="pnlBottomLayerTrack">
                    <div class="pnlBottomLayerThumb"></div>
                </div>
                <div class="pnlBottomLayer">
                    <div class="frBottom">
                        <div class="btnBasicLayer">
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
                        <div class="btnTextLayer">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 0V18H14.6918V0H15.5Z" fill="#647499"/>
                                <path d="M12.9966 3.3536V6.99992H12.6272C12.4084 6.15871 12.1655 5.55596 11.8988 5.19166C11.632 4.82074 11.2661 4.52599 10.801 4.3074C10.5411 4.18818 10.0862 4.12857 9.43639 4.12857H8.40014V14.5211C8.40014 15.2099 8.43777 15.6405 8.513 15.8127C8.59508 15.9849 8.74897 16.1372 8.97469 16.2697C9.20727 16.3955 9.52187 16.4585 9.9186 16.4585H10.3803V16.8261H3.09576V16.4585H3.55746C3.961 16.4585 4.28591 16.3889 4.53215 16.2498C4.70997 16.1571 4.85021 15.9981 4.9528 15.7729C5.02803 15.614 5.06566 15.1967 5.06566 14.5211V4.12857H4.06019C3.12314 4.12857 2.44253 4.32065 2.01847 4.70482C1.42339 5.24134 1.04718 6.00637 0.889877 6.99992H0.5V3.3536H12.9966Z" fill="#647499"/>
                            </svg>
                        </div>
                    </div>
                    <div class="frBottom">
                        <div class="btnStyleLayer">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6489 0.866369C12.0361 0.635613 12.5299 0.898202 12.5551 1.34822L12.8065 5.83676C12.8155 5.99777 12.889 6.14838 13.0103 6.25462L16.3926 9.21612C16.7317 9.51304 16.6345 10.0639 16.2143 10.2269L12.0232 11.853C11.8728 11.9113 11.7523 12.0277 11.6887 12.176L9.91735 16.3078C9.73975 16.7221 9.18586 16.7999 8.90096 16.4507L6.0593 12.9671C5.95736 12.8422 5.80941 12.7635 5.6488 12.7489L1.17178 12.341C0.722907 12.3001 0.477713 11.7974 0.72184 11.4185L3.15677 7.63944C3.24412 7.50388 3.27321 7.33886 3.2375 7.18159L2.24193 2.79765C2.14211 2.35811 2.54446 1.96957 2.98024 2.08467L7.32677 3.23263C7.48269 3.27381 7.64863 3.25049 7.78716 3.16793L11.6489 0.866369Z" fill="#647499"/>
                                <path d="M12.4441 12.4442C12.8346 12.0536 13.4678 12.0536 13.8583 12.4442L17.7157 16.3015C18.1062 16.6921 18.1062 17.3252 17.7157 17.7158C17.3252 18.1063 16.692 18.1063 16.3015 17.7158L12.4441 13.8584C12.0536 13.4678 12.0536 12.8347 12.4441 12.4442Z" fill="#647499"/>
                            </svg>
                        </div>
                    </div>
                </div>
    </div>`;
    
    configScroll[5].insertAdjacentHTML('afterbegin', newText); //add the child on top of the previous one

    changeTextColor();
    addPnlBoxTextControls(e, me.dataset.font);
}

function stylishLazyLoad() {

    //scrolling to bottom and adding fonts
    if(this.scrollTop == (this.scrollHeight - this.offsetHeight)) {

        //for stylish-----------------------------------
        var append = ""
        var i = pnlBoxStylish.length;

        for(var a = 0; a < 6; a++) {

            if(stylish[i + a] != null) {
                var fontFace = new FontFace(`${stylish[i + a].name}`, `url(${stylish[i + a].source})`,);

                //add first the font to the document
                document.fonts.add(fontFace);
                
                fontFace.loaded.then( 
                    append += `<div class="pnlBoxStylish" data-font="${stylish[i + a].name}" data-class="${stylish[i + a].class}"><h2 style="font-family: '${stylish[i + a].name}'; font-weight: 400; font-style:'normal'; font-display: swap;">${stylish[i + a].name.toUpperCase()}</h2></div>`,

                )
            }
        }

        tabStylish.innerHTML += append;

        for(var a=0; a < pnlBoxStylish.length; a++) {
            pnlBoxStylish[a].addEventListener('pointerenter', pnlBoxFontHover);
            pnlBoxStylish[a].addEventListener('pointerleave', pnlBoxFontLeave);
            pnlBoxStylish[a].addEventListener('dblclick', function() {
                this.style.borderColor = "#3F4961";
                createPnlBoxText(this);
            });
        }

    }

    //this block is for deleting exceeding font but currently not working
    /*
    for(var a = 0; a < pnlBoxStylish.length; a++) {

        //if pnlbox exceeds on top, remove font if not used

        if(pnlBoxStylish[a].getBoundingClientRect().bottom < this.offsetTop) {
            
            var fontMatch = false;
            var font = pnlBoxStylish[a].dataset.font;

            //check each pnlBoxLayer if font is matching
            for(var b = 0; b < pnlBoxLayer.length; b++) {
                if(pnlBoxLayer[b].dataset.font == font) {
                    fontMatch = true; 
                }
            }

            if(fontMatch == false) {

                pnlBoxStylish[a].children[0].innerText = "";
                
                var fontFace = new FontFace(`${stylish[a].name}`, `url(${stylish[a].source})`);
                document.fonts.delete(fontFace);

                //console.log(fontFace.family, fontFace.status)
            
            }
            
        }

        else if(pnlBoxStylish[a].getBoundingClientRect().bottom > this.offsetTop && pnlBoxStylish[a].getBoundingClientRect().top < this.offsetTop + this.clientHeight) {

            var fontFace = new FontFace(`${stylish[a].name}`, `url(${stylish[a].source})`);

            //add first the font to the document
            //document.fonts.add(fontFace);

                console.log(fontFace.family, fontFace.status);

            fontFace.loaded.then( 
                //pnlBoxStylish[a].children[0].innerText = stylish[a].name;
            )
        }
    }
    */

}
tabStylish.addEventListener('scroll', stylishLazyLoad);

function sansSerifLazyLoad() {

    //scrolling to bottom and adding fonts
    if(this.scrollTop == (this.scrollHeight - this.offsetHeight)) {

        //for stylish-----------------------------------
        var append = ""
        var i = pnlBoxSansSerif.length;

        for(var a = 0; a < 6; a++) {

            if(sansSerif[i + a] != null) {

                document.head.insertAdjacentHTML('beforeend', sansSerif[a + i].source)
                append += `<div class="pnlBoxSansSerif" data-font="${sansSerif[a + i].name}" data-class="${sansSerif[a + i].class}"><h2 style="font-family: '${sansSerif[a + i].name}'; font-weight: 400; font-style:'normal'; font-display: swap;">${sansSerif[a + i].name.toUpperCase()}</h2></div>`

            }
        
        }

        tabSansSerif.innerHTML += append;

        for(var a=0; a < pnlBoxSansSerif.length; a++) {
            pnlBoxSansSerif[a].addEventListener('pointerenter', pnlBoxFontHover);
            pnlBoxSansSerif[a].addEventListener('pointerleave', pnlBoxFontLeave);
            pnlBoxSansSerif[a].addEventListener('dblclick', function() {
                this.style.borderColor = "#3F4961";
                createPnlBoxText(this);
            });
        }

    }

}
tabSansSerif.addEventListener('scroll', sansSerifLazyLoad);

function serifLazyLoad() {

    //scrolling to bottom and adding fonts
    if(this.scrollTop == (this.scrollHeight - this.offsetHeight)) {

        var append = ""
        var i = pnlBoxSerif.length;

        for(var a = 0; a < 6; a++) {

            if(serif[i + a] != null) {

                document.head.insertAdjacentHTML('beforeend', serif[a + i].source)
                append += `<div class="pnlBoxSerif" data-font="${serif[a + i].name}" data-class="${serif[a + i].class}"><h2 style="font-family: '${serif[a + i].name}'; font-weight: 400; font-style:'normal'; font-display: swap;">${serif[a + i].name.toUpperCase()}</h2></div>`
                
            }

        }
        tabSerif.innerHTML += append;
        
        for(var a=0; a < pnlBoxSerif.length; a++) {
            

            pnlBoxSerif[a].addEventListener('pointerenter', pnlBoxFontHover);
            pnlBoxSerif[a].addEventListener('pointerleave', pnlBoxFontLeave);
            pnlBoxSerif[a].addEventListener('dblclick', function() {
                this.style.borderColor = "#3F4961";
                createPnlBoxText(this);
            });
        }
        

    }

}
tabSerif.addEventListener('scroll', serifLazyLoad);
