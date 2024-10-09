
var elemTitle = document.getElementsByClassName('elemTitle');
var contElement = document.getElementsByClassName('contElement');
var optElementMini = document.getElementsByClassName('optElementMini');
var optElementLong = document.getElementsByClassName('optElementLong');
var wrapElements = document.getElementsByClassName('wrapElements');

function resetAllElements() {

    var append = "";

    for(var a = 0; a < elementCategory.length; a++) {
        configScroll[3].innerHTML += 
        `<div class="elemTitle"><h2>${elementCategory[a]}</h2></div>`;

        var wrapSize;

        for(var b = 0; b < elements.length; b++) {

            if(elements[b] != null) {

                if(elements[b].tags.includes(elementCategory[a].toLowerCase())) {

                    wrapSize = elements[b].size.replace(elements[b].size.charAt(0), elements[b].size.charAt(0).toUpperCase())
                    
                    if(elements[b].type != "head") {
                        append += 
                        `<div class="optElement${wrapSize}" data-thumbno = "${b}" data-type = "${elements[b].type}">
                            <div class = "hoverElement${wrapSize}">
                                ${elements[b].source}
                            </div>
                        </div>`;
                    }
                    else {
                        append += 
                        `<div class="optElement${wrapSize}" data-thumbno = "${b}" data-type = "${elements[b].type}">
                            <div class = "hoverElement${wrapSize}" style="display: flex;">
                                <div style="width: 40%; height:40%; margin-top: auto; margin-bottom: auto;">
                                    ${elements[b].source}
                                </div>
                                <div style="width: 100%; height: 2px; margin-top: auto; margin-bottom: auto; background-color: white">
                                    
                                </div>
                                <div style="width: 40%; height: 40%; transform: scale(-1,1); margin-top: auto; margin-bottom: auto;"">
                                    ${elements[b].source}
                                </div>
                            </div>
                        </div>`;
                    }
                    
                }
            }
        }

        configScroll[3].innerHTML += `<div class="wrap${wrapSize}">${append}</div>`;

        append = "";
        wrapSize = "";

    }

    for(var b = 0; b < optElementMini.length; b++) {

        optElementMini[b].addEventListener('pointerover', function() {
            this.style.borderColor = "#6885CC";
            this.style.backgroundColor = "#343C4F"
        });
        optElementMini[b].addEventListener('pointerleave', function() {
            this.style.borderColor = "transparent";
            this.style.backgroundColor = "transparent";
        });

        optElementMini[b].addEventListener('dblclick', function() {
            this.style.borderColor = "transparent";
            this.style.backgroundColor = "transparent";
            
            if(this.dataset.type == "vector") {
                createPnlBoxVectorNative(Number(this.dataset.thumbno));
            }

            else if(this.dataset.type == "line") {
                createPnlBoxLineNative(Number(this.dataset.thumbno));
            }

        })
    }
    
}
resetAllElements();


function createPnlBoxVectorNative(n) {

    var e = pnlBoxLayer.length; //get the length of pnlBoxPatterns and use it as layer count

    var getSVG = configScroll[3].querySelector(`[data-thumbno = "${n}"]`).children[0];
    getSVG.style.filter = "none";

    var newVector = 
    `<div class="pnlBoxLayer" name="Vector" data-layer="${e}" data-thumbno="${n}" data-type="vectorNative">
        <div class="pnlTitleLayer">
            <div class="btnExpandCollapseLayer" data-show="more">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.86603 7.5C5.48113 8.16667 4.51887 8.16667 4.13397 7.5L0.669874 1.5C0.284974 0.833333 0.766099 -8.94676e-07 1.5359 -8.27378e-07L8.4641 -2.21695e-07C9.2339 -1.54397e-07 9.71503 0.833333 9.33013 1.5L5.86603 7.5Z" fill="white"/>
                </svg>
            </div>
            <input type="text" class="txtHeaderLayer" value="${autoIncrementLayer('Vector')}" readonly = "readonly">
            <div class="btnShowHideLayer">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.00014 2.71429C5.57998 2.71429 4.42871 3.86555 4.42871 5.28572C4.42871 6.70588 5.57998 7.85714 7.00014 7.85714C8.4203 7.85714 9.57157 6.70588 9.57157 5.28572C9.57157 3.86555 8.4203 2.71429 7.00014 2.71429Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9119 4.87535C12.4818 1.69741 9.79075 1.19209e-07 7 0C4.20925 -1.78814e-07 1.51815 1.69741 0.0880784 4.87535C-0.0293595 5.13632 -0.0293595 5.43511 0.0880784 5.69608C1.51815 8.87402 4.20925 10.5714 7 10.5714C9.79075 10.5714 12.4818 8.87401 13.9119 5.69608C14.0294 5.4351 14.0294 5.13632 13.9119 4.87535ZM7 8.57143C5.18342 8.57143 3.27797 7.53709 2.11033 5.28572C3.27797 3.03434 5.18342 2 7 2C8.81657 2 10.722 3.03434 11.8897 5.28571C10.722 7.53708 8.81657 8.57143 7 8.57143Z" fill="white"/>
                </svg>
            </div>
        </div>

        <div class="breaklineHeader"></div>   

        <div class="contentVector">
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

                <div class = "tabColorLayer">

                    <div class = "contPath" width: 100%; height: 100%;">
                        <div class="pnlDropLayer">
                            
                            <div class="dropdown">
                                <h2>Stroke</h2>

                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="#647499" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>      
                                
                            </div>

                            <div class="dropOptionVerti">
                                <div class="optVectorColor">Stroke</div>
                                <div class="optVectorColor">Fill</div>
                            </div>

                        </div>

                        <div class="tabVectorStroke">

                            <div class="pnlEntry">
                                <h2>Color</h2>
                                <input type="text" class="txtVectorStrokeColor" value="647499">
                                <div class="thumbPickerVector" style="background-color: #647499;"></div>
                            </div>
                            <div class="pnlEntry">
                                <h2>Opacity</h2>
                                <input type="range" value="100" min="0" max="100" class="rngLayer">
                                <input type="number" class="txtVectorStrokeOpacity" value="100" min="0" max="100">
                            </div> 
                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide">
                                    <h2>Width</h2>
                                    <input type="number" class="txtVectorStrokeWidth" value="20" min="0" max = "999">
                                </div> 
                                <div class="pnlEntrySide">
                                    <h2>Corner</h2>
                                    <input type="number" class="txtVectorCornerRadius" value="0" min="0" max = "999">
                                </div>
                            </div>
                            <div class="breaklinePanel"></div>
                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide">
                                    <h2>Dash</h2>
                                    <input type="number" class="txtVectorStrokeDash" min="0" value = "0">
                                </div>
                                <div class="pnlEntrySide">
                                    <h2>Gap</h2>
                                    <input type="number" class="txtVectorStrokeGap" min="0" value = "0">
                                </div>
                            </div>
                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide">
                                    <h2>Cap</h2>
                                    <div class="chkVectorStrokeCap" data-value="false"><div class="chkSwitch"></div></div>
                                </div>
                                <div class="pnlEntrySide">
                                    <h2>Show</h2>
                                    <div class="chkVectorStrokeShow" data-value="true"><div class="chkSwitch"></div></div>
                                </div>
                            </div>
                                
                        </div>

                        <div class="tabVectorFill">
                            <div class="pnlEntry">
                                <h2>Fill Color</h2>
                                <input type="text" class="txtVectorFillColor" value="A9AEFF">
                                <div class="thumbPickerVector" style="background-color: #A9AEFF"></div>
                            </div>
                            <div class="pnlEntry">
                                <h2>Fill Opacity</h2>
                                <input type="range" value="100" min="0" max="100" class="rngLayer">
                                <input type="number" class="txtVectorFillOpacity" value="100" min="0" max="100">
                            </div> 
                            
                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide" style="margin-left:auto">
                                    <h2>Show</h2>
                                    <div class="chkVectorFillShow" data-value="true"><div class="chkSwitch" ></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div> 
        <div class="pnlBottomLayerTrack">
            <div class="pnlBottomLayerThumb2"></div>
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
                <div class="btnColorLayer">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9667 12.2238C17.2867 12.1555 17.5296 11.8979 17.6234 11.5844C17.8684 10.7658 18 9.89827 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C9.24996 18 9.49753 17.9898 9.74234 17.9698C10.6915 17.8923 10.8892 16.5812 10.4885 15.7172C10.2552 15.2142 10.125 14.6535 10.125 14.0625C10.125 11.8879 11.9995 9.43732 14.0625 10.125C14.7528 10.3551 15.0666 10.8676 15.352 11.3337C15.7085 11.9158 16.0208 12.4258 16.9667 12.2238ZM10.125 3.9375C10.125 3.00552 10.8805 2.25 11.8125 2.25C12.7445 2.25 13.5 3.00552 13.5 3.9375C13.5 4.86948 12.7445 5.625 11.8125 5.625C10.8805 5.625 10.125 4.86948 10.125 3.9375ZM6.1875 2.25C5.25552 2.25 4.5 3.00552 4.5 3.9375C4.5 4.86948 5.25552 5.625 6.1875 5.625C7.11948 5.625 7.875 4.86948 7.875 3.9375C7.875 3.00552 7.11948 2.25 6.1875 2.25ZM1.125 8.4375C1.125 7.50552 1.88052 6.75 2.8125 6.75C3.74448 6.75 4.5 7.50552 4.5 8.4375C4.5 9.36948 3.74448 10.125 2.8125 10.125C1.88052 10.125 1.125 9.36948 1.125 8.4375ZM4.5 12.375C3.87868 12.375 3.375 12.8787 3.375 13.5C3.375 14.1213 3.87868 14.625 4.5 14.625C5.12132 14.625 5.625 14.1213 5.625 13.5C5.625 12.8787 5.12132 12.375 4.5 12.375Z" fill="#647499"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>`;

    configScroll[5].insertAdjacentHTML('afterbegin', newVector); //add the child on top of the previous one
    
    focusPanel[e] = configScroll[5].querySelector(`[data-layer='${e}']`);
    changeTextColor();
    addPnlBoxVectorControlsNative(e);
    
}

function createPnlBoxLineNative(n) {

    var e = pnlBoxLayer.length; //get the length of pnlBoxPatterns and use it as layer count

    var getSVG = configScroll[3].querySelector(`[data-thumbno = "${n}"]`).children[0];
    getSVG.style.filter = "none";

    var newLine = 
    `<div class="pnlBoxLayer" name="Line" data-layer="${e}" data-thumbno="${n}" data-type="lineNative">
        <div class="pnlTitleLayer">
            <div class="btnExpandCollapseLayer" data-show="more">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.86603 7.5C5.48113 8.16667 4.51887 8.16667 4.13397 7.5L0.669874 1.5C0.284974 0.833333 0.766099 -8.94676e-07 1.5359 -8.27378e-07L8.4641 -2.21695e-07C9.2339 -1.54397e-07 9.71503 0.833333 9.33013 1.5L5.86603 7.5Z" fill="white"/>
                </svg>
            </div>
            <input type="text" class="txtHeaderLayer" value="${autoIncrementLayer('Line')}" readonly = "readonly">
            <div class="btnShowHideLayer">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.00014 2.71429C5.57998 2.71429 4.42871 3.86555 4.42871 5.28572C4.42871 6.70588 5.57998 7.85714 7.00014 7.85714C8.4203 7.85714 9.57157 6.70588 9.57157 5.28572C9.57157 3.86555 8.4203 2.71429 7.00014 2.71429Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9119 4.87535C12.4818 1.69741 9.79075 1.19209e-07 7 0C4.20925 -1.78814e-07 1.51815 1.69741 0.0880784 4.87535C-0.0293595 5.13632 -0.0293595 5.43511 0.0880784 5.69608C1.51815 8.87402 4.20925 10.5714 7 10.5714C9.79075 10.5714 12.4818 8.87401 13.9119 5.69608C14.0294 5.4351 14.0294 5.13632 13.9119 4.87535ZM7 8.57143C5.18342 8.57143 3.27797 7.53709 2.11033 5.28572C3.27797 3.03434 5.18342 2 7 2C8.81657 2 10.722 3.03434 11.8897 5.28571C10.722 7.53708 8.81657 8.57143 7 8.57143Z" fill="white"/>
                </svg>
            </div>
        </div>

        <div class="breaklineHeader"></div>   

        <div class="contentVector">
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

                <div class = "tabColorLayer">

                    <div class = "contPath" width: 100%; height: 100%;">

                        <div class="tabVectorStroke">
                            <div class="pnlEntryFold">
                                <div class="pnlDropSide">
                                    
                                    <div class="dropdownLineStart">
                                        <div class="chosenLineStart">
                                            <svg style="width: 60%; height: auto; transform: translateX(9px);" id="line miter" width="13" height="5" viewBox="0 0 13 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M13 1H1V4H13" stroke="white"/>
                                            </svg>
                                        </div>

                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="#647499" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>      
                                        
                                    </div>

                                    <div class="dropOptionLineStart">
                                        <div class="optLineHead">
                                            <svg id="line miter" width="13" height="5" viewBox="0 0 13 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M13 1H1V4H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line round" width="13" height="5" viewBox="0 0 13 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M13 1H2.5C1.67157 1 1 1.67157 1 2.5V2.5C1 3.32843 1.67157 4 2.5 4H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="breaklineVerti"></div> 
                                        <div class="optLineHead">
                                            <svg id="line arrow" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M3.5 1L1 3.5L3.5 6M1.5 3.5H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line arrow fill" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M4 4.4641L1 2.73205L4 1V2.73205V4.4641Z" fill="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M4 2.73205V1L1 2.73205L4 4.4641V2.73205ZM4 2.73205H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="breaklineVerti"></div> 
                                        <div class="optLineHead">
                                            <svg id="line circle" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3Z" stroke="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line circle fill" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3Z" fill="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="breaklineVerti"></div> 
                                        <div class="optLineHead">
                                            <svg id="line diamond" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M5 3L3 1L1 3L3 5L5 3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line diamond fill" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M1 3L3 1L5 3L3 5L1 3Z" fill="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M5 3L3 1L1 3L3 5L5 3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="breaklineVerti"></div> 
                                        <div class="optLineHead">
                                            <svg id="line square" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M5 3V1H1V5H5V3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line square fill" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M1 1H5V3V5H1V1Z" fill="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M5 3V1H1V5H5V3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="breaklineVerti"></div> 
                                        <div class="optLineHead">
                                            <svg id="line triangle" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M4 2.73205L1 4.4641L1 1L4 2.73205ZM4 2.73205H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line triangle fill" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M4 2.73205L1 4.4641L1 1L4 2.73205Z" fill="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M4 2.73205L1 4.4641L1 1L4 2.73205ZM4 2.73205H13" stroke="white"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="pnlDropSide">
                                   
                                    <div class="dropdownLineEnd">
                                        <div class="chosenLineEnd">
                                            <svg style="width:60%; height:auto; transform: translateX(-9px);" id="line miter" style="transform: scale(-1,1)" class width="13" height="5" viewBox="0 0 13 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M13 1H1V4H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="#647499" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>      
                                        
                                    </div>

                                    <div class="dropOptionLineEnd">
                                        <div class="optLineHead">
                                            <svg id="line miter" style="transform: scale(-1,1)" class width="13" height="5" viewBox="0 0 13 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M13 1H1V4H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line round" style="transform: scale(-1,1)" width="13" height="5" viewBox="0 0 13 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M13 1H2.5C1.67157 1 1 1.67157 1 2.5V2.5C1 3.32843 1.67157 4 2.5 4H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="breaklineVerti"></div> 
                                        <div class="optLineHead">
                                            <svg id="line arrow" style="transform: scale(-1,1)" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M3.5 1L1 3.5L3.5 6M1.5 3.5H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line arrow fill" style="transform: scale(-1,1)" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M4 4.4641L1 2.73205L4 1V2.73205V4.4641Z" fill="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M4 2.73205V1L1 2.73205L4 4.4641V2.73205ZM4 2.73205H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="breaklineVerti"></div> 
                                        <div class="optLineHead">
                                            <svg id="line circle" style="transform: scale(-1,1)" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3Z" stroke="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line circle fill" style="transform: scale(-1,1)" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3Z" fill="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="breaklineVerti"></div> 
                                        <div class="optLineHead">
                                            <svg id="line diamond" style="transform: scale(-1,1)" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M5 3L3 1L1 3L3 5L5 3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line diamond fill" style="transform: scale(-1,1)" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M1 3L3 1L5 3L3 5L1 3Z" fill="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M5 3L3 1L1 3L3 5L5 3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="breaklineVerti"></div> 
                                        <div class="optLineHead">
                                            <svg id="line square" style="transform: scale(-1,1)" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M5 3V1H1V5H5V3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line square fill" style="transform: scale(-1,1)" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M1 1H5V3V5H1V1Z" fill="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M5 3V1H1V5H5V3ZM5 3H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="breaklineVerti"></div> 
                                        <div class="optLineHead">
                                            <svg id="line triangle" style="transform: scale(-1,1)" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M4 2.73205L1 4.4641L1 1L4 2.73205ZM4 2.73205H13" stroke="white"/>
                                            </svg>
                                        </div>
                                        <div class="optLineHead">
                                            <svg id="line triangle fill" style="transform: scale(-1,1)" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path vector-effect="non-scaling-stroke" d="M4 2.73205L1 4.4641L1 1L4 2.73205Z" fill="white"/>
                                                <path vector-effect="non-scaling-stroke" d="M4 2.73205L1 4.4641L1 1L4 2.73205ZM4 2.73205H13" stroke="white"/>
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide">
                                    <h2>Width</h2>
                                    <input type="number" class="txtVectorStrokeWidth" value="10" min="0" max = "999">
                                </div> 
                                <div class="pnlEntrySide">
                                    <input type="text" class="txtVectorStrokeColor" value="647499">
                                    <div class="thumbPickerVector" style="background-color: #647499;"></div>
                                </div>
                                
                            </div>

                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide">
                                    <h2>Dash</h2>
                                    <input type="number" class="txtVectorStrokeDash" min="0" value = "0">
                                </div>
                                <div class="pnlEntrySide">
                                    <h2>Gap</h2>
                                    <input type="number" class="txtVectorStrokeGap" min="0" value = "0">
                                </div>
                            </div>
                            <div class="pnlEntryFold">
                                <div class="pnlEntrySide">
                                    <h2>Cap</h2>
                                    <div class="chkVectorStrokeCap" data-value="false"><div class="chkSwitch"></div></div>
                                </div>
                               
                            </div>
                            
                                
                        </div>

                    </div>
                    
                </div>
            </div>
        </div> 
        <div class="pnlBottomLayerTrack">
            <div class="pnlBottomLayerThumb2"></div>
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
                <div class="btnColorLayer">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9667 12.2238C17.2867 12.1555 17.5296 11.8979 17.6234 11.5844C17.8684 10.7658 18 9.89827 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C9.24996 18 9.49753 17.9898 9.74234 17.9698C10.6915 17.8923 10.8892 16.5812 10.4885 15.7172C10.2552 15.2142 10.125 14.6535 10.125 14.0625C10.125 11.8879 11.9995 9.43732 14.0625 10.125C14.7528 10.3551 15.0666 10.8676 15.352 11.3337C15.7085 11.9158 16.0208 12.4258 16.9667 12.2238ZM10.125 3.9375C10.125 3.00552 10.8805 2.25 11.8125 2.25C12.7445 2.25 13.5 3.00552 13.5 3.9375C13.5 4.86948 12.7445 5.625 11.8125 5.625C10.8805 5.625 10.125 4.86948 10.125 3.9375ZM6.1875 2.25C5.25552 2.25 4.5 3.00552 4.5 3.9375C4.5 4.86948 5.25552 5.625 6.1875 5.625C7.11948 5.625 7.875 4.86948 7.875 3.9375C7.875 3.00552 7.11948 2.25 6.1875 2.25ZM1.125 8.4375C1.125 7.50552 1.88052 6.75 2.8125 6.75C3.74448 6.75 4.5 7.50552 4.5 8.4375C4.5 9.36948 3.74448 10.125 2.8125 10.125C1.88052 10.125 1.125 9.36948 1.125 8.4375ZM4.5 12.375C3.87868 12.375 3.375 12.8787 3.375 13.5C3.375 14.1213 3.87868 14.625 4.5 14.625C5.12132 14.625 5.625 14.1213 5.625 13.5C5.625 12.8787 5.12132 12.375 4.5 12.375Z" fill="#647499"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>`;

    configScroll[5].insertAdjacentHTML('afterbegin', newLine); //add the child on top of the previous one
    
    focusPanel[e] = configScroll[5].querySelector(`[data-layer='${e}']`);
    changeTextColor();
    addPnlBoxLineControlsNative(e);
    
}
