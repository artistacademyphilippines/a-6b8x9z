

var pnlTitleLayer = document.getElementsByClassName('pnlTitleLayer');
var pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');
var btnExpandCollapseLayer = document.getElementsByClassName('btnExpandCollapseLayer');
var btnShowHideLayer = document.getElementsByClassName('btnShowHideLayer');
var txtHeaderLayer = document.getElementsByClassName('txtHeaderLayer');
var txtColorLayer = document.getElementsByClassName('txtColorLayer');
var rngLayer = document.getElementsByClassName('rngLayer');
var txtMiniLayer = document.getElementsByClassName('txtMiniLayer');
var btnShowHideLayer = document.getElementsByClassName('btnShowHideLayer');
var contentLayer = document.getElementsByClassName('contentLayer');
var btnBasicLayer = document.getElementsByClassName('btnBasicLayer');
var btnColorLayer = document.getElementsByClassName('btnColorLayer');
var btnSubLayer = document.getElementsByClassName('btnSubLayer');
var btnStyleLayer = document.getElementsByClassName('btnStyleLayer');
//variables of panel components
var optLayerBlend = document.getElementsByClassName('optLayerBlend');
var txtWidthLayer = document.getElementsByClassName('txtWidthLayer'); 
var txtHeightLayer = document.getElementsByClassName('txtHeightLayer');
var txtXLayer = document.getElementsByClassName('txtXLayer');
var txtYLayer = document.getElementsByClassName('txtYLayer');
var chkFlipX = document.getElementsByClassName('chkFlipX');
var chkFlipY = document.getElementsByClassName('chkFlipY');

var txtOpacityLayer = document.getElementsByClassName('txtOpacityLayer');
var txtRotationLayer = document.getElementsByClassName('txtRotationLayer');
var txtBlurLayer = document.getElementsByClassName('txtBlurLayer');
var txtBrightnessLayer = document.getElementsByClassName('txtBrightnessLayer');
var txtContrastLayer = document.getElementsByClassName('txtContrastLayer');
var txtSaturationLayer = document.getElementsByClassName('txtSaturationLayer');
var txtTemperatureLayer = document.getElementsByClassName('txtTemperatureLayer');
//layer style
var optLayerStyle = document.getElementsByClassName('optLayerStyle');
//tab outline
var tabStyleLayer = document.getElementsByClassName('tabStyleLayer');

var tabOutlineLayer = document.getElementsByClassName('tabOutlineLayer');
var txtOutlineColor = document.getElementsByClassName('txtOutlineColor');
var thumbPickerOutline = document.getElementsByClassName('thumbPickerOutline');
var txtOutlineOpacity = document.getElementsByClassName('txtOutlineOpacity');
var txtOutlineSize = document.getElementsByClassName('txtOutlineSize');

//tab glow 
var tabGlowLayer = document.getElementsByClassName('tabGlowLayer');
var txtGlowColor = document.getElementsByClassName('txtGlowColor');
var thumbPickerGlow = document.getElementsByClassName('thumbPickerGlow');
var txtGlowOpacity = document.getElementsByClassName('txtGlowOpacity');
var txtGlowSize = document.getElementsByClassName('txtGlowSize');
var txtGlowSpread = document.getElementsByClassName('txtGlowSpread');
//tab shadow
var tabShadowLayer = document.getElementsByClassName('tabShadowLayer');
var txtShadowColor = document.getElementsByClassName('txtShadowColor');
var thumbPickerShadow = document.getElementsByClassName('thumbPickerShadow');
var txtShadowOpacity = document.getElementsByClassName('txtShadowOpacity');
var txtShadowSize = document.getElementsByClassName('txtShadowSize');
var txtShadowSpread = document.getElementsByClassName('txtShadowSpread');
var txtShadowRotation = document.getElementsByClassName('txtShadowRotation');


function adjustBorder() {

    var z = rngZoom.value/100;

    for(var a = 0; a < pinBody.length; a++) {
    
        if(pinBody[a] != null) {

            //check when zoomed out or zoomed in
            //zooming will make the cnvBox wider or taller than canvasBorder
            if((cnvBox.clientWidth * z + 96) > canvasBorder.clientWidth) { //96 total of 3em left and right
                pinBody[a].style.left = (cnvLayers[a].offsetLeft * z) + 48 + 'px'; // 48 total of 3em left
                
            }
            else {
                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                pinBody[a].style.left = (cnvBox.getBoundingClientRect().left) + (cnvLayers[a].offsetLeft * z) - 350 + 'px';
            }

            //check when zoomed out or zoomed in
            //zooming will make the cnvBox wider or taller than canvasBorder
            if((cnvBox.clientHeight * z + 96) > canvasBorder.clientHeight) { //96 total of 3em top and bottom
                
                pinBody[a].style.top = (cnvLayers[a].offsetTop * z) + 48 + 'px'; //48 total of 3em top
                 
            }
            else {
                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                pinBody[a].style.top = (cnvBox.getBoundingClientRect().top) + (cnvLayers[a].offsetTop * z) - 116 + 'px';

            }

            var panel = configScroll[5].querySelector(`[data-layer="${a}"]`);

            panel.querySelector(`.txtWidthLayer`).value = Math.round(cnvLayers[a].clientWidth);
            panel.querySelector(`.txtHeightLayer`).value = Math.round(cnvLayers[a].clientHeight);

            panel.querySelector(`.txtXLayer`).value = Math.round(cnvLayers[a].offsetLeft);
            panel.querySelector(`.txtYLayer`).value = Math.round(cnvLayers[a].offsetTop);

            panel.querySelector(`.txtRotationLayer`).value = Math.round(cnvLayers[a].dataset.rotation);
            panel.querySelector(`.txtRotationLayer`).previousElementSibling.value = panel.querySelector(`.txtRotationLayer`).value;
        }
    }
}

//===============================SCALE LAYERS==========================

function scaleBorderDown(e) {
    e.preventDefault();

    leadDrag = e.target.closest('.pinBody');

    if(e.target.className == "pinTL2") {

        adjust = "pinTL2";
        isScaling = true;
        isResizing = false;
        isRotating = false;

        chooseLeadDrag(Number(e.target.closest('.pinBody').dataset.layer));
    }

    else if(e.target.className == "pinTR2") {

        adjust = "pinTR2";
        isScaling = true;
        isResizing = false;
        isRotating = false;

        chooseLeadDrag(Number(e.target.closest('.pinBody').dataset.layer));
    }

    else if(e.target.className == "pinBR2") {
          
        adjust = "pinBR2";
        isScaling = true;
        isResizing = false;
        isRotating = false;

        chooseLeadDrag(Number(e.target.closest('.pinBody').dataset.layer));
    }

    else if(e.target.className == "pinBL2") {

        adjust = "pinBL2";
        isScaling = true;
        isResizing = false;
        isRotating = false;

        chooseLeadDrag(Number(e.target.closest('.pinBody').dataset.layer));
    }

    resX = e.clientX;
    resY = e.clientY;


    for(var a = 0; a < focusObj.length; a++) {

        if(focusObj[a] != null) {
            borderW[a] = pinBody[a].clientWidth;
            borderH[a] = pinBody[a].clientHeight;
            borderL[a] = pinBody[a].offsetLeft;
            borderT[a] = pinBody[a].offsetTop;
    
            layerW[a] = cnvLayers[a].clientWidth;
            layerH[a] = cnvLayers[a].clientHeight;
            layerL[a] = cnvLayers[a].offsetLeft;
            layerT[a] = cnvLayers[a].offsetTop;
            aRatio[a] = cnvLayers[a].clientWidth / cnvLayers[a].clientHeight;

        }
    }

}

function scaleBorderMove(e) {
    
    if(isScaling) {

        var z = rngZoom.value / 100;

        for(var a = 0; a < focusObj.length; a++) {

            if(focusObj[a] != null) {

                if(adjust == "pinTL2") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        if(input.className == "pinBody" || input.className == "pinTL2") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                        }

                    })

                    var diffX = (resX - e.clientX);
                    var diffY = (resY - e.clientY);

                    var minW = Math.round(Number(cnvLayers[a].style.minWidth.replace('px', '')));
                    var minH = Math.round(Number(cnvLayers[a].style.minHeight.replace('px', '')));

                    if(cnvLayers[a].dataset.type == "image") { 

                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    //for landscape
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    pinBody[a].style.width =  borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z  + 'px'; 

                                    cnvLayers[a].style.left = layerL[a] - (diffX + diffY)  + 'px';
                                    cnvLayers[a].style.top = layerT[a] -  (diffX + diffY) / aRatio[a]  + 'px';

                                    pinBody[a].style.left = borderL[a] - (diffX + diffY) * z + 'px';
                                    pinBody[a].style.top = borderT[a] - (diffX + diffY) / aRatio[a] * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                    pinBody[a].style.width = borderW[a] + diffX + 'px';
                                    pinBody[a].style.left = borderL[a] - diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                    pinBody[a].style.height = borderH[a] + diffY + 'px';
                                    pinBody[a].style.top = borderT[a] - diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }                   
                    }
                    else if(cnvLayers[a].dataset.type == "vector") { 

                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    //for landscape
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    pinBody[a].style.width =  borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z  + 'px'; 

                                    cnvLayers[a].style.left = layerL[a] - (diffX + diffY)  + 'px';
                                    cnvLayers[a].style.top = layerT[a] -  (diffX + diffY) / aRatio[a]  + 'px';

                                    pinBody[a].style.left = borderL[a] - (diffX + diffY) * z + 'px';
                                    pinBody[a].style.top = borderT[a] - (diffX + diffY) / aRatio[a] * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                    pinBody[a].style.width = borderW[a] + diffX + 'px';
                                    pinBody[a].style.left = borderL[a] - diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                    pinBody[a].style.height = borderH[a] + diffY + 'px';
                                    pinBody[a].style.top = borderT[a] - diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }                   
                    }
                    else if(cnvLayers[a].dataset.type == "vectorNative") { 

                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    //for landscape
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    pinBody[a].style.width =  borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z  + 'px'; 

                                    cnvLayers[a].style.left = layerL[a] - (diffX + diffY)  + 'px';
                                    cnvLayers[a].style.top = layerT[a] -  (diffX + diffY) / aRatio[a]  + 'px';

                                    pinBody[a].style.left = borderL[a] - (diffX + diffY) * z + 'px';
                                    pinBody[a].style.top = borderT[a] - (diffX + diffY) / aRatio[a] * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                }
                            }
                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                    pinBody[a].style.width = borderW[a] + diffX + 'px';
                                    pinBody[a].style.left = borderL[a] - diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                    pinBody[a].style.height = borderH[a] + diffY + 'px';
                                    pinBody[a].style.top = borderT[a] - diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }
                        } 
                        renderSVG(a);                  
                    }
                    else if(cnvLayers[a].dataset.type == "lineNative") { 

                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    //for landscape
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    pinBody[a].style.width =  borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z  + 'px'; 

                                    cnvLayers[a].style.left = layerL[a] - (diffX + diffY)  + 'px';
                                    cnvLayers[a].style.top = layerT[a] -  (diffX + diffY) / aRatio[a]  + 'px';

                                    pinBody[a].style.left = borderL[a] - (diffX + diffY) * z + 'px';
                                    pinBody[a].style.top = borderT[a] - (diffX + diffY) / aRatio[a] * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                }
                            }
                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                    pinBody[a].style.width = borderW[a] + diffX + 'px';
                                    pinBody[a].style.left = borderL[a] - diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                    pinBody[a].style.height = borderH[a] + diffY + 'px';
                                    pinBody[a].style.top = borderT[a] - diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }
                        } 
                        renderLine(a);                  
                    }
                    else if(cnvLayers[a].dataset.type == "text") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                        
                            if(cnvLayers[a].clientWidth > minW + 8) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                pinBody[a].style.width = borderW[a] + diffX + 'px';
                                pinBody[a].style.left = borderL[a] - diffX + 'px';

                            }

                            else{
                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                            }
                            
                            if(cnvLayers[a].clientHeight > minH) {    

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                pinBody[a].style.top = borderT[a] - diffY + 'px';

                            }
                            
                            else {

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            
                            }
                        
                        }       
                           
                    }
                }

                else if(adjust == "pinTR2") {
                    
                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {

                        if(input.className == "pinBody" || input.className == "pinTL2") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }

                    })

                    var diffX = (e.clientX - resX);
                    var diffY = (resY - e.clientY);
                    
                    var minW = Math.round(Number(cnvLayers[a].style.minWidth.replace('px', '')));
                    var minH = Math.round(Number(cnvLayers[a].style.minHeight.replace('px', '')));
  
                    if(cnvLayers[a].dataset.type == "image") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                    cnvLayers[a].style.top = layerT[a] -  (diffX + diffY) / aRatio[a] + 'px';

                                    pinBody[a].style.width = borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z + 'px';
                                    pinBody[a].style.top = borderT[a] - (diffX + diffY) / aRatio[a] * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }

                                    /*
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    */
                                }
                            }

                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = borderW[a] + diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                    pinBody[a].style.height = borderH[a] + diffY + 'px';
                                    pinBody[a].style.top = borderT[a] - diffY  + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }                   
                    }
                    else if(cnvLayers[a].dataset.type == "vector") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                    cnvLayers[a].style.top = layerT[a] -  (diffX + diffY) / aRatio[a] + 'px';

                                    pinBody[a].style.width = borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z + 'px';
                                    pinBody[a].style.top = borderT[a] - (diffX + diffY) / aRatio[a] * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }

                                    /*
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    */
                                }
                            }

                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = borderW[a] + diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                    pinBody[a].style.height = borderH[a] + diffY + 'px';
                                    pinBody[a].style.top = borderT[a] - diffY  + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }                   
                    }
                    else if(cnvLayers[a].dataset.type == "vectorNative") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                    cnvLayers[a].style.top = layerT[a] -  (diffX + diffY) / aRatio[a] + 'px';

                                    pinBody[a].style.width = borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z + 'px';
                                    pinBody[a].style.top = borderT[a] - (diffX + diffY) / aRatio[a] * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }

                                }
                            }

                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = borderW[a] + diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                    pinBody[a].style.height = borderH[a] + diffY + 'px';
                                    pinBody[a].style.top = borderT[a] - diffY  + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }
                        }   
                        renderSVG(a);
                    }
                    else if(cnvLayers[a].dataset.type == "lineNative") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                    cnvLayers[a].style.top = layerT[a] -  (diffX + diffY) / aRatio[a] + 'px';

                                    pinBody[a].style.width = borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z + 'px';
                                    pinBody[a].style.top = borderT[a] - (diffX + diffY) / aRatio[a] * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }

                                }
                            }

                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = borderW[a] + diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                    pinBody[a].style.height = borderH[a] + diffY + 'px';
                                    pinBody[a].style.top = borderT[a] - diffY  + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }
                        }   
                        renderLine(a);
                    }
                    else if(cnvLayers[a].dataset.type == "text") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                        
                            if(cnvLayers[a].clientWidth > minW + 8) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                pinBody[a].style.width = borderW[a] + diffX + 'px';
                               
                            }

                            else {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                               
                            }

                            if(cnvLayers[a].clientHeight > minH) {    

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                pinBody[a].style.top = borderT[a] - diffY + 'px';

                            }
                            
                            else {

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            
                            }
                        
                        }       

                    }
                }

                else if(adjust == "pinBR2") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        
                        if(input.className == "pinBody" || input.className == "pinTL2") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }

                    })

                    var diffX = e.clientX - resX;
                    var diffY = e.clientY - resY;

                    var minW = Math.round(Number(cnvLayers[a].style.minWidth.replace('px', '')));
                    var minH = Math.round(Number(cnvLayers[a].style.minHeight.replace('px', '')));
  
                    if(cnvLayers[a].dataset.type == "image") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    //for landscape
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    pinBody[a].style.width =  borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z  + 'px'; 

                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                    
                                }
                                
                            }
                        
                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = borderW[a] + diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = borderH[a] + diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }
                        
                    }

                    else if(cnvLayers[a].dataset.type == "vector") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    //for landscape
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    pinBody[a].style.width =  borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z  + 'px'; 

                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                    
                                }
                                
                            }
                        
                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = borderW[a] + diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = borderH[a] + diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }
                        
                    }

                    else if(cnvLayers[a].dataset.type == "vectorNative") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    //for landscape
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    pinBody[a].style.width =  borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z  + 'px'; 

                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                    
                                }
                                
                            }
                        
                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = borderW[a] + diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = borderH[a] + diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }
                        renderSVG(a)
                    }
                    else if(cnvLayers[a].dataset.type == "lineNative") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    //for landscape
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    pinBody[a].style.width =  borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z  + 'px'; 

                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a] + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                    
                                }
                                
                            }
                        
                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = borderW[a] + diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = borderH[a] + diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }
                        renderLine(a)
                    }

                    else if(cnvLayers[a].dataset.type == "text") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().left || e.clientY != pinBody[a].getBoundingClientRect().top) {
                        
                            if(cnvLayers[a].clientWidth > minW + 8) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                pinBody[a].style.width = borderW[a] + diffX + 'px';
                               
                            }

                            else {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                               
                            }

                            if(cnvLayers[a].clientHeight > minH) {    

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = borderH[a] + diffY + 'px';

                            }
                            
                            else {

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            
                            }
                        
                        }       

                    }

                }

                else if(adjust == "pinBL2") {
                    
                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        
                        if(input.className == "pinBody" || input.className == "pinTL2") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }

                    })

                    var diffX = (resX - e.clientX);
                    var diffY = (e.clientY - resY);
                    
                    var minW = Math.round(Number(cnvLayers[a].style.minWidth.replace('px', '')));
                    var minH = Math.round(Number(cnvLayers[a].style.minHeight.replace('px', '')));
  
                    if(cnvLayers[a].dataset.type == "image") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    cnvLayers[a].style.left = layerL[a] - (diffX + diffY) + 'px';

                                    pinBody[a].style.width = borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z + 'px';
                                    pinBody[a].style.left = borderL[a] - (diffX + diffY) * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                    pinBody[a].style.width = borderW[a] + diffX + 'px';
                                    pinBody[a].style.left = borderL[a] - diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = borderH[a] + diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    
                                }
                            }

                        }
                        
                    }

                    else if(cnvLayers[a].dataset.type == "vector") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    cnvLayers[a].style.left = layerL[a] - (diffX + diffY) + 'px';

                                    pinBody[a].style.width = borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z + 'px';
                                    pinBody[a].style.left = borderL[a] - (diffX + diffY) * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                    pinBody[a].style.width = borderW[a] + diffX + 'px';
                                    pinBody[a].style.left = borderL[a] - diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = borderH[a] + diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    
                                }
                            }

                        }
                        
                    }

                    else if(cnvLayers[a].dataset.type == "vectorNative") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    
                                    cnvLayers[a].style.left = layerL[a] - (diffX + diffY) + 'px';

                                    pinBody[a].style.width = borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z + 'px';
                                    pinBody[a].style.left = borderL[a] - (diffX + diffY) * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';
                                    pinBody[a].style.width = borderW[a] + diffX + 'px';
                                    pinBody[a].style.left = borderL[a] - diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = borderH[a] + diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    
                                }

                            }

                        }

                        renderSVG(a)
                    }

                    else if(cnvLayers[a].dataset.type == "lineNative") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW && cnvLayers[a].clientHeight > minH) {
                                    
                                    cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                    cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                    
                                    cnvLayers[a].style.left = layerL[a] - (diffX + diffY) + 'px';

                                    pinBody[a].style.width = borderW[a] + (diffX + diffY) * z + 'px';
                                    pinBody[a].style.height = borderH[a] + (diffX + diffY) / aRatio[a] * z + 'px';
                                    pinBody[a].style.left = borderL[a] - (diffX + diffY) * z + 'px';
                                } 

                                else {

                                    if(cnvLayers[a].clientWidth == minW) {
                                        cnvLayers[a].style.width = layerW[a] + (diffX + diffY) + 'px';
                                        pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                                    }

                                    if(cnvLayers[a].clientHeight == minH) {
                                        cnvLayers[a].style.height = layerH[a] + (diffX + diffY) / aRatio[a]  + 'px';
                                        pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().top) {
                                
                                if(cnvLayers[a].clientWidth > minW) {   

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';
                                    pinBody[a].style.width = borderW[a] + diffX + 'px';
                                    pinBody[a].style.left = borderL[a] - diffX + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                    pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                                }

                                if(cnvLayers[a].clientHeight > minH) {    

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = borderH[a] + diffY + 'px';

                                }
                                
                                else {

                                    cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                    pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                                    
                                }

                            }

                        }

                        renderLine(a)
                    }

                    else if(cnvLayers[a].dataset.type == "text") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().right || e.clientY != pinBody[a].getBoundingClientRect().top) {
                        
                            if(cnvLayers[a].clientWidth > minW + 8) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                pinBody[a].style.width = borderW[a] + diffX + 'px';
                                pinBody[a].style.left = borderL[a] - diffX + 'px';

                            }

                            else {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                               
                            }

                            if(cnvLayers[a].clientHeight > minH) {    

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = borderH[a] + diffY + 'px';

                            }
                            
                            else {

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            
                            }
                        
                        }       

                    }
                    
                }

                //check if content is text
                if(cnvLayers[a].dataset.type == "text") {
                    
                    cnvLayers[a].children[0].style.whiteSpace = "normal";

                    cnvLayers[a].children[0].style.width = cnvLayers[a].clientWidth + 'px';
                    cnvLayers[a].children[0].style.height = 1 + 'px';
                    cnvLayers[a].children[0].style.height = cnvLayers[a].children[0].scrollHeight + 'px';
                    
                    if(cnvLayers[a].children[0].clientHeight * z > cnvLayers[a].clientHeight * z && currVertiAlignment == "Middle") {
                        var val = cnvLayers[a].children[0].clientHeight * z - cnvLayers[a].clientHeight * z;
                        cnvLayers[a].children[0].style.position = "absolute";
                        cnvLayers[a].children[0].style.top = 0 - val + 'px';
                    }
                    else if(cnvLayers[a].children[0].clientHeight * z > cnvLayers[a].clientHeight * z && currVertiAlignment == "Bottom") {
                        var val = cnvLayers[a].children[0].clientHeight * z - cnvLayers[a].clientHeight * z;
                        cnvLayers[a].children[0].style.position = "absolute";
                        cnvLayers[a].children[0].style.top = 0 - val * 2 + 'px';
                    }
                    else {
                        cnvLayers[a].children[0].style.position = "static"; // need return to static for margin auto
                    }

                    var panel = configScroll[5].querySelector(`[data-layer="${a}"]`);
                    panel.querySelector('.btnFixedSize').children[0].style.filter = "saturate(0) brightness(2)";
                    panel.querySelector('.btnAutoWidth').children[0].style.filter = "none";
                    panel.querySelector('.btnAutoHeight').children[0].style.filter = "none";
                    
                    currResizeBox = "FixedSize";

                }

                //fade the pins if size is minimum
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
        
        adjustBasicsFromCanvas();
    }
}

function scaleBorderUp(e) {

    e.preventDefault();

    isResizing = false;
    isScaling = false;
    isRotating = false;
    resX = null;
    resY = null;
    adjust = null;

    cnvBox.style.position = "relative";
    cnvGrpLayers.style.boxSizing = "border-box";
    cnvGrpLayers.style.overflow = "hidden";

    //reset cursors
    cnvPin.style.cursor = "default";

    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            pinBody[a].style.cursor = "default";

            pinTL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;

            pinTL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
        }
        
    }

    
}

//===============================RESIZE LAYERS============================

function resizeBorderDown(e) {
    e.preventDefault();
   
    if(e.target.closest('.pinL')) {

        adjust = "pinL"
        isScaling = false;
        isResizing = true;
        isRotating = false;

        chooseLeadDrag(Number(e.target.closest('.pinBody').dataset.layer));
    }

    else if(e.target.closest('.pinT')) {

        adjust = "pinT";
        isScaling = false;
        isResizing = true;
        isRotating = false;

        chooseLeadDrag(Number(e.target.closest('.pinBody').dataset.layer));
    }

   else if(e.target.closest('.pinR')) {

        adjust = "pinR";
        isScaling = false;
        isResizing = true;
        isRotating = false;

        chooseLeadDrag(Number(e.target.closest('.pinBody').dataset.layer));
    }

    else if(e.target.closest('.pinB')) {
    
        adjust = "pinB";
        isScaling = false;
        isResizing = true;
        isRotating = false;

        chooseLeadDrag(Number(e.target.closest('.pinBody').dataset.layer));
    }

    resX = e.clientX;
    resY = e.clientY;

    for(var a = 0; a < focusObj.length; a++) {

        if(focusObj[a] != null) {
            borderW[a] = pinBody[a].clientWidth;
            borderH[a] = pinBody[a].clientHeight;
            borderL[a] = pinBody[a].offsetLeft;
            borderT[a] = pinBody[a].offsetTop;
    
            layerW[a] = cnvLayers[a].clientWidth;
            layerH[a] = cnvLayers[a].clientHeight;
            layerL[a] = cnvLayers[a].offsetLeft;
            layerT[a] = cnvLayers[a].offsetTop;
            aRatio[a] = cnvLayers[a].clientWidth / cnvLayers[a].clientHeight;

        }
    }
    
    
}

function resizeBorderMove(e) {

    if(isResizing) {
        
        var z = rngZoom.value / 100;

        for(var a = 0; a < focusObj.length; a++) { 

            if(focusObj[a] != null) {

                if(adjust == "pinL") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        if(input.className == "pinBody" || input.className == "pinL") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;

                        }

                    })

                    var diffX = resX - e.clientX;

                    var minW = Math.round(Number(cnvLayers[a].style.minWidth.replace('px', '')));
                    
                    if(cnvLayers[a].dataset.type == "image") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().right) {

                            if(cnvLayers[a].clientWidth > minW) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                pinBody[a].style.width = borderW[a] + diffX + 'px';
                                pinBody[a].style.left = borderL[a] - diffX + 'px';

                            }
                            
                            else {

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                            }
                
                        }
                    }
                    else if(cnvLayers[a].dataset.type == "vector") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().right) {

                            if(cnvLayers[a].clientWidth > minW) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                pinBody[a].style.width = borderW[a] + diffX + 'px';
                                pinBody[a].style.left = borderL[a] - diffX + 'px';

                            }
                            
                            else {

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                            }
                
                        }
                    }
                    else if(cnvLayers[a].dataset.type == "vectorNative") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().right) {

                            if(cnvLayers[a].clientWidth > minW) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                pinBody[a].style.width = borderW[a] + diffX + 'px';
                                pinBody[a].style.left = borderL[a] - diffX + 'px';

                            }
                            
                            else {

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                            }
                
                        }

                        renderSVG(a);
                    }
                    else if(cnvLayers[a].dataset.type == "lineNative") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().right) {

                            if(cnvLayers[a].clientWidth > minW) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                pinBody[a].style.width = borderW[a] + diffX + 'px';
                                pinBody[a].style.left = borderL[a] - diffX + 'px';

                            }
                            
                            else {

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                            }
                
                        }

                        renderLine(a);
                    }
                    else if(cnvLayers[a].dataset.type == "text") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().right) {
                        
                            if(cnvLayers[a].clientWidth > minW + 8) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                cnvLayers[a].style.left = layerL[a] - diffX / z + 'px';

                                pinBody[a].style.width = borderW[a] + diffX + 'px';
                                pinBody[a].style.left = borderL[a] - diffX + 'px';

                            }

                            else{
                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                            }
                            
                        }   
                    }

                }

                else if(adjust == "pinT") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        if(input.className == "pinBody" || input.className == "pinT") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                        }

                    })

                    var diffY = resY - e.clientY;

                    var minH = Math.round(Number(cnvLayers[a].style.minHeight.replace('px', '')));

                    if(cnvLayers[a].dataset.type == "image") {

                        if(e.clientY != pinBody[a].getBoundingClientRect().bottom) {

                            if(cnvLayers[a].clientHeight > minH) {
                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                pinBody[a].style.top = borderT[a] - diffY + 'px';

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';
                            }
                            else {
                            
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            }

                        }
                    }
                    else if(cnvLayers[a].dataset.type == "vector") {

                        if(e.clientY != pinBody[a].getBoundingClientRect().bottom) {

                            if(cnvLayers[a].clientHeight > minH) {
                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                pinBody[a].style.top = borderT[a] - diffY + 'px';

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';
                            }
                            else {
                            
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            }

                        }
                    }
                    else if(cnvLayers[a].dataset.type == "vectorNative") {

                        if(e.clientY != pinBody[a].getBoundingClientRect().bottom) {

                            if(cnvLayers[a].clientHeight > minH) {
                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                pinBody[a].style.top = borderT[a] - diffY + 'px';

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';
                            }
                            else {
                            
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            }
                        }

                        renderSVG(a)
                    }
                    else if(cnvLayers[a].dataset.type == "lineNative") {

                        if(e.clientY != pinBody[a].getBoundingClientRect().bottom) {

                            if(cnvLayers[a].clientHeight > minH) {
                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                pinBody[a].style.top = borderT[a] - diffY + 'px';

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';
                            }
                            else {
                            
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            }
                        }

                        renderLine(a)
                    }

                    else if(cnvLayers[a].dataset.type == "text") {

                        if(e.clientY != pinBody[a].getBoundingClientRect().bottom) {
                        
                            if(cnvLayers[a].clientHeight > minH) {    

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                cnvLayers[a].style.top = layerT[a] - diffY / z + 'px';

                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                pinBody[a].style.top = borderT[a] - diffY + 'px';

                            }
                            
                            else {

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            
                            }
                        
                        }  
                    }
                }

                else if(adjust == "pinR") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        if(input.className == "pinBody" || input.className == "pinR") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;

                        }

                    })

                    var diffX = e.clientX - resX;

                    var minW = Math.round(Number(cnvLayers[a].style.minWidth.replace('px', '')));

                    if(cnvLayers[a].dataset.type == "image") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().left) {

                            if(cnvLayers[a].clientWidth > minW) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = borderW[a] + diffX + 'px';
  
                            }
                            
                            else {

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                            }
                
                        }
                    }
                    else if(cnvLayers[a].dataset.type == "vector") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().left) {

                            if(cnvLayers[a].clientWidth > minW) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = borderW[a] + diffX + 'px';
  
                            }
                            
                            else {

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                            }
                
                        }
                    }
                    else if(cnvLayers[a].dataset.type == "vectorNative") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().left) {

                            if(cnvLayers[a].clientWidth > minW) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = borderW[a] + diffX + 'px';
  
                            }
                            
                            else {

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                            }
                
                        }

                        renderSVG(a);
                    }
                    else if(cnvLayers[a].dataset.type == "lineNative") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().left) {

                            if(cnvLayers[a].clientWidth > minW) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = borderW[a] + diffX + 'px';
  
                            }
                            
                            else {

                                cnvLayers[a].style.width = layerW[a] + diffX / z + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';

                            }
                
                        }

                        renderLine(a);
                    }
                    else if(cnvLayers[a].dataset.type == "text") {

                        if(e.clientX != pinBody[a].getBoundingClientRect().left) {
                        
                            if(cnvLayers[a].clientWidth > minW + 8) {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                pinBody[a].style.width = borderW[a] + diffX + 'px';
                               
                            }

                            else {   

                                cnvLayers[a].style.width = layerW[a] + diffX / z - 8 + 'px';
                                pinBody[a].style.width = cnvLayers[a].clientWidth * z + 'px';
                               
                            }
                        }       
                    }
                }

                else if(adjust == "pinB") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        if(input.className == "pinBody" || input.className == "pinB") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                        }

                    })

                    var diffY = e.clientY - resY;

                    var minH = Math.round(Number(cnvLayers[a].style.minHeight.replace('px', '')));
                    
                    if(cnvLayers[a].dataset.type == "image") {

                        if(e.clientY != pinBody[a].getBoundingClientRect().bottom) {

                            if(cnvLayers[a].clientHeight > minH) {
                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                
                            }
                            else {
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            }

                        }
                    }
                    else if(cnvLayers[a].dataset.type == "vector") {

                        if(e.clientY != pinBody[a].getBoundingClientRect().bottom) {

                            if(cnvLayers[a].clientHeight > minH) {
                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                
                            }
                            else {
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            }

                        }
                    }
                    else if(cnvLayers[a].dataset.type == "vectorNative") {

                        if(e.clientY != pinBody[a].getBoundingClientRect().bottom) {

                            if(cnvLayers[a].clientHeight > minH) {
                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                
                            }
                            else {
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            }

                        }

                        renderSVG(a);
                    }
                    else if(cnvLayers[a].dataset.type == "lineNative") {

                        if(e.clientY != pinBody[a].getBoundingClientRect().bottom) {

                            if(cnvLayers[a].clientHeight > minH) {
                                pinBody[a].style.height = borderH[a] + diffY + 'px';
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                
                            }
                            else {
                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            }

                        }

                        renderLine(a);
                    }
                    else if(cnvLayers[a].dataset.type == "text") {

                        if(e.clientY != pinBody[a].getBoundingClientRect().top) {
                        
                            if(cnvLayers[a].clientHeight > minH) {    

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = borderH[a] + diffY + 'px';

                            }
                            
                            else {

                                cnvLayers[a].style.height = layerH[a] + diffY / z + 'px';
                                pinBody[a].style.height = cnvLayers[a].clientHeight * z + 'px';
                            
                            }
                        }       
                    }
                }

                //check if content is text
                if(cnvLayers[a].dataset.type == "text") {
                    
                    cnvLayers[a].children[0].style.whiteSpace = "normal";

                    cnvLayers[a].children[0].style.width = cnvLayers[a].clientWidth + 'px';
                    cnvLayers[a].children[0].style.height = 1 + 'px';
                    cnvLayers[a].children[0].style.height = cnvLayers[a].children[0].scrollHeight + 'px';
                    
                    if(cnvLayers[a].children[0].clientHeight * z > cnvLayers[a].clientHeight * z && currVertiAlignment == "Middle") {
                        var val = cnvLayers[a].children[0].clientHeight * z - cnvLayers[a].clientHeight * z;
                        cnvLayers[a].children[0].style.position = "absolute";
                        cnvLayers[a].children[0].style.top = 0 - val + 'px';
                    }
                    else if(cnvLayers[a].children[0].clientHeight * z > cnvLayers[a].clientHeight * z && currVertiAlignment == "Bottom") {
                        var val = cnvLayers[a].children[0].clientHeight * z - cnvLayers[a].clientHeight * z;
                        cnvLayers[a].children[0].style.position = "absolute";
                        cnvLayers[a].children[0].style.top = 0 - val * 2 + 'px';
                    }
                    else {
                        cnvLayers[a].children[0].style.position = "static"; // need return to static for margin auto
                    }

                    var panel = configScroll[5].querySelector(`[data-layer="${a}"]`);
                    panel.querySelector('.btnFixedSize').children[0].style.filter = "saturate(0) brightness(2)";
                    panel.querySelector('.btnAutoWidth').children[0].style.filter = "none";
                    panel.querySelector('.btnAutoHeight').children[0].style.filter = "none";
                    
                    currResizeBox = "FixedSize";
            
                }

                //fade the pins if size is minimum
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

        adjustBasicsFromCanvas();

    }

}

function resizeBorderUp(e) {
    e.preventDefault();

    isResizing = false;
    isScaling = false;
    isRotating = false;
    resX = null;
    resY = null;
    adjust = null;

    //reset cursors
    cnvPin.style.cursor = "default";

    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            pinBody[a].style.cursor = "default";

            pinTL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;

            pinTL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
        
        }
    }
}

//===============================ROTATE LAYERS=============================

function rotateBorderDown(e) {

    e.preventDefault();

    resX = e.clientX;
    resY = e.clientY;

    if(e.target.closest('.pinBody')) {

        leadRotate = e.target.closest('.pinBody');

        borderCenterX = leadRotate.getBoundingClientRect().left + (leadRotate.clientWidth/2);
        borderCenterY = leadRotate.getBoundingClientRect().top + (leadRotate.clientHeight/2);
        
        
        if(resX < borderCenterX && resY < borderCenterY) { // if quadrant 1
            
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((borderCenterX - resX) ** 2) + ((resY - resY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - resX) ** 2) + ((borderCenterY - resY) ** 2));
            angle1 = Math.asin(AC/BC) * 180 / Math.PI;
        }

        else if(resX < borderCenterX && resY > borderCenterY) { // if quadrant 2
       
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((resX - resX) ** 2) + ((borderCenterY - resY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - resX) ** 2) + ((borderCenterY - resY) ** 2));
            angle1 = Math.asin(AC/BC) * 180 / Math.PI + 90;
        }

        else if(resX > borderCenterX && resY > borderCenterY) { // if quadrant 3
       
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((borderCenterX - resX) ** 2) + ((resY - resY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - resX) ** 2) + ((borderCenterY - resY) ** 2));
            angle1 = Math.asin(AC/BC) * 180 / Math.PI + 180;
        }

        else if(resX > borderCenterX && resY < borderCenterY) { // if quadrant 4
            
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((resX - resX) ** 2) + ((borderCenterY - resY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - resX) ** 2) + ((borderCenterY - resY) ** 2));
            angle1 = Math.asin(AC/BC) * 180 / Math.PI + 270;
        }

        for(var a = 0; a < focusObj.length; a ++) {

            if(focusObj[a] != null) {

                borderR[a] = Number(focusObj[a].dataset.rotation);
            
            }
        
        }
        
    }

    if(e.target.className == "pinTL") {

        adjust = "pinTL";
        isRotating = true;
        isScaling = false;
        isResizing = false;

        chooseLeadDrag(Number(leadRotate.dataset.layer));

    } 

    else if(e.target.className == "pinTR") {

        adjust = "pinTR";
        isScaling = false;
        isRotating = true;
        isResizing = false; 

        chooseLeadDrag(Number(leadRotate.dataset.layer));

    } 

    else if(e.target.className == "pinBR") {

        adjust = "pinBR";
        isScaling = false;
        isRotating = true;
        isResizing = false; 

        chooseLeadDrag(Number(leadRotate.dataset.layer));

    } 

    else if(e.target.className == "pinBL") {

        adjust = "pinBL";
        isScaling = false;
        isRotating = true;
        isResizing = false; 

        chooseLeadDrag(Number(leadRotate.dataset.layer));

    } 

}

function rotateBorderMove(e) {

    if(isRotating) {

        if(e.clientX < borderCenterX && e.clientY < borderCenterY) { // if quadrant 1
            
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((e.clientY - e.clientY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2));
            angle2 = Math.asin(AC/BC) * 180 / Math.PI;
        }

        else if(e.clientX < borderCenterX && e.clientY > borderCenterY) { // if quadrant 2
       
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((e.clientX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2));
            angle2 = Math.asin(AC/BC) * 180 / Math.PI + 90;
        }

        else if(e.clientX > borderCenterX && e.clientY > borderCenterY) { // if quadrant 3
       
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((e.clientY - e.clientY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2));
            angle2 = Math.asin(AC/BC) * 180 / Math.PI + 180;
        }

        else if(e.clientX > borderCenterX && e.clientY < borderCenterY) { // if quadrant 4
            
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((e.clientX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2));
            angle2 = Math.asin(AC/BC) * 180 / Math.PI + 270;

        }

        var angle3;

        if(angle1 >= angle2) {
            angle3 = Math.round(angle1 - angle2);
        }
        else {
            
            if(e.shiftKey) {
                angle3 = Math.round(359 - (angle2 - angle1));
            }
            else {
                angle3 = 360 - (angle2 - angle1);
            }
            
        }

        for(var a = 0; a < focusObj.length; a++) {
            if(focusObj[a] != null) {

                //check if shiftkey is pressed  to lock angle
                if(e.shiftKey) {  

                    if(angle3 % 15 == 0) {
                    
                        pinBody[a].dataset.rotation =  borderR[a] + angle3;
                        cnvLayers[a].dataset.rotation = borderR[a] + angle3;

                        //if rotation exceeds 360
                        if(borderR[a] + angle3 >= 359) {
                            pinBody[a].dataset.rotation -= 359;
                            cnvLayers[a].dataset.rotation -= 359;
                        }

                        

                        pinBody[a].style.rotate = pinBody[a].dataset.rotation + 'deg';
                        cnvLayers[a].style.rotate = cnvLayers[a].dataset.rotation + 'deg';
                    }
                }
                else {
                    pinBody[a].dataset.rotation = borderR[a] + angle3;
                    cnvLayers[a].dataset.rotation = borderR[a] + angle3;

                    //if rotation exceeds 360
                    if(borderR[a] + angle3 >= 359) {
                        pinBody[a].dataset.rotation -= 359;
                        cnvLayers[a].dataset.rotation -= 359;
                    }

                    pinBody[a].style.rotate = pinBody[a].dataset.rotation + 'deg';
                    cnvLayers[a].style.rotate = cnvLayers[a].dataset.rotation + 'deg';
                }
            
            }
        }

        //adjustBorder();
        adjustBasicsFromCanvas();

        if(adjust == "pinTL") {

            cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadRotate.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            
            var inputs = cnvPin.querySelectorAll('div');
            
            inputs.forEach(function(input) {
                input.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadRotate.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            })
        }
    
        else if(adjust == "pinTR") {
            cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadRotate.dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            
            var inputs = cnvPin.querySelectorAll('div');
            
            inputs.forEach(function(input) {
                input.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadRotate.dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            })
        }
    
        else if(adjust == "pinBR") {
            cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadRotate.dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            
            var inputs = cnvPin.querySelectorAll('div');
            
            inputs.forEach(function(input) {
                input.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadRotate.dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            })
        }
    
        else if(adjust == "pinBL") {
            cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadRotate.dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            
            var inputs = cnvPin.querySelectorAll('div');
            
            inputs.forEach(function(input) {
                input.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadRotate.dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            })
        }
    } 
}

function rotateBorderUp(e) {
    e.preventDefault();

    isRotating = false;
    isResizing = false;
    isScaling = false;
    resX = null;
    resY = null;
    adjust = null;

    AB = null;
    AC = null;
    angle1 = null;
    angle2 = null;
    leadRotate = null;
    borderCenterX = null;
    borderCenterY = null;

    //reset cursors
    cnvPin.style.cursor = "default";

    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            pinBody[a].style.cursor = "default";

            pinTL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;

            pinTL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

        }
        
    }
}

//=============================LAYER DRAG AND DROP========================

function countdownLayer() {
    if(counter < 50) {
        counter+=50;
    }
    else {
        isDragging = true; //set boolean to true

        clearInterval(tmrDrag);
        counter = 0;
    }
}

function dragBorderDown(e) {

  if(!e.shiftKey) {
    
    if(e.target != cnvPin && e.target.className == "pinBody") {
        e.preventDefault();

        //remove other pattern focus
        for(var a = 0; a < pnlBoxPattern.length; a++) {
            pnlBoxPattern[a].style.borderColor = "#3F4961";
        }

        //remove other pnlboxthumb focus
        for(var a = 0; a < pnlBoxThumb.length; a++) {
            pnlBoxThumb[a].style.borderColor = "transparent";
            pnlBoxThumb[a].style.borderWidth = "1px";
          
        }

        tmrDrag = setInterval(countdownLayer, 10);

        leadDrag = e.target.closest('.pinBody');

        //pinbody movement
        clientX = Math.round(e.clientX - cnvPin.getBoundingClientRect().left);
        clientY = Math.round(e.clientY - cnvPin.getBoundingClientRect().top);

        //get the percentage of cursor inside the leaddrag
        spaceX = (clientX - leadDrag.offsetLeft) / leadDrag.clientWidth;
        spaceY = (clientY - leadDrag.offsetTop) / leadDrag.clientHeight;
        
        leadDragX = leadDrag.offsetLeft;
        leadDragY = leadDrag.offsetTop;


        for(var a = 0; a < focusObj.length; a++) {
            if(focusObj[a] != null) {

                borderL[a] = pinBody[a].offsetLeft;
                borderT[a] = pinBody[a].offsetTop;
    
            }
            
        }
    }
    
  }
}

function dragBorderMove(e) {

    e.preventDefault();

    if(isDragging) {
        
        var z = rngZoom.value / 100;

        e.target.style.cursor = "move";

        //pinbody movement
        clientX = Math.round(e.clientX - cnvPin.getBoundingClientRect().left);
        clientY = Math.round(e.clientY - cnvPin.getBoundingClientRect().top);

        leadDrag.style.left =  clientX - (spaceX * leadDrag.clientWidth) + 'px';
        leadDrag.style.top =  clientY - (spaceY * leadDrag.clientHeight) + 'px';

        var l = Number(leadDrag.dataset.layer);

        var borderW = Number(cnvLayers[l].style.borderWidth.replace('px', ''))

        cnvLayers[l].style.left = (leadDrag.offsetLeft - (cnvBox.offsetLeft * z))/z - borderW + 'px';
        cnvLayers[l].style.top =  (leadDrag.offsetTop - (cnvBox.offsetTop * z))/z - borderW + 'px';

        for(var a = 0; a < focusObj.length; a++) {
         
            if(focusObj[a] != null) {

                if(pinBody[a] != leadDrag) {
                    pinBody[a].style.left = borderL[a] + (leadDrag.offsetLeft - leadDragX) + 'px';
                    pinBody[a].style.top = borderT[a] + (leadDrag.offsetTop - leadDragY) + 'px';

                    cnvLayers[a].style.left = (pinBody[a].offsetLeft - (cnvBox.offsetLeft * z))/z + 'px';
                    cnvLayers[a].style.top =  (pinBody[a].offsetTop - (cnvBox.offsetTop * z))/z + 'px';
                }
            }
        }

        //adjustBorder();
        adjustBasicsFromCanvas();

    }
}

function dragBorderUp(e) {
    e.preventDefault();

    if(isDragging) {
        e.target.style.cursor = "default";
        isDragging = false;
    }

    
    counter = 0;
    clientX = null;
    clientY = null;
    spaceX = null;
    spaceY = null;

    for(var a = 0; a < focusObj.length; a++) {

        if(focusObj[a] != null) {
  
            borderL[a] = pinBody[a].offsetLeft;
            borderT[a] = pinBody[a].offsetTop;
            layerL[a] = cnvLayers[a].offsetLeft;
            layerT[a] = cnvLayers[a].offsetTop;
        }
        
    }
    clearInterval(tmrDrag);
}

function addPinCursor() {

    for(var e = 0; e < pinBody.length; e++) {

        if(pinBody[e] != null) {

            pinL[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinL2[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinT2[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinR2[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinB2[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTL[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTL2[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTR[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTR2[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBR[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBR2[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBL[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBL2[e].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[e].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
        
        }
        
    }
}

//========================CREATE BOUNDING BOX FOR LAYERS===================
function addBorderLayer(layer, e) {

    var z = rngZoom.value / 100;

    aRatio[e] = layer.clientWidth / layer.clientHeight;

    //create pinBody
    pinBody[e] = document.createElement('div');
    pinBody[e].style.width = layer.clientWidth * z + 'px';
    pinBody[e].style.height = layer.clientHeight * z + 'px';
    pinBody[e].dataset.layer = e;
    pinBody[e].dataset.rotation = 0;
    pinBody[e].classList.add('pinBody');
    cnvPin.appendChild(pinBody[e]);

    //append left
    pinL[e] = document.createElement('div');
    pinL[e].classList.add('pinL');
    pinBody[e].appendChild(pinL[e]);
    pinL[e].addEventListener('pointerover', addPinCursor)

    pinL2[e] = document.createElement('div');
    pinL2[e].classList.add('pinL2');
    pinL[e].appendChild(pinL2[e]);
    pinL2[e].addEventListener('pointerover', addPinCursor)

    //append top
    pinT[e] = document.createElement('div');
    pinT[e].classList.add('pinT');
    pinBody[e].appendChild(pinT[e]);
    pinT[e].addEventListener('pointerover', addPinCursor)

    pinT2[e] = document.createElement('div');
    pinT2[e].classList.add('pinT2');
    pinT[e].appendChild(pinT2[e]);
    pinT2[e].addEventListener('pointerover', addPinCursor)

    //append right
    pinR[e] = document.createElement('div');
    pinR[e].classList.add('pinR');
    pinBody[e].appendChild(pinR[e]);
    pinR[e].addEventListener('pointerover', addPinCursor)

    pinR2[e] = document.createElement('div');
    pinR2[e].classList.add('pinR2');
    pinR[e].appendChild(pinR2[e]);
    pinR2[e].addEventListener('pointerover', addPinCursor)

    //append bottom
    pinB[e] = document.createElement('div');
    pinB[e].classList.add('pinB');
    pinBody[e].appendChild(pinB[e]);
    pinB[e].addEventListener('pointerover', addPinCursor)

    pinB2[e] = document.createElement('div');
    pinB2[e].classList.add('pinB2');
    pinB[e].appendChild(pinB2[e]);
    pinB2[e].addEventListener('pointerover', addPinCursor)

    //append top left
    pinTL[e] = document.createElement('div');
    pinTL[e].classList.add('pinTL');
    pinBody[e].appendChild(pinTL[e]);
    pinTL[e].addEventListener('pointerover', addPinCursor)

    pinTL2[e] = document.createElement('div');
    pinTL2[e].classList.add('pinTL2');
    pinTL[e].appendChild(pinTL2[e]);
    pinTL2[e].addEventListener('pointerover', addPinCursor)

    //append to top right
    pinTR[e] = document.createElement('div');
    pinTR[e].classList.add('pinTR');
    pinBody[e].appendChild(pinTR[e]);
    pinTR[e].addEventListener('pointerover', addPinCursor)


    pinTR2[e] = document.createElement('div');
    pinTR2[e].classList.add('pinTR2');
    pinTR[e].appendChild(pinTR2[e]);
    pinTR2[e].addEventListener('pointerover', addPinCursor)

    //append to bottom right
    pinBR[e] = document.createElement('div');
    pinBR[e].classList.add('pinBR');
    pinBody[e].appendChild(pinBR[e]);
    pinBR[e].addEventListener('pointerover', addPinCursor)

    pinBR2[e] = document.createElement('div');
    pinBR2[e].classList.add('pinBR2');
    pinBR[e].appendChild(pinBR2[e]);
    pinBR2[e].addEventListener('pointerover', addPinCursor)

    //append to bottom left
    pinBL[e] = document.createElement('div');
    pinBL[e].classList.add('pinBL');
    pinBody[e].appendChild(pinBL[e]);
    pinBL[e].addEventListener('pointerover', addPinCursor)

    pinBL2[e]= document.createElement('div');
    pinBL2[e].classList.add('pinBL2');
    pinBL[e].appendChild(pinBL2[e]);
    pinBL2[e].addEventListener('pointerover', addPinCursor)

    adjustBorder();

    chooseLeadDrag(e);
}

function adjustBasicsFromCanvas() {

    for(var a = 0; a < pnlBoxLayer.length; a++) {
        var e = Number(pnlBoxLayer[a].dataset.layer);

        txtWidthLayer[a].value = Math.round(cnvLayers[e].clientWidth);
        txtHeightLayer[a].value = Math.round(cnvLayers[e].clientHeight);

        txtXLayer[a].value = Math.round(cnvLayers[e].offsetLeft);
        txtYLayer[a].value = Math.round(cnvLayers[e].offsetTop);

        txtRotationLayer[a].value = Math.round(cnvLayers[e].dataset.rotation);
        txtRotationLayer[a].previousElementSibling.value = txtRotationLayer[a].value;
    }
}








































//===========================IMAGE LAYER======================

//this will format the pnlBoxPatterns header name to avoid duplicate
var newLayerHeader = null;

function autoIncrementLayer(name) {

    var counter = 1;
    var arrName = null;

    for(var a = 0; a < txtHeaderLayer.length; a++) {
        arrName = txtHeaderLayer[a].value.split(" ");
        if(arrName[0] == name) {
            if(Number(arrName[1]) >= counter ) {
                counter = Number(arrName[1]) + 1;
            }
        }
    }
    
    return newLayerHeader = name + " " + counter;
}

function showHideLayers() {

    var e = this.closest('.pnlBoxLayer').dataset.layer;
    
    if(cnvLayers[e].style.visibility == "visible") {
        cnvLayers[e].style.visibility = "hidden";
        this.style.opacity = .2;
    }
    else if(cnvLayers[e].style.visibility == "hidden") {
        cnvLayers[e].style.visibility = "visible";
        this.style.opacity = 1;
    }
}

function chooseLayerBlend() {
    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {

            //change dropoptionverti text
            
            focusPanel[a].querySelector('.dropdown').children[0].innerText = this.innerText;
            
            var e = Number(focusPanel[a].dataset.layer);
            cnvLayers[e].style.mixBlendMode = this.innerText;
        } 
    }
}

function adjustLayerWidth() {

    var z = rngZoom.value / 100;
    
    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            var e = Number(focusPanel[a].dataset.layer);

            //deal with width
            var initWidth = cnvLayers[e].clientWidth;
            cnvLayers[e].style.width = this.value + 'px';
            focusPanel[a].querySelector('.txtWidthLayer').value = cnvLayers[e].clientWidth;

            //also move the x axis
            var newX = ((initWidth - cnvLayers[e].clientWidth) * z);
            cnvLayers[e].style.left = cnvLayers[e].offsetLeft + newX + "px";

            focusPanel[a].querySelector('.txtXLayer').value = cnvLayers[e].offsetLeft;
        }
 
    }

    adjustBorder();
}

function adjustLayerHeight() {

    var z = rngZoom.value / 100;
    
    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            var e = Number(focusPanel[a].dataset.layer);

            //deal with width
            var initHeight = cnvLayers[e].clientHeight;
            cnvLayers[e].style.height = this.value + 'px';
            focusPanel[a].querySelector('.txtHeightLayer').value = cnvLayers[e].clientHeight;

            //also move the x axis
            var newY = ((initHeight - cnvLayers[e].clientHeight) * z);
            cnvLayers[e].style.top = cnvLayers[e].offsetTop + newY + "px";

            focusPanel[a].querySelector('.txtYLayer').value = cnvLayers[e].offsetTop;
        }
 
    }

    adjustBorder();
}

function adjustLayerX() {

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            var e = Number(focusPanel[a].dataset.layer);

            //deal with left
            cnvLayers[e].style.left = this.value + 'px';
            focusPanel[a].querySelector('.txtXLayer').value = cnvLayers[e].offsetLeft;
        }
    }
    adjustBorder();
}

function adjustLayerY() {

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            var e = Number(focusPanel[a].dataset.layer);

            //deal with top
            cnvLayers[e].style.top = this.value + 'px';
            focusPanel[a].querySelector('.txtYLayer').value = cnvLayers[e].offsetTop;

        }

    }
    adjustBorder();
}

function adjustFlipX(e) {

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

    if(leadFlip.dataset.value == "true") {

        cnvLayers[l].style.transform = "scale(-1, 1)";
    }

    else if(this.dataset.value == "false") { 

        cnvLayers[l].style.transform = "scale(1, 1)";

        leadFlip.removeEventListener('mouseover', chkBoxHover);
    }
    
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null ) {

            var e = Number(focusPanel[a].dataset.layer);

            if(leadFlip.dataset.value == "true") {

                cnvLayers[e].style.transform = "scale(-1, 1)";
            }
        
            else if(leadFlip.dataset.value == "false") { 

                cnvLayers[e].style.transform = "scale(1, 1)";
            }
        
        }
    }
}

function adjustFlipY(e) {

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

    if(leadFlip.dataset.value == "true") {

        cnvLayers[l].style.transform = "scale(1, -1)";
    }

    else if(this.dataset.value == "false") { 

        cnvLayers[l].style.transform = "scale(1, 1)";

        leadFlip.removeEventListener('mouseover', chkBoxHover);

    }
    
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null ) {

            var e = Number(focusPanel[a].dataset.layer);

            if(leadFlip.dataset.value == "true") {

                cnvLayers[e].style.transform = "scale(1, -1)";
            }
        
            else if(leadFlip.dataset.value == "false") { 
        
                cnvLayers[e].style.transform = "scale(1, 1)";
            }
        
        }
    }
}

function chooseLayerOpacity(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            var e = Number(focusPanel[a].dataset.layer);

            //deal with left
            cnvLayers[e].style.opacity = this.value + '%';
            focusPanel[a].querySelector('.txtOpacityLayer').value = this.value;
            focusPanel[a].querySelector('.txtOpacityLayer').previousElementSibling.value = this.value;
        }

    }
}

function chooseLayerRotation(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            var e = Number(focusPanel[a].dataset.layer);

            //deal with top
            pinBody[e].style.rotate = this.value + 'deg';
            pinBody[e].dataset.rotation = this.value;

            cnvLayers[e].style.rotate = this.value + 'deg';
            cnvLayers[e].dataset.rotation = this.value;

            focusPanel[a].querySelector('.txtRotationLayer').value = this.value;
            focusPanel[a].querySelector('.txtRotationLayer').previousElementSibling.value = this.value;
        }
    }
}

function createImgTemp(e) {

    //add canvas temperature
    var cnvTemp = document.createElement('canvas');
    cnvTemp.width = cnvLayers[e].clientWidth;
    cnvTemp.height = cnvLayers[e].clientHeight;
    var ctxTemp = cnvTemp.getContext('2d');
   
    //draw image on canvas
    ctxTemp.drawImage(cnvLayers[e].children[1], 0, 0, cnvTemp.width, cnvTemp.height);

    const imageData = ctxTemp.getImageData(0, 0, cnvTemp.width, cnvTemp.height);
    const data = imageData.data;

    // Loop through each pixel in the image data
    for (let i = 0; i < data.length; i += 4) {

        data[i] = 0;
        data[i + 1] = 87;
        data[i + 2] = 255;
        
    }

    ctxTemp.putImageData(imageData, 0, 0);

    imgCold[e] = new Image();
    imgCold[e].src = cnvTemp.toDataURL('image/png');
    imgCold[e].onload = function() {
        cnvLayers[e].append(imgCold[e]);
        imgCold[e].style.opacity = 0 + '%';
        imgCold[e].style.mixBlendMode = "soft-light";
    }

    for (let i = 0; i < data.length; i += 4) {

        data[i] = 255;
        data[i + 1] = 153;
        data[i + 2] = 0;
    }

    ctxTemp.putImageData(imageData, 0, 0);

    imgWarm[e] = new Image();
    imgWarm[e].src = cnvTemp.toDataURL('image/png');
    imgWarm[e].onload = function() {
        cnvLayers[e].append(imgWarm[e]);
        imgWarm[e].style.opacity = 0 + '%';
        imgWarm[e].style.mixBlendMode = "soft-light";
    }

}

function adjustBlur(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {
            var e = Number(focusPanel[a].dataset.layer);

            cnvLayers[e].style.filter = `blur(${this.value}px)`;

            focusPanel[a].querySelector('.txtBlurLayer').value = this.value;
            focusPanel[a].querySelector('.txtBlurLayer').previousElementSibling.value = this.value;
        }

    }
}

function adjustBrightness(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {
            var e = Number(focusPanel[a].dataset.layer);

            cnvLayers[e].style.filter = `brightness(${this.value}%)`;

            focusPanel[a].querySelector('.txtBrightnessLayer').value = this.value;
            focusPanel[a].querySelector('.txtBrightnessLayer').previousElementSibling.value = this.value;
        }

    }
}

function adjustContrast(e) {
    
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {
            var e = Number(focusPanel[a].dataset.layer);

            cnvLayers[e].style.filter = `contrast(${this.value}%)`;

            focusPanel[a].querySelector('.txtContrastLayer').value = this.value;
            focusPanel[a].querySelector('.txtContrastLayer').previousElementSibling.value = this.value;
        }

    }
}

function adjustSaturation(e) {
    
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {
            var e = Number(focusPanel[a].dataset.layer);

            cnvLayers[e].style.filter = `saturate(${this.value}%)`;

            focusPanel[a].querySelector('.txtSaturationLayer').value = this.value;
            focusPanel[a].querySelector('.txtSaturationLayer').previousElementSibling.value = this.value;
        }

    }
}

function adjustTemperature(e) {

    var o;

    //get opacity
    o = Math.abs(this.value) * 0.5;

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {
            var e = Number(focusPanel[a].dataset.layer);

            //get color
            if(this.value < 0) {
                imgWarm[e].style.opacity = '0%';
                imgCold[e].style.opacity = o + '%';
            }
            else if(this.value > 0) {
                imgCold[e].style.opacity = '0%';
                imgWarm[e].style.opacity = o + '%';
            }
            else {
                imgCold[e].style.opacity = '0%';
                imgWarm[e].style.opacity = '0%';
            }

            focusPanel[a].querySelector('.txtTemperatureLayer').value = this.value;
            focusPanel[a].querySelector('.txtTemperatureLayer').previousElementSibling.value = this.value;
        }
    }
}

function convertHexToRGB(me) {
    var z = [];
    var s = [];
    var append = "";

    myTestHexCode(txtHexValue)

    for(var a=0; a < 6; a++) {

        z[a] = txtHexValue.value.substring(a, a+1);

        if(z[a] != '#') {

            var NAN = Number(z[a]);
            
            if(isNaN(NAN)) {

                s[a] = z[a].toUpperCase();
                z[a] = hexaToDecimal(z[a])
            }
            else {
                s[a] = z[a];
                z[a] = Number(z[a]);
            }
            
            append += s[a];
        }
    }
    
    red = (z[0] * 16) + z[1];
    green = (z[2] * 16) + z[3];
    blue = (z[4] * 16) + z[5];

    txtRedValue.value = red;
    txtGreenValue.value = green;
    txtBlueValue.value = blue;

    hexcode = append.toUpperCase();
    me.value = hexcode;
    me.nextElementSibling.style.backgroundColor = '#' + hexcode;
        
}

//====================================OUTLINE==============================
function adjustImageOutlineColor(e) {

    txtHexValue.value = this.value;
    convertHexToRGB(this);

    var e = Number(this.closest('.pnlBoxLayer').dataset.layer);
    cnvLayers[e].children[0].style.borderColor = `rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, 1)`;

}

function adjustImageOutlineOpacity(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {

            var e = Number(focusPanel[a].dataset.layer);
            var color = leadPanel.querySelector('.txtOutlineColor').value;
            var opacity = this.value;

            txtHexValue.value = color;
            convertHexToRGB(leadPanel.querySelector('.txtOutlineColor'));

            cnvLayers[e].children[0].style.filter = `opacity(${opacity}%)`;
            
                          
            focusPanel[a].querySelector('.txtOutlineOpacity').value = this.value;
            focusPanel[a].querySelector('.txtOutlineOpacity').previousElementSibling.value = this.value;
            
        }
    }

}

function adjustImageOutlineSize(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {

            var e = Number(focusPanel[a].dataset.layer);
            var size = leadPanel.querySelector('.txtOutlineSize').value * 2;

            cnvLayers[e].children[0].style.borderWidth = `${size}px`;
            
            cnvLayers[e].children[0].style.left = 0 -  size + 'px';
            cnvLayers[e].children[0].style.top =  0 - size + 'px';
            
            focusPanel[a].querySelector('.txtOutlineSize').value = this.value;
            focusPanel[a].querySelector('.txtOutlineSize').previousElementSibling.value = this.value;
    
        }
    }

}

function showImageOutline(me) {

    var z = rngZoom.value / 100;

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {

            var e = Number(focusPanel[a].dataset.layer);
            var size = focusPanel[a].querySelector('.txtOutlineSize').value * 2;
            var opacity = focusPanel[a].querySelector('.txtOutlineOpacity').value / 100;

            //remove other styles first
            cnvLayers[e].children[0].style.filter = "none";

            txtHexValue.value = focusPanel[a].querySelector('.txtOutlineColor').value;
            convertHexToRGB(me);

            cnvLayers[e].children[0].style.left = 0 -  size + 'px';
            cnvLayers[e].children[0].style.top =  0 - size + 'px';

            cnvLayers[e].children[0].style.borderWidth = `${size}px`;
            cnvLayers[e].children[0].style.borderStyle = `solid`;
            cnvLayers[e].children[0].style.borderColor = `rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
            
            //adjustBorder()
            
        }
    }

}

//===================================GLOW==================================

function adjustImageGlowColor() {

    var me = this.closest('.pnlBoxLayer');
    var e = Number(me.dataset.layer);
    var color = me.querySelector('.txtGlowColor').value;
    var size = me.querySelector('.txtGlowSize').value * 0.02;
    var spread = me.querySelector('.txtGlowSpread').value / 10;
    var opacity = me.querySelector('.txtGlowOpacity').value / 100;

    txtHexValue.value = color;
    convertHexToRGB(this);

    var append = "";

    for(var b = 0; b < 360; b+=60) {
   
        if(b == 60 || b == 120) {
            
            var coorX = .01 * Math.cos(b * (Math.PI/ 180));
            var coorY = .01 * Math.sin(b * (Math.PI / 180));
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
        }
        
        else {

            var coorX = .01 * Math.cos(b * (Math.PI/ 180));
            var coorY = .01 * Math.sin(b * (Math.PI / 180));
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
        
        }
    }

    cnvLayers[e].children[1].style.filter = append;

}

function adjustImageGlow(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {

            var me = this.closest('.pnlBoxLayer');
            var e = Number(focusPanel[a].dataset.layer);
            var color = me.querySelector('.txtGlowColor').value;
            var size = me.querySelector('.txtGlowSize').value * 0.02;
            var spread = me.querySelector('.txtGlowSpread').value / 10;
            var opacity = me.querySelector('.txtGlowOpacity').value / 100;

            var append = "";

            txtHexValue.value = color;
            convertHexToRGB(me.querySelector('.txtGlowColor'));
            
            for(var b = 0; b < 360; b+=60) {
   
                if(b == 60 || b == 120) {
                    
                    var coorX = .01 * Math.cos(b * (Math.PI/ 180));
                    var coorY = .01 * Math.sin(b * (Math.PI / 180));
                    append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
                    append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
                }
                
                else {

                    var coorX = .01 * Math.cos(b * (Math.PI/ 180));
                    var coorY = .01 * Math.sin(b * (Math.PI / 180));
                    append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
                
                }
            }

            cnvLayers[e].children[1].style.filter = append;
        }
    }
}

function showImageGlow(me) {

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {

            var e = Number(focusPanel[a].dataset.layer);
            var size = focusPanel[a].querySelector('.txtGlowSize').value * 0.02;
            var spread = focusPanel[a].querySelector('.txtGlowSpread').value / 10;
            var opacity = focusPanel[a].querySelector('.txtGlowOpacity').value / 100;
            
            txtHexValue.value = focusPanel[a].querySelector('.txtGlowColor').value;
            convertHexToRGB(me);
            
            //children[1] is the shadow and glow
            cnvLayers[e].children[1].style.filter = "none";

            //children[0] is the borderwidth
            cnvLayers[e].children[0].style.borderWidth = "0px";

            cnvLayers[e].children[0].style.left = 0 + 'px';
            cnvLayers[e].children[0].style.top = 0 + 'px';

            var append = "";
            
            for(var b = 0; b < 360; b+=60) {
   
                if(b == 60 || b == 120) {
                    
                    var coorX = .01 * Math.cos(b * (Math.PI/ 180));
                    var coorY = .01 * Math.sin(b * (Math.PI / 180));
                    append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${ size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
                    append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${ size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
                }
                
                else {

                    var coorX = .01 * Math.cos(b * (Math.PI/ 180));
                    var coorY = .01 * Math.sin(b * (Math.PI / 180));
                    append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${ size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
                }
            }
       
            cnvLayers[e].children[1].style.filter = append;

            cnvLayers[e].dataset.borderOn = "false";
            adjustBorder()
        }
    }
    
}

//===================================SHADOW==================================

function adjustImageShadowColor() {

    var me = this.closest('.pnlBoxLayer');
    var e = Number(me.dataset.layer);
    var color = me.querySelector('.txtShadowColor').value;
    var size = me.querySelector('.txtShadowSize').value / 2;
    var spread = me.querySelector('.txtShadowSpread').value / 5;
    var opacity = me.querySelector('.txtShadowOpacity').value / 100;
    var rotation = Number(me.querySelector('.txtShadowRotation').value) + 90;

    txtHexValue.value = color;
    convertHexToRGB(this);

    var append = "";

    var coorX = size * Math.cos(rotation * (Math.PI/ 180));
    var coorY = size * Math.sin(rotation * (Math.PI / 180));
    append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})) `;
    
    cnvLayers[e].children[0].style.filter = append;
}

function adjustImageShadow(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {

            var me = this.closest('.pnlBoxLayer');
            var e = Number(focusPanel[a].dataset.layer);
            var color = me.querySelector('.txtShadowColor').value;
            var size = me.querySelector('.txtShadowSize').value / 2;
            var spread = me.querySelector('.txtShadowSpread').value / 5;
            var opacity = me.querySelector('.txtShadowOpacity').value / 100;
            var rotation = Number(me.querySelector('.txtShadowRotation').value) + 90;
            
            txtHexValue.value = color;
            convertHexToRGB(me.querySelector('.txtShadowColor'));

            var append = "";

            var coorX = size * Math.cos(rotation * (Math.PI/ 180));
            var coorY = size * Math.sin(rotation * (Math.PI / 180));
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})) `;
            
            cnvLayers[e].children[1].style.filter = append;

        }
    }

}

function showImageShadow(me) {
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {

            var e = Number(focusPanel[a].dataset.layer);
            var size = focusPanel[a].querySelector('.txtShadowSize').value/2;
            var spread = focusPanel[a].querySelector('.txtShadowSpread').value / 5;
            var opacity = focusPanel[a].querySelector('.txtShadowOpacity').value / 100;
            var rotation = Number(focusPanel[a].querySelector('.txtShadowRotation').value) + 90;
            
            txtHexValue.value = focusPanel[a].querySelector('.txtShadowColor').value;
            convertHexToRGB(me);

            //children[1] is the shadow and glow
            cnvLayers[e].children[1].style.filter = "none";

            //children[0] is the borderwidth
            cnvLayers[e].children[0].style.borderWidth = "0px";

            cnvLayers[e].children[0].style.left = 0 + 'px';
            cnvLayers[e].children[0].style.top = 0 + 'px';

            var append = "";
                    
            var coorX = size * Math.cos(rotation * (Math.PI/ 180));
            var coorY = size * Math.sin(rotation * (Math.PI / 180));
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})) `;
            
            cnvLayers[e].dataset.borderOn = "false";

            cnvLayers[e].children[1].style.filter = append;

        }
    }
}

function removeImageStyle() {
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {
            var e = Number(focusPanel[a].dataset.layer);

            //children[1] is the shadow and glow
            cnvLayers[e].children[1].style.filter = "none";

            //children[0] is the borderwidth
            cnvLayers[e].children[0].style.borderWidth = "0px";

            cnvLayers[e].children[0].style.left = 0 + 'px';
            cnvLayers[e].children[0].style.top = 0 + 'px';
        }
    }   
}

//===================================LAYER STYLE==============================
function chooseLayerStyle() {

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null && focusPanel[a].dataset.type == "image") {

            //change dropoptionverti text

            var b = focusPanel[a].querySelectorAll('.dropdown');
            b[1].children[0].innerText = this.innerText;
            
            if(this.innerText == "Outline") {
                focusPanel[a].querySelector('.tabOutlineLayer').style.display = "block";
                focusPanel[a].querySelector('.tabGlowLayer').style.display = "none";
                focusPanel[a].querySelector('.tabShadowLayer').style.display = "none";
                showImageOutline(focusPanel[a].querySelector('.txtOutlineColor'));
                
            }
            else if(this.innerText == "Glow") {
                focusPanel[a].querySelector('.tabGlowLayer').style.display = "block";
                focusPanel[a].querySelector('.tabOutlineLayer').style.display = "none";
                focusPanel[a].querySelector('.tabShadowLayer').style.display = "none";
                showImageGlow(focusPanel[a].querySelector('.txtGlowColor'));
            }
            else if(this.innerText == "Shadow") {

                focusPanel[a].querySelector('.tabShadowLayer').style.display = "block";
                focusPanel[a].querySelector('.tabOutlineLayer').style.display = "none";
                focusPanel[a].querySelector('.tabGlowLayer').style.display = "none";
                showImageShadow(focusPanel[a].querySelector('.txtShadowColor'));
            }
            else {

                focusPanel[a].querySelector('.tabShadowLayer').style.display = "none";
                focusPanel[a].querySelector('.tabOutlineLayer').style.display = "none";
                focusPanel[a].querySelector('.tabGlowLayer').style.display = "none";
                focusPanel[a].querySelector('.tabStyleLayer').querySelector('.dropdown').children[0].innerText = "Choose style";
                removeImageStyle();
            }

        } 
    }
}

function hoverLayerStyle(e) {
    this.style.backgroundColor = "salmon";
    this.style.color = "white";
}

function outLayerStyle(e) {
    this.style.backgroundColor = "transparent";
    this.style.color = "salmon";
}

//=============================CREATE CANVAS FOR LAYERS=====================
function createCanvasImageLayer(e, n) {     

    var z = rngZoom.value/100;

    cnvLayers[e] = document.createElement('div');
    cnvLayers[e].style.visibility = "visible";
    cnvLayers[e].classList.add('cnvLayers');
    cnvLayers[e].dataset.rotation = 0;
    cnvLayers[e].dataset.layer = e;
    cnvLayers[e].dataset.thumbno = n;
    cnvLayers[e].dataset.type = "image";
    focusObj[e] = cnvLayers[e];

    //add a div for border outline
    var cnvLayersBorder = document.createElement('div');
    cnvLayersBorder.classList.add('cnvLayersBorder');

    cnvLayers[e].appendChild(cnvLayersBorder);

    //add first image  so we can adjust the left and right of the cnvlayer
    //use [e] to get pnlBoxLayer dataset of thumbNo 
    //index it back to pnlBoxThumb and get children[0] which is img and get src

    var img = new Image();
    img.src = configScroll[2].querySelector(`[data-thumbno="${n}"]`).children[0].src;
    img.onload = function() { 
        //when image is loaded, append img to cnvlayer
        cnvLayers[e].appendChild(img); 

        cnvLayers[e].children[0].style.filter = "none";

        //then append cnvlayer to cnvmain
        cnvGrpLayers.appendChild(cnvLayers[e]);
        
        //get which is smaller if canvas width or canvas height
        var aspectRatio;

        if(Number(txtSizeWidth.value) > Number(txtSizeHeight.value)) {
            aspectRatio = img.naturalWidth / img.naturalHeight;
            cnvLayers[e].style.height = `${Math.round(txtSizeHeight.value * 0.5)}px`;
            cnvLayers[e].style.width =  `${Math.round(cnvLayers[e].clientHeight * aspectRatio)}px`;
            
        }
        else if(Number(txtSizeWidth.value) < Number(txtSizeHeight.value)) {
            aspectRatio = img.naturalHeight / img.naturalWidth;

            cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.5)}px`;
            cnvLayers[e].style.height = `${Math.round(cnvLayers[e].clientWidth * aspectRatio)}px`;
        }

        else if(Number(txtSizeWidth.value) == Number(txtSizeHeight.value)) {
            
            aspectRatio = img.naturalHeight / img.naturalWidth;

            cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.5)}px`;
            cnvLayers[e].style.height = `${Math.round(cnvLayers[e].clientWidth * aspectRatio)}px`;
        }

        //set min width and height
        aspectRatio = img.naturalWidth / img.naturalHeight;
        cnvLayers[e].style.minWidth = 20 + 'px';
        cnvLayers[e].style.minHeight = 20 / aspectRatio + 'px';

        //position cnvlayer to center
        cnvLayers[e].style.left = `${(txtSizeWidth.value / 2) - (cnvLayers[e].clientWidth/2)}px`;
        cnvLayers[e].style.top = `${(txtSizeHeight.value / 2) - (cnvLayers[e].clientHeight/2)}px`;

        layerL[e] = cnvLayers[e].offsetLeft;
        layerT[e] = cnvLayers[e].offsetTop;
        layerW[e] = cnvLayers[e].clientWidth;
        layerH[e] = cnvLayers[e].clientHeight;

        createImgTemp(e)

        //add border
        addBorderLayer(cnvLayers[e], e)

    }

}

//===================ADD CONTROLS TO PANEL IMAGE==================

//actual function to create pnlBoxProperties
function addPnlBoxImageControls(e) {  //adding controls only for 'IMAGE' panel boxes

    for(var a = 0; a < pnlBoxLayer.length; a++) {

        if(Number(pnlBoxLayer[a].dataset.layer) == e) {
            
            //add the expand and collapse control
            btnExpandCollapseLayer[a].addEventListener('click', expandCollapseControls);

            //add the show and hide control
            btnShowHideLayer[a].addEventListener('click', showHideLayers);

            txtHeaderLayer[a].addEventListener('dblclick', renameTxtHeader);
            txtHeaderLayer[a].addEventListener('change', saveTxtHeader);
            txtHeaderLayer[a].addEventListener('click', blurTxtHeader);
            txtHeaderLayer[a].addEventListener('focusout', saveTxtHeader);

            //btnBasicLayer event listeners
            btnBasicLayer[a].addEventListener('click', btnBottomClick); //default the btnBasic to white
            btnBasicLayer[a].addEventListener('mouseover', btnBottomHover);
            btnBasicLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnBasicLayer[a].addEventListener('click', showBasicLayer);
            btnBasicLayer[a].children[0].style.filter = "saturate(0) brightness(2)";
            btnBasicLayer[a].children[0].style.transition = ".2s";

            //btnColorLayer event listeners
            btnColorLayer[a].addEventListener('click', btnBottomClick); //default the btnColor to white
            btnColorLayer[a].addEventListener('mouseover', btnBottomHover);
            btnColorLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnColorLayer[a].addEventListener('click', showColorLayer);
            btnColorLayer[a].children[0].style.transition = ".2s";

            //btnColorLayer event listeners
            btnStyleLayer[a].addEventListener('click', btnBottomClick); //default the btnStyle to white
            btnStyleLayer[a].addEventListener('mouseover', btnBottomHover);
            btnStyleLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnStyleLayer[a].addEventListener('click', showStyleLayer);
            btnStyleLayer[a].children[0].style.transition = ".2s";

            //assign dropOptionVerti selection for blend mode
            for(var b = 0; b < optLayerBlend.length; b++) {
                optLayerBlend[b].addEventListener('click', chooseLayerBlend);
            }

            //width and size
            txtWidthLayer[a].addEventListener('change', adjustLayerWidth);
            txtHeightLayer[a].addEventListener('change', adjustLayerHeight);

            //x and y axis
            txtXLayer[a].addEventListener('change', adjustLayerX);
            txtYLayer[a].addEventListener('change', adjustLayerY);

            chkFlipX[a].addEventListener('click', chkBoxClick);
            chkFlipX[a].addEventListener('click', adjustFlipX);
            chkFlipX[a].addEventListener('mouseover', chkBoxHover);
            chkFlipX[a].addEventListener('mouseleave', chkBoxLeave)
            
            chkFlipY[a].addEventListener('click', chkBoxClick);
            chkFlipY[a].addEventListener('click', adjustFlipY);
            chkFlipY[a].addEventListener('mouseover', chkBoxHover);
            chkFlipY[a].addEventListener('mouseleave', chkBoxLeave)

            txtOpacityLayer[a].addEventListener('change', chooseLayerOpacity);
            txtOpacityLayer[a].previousElementSibling.addEventListener('input', chooseLayerOpacity);

            txtRotationLayer[a].addEventListener('change', chooseLayerRotation);
            txtRotationLayer[a].previousElementSibling.addEventListener('input', chooseLayerRotation);

            txtBlurLayer[a].addEventListener('change', adjustBlur);
            txtBlurLayer[a].previousElementSibling.addEventListener('input', adjustBlur);

            txtBrightnessLayer[a].addEventListener('change', adjustBrightness);
            txtBrightnessLayer[a].previousElementSibling.addEventListener('input', adjustBrightness);

            txtContrastLayer[a].addEventListener('change', adjustContrast);
            txtContrastLayer[a].previousElementSibling.addEventListener('input', adjustContrast);

            txtSaturationLayer[a].addEventListener('change', adjustSaturation);
            txtSaturationLayer[a].previousElementSibling.addEventListener('input', adjustSaturation);

            txtTemperatureLayer[a].addEventListener('change', adjustTemperature);
            txtTemperatureLayer[a].previousElementSibling.addEventListener('input', adjustTemperature);
        
            //assign dropOptionVerti selection for blend mode
            for(var b = 0; b < optLayerStyle.length; b++) {
                optLayerStyle[b].addEventListener('click', chooseLayerStyle);
                if(b == 3) {
                    optLayerStyle[b].style.color = "salmon";
                    optLayerStyle[b].addEventListener('mouseover', hoverLayerStyle)
                    optLayerStyle[b].addEventListener('mouseout', outLayerStyle)
                }
            }
            
            //outline
            txtOutlineColor[a].addEventListener('focus', selectAll);
            txtOutlineColor[a].addEventListener('change', adjustImageOutlineColor);
            txtOutlineColor[a].previousElementSibling.addEventListener('input', adjustImageOutlineColor)
            thumbPickerOutline[a].addEventListener('click', letsSummonColorPicker);

            txtOutlineOpacity[a].addEventListener('change', adjustImageOutlineOpacity);
            txtOutlineOpacity[a].previousElementSibling.addEventListener('input', adjustImageOutlineOpacity);

            txtOutlineSize[a].addEventListener('change', adjustImageOutlineSize);
            txtOutlineSize[a].previousElementSibling.addEventListener('input', adjustImageOutlineSize);
        
            //glow
            txtGlowColor[a].addEventListener('focus', selectAll);
            txtGlowColor[a].addEventListener('change', adjustImageGlowColor);
            txtGlowColor[a].previousElementSibling.addEventListener('input', adjustImageGlowColor);
            thumbPickerGlow[a].addEventListener('click', letsSummonColorPicker);

            txtGlowOpacity[a].addEventListener('change', adjustImageGlow);
            txtGlowOpacity[a].previousElementSibling.addEventListener('input', adjustImageGlow);

            txtGlowSize[a].addEventListener('change', adjustImageGlow);
            txtGlowSize[a].previousElementSibling.addEventListener('input', adjustImageGlow);

            txtGlowSpread[a].addEventListener('change', adjustImageGlow);
            txtGlowSpread[a].previousElementSibling.addEventListener('input', adjustImageGlow);

            //shadow
            txtShadowColor[a].addEventListener('focus', selectAll);
            txtShadowColor[a].addEventListener('change', adjustImageShadowColor);
            txtShadowColor[a].previousElementSibling.addEventListener('input', adjustImageShadowColor);
            thumbPickerShadow[a].addEventListener('click', letsSummonColorPicker);

            txtShadowOpacity[a].addEventListener('change', adjustImageShadow);
            txtShadowOpacity[a].previousElementSibling.addEventListener('input', adjustImageShadow);

            txtShadowSize[a].addEventListener('change', adjustImageShadow);
            txtShadowSize[a].previousElementSibling.addEventListener('input', adjustImageShadow);

            txtShadowSpread[a].addEventListener('change', adjustImageShadow);
            txtShadowSpread[a].previousElementSibling.addEventListener('input', adjustImageShadow);

            txtShadowRotation[a].addEventListener('change', adjustImageShadow);
            txtShadowRotation[a].previousElementSibling.addEventListener('input', adjustImageShadow);
        
            //add function to all sliders to change textbox
            linkRangeToTextbox();
            
            //add function to all textbox to change slider
            linkTextboxToRange();
        }
    }

    //after all assigned controls then create the actual pattern layer
    createCanvasImageLayer(Number(pnlBoxLayer[0].dataset.layer), Number(pnlBoxLayer[0].dataset.thumbno))
}









































//===========================TEXT LAYER======================

var currFontSize = 48; 
var currFontColor = "black";
var currLetterSpacing = 0;
var currLineHeight = "Auto";
var currCase = "UpperCase";
var currResizeBox = "AutoWidth";
var currHoriAlignment = "Left";
var currVertiAlignment = "Top"
var currTextDecor = "NoDecor";

var btnTextLayer = document.getElementsByClassName('btnTextLayer');
var optTextWeight = document.getElementsByClassName('optTextWeight');
var txtResizeText = document.getElementsByClassName('txtResizeText');
var txtTextColor = document.getElementsByClassName('txtTextColor');
var thumbPickerTextColor = document.getElementsByClassName('thumbPickerTextColor');
var txtLetterSpacing = document.getElementsByClassName('txtLetterSpacing');
var txtLineHeight = document.getElementsByClassName('txtLineHeight');
var btnTitleCase = document.getElementsByClassName('btnTitleCase');
var btnUpperCase = document.getElementsByClassName('btnUpperCase');
var btnLowerCase = document.getElementsByClassName('btnLowerCase');
var btnAutoWidth = document.getElementsByClassName('btnAutoWidth');
var btnAutoHeight = document.getElementsByClassName('btnAutoHeight');
var btnFixedSize = document.getElementsByClassName('btnFixedSize');
var btnAlignLeft = document.getElementsByClassName('btnAlignLeft');
var btnAlignCenter = document.getElementsByClassName('btnAlignCenter');
var btnAlignRight = document.getElementsByClassName('btnAlignRight');
var btnAlignTop = document.getElementsByClassName('btnAlignTop');
var btnAlignMiddle = document.getElementsByClassName('btnAlignMiddle');
var btnAlignBottom = document.getElementsByClassName('btnAlignBottom');
var btnNoDecor = document.getElementsByClassName('btnNoDecor');
var btnUnderline = document.getElementsByClassName('btnUnderline');
var btnStrike = document.getElementsByClassName('btnStrike');


function checkCurrTextSettings(e) {

    var panel = configScroll[5].querySelector(`[data-layer = "${e}"]`);
    if(currFontSize != null) {
        cnvLayers[e].dataset.fontSize = currFontSize;
        cnvLayers[e].children[0].style.fontSize = currFontSize + 'px';


        adjustTextArea(e);
    }

    if(currFontColor != null) {
        cnvLayers[e].children[0].style.color = currFontColor;
    }

    if(currLetterSpacing != null) {
        cnvLayers[e].children[0].style.letterSpacing = currLetterSpacing + 'px';
        adjustTextArea(e);
    }

    if(currLineHeight != null) {
        
        if(Number.isInteger(Number(currLineHeight))) {
            cnvLayers[e].children[0].style.lineHeight = currLineHeight / 10;
        }
        else {
            cnvLayers[e].children[0].style.lineHeight = "normal"; 
        }

        adjustTextArea(e);
    }

    if(currCase != null) {

        if(currCase == "TitleCase") {
            panel.querySelector('.btnTitleCase').click();
        
        }
        else if(currCase == "LowerCase") {
            panel.querySelector('.btnLowerCase').click();
           
        }
        else if(currCase == "UpperCase") {
            panel.querySelector('.btnUpperCase').click();
       
        }
    }

    if(currResizeBox != null) {
        if(currResizeBox == "AutoWidth") {
            panel.querySelector('.btnAutoWidth').click();
        }
        else if(currResizeBox == "AutoHeight") {
            panel.querySelector('.btnAutoHeight').click();
        }
        else if(currResizeBox == "FixedSize") {
            panel.querySelector('.btnFixedSize').click();
        }
    }

    if(currHoriAlignment != null) {
        panel.querySelector(`.btnAlign${currHoriAlignment}`).click();
    }

    if(currVertiAlignment != null) {

        panel.querySelector(`.btnAlign${currVertiAlignment}`).click();

    }

    if(currTextDecor != null) {

        panel.querySelector(`.btn${currTextDecor}`).click();

    }

}

//==============================LAYER EDIT TEXT============================

function editCanvasTextLayer(e) {
    
    if(e.target != cnvPin && e.target.className == "pinBody") {
        
        var p = Number(e.target.dataset.layer);

        cnvGrpLayers.style.boxSizing = "none";
        cnvGrpLayers.style.overflow = "visible";

        //check if cnvlayers is text
        if(cnvLayers[p].children[0].className == "textArea") {
            
            cnvLayers[p].children[0].focus();
            cnvLayers[p].children[0].select();

        }
    }
}

function inputCanvasTextLayer() {

    var z = 100 / rngZoom.value;
    var e = this.closest('.cnvLayers').dataset.layer;

    inputFormatResizeBox(e);
    
    cnvGrpLayers.style.boxSizing = "none";
    cnvGrpLayers.style.overflow = "visible";
}

function inputFormatResizeBox(e) {

    //check resize box
    var z = rngZoom.value / 100;

    if(currResizeBox == "AutoWidth" || currResizeBox == null) {

        cnvLayers[e].children[0].style.whiteSpace = "nowrap";

        cnvLayers[e].children[0].style.width = 1 + 'px';
        cnvLayers[e].children[0].style.width = cnvLayers[e].children[0].scrollWidth + 4 + 'px';
        cnvLayers[e].children[0].style.height = 1 + 'px';
        cnvLayers[e].children[0].style.height = cnvLayers[e].children[0].scrollHeight + 'px';

        cnvLayers[e].style.width = cnvLayers[e].children[0].scrollWidth + 4 + 'px';
        cnvLayers[e].style.height = cnvLayers[e].children[0].scrollHeight + 'px';
    }
    else if(currResizeBox == "AutoHeight") {

        cnvLayers[e].children[0].style.whiteSpace = "normal";

        cnvLayers[e].children[0].style.height = 1 + 'px';
        cnvLayers[e].children[0].style.height = cnvLayers[e].children[0].scrollHeight + 'px';

        cnvLayers[e].style.width = cnvLayers[e].children[0].clientWidth + 'px';
        cnvLayers[e].style.height = cnvLayers[e].children[0].clientHeight + 'px';
        
    }
    else if(currResizeBox == "FixedSize") {
        
        cnvLayers[e].children[0].style.whiteSpace = "normal";
 
        cnvLayers[e].children[0].style.width = cnvLayers[e].clientWidth + 'px';
        cnvLayers[e].children[0].style.height = 1 + 'px';
        cnvLayers[e].children[0].style.height = cnvLayers[e].children[0].scrollHeight + 'px';

        if(cnvLayers[e].children[0].clientHeight * z > cnvLayers[e].clientHeight * z && currVertiAlignment == "Middle") {
            var val = cnvLayers[e].children[0].clientHeight * z - cnvLayers[e].clientHeight * z;
            cnvLayers[e].children[0].style.position = "absolute";
            cnvLayers[e].children[0].style.top = 0 - val + 'px';
        }
        else if(cnvLayers[e].children[0].clientHeight * z > cnvLayers[e].clientHeight * z && currVertiAlignment == "Bottom") {
            var val = cnvLayers[e].children[0].clientHeight * z - cnvLayers[e].clientHeight * z;
            cnvLayers[e].children[0].style.position = "absolute";
            cnvLayers[e].children[0].style.top = 0 - val * 2 + 'px';
        }
        else {
            cnvLayers[e].children[0].style.position = "static"; // need return to static for margin auto
        }

    }
    adjustBorder()
}

function inputBlurTextLayer(e) {
    if(e.ctrlKey || e.shiftKey || e.altKey) {
        if(e.key == "Enter" || e.key == "enter" || e.key == "ENTER") {
            this.blur();
        }
    } 
}

function adjustTextArea(e) {

    var z = rngZoom.value / 100;
    
    cnvLayers[e].children[0].style.width = 1 + 'px';
    cnvLayers[e].children[0].style.width = cnvLayers[e].children[0].scrollWidth + 'px';
    cnvLayers[e].children[0].style.height = 1 + 'px';
    cnvLayers[e].children[0].style.height = cnvLayers[e].children[0].scrollHeight + 'px';

    cnvLayers[e].style.left = (pinBody[e].offsetLeft - (cnvBox.offsetLeft * z))/z + 'px';
    cnvLayers[e].style.top =  (pinBody[e].offsetTop - (cnvBox.offsetTop * z))/z + 'px';
    
    if(currResizeBox == "AutoWidth") {
        cnvLayers[e].style.width = cnvLayers[e].children[0].scrollWidth + 'px';
        cnvLayers[e].style.height = cnvLayers[e].children[0].scrollHeight + 'px';
    }
    else if(currResizeBox == "AutoHeight") {
        cnvLayers[e].style.width = cnvLayers[e].children[0].clientWidth + 'px';
        cnvLayers[e].style.height = cnvLayers[e].children[0].scrollHeight + 'px';
    }
    

    adjustBorder();

    //enable back cnvGrpLayers css
    cnvGrpLayers.style.boxSizing = "border-box";
    cnvGrpLayers.style.overflow = "hidden";
    
}

function addFontWeights(me) {
   
    var font = me.dataset.font;
    var clas = me.dataset.class;
    var append = ""

    if(clas == "serif") {

        for(var a = 0; a < serif.length; a++) {

            if(serif[a].name == font) {

                var normal = serif[a].normal.split(', ');

                for(var b = 0; b < normal.length; b++) {
                    append += `<div class="optTextWeight">${normal[b]}</div>`;
                }

                if(serif[a].italics != "") {
                    append += `<div class="breaklineVerti"></div> `;

                    var italics = serif[a].italics.split(', ');

                    for(var b = 0; b < italics.length; b++) {
                        append += `<div class="optTextWeight">${italics[b]} Italic</div>`;
                    }
                }
            }
        }
    }

    
    else if(clas == "sans serif") {

        for(var a = 0; a < sansSerif.length; a++) {

            if(sansSerif[a].name == font) {

                var normal = sansSerif[a].normal.split(', ');
                
                for(var b = 0; b < normal.length; b++) {
                    append += `<div class="optTextWeight">${normal[b]}</div>`;
                }

                if(sansSerif[a].italics != "") {
                    append += `<div class="breaklineVerti"></div> `;

                    var italics = sansSerif[a].italics.split(', ');

                    for(var b = 0; b < italics.length; b++) {
                        append += `<div class="optTextWeight">${italics[b]} Italic</div>`;
                    }
                }
            }
        }
    }

    else if(clas == "stylish") {

        for(var a = 0; a < stylish.length; a++) {

            if(stylish[a].name == font) {

                var normal = stylish[a].normal.split(', ');

                for(var b = 0; b < normal.length; b++) {
                    append += `<div class="optTextWeight">${normal[b]}</div>`;
                }

                if(stylish[a].italics != "") {
                    append += `<div class="breaklineVerti"></div> `;

                    var italics = stylish[a].italics.split(', ');

                    for(var b = 0; b < italics.length; b++) {
                        append += `<div class="optTextWeight">${italics[b]} Italic</div>`;
                    }
                }
            }
        }
    }

    var dropOption = me.querySelectorAll('.dropOptionVerti');
    dropOption[1].innerHTML = append;
    
}

function convertWeight(weight) {
   
    if(weight == "Thin") {
        return "100";
    }
    else if(weight == "Extra Light") {
        return "200";
    }
    else if(weight == "Light") {
        return "300";
    }
    else if(weight == "Regular") {
        return "400";
    }
    else if(weight == "Medium") {
        return "500";
    }
    else if(weight == "Semi Bold") {
        return "600";
    }
    else if(weight == "Bold") {
        return "700";
    }
    else if(weight == "Extra Bold") {
        return "800";
    }
    else if(weight == "Black") {
        return "900";
    }

}

function chooseTextWeight() {

    //change dropoptionverti text
    var e = this.closest('.pnlBoxLayer').dataset.layer;

    var drop = this.closest('.pnlBoxLayer').querySelectorAll('.dropdown');

    drop[1].children[0].innerText = this.innerText; 

    //var checkItalic = this.innerText.test;
    var test = /Italic/;

    if(test.test(this.innerText)) {
        cnvLayers[e].children[0].style.fontStyle = "italic";

        var weight = this.innerText.replace(" Italic", "");

        //cnvLayers[e].children[0].style.fontVariationSettings = `wght ${Number(convertWeight(weight))}`;
        cnvLayers[e].children[0].style.fontWeight = convertWeight(weight);
    }

    else {
        cnvLayers[e].children[0].style.fontStyle = "normal";

        var weight = this.innerText;

        //cnvLayers[e].children[0].style.fontVariationSettings = `wght ${Number(convertWeight(weight))}`;
        cnvLayers[e].children[0].style.fontWeight = convertWeight(weight);
    }

    var f = this.closest('.pnlBoxLayer').dataset.layer;

    if(currResizeBox == "AutoHeight" || currResizeBox == "AutoWidth") {
        adjustTextArea(f);
    }
}

function adjustTextSize(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var f = Number(focusPanel[a].dataset.layer);

            cnvLayers[f].children[0].style.fontSize = this.value + 'px';
            focusPanel[a].querySelector('.txtResizeText').value = this.value;
            adjustTextArea(a);
        }
    }

    //update curr settings
    currFontSize = this.value;
}

function adjustTextColor() {

    //validate hex format
    
    testHexCode(this);
 
    var e = Number(this.closest('.pnlBoxLayer').dataset.layer)

    cnvLayers[e].children[0].style.color = '#' + this.value;
    this.nextElementSibling.style.backgroundColor = '#' + this.value;

    this.blur();
    currFontColor = this.value;
}

function adjustLetterSpacing(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var f = Number(focusPanel[a].dataset.layer);

            cnvLayers[f].children[0].style.letterSpacing = this.value + 'px';
            focusPanel[a].querySelector('.txtLetterSpacing').value = this.value;
            adjustTextArea(a);

        }
    }

    currLetterSpacing = this.value;

}

function adjustLineHeight(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var f = Number(focusPanel[a].dataset.layer);

            if(Number.isInteger(Number(this.value)) && this.value !== null && this.value !== "" && this.value.trim() !== '') {
        
                focusPanel[a].querySelector('.txtLineHeight').value = this.value.trim();
                cnvLayers[f].children[0].style.lineHeight = this.value.trim() / 10;
                currLineHeight = this.value.trim();
            }

            else {

                focusPanel[a].querySelector('.txtLineHeight').value = "Auto";
                cnvLayers[f].children[0].style.lineHeight = "normal";
                currLineHeight = "normal";
            }

            
            adjustTextArea(a);
        }
    }

    this.blur();
    
}

function rollLineHeight(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    //start formatting
    if(e.key == "ArrowDown") {
        if(Number.isInteger(Number(this.value))) {
            if(this.value > 0) {
                this.value--;
            }
            else {
                this.value = "Auto";
                currLineHeight = "normal";
            }
        }
        else {

            this.value = "Auto";
            currLineHeight = "normal";

        }
    }

    else if(e.key == "ArrowUp") {
        if(Number.isInteger(Number(this.value))) {
            
            this.value++;
            currLineHeight = this.value /10;
            
        }
        else {

            this.value = 0;
            currLineHeight = this.value /10;

        }
    }

    else if(e.key == " ") {
        e.preventDefault();
    }

    else {
        return;
    }

    //use the value for other focused panels
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var f = Number(focusPanel[a].dataset.layer);

            if(Number.isInteger(Number(this.value))) {
                cnvLayers[f].children[0].style.lineHeight = this.value / 10;
                focusPanel[a].querySelector('.txtLineHeight').value = this.value;
                currLineHeight = this.value /10;
            }
            
            else {
                cnvLayers[f].children[0].style.lineHeight = "normal";
                focusPanel[a].querySelector('.txtLineHeight').value = "Auto";
                currLineHeight = "normal";
            }

            adjustTextArea(a);
        }
    }
}

function adjustTitleCase(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    var l = Number(leadPanel.dataset.layer);

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
    
    //adjust lead first-------------------------------------------

    focusObj[l] = cnvLayers[l];

    var append = "";
            
    var words = focusObj[l].children[0].value.split(' ');

    for(b = 0; b < words.length; b++) {

        //change the first char
        var caps = "";
        caps += words[b].charAt(0).toUpperCase();
        //append += words[b].replace(words[b].charAt(0), words[b].charAt(0).toUpperCase());
        
        //change the succeeding char
        var lower = "";
        for(var c = 1; c < words[b].length; c++) {
            lower += words[b].charAt(c).toLowerCase();
            
        }

        append += caps+lower;

        if(b < words.length - 1) {
            append += ' ';
        }
        
    }

    focusObj[l].children[0].value = "";
    focusObj[l].children[0].value = append;

    focusObj[l].children[0].style.textTransform = "capitalize";

    if(currResizeBox == "AutoHeight" || currResizeBox == "AutoWidth") {
        adjustTextArea(l);
    }

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            focusPanel[a].querySelector('.btnTitleCase').click(); 
        }
    }

    //curr settings
    currCase = "TitleCase";
}

function adjustUpperCase(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    var l = Number(leadPanel.dataset.layer);

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

    focusObj[l] = cnvLayers[l];

    focusObj[l].children[0].value = focusObj[l].children[0].value.toUpperCase();
    focusObj[l].children[0].style.textTransform = "uppercase";

    if(currResizeBox == "AutoHeight" || currResizeBox == "AutoWidth") {
        adjustTextArea(l);
    }

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {
            focusPanel[a].querySelector('.btnUpperCase').click(); 
        }
    }

    //curr settings
    currCase = "UpperCase";
}

function adjustLowerCase(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    var l = Number(leadPanel.dataset.layer);

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
    
    focusObj[l] = cnvLayers[l];

    focusObj[l].children[0].value = focusObj[l].children[0].value.toLowerCase();
    focusObj[l].children[0].style.textTransform = "lowercase";

    if(currResizeBox == "AutoHeight" || currResizeBox == "AutoWidth") {
        adjustTextArea(l);
    }
    
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {
            focusPanel[a].querySelector('.btnLowerCase').click();
        }
    }

    //curr settings
    currCase = "LowerCase";
}

function adjustAutoWidth(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    var l = Number(leadPanel.dataset.layer);

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
    
    
    //enable back cnvGrpLayers css
    cnvGrpLayers.style.boxSizing = "border-box";
    cnvGrpLayers.style.overflow = "hidden";

    focusObj[l] = cnvLayers[l];

    focusObj[l].children[0].style.whiteSpace = "nowrap";
    focusObj[l].children[0].style.width = 1 + 'px';
    focusObj[l].children[0].style.width = focusObj[l].children[0].scrollWidth + 'px';
    focusObj[l].children[0].style.height = 1 + 'px';
    focusObj[l].children[0].style.height = focusObj[l].children[0].scrollHeight + 'px';
    
    focusObj[l].style.width = focusObj[l].children[0].scrollWidth + 'px';
    focusObj[l].style.height = focusObj[l].children[0].scrollHeight + 'px';

    //reposition to top after changing box
    var offTop = focusObj[l].children[0].offsetTop;

    focusObj[l].children[0].style.top = "0px";
    focusObj[l].children[0].style.position = "static";
    focusObj[l].style.top = layerT[l] + offTop + 'px';

    adjustBorder();

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            focusPanel[a].querySelector('.btnAutoWidth').click();

        }
    }

    //curr settings
    currResizeBox = "AutoWidth";
}

function adjustAutoHeight(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    var l = Number(leadPanel.dataset.layer);

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
    
    //enable back cnvGrpLayers css
    cnvGrpLayers.style.boxSizing = "border-box";
    cnvGrpLayers.style.overflow = "hidden";

    focusObj[l] = cnvLayers[l];

    focusObj[l].children[0].style.height = 1 + 'px';
    focusObj[l].children[0].style.height = focusObj[l].children[0].scrollHeight + 'px';
    focusObj[l].style.width = focusObj[l].children[0].clientWidth + 'px';
    focusObj[l].style.height = focusObj[l].children[0].scrollHeight + 'px';
    
    //reposition to top after changing box
    var offTop = focusObj[l].children[0].offsetTop;

    focusObj[l].children[0].style.top = "0px";
    focusObj[l].children[0].style.position = "static";
    focusObj[l].style.top = layerT[l] + offTop + 'px';

    adjustBorder();

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {
            
            focusPanel[a].querySelector('.btnAutoHeight').click();
        }
    }

    //curr settings
    currResizeBox = "AutoHeight";
}

function adjustFixedSize(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    var l = Number(leadPanel.dataset.layer);
    
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
    
    //enable back cnvGrpLayers css
    cnvGrpLayers.style.boxSizing = "border-box";
    cnvGrpLayers.style.overflow = "hidden";

    focusObj[l] = cnvLayers[l];

    focusObj[l].children[0].style.height = 1 + 'px';
    focusObj[l].children[0].style.height = focusObj[l].children[0].scrollHeight + 'px';
    
    focusObj[l].style.width = focusObj[l].children[0].clientWidth + 'px';
    focusObj[l].style.height = focusObj[l].children[0].clientHeight + 'px';

    focusObj[l].children[0].style.whiteSpace = "normal";

    adjustBorder();
    
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {
            
            focusPanel[a].querySelector('.btnFixedSize').click();
        }
    }

    //curr settings
    currResizeBox = "FixedSize";
}

function adjustAlignHori(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    var l = Number(leadPanel.dataset.layer);
    var hori = this.className.replace('btnAlign', '');

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
    
    focusObj[l] = cnvLayers[l];
    focusObj[l].children[0].style.textAlign = hori;

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            if(hori == "Left") {
                focusPanel[a].querySelector('.btnAlignLeft').click();
            }

            else if(hori == "Center") {
                focusPanel[a].querySelector('.btnAlignCenter').click();
            }

            else if(hori == "Right") {
                focusPanel[a].querySelector('.btnAlignRight').click();
                
            }
        }
    }

    currHoriAlignment = hori;
}

function adjustAlignVerti(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var z = rngZoom.value / 100;
    var leadPanel = this.closest('.pnlBoxLayer');
    var l = Number(leadPanel.dataset.layer);
    var verti = this.className.replace('btnAlign', '');

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
    
    focusObj[l] = cnvLayers[l];
    
    if(verti == "Top") {
        focusObj[l].children[0].style.position = "static";
        focusObj[l].children[0].style.marginTop = "0px";
        focusObj[l].children[0].style.marginBottom = "auto";
    }

    else if(verti == "Middle") {
        focusObj[l].children[0].style.marginTop = "auto";
        focusObj[l].children[0].style.marginBottom = "auto";

        //align if overflowing
        if(focusObj[l].children[0].clientHeight * z > focusObj[l].clientHeight * z) {
            var val = focusObj[l].children[0].clientHeight * z - focusObj[l].clientHeight * z;
            focusObj[l].children[0].style.position = "absolute";
            focusObj[l].children[0].style.top = 0 - val + 'px';
        }
    }

    else if(verti == "Bottom") {
        focusObj[l].children[0].style.marginTop = "auto";
        focusObj[l].children[0].style.marginBottom = "0px";

        //align if overflowing
        if(focusObj[l].children[0].clientHeight * z > focusObj[l].clientHeight * z) {
            var val = focusObj[l].children[0].clientHeight * z - focusObj[l].clientHeight * z;
            focusObj[l].children[0].style.position = "absolute";
            focusObj[l].children[0].style.top = 0 - val * 2 + 'px';
        }
        
    }

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {
            
            if(verti == "Top") {
                focusPanel[a].querySelector('.btnAlignTop').click();
            }

            else if(verti == "Middle") {
                focusPanel[a].querySelector('.btnAlignMiddle').click();
            }

            else if(verti == "Bottom") {
                focusPanel[a].querySelector('.btnAlignBottom').click();
                
            }
            
        }
    }

    currVertiAlignment = verti;
}

function adjustDecor(e) {
    var b = 0;
    var key = null;
    var imFocus = false;
    var decor = this.className.replace('btn', '');
    var leadPanel = this.closest('.pnlBoxLayer');
    var l = Number(leadPanel.dataset.layer);
    
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

    focusObj[l] = cnvLayers[l];

    if(decor == "NoDecor") {

        focusObj[l].children[0].style.textDecoration = "none";
    }

    else if(decor == "Underline") {

        focusObj[l].children[0].style.textDecoration = "underline";
    }

    else if(decor == "Strike") {

        focusObj[l].children[0].style.textDecoration = "line-through";
    }

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {
            
            if(decor == "NoDecor") {
                focusPanel[a].querySelector('.btnNoDecor').click();
            }

            else if(decor == "Underline") {
                focusPanel[a].querySelector('.btnUnderline').click();
            }

            else if(decor == "Strike") {
                focusPanel[a].querySelector('.btnStrike').click();
            }
            
        }
    }

    currTextDecor = decor;
}

//===============================TEXT OUTLINE===========================

function adjustTextOutlineColor() {

    var me = this.closest('.pnlBoxLayer');
    var e = Number(me.dataset.layer);
    var color = me.querySelector('.txtOutlineColor').value;
    var size = me.querySelector('.txtOutlineSize').value * 2;
    var opacity = me.querySelector('.txtOutlineOpacity').value / 100;

    txtHexValue.value = color;
    convertHexToRGB(this);

    cnvLayers[e].children[0].style.webkitTextStroke = `${size}px  rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;

}

function adjustTextOutline(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var me = this.closest('.pnlBoxLayer');
            var e = Number(focusPanel[a].dataset.layer);
            var color = me.querySelector('.txtOutlineColor').value;
            var size = me.querySelector('.txtOutlineSize').value * 2;
            var opacity = me.querySelector('.txtOutlineOpacity').value / 100;

            txtHexValue.value = color;
            convertHexToRGB(me.querySelector('.txtOutlineColor'));

            cnvLayers[e].children[0].style.webkitTextStroke = `${size}px  rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
        
            adjustBorder()
            
        }
    }

}

function showTextOutline(me) {

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var e = Number(focusPanel[a].dataset.layer);
            var size = Number(focusPanel[a].querySelector('.txtOutlineSize').value);
            var opacity = focusPanel[a].querySelector('.txtOutlineOpacity').value / 100;

            //remove other styles first
            cnvLayers[e].children[0].style.textShadow = "none";

            txtHexValue.value = focusPanel[a].querySelector('.txtOutlineColor').value;
            convertHexToRGB(me);

            cnvLayers[e].children[0].style.webkitTextStroke = `${size}px  rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
            
            adjustBorder()
            
        }
    }
}


//================================TEXT GLOW=============================

function adjustTextGlowColor() {

    var me = this.closest('.pnlBoxLayer');
    var e = Number(me.dataset.layer);
    var color = me.querySelector('.txtGlowColor').value;
    var spread = me.querySelector('.txtGlowSpread').value * .1;
    var opacity = me.querySelector('.txtGlowOpacity').value / 100;

    txtHexValue.value = color;
    convertHexToRGB(this);

    cnvLayers[e].children[0].style.textShadow = `0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`
}

function adjustTextGlow(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var me = this.closest('.pnlBoxLayer');
            var e = Number(focusPanel[a].dataset.layer);
            var color = me.querySelector('.txtGlowColor').value;
            var spread = me.querySelector('.txtGlowSpread').value * .12;
            var opacity = me.querySelector('.txtGlowOpacity').value / 100;


            txtHexValue.value = color;
            convertHexToRGB(me.querySelector('.txtGlowColor'));
            
            cnvLayers[e].children[0].style.textShadow = `0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                        0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                        0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
    
           adjustBorder()
            
        }
    }
}

function showTextGlow(me) {
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var e = Number(focusPanel[a].dataset.layer);

            var spread = focusPanel[a].querySelector('.txtGlowSpread').value * .12;
            var opacity = focusPanel[a].querySelector('.txtGlowOpacity').value / 100;

            //remove other styles first
            cnvLayers[e].children[0].style.webkitTextStroke = "0px";

            layerW[e] = cnvLayers[e].clientWidth;
            layerL[e] = cnvLayers[e].offsetLeft;

            txtHexValue.value = focusPanel[a].querySelector('.txtOutlineColor').value;
            convertHexToRGB(me);

            //expand as per glow spread
            cnvLayers[e].children[0].style.textShadow = `0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                        0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                        0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
            adjustBorder()
            
        }
    }
}

//================================TEXT SHADOW==========================
function adjustTextShadowColor() {

    var me = this.closest('.pnlBoxLayer');
    var e = Number(me.dataset.layer);
    var color = me.querySelector('.txtShadowColor').value;
    var size = me.querySelector('.txtShadowSize').value/2;
    var spread = me.querySelector('.txtShadowSpread').value / 5;
    var opacity = me.querySelector('.txtShadowOpacity').value / 100;
    var rotation = Number(me.querySelector('.txtShadowRotation').value) + 90;
    
    txtHexValue.value = color;
    convertHexToRGB(this);
            
    var coorX = size * Math.cos(rotation * (Math.PI/ 180));
    var coorY = size * Math.sin(rotation * (Math.PI / 180));
        
    cnvLayers[e].children[0].style.textShadow = `${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
}

function adjustTextShadow(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var me = this.closest('.pnlBoxLayer');
            var e = Number(focusPanel[a].dataset.layer);
            var color = me.querySelector('.txtShadowColor').value;
            var size = me.querySelector('.txtShadowSize').value/2;
            var spread = me.querySelector('.txtShadowSpread').value / 5;
            var opacity = me.querySelector('.txtShadowOpacity').value / 100;
            var rotation = Number(me.querySelector('.txtShadowRotation').value) + 90;
            
            txtHexValue.value = color;
            convertHexToRGB(me.querySelector('.txtShadowColor'));

            cnvLayers[e].style.border = "none";
                    
            var coorX = size * Math.cos(rotation * (Math.PI/ 180));
            var coorY = size * Math.sin(rotation * (Math.PI / 180));
             
            cnvLayers[e].children[0].style.textShadow = `${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                        ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                        ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;

        }
    }
}

function showTextShadow(me) {

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var e = Number(focusPanel[a].dataset.layer);
            var size = focusPanel[a].querySelector('.txtShadowSize').value/2;
            var spread = focusPanel[a].querySelector('.txtShadowSpread').value / 5;
            var opacity = focusPanel[a].querySelector('.txtShadowOpacity').value / 100;
            var rotation = Number(focusPanel[a].querySelector('.txtShadowRotation').value) + 90;
            
            //remove other styles first
            cnvLayers[e].children[0].style.webkitTextStroke = "0px";
            
            txtHexValue.value = focusPanel[a].querySelector('.txtOutlineColor').value;
            convertHexToRGB(me);

            cnvLayers[e].style.border = "none";
                    
            var coorX = size * Math.cos(rotation * (Math.PI/ 180));
            var coorY = size * Math.sin(rotation * (Math.PI / 180));
             
            cnvLayers[e].children[0].style.textShadow = `${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                        ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                        ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;

        }
    }

}

//===========================REMOVE ALL TEXT STYLE======================
function removeTextStyle() {
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {
            var e = Number(focusPanel[a].dataset.layer);

            cnvLayers[e].children[0].style.webkitTextStroke = "0px";
            cnvLayers[e].children[0].style.textShadow = "none";
        }
    }   
}
//======================================================================

function chooseTextStyle() {

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null && focusPanel[a].dataset.type == "text") {

            var b = focusPanel[a].querySelectorAll('.dropdown');
            b[2].children[0].innerText = this.innerText;
            
            if(this.innerText == "Outline") {
                focusPanel[a].querySelector('.tabOutlineLayer').style.display = "block";
                focusPanel[a].querySelector('.tabGlowLayer').style.display = "none";
                focusPanel[a].querySelector('.tabShadowLayer').style.display = "none";
                showTextOutline(focusPanel[a].querySelector('.txtOutlineColor'));
                
            }
            else if(this.innerText == "Glow") {
                focusPanel[a].querySelector('.tabGlowLayer').style.display = "block";
                focusPanel[a].querySelector('.tabOutlineLayer').style.display = "none";
                focusPanel[a].querySelector('.tabShadowLayer').style.display = "none";
                showTextGlow(focusPanel[a].querySelector('.txtGlowColor'));
            }
            else if(this.innerText == "Shadow") {

                focusPanel[a].querySelector('.tabShadowLayer').style.display = "block";
                focusPanel[a].querySelector('.tabOutlineLayer').style.display = "none";
                focusPanel[a].querySelector('.tabGlowLayer').style.display = "none";
                showTextShadow(focusPanel[a].querySelector('.txtShadowColor'));
            }
            else {

                focusPanel[a].querySelector('.tabShadowLayer').style.display = "none";
                focusPanel[a].querySelector('.tabOutlineLayer').style.display = "none";
                focusPanel[a].querySelector('.tabGlowLayer').style.display = "none";
                focusPanel[a].querySelector('.tabStyleLayer').querySelector('.dropdown').children[0].innerText = "Choose style";
                removeTextStyle();
            }
        } 
    }
}

//========================CREATE TEXT CANVAS FOR LAYERS=====================
function createCanvasTextLayer(e, font) {
    
    //var z = 100 / rngZoom.value;
    cnvLayers[e] = document.createElement('div');
    cnvLayers[e].style.visibility = "visible";
    cnvLayers[e].classList.add('cnvLayers');
    cnvLayers[e].dataset.rotation = 0;
    cnvLayers[e].dataset.layer = e;
    cnvLayers[e].dataset.font = font;
    cnvLayers[e].dataset.type = "text";
    cnvLayers[e].dataset.fontSize = 48;
    cnvLayers[e].style.minWidth = 14 + 'px';
    cnvLayers[e].style.minHeight = 14 + 'px';
    focusObj[e] = cnvLayers[e];

    //create textarea
    var textArea = document.createElement('textarea');
    textArea.innerText = font.toUpperCase();
    textArea.style.fontFamily = font;
    textArea.style.fontSize = 48 + 'px';

    textArea.setAttribute('spellcheck', "false");
    textArea.setAttribute('data-gramm', "false");
    textArea.setAttribute('data-gramm_editor', "false");
    textArea.setAttribute('data-enable-grammarly', 'false');
    textArea.classList.add('textArea');

    textArea.addEventListener('input', inputCanvasTextLayer);
    textArea.addEventListener('keydown', inputBlurTextLayer);

    //append textarea
    cnvLayers[e].prepend(textArea);

    //append cnvlayers[e] to cnvGrpLayers
    cnvGrpLayers.appendChild(cnvLayers[e]);

    textArea.style.width  = 1 + 'px';
    textArea.style.width = textArea.scrollWidth + 'px';
    textArea.style.height = 1 + 'px';
    textArea.style.height = textArea.scrollHeight + 'px';
    
    cnvLayers[e].style.width = textArea.clientWidth + 'px';
    cnvLayers[e].style.height = textArea.clientHeight + 'px';
    cnvLayers[e].style.paddingLeft = "4px";
    cnvLayers[e].style.paddingRight = "4px";
    
    //position cnvlayer to center
    cnvLayers[e].style.left = `${(txtSizeWidth.value / 2) - (cnvLayers[e].clientWidth/2)}px`;
    cnvLayers[e].style.top = `${(txtSizeHeight.value / 2) - (cnvLayers[e].clientHeight/2)}px`;

    layerL[e] = cnvLayers[e].offsetLeft;
    layerT[e] = cnvLayers[e].offsetTop;
    layerW[e] = cnvLayers[e].clientWidth;
    layerH[e] = cnvLayers[e].clientHeight;

    //add border
    addBorderLayer(cnvLayers[e], e)

    //reformat using the current settings
    checkCurrTextSettings(e);

}

//actual function to create pnlBoxProperties
function addPnlBoxTextControls(e, font) {  //adding controls only for 'IMAGE' panel boxes
    
    for(var a = 0; a < pnlBoxLayer.length; a++) {

        if(Number(pnlBoxLayer[a].dataset.layer) == e) {
            
            //add the expand and collapse control
            btnExpandCollapseLayer[a].addEventListener('click', expandCollapseControls);

            //add the show and hide control
            btnShowHideLayer[a].addEventListener('click', showHideLayers);

            txtHeaderLayer[a].addEventListener('dblclick', renameTxtHeader);
            txtHeaderLayer[a].addEventListener('change', saveTxtHeader);
            txtHeaderLayer[a].addEventListener('click', blurTxtHeader);
            txtHeaderLayer[a].addEventListener('focusout', saveTxtHeader);

            //btnBasicLayer event listeners
            btnBasicLayer[a].addEventListener('click', btnBottomClick); //default the btnBasic to white
            btnBasicLayer[a].addEventListener('mouseover', btnBottomHover);
            btnBasicLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnBasicLayer[a].addEventListener('click', showBasicLayer);
            btnBasicLayer[a].children[0].style.filter = "saturate(0) brightness(2)";
            btnBasicLayer[a].children[0].style.transition = ".2s";

            //btnColorLayer event listeners
            btnTextLayer[a].addEventListener('click', btnBottomClick); //default the btnColor to white
            btnTextLayer[a].addEventListener('mouseover', btnBottomHover);
            btnTextLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnTextLayer[a].addEventListener('click', showTextLayer);
            btnTextLayer[a].children[0].style.transition = ".2s";

            //btnColorLayer event listeners
            btnStyleLayer[a].addEventListener('click', btnBottomClick); //default the btnStyle to white
            btnStyleLayer[a].addEventListener('mouseover', btnBottomHover);
            btnStyleLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnStyleLayer[a].addEventListener('click', showStyleLayer);
            btnStyleLayer[a].children[0].style.transition = ".2s";

            //assign dropOptionVerti selection for blend mode
            for(var b = 0; b < optLayerBlend.length; b++) {
                optLayerBlend[b].addEventListener('click', chooseLayerBlend);
            }

            //width and size
            txtWidthLayer[a].addEventListener('change', adjustLayerWidth);
            txtHeightLayer[a].addEventListener('change', adjustLayerHeight);

            //x and y axis
            txtXLayer[a].addEventListener('change', adjustLayerX);
            txtYLayer[a].addEventListener('change', adjustLayerY);

            chkFlipX[a].addEventListener('click', chkBoxClick);
            chkFlipX[a].addEventListener('click', adjustFlipX);
            chkFlipX[a].addEventListener('mouseover', chkBoxHover);
            chkFlipX[a].addEventListener('mouseleave', chkBoxLeave)
            
            chkFlipY[a].addEventListener('click', chkBoxClick);
            chkFlipY[a].addEventListener('click', adjustFlipY);
            chkFlipY[a].addEventListener('mouseover', chkBoxHover);
            chkFlipY[a].addEventListener('mouseleave', chkBoxLeave);

            txtOpacityLayer[a].addEventListener('change', chooseLayerOpacity);
            txtOpacityLayer[a].previousElementSibling.addEventListener('input', chooseLayerOpacity);

            txtRotationLayer[a].addEventListener('change', chooseLayerRotation);
            txtRotationLayer[a].previousElementSibling.addEventListener('input', chooseLayerRotation);

            //add font weight
            addFontWeights(pnlBoxLayer[a]);

            for(var b = 0; b < optTextWeight.length; b++) {
                optTextWeight[b].addEventListener('click', chooseTextWeight);
            }

            //assign dropOptionVerti selection for blend mode
            for(var b = 0; b < optLayerStyle.length; b++) {
                optLayerStyle[b].addEventListener('click', chooseTextStyle);
                if(b == 3) {
                    optLayerStyle[b].style.color = "salmon";
                    optLayerStyle[b].addEventListener('mouseover', hoverLayerStyle)
                    optLayerStyle[b].addEventListener('mouseout', outLayerStyle)
                }
            }

            txtResizeText[a].addEventListener('change', adjustTextSize);

            txtTextColor[a].addEventListener('change',  adjustTextColor);
            thumbPickerTextColor[a].addEventListener('click', letsSummonColorPicker);

            txtLetterSpacing[a].addEventListener('change', adjustLetterSpacing);

            txtLineHeight[a].addEventListener('keydown', rollLineHeight);
            txtLineHeight[a].addEventListener('change', adjustLineHeight);
        
            btnTitleCase[a].addEventListener('click', btnTextClick);
            btnTitleCase[a].addEventListener('mouseover', btnTextHover);
            btnTitleCase[a].addEventListener('mouseleave', btnTextLeave);
            btnTitleCase[a].addEventListener('click', adjustTitleCase);

            btnUpperCase[a].addEventListener('click', btnTextClick);
            btnUpperCase[a].addEventListener('mouseover', btnTextHover);
            btnUpperCase[a].addEventListener('mouseleave', btnTextLeave);
            btnUpperCase[a].addEventListener('click', adjustUpperCase);
            btnUpperCase[a].children[0].style.color = "white";

            btnLowerCase[a].addEventListener('click', btnTextClick);
            btnLowerCase[a].addEventListener('mouseover', btnTextHover);
            btnLowerCase[a].addEventListener('mouseleave', btnTextLeave);
            btnLowerCase[a].addEventListener('click', adjustLowerCase);

            btnAutoWidth[a].addEventListener('click', btnOptionClick);
            btnAutoWidth[a].addEventListener('mouseover', btnOptionHover);
            btnAutoWidth[a].addEventListener('mouseleave', btnOptionLeave);
            btnAutoWidth[a].addEventListener('click', adjustAutoWidth);
            btnAutoWidth[a].children[0].style.filter = "saturate(0) brightness(2)";

            btnAutoHeight[a].addEventListener('click', btnOptionClick);
            btnAutoHeight[a].addEventListener('mouseover', btnOptionHover);
            btnAutoHeight[a].addEventListener('mouseleave', btnOptionLeave);
            btnAutoHeight[a].addEventListener('click', adjustAutoHeight);

            btnFixedSize[a].addEventListener('click', btnOptionClick);
            btnFixedSize[a].addEventListener('mouseover', btnOptionHover);
            btnFixedSize[a].addEventListener('mouseleave', btnOptionLeave);
            btnFixedSize[a].addEventListener('click', adjustFixedSize);

            btnAlignLeft[a].addEventListener('click', btnOptionClick);
            btnAlignLeft[a].addEventListener('mouseover', btnOptionHover);
            btnAlignLeft[a].addEventListener('mouseleave', btnOptionLeave);
            btnAlignLeft[a].children[0].style.filter = "saturate(0) brightness(2)";
            btnAlignLeft[a].addEventListener('click', adjustAlignHori);

            btnAlignCenter[a].addEventListener('click', btnOptionClick);
            btnAlignCenter[a].addEventListener('mouseover', btnOptionHover);
            btnAlignCenter[a].addEventListener('mouseleave', btnOptionLeave);
            btnAlignCenter[a].addEventListener('click', adjustAlignHori);

            btnAlignRight[a].addEventListener('click', btnOptionClick);
            btnAlignRight[a].addEventListener('mouseover', btnOptionHover);
            btnAlignRight[a].addEventListener('mouseleave', btnOptionLeave);
            btnAlignRight[a].addEventListener('click', adjustAlignHori);

            btnAlignTop[a].addEventListener('click', btnOptionClick);
            btnAlignTop[a].addEventListener('mouseover', btnOptionHover);
            btnAlignTop[a].addEventListener('mouseleave', btnOptionLeave);
            btnAlignTop[a].children[0].style.filter = "saturate(0) brightness(2)";
            btnAlignTop[a].addEventListener('click', adjustAlignVerti);

            btnAlignMiddle[a].addEventListener('click', btnOptionClick);
            btnAlignMiddle[a].addEventListener('mouseover', btnOptionHover);
            btnAlignMiddle[a].addEventListener('mouseleave', btnOptionLeave);
            btnAlignMiddle[a].addEventListener('click', adjustAlignVerti);

            btnAlignBottom[a].addEventListener('click', btnOptionClick);
            btnAlignBottom[a].addEventListener('mouseover', btnOptionHover);
            btnAlignBottom[a].addEventListener('mouseleave', btnOptionLeave);
            btnAlignBottom[a].addEventListener('click', adjustAlignVerti);

            btnNoDecor[a].addEventListener('click', btnOptionClick);
            btnNoDecor[a].addEventListener('mouseover', btnOptionHover);
            btnNoDecor[a].addEventListener('mouseleave', btnOptionLeave);
            btnNoDecor[a].children[0].style.filter = "saturate(0) brightness(2)";
            btnNoDecor[a].addEventListener('click', adjustDecor);

            btnUnderline[a].addEventListener('click', btnOptionClick);
            btnUnderline[a].addEventListener('mouseover', btnOptionHover);
            btnUnderline[a].addEventListener('mouseleave', btnOptionLeave);
            btnUnderline[a].addEventListener('click', adjustDecor);

            btnStrike[a].addEventListener('click', btnOptionClick);
            btnStrike[a].addEventListener('mouseover', btnOptionHover);
            btnStrike[a].addEventListener('mouseleave', btnOptionLeave);
            btnStrike[a].addEventListener('click', adjustDecor);
            
            //styling outline
            //outline
            txtOutlineColor[a].addEventListener('focus', selectAll);
            txtOutlineColor[a].addEventListener('change', adjustTextOutlineColor);
            txtOutlineColor[a].previousElementSibling.addEventListener('input', adjustTextOutlineColor)
            thumbPickerOutline[a].addEventListener('click', letsSummonColorPicker);

            txtOutlineOpacity[a].addEventListener('change', adjustTextOutline);
            txtOutlineOpacity[a].previousElementSibling.addEventListener('input', adjustTextOutline);

            txtOutlineSize[a].addEventListener('change', adjustTextOutline);
            txtOutlineSize[a].previousElementSibling.addEventListener('input', adjustTextOutline);
            
            //styling glow
            txtGlowColor[a].addEventListener('focus', selectAll);
            txtGlowColor[a].addEventListener('change', adjustTextGlowColor);
            txtGlowColor[a].previousElementSibling.addEventListener('input', adjustTextGlowColor)
            thumbPickerGlow[a].addEventListener('click', letsSummonColorPicker);

            txtGlowOpacity[a].addEventListener('change', adjustTextGlow);
            txtGlowOpacity[a].previousElementSibling.addEventListener('input', adjustTextGlow);

            txtGlowSpread[a].addEventListener('change', adjustTextGlow);
            txtGlowSpread[a].previousElementSibling.addEventListener('input', adjustTextGlow);
            
            txtShadowColor[a].addEventListener('focus', selectAll);
            txtShadowColor[a].addEventListener('change', adjustTextShadowColor);
            txtShadowColor[a].previousElementSibling.addEventListener('input', adjustTextShadowColor)
            thumbPickerShadow[a].addEventListener('click', letsSummonColorPicker);

            txtShadowOpacity[a].addEventListener('change', adjustTextShadow);
            txtShadowOpacity[a].previousElementSibling.addEventListener('input', adjustTextShadow);

            txtShadowSize[a].addEventListener('change', adjustTextShadow);
            txtShadowSize[a].previousElementSibling.addEventListener('input', adjustTextShadow);

            txtShadowSpread[a].addEventListener('change', adjustTextShadow);
            txtShadowSpread[a].previousElementSibling.addEventListener('input', adjustTextShadow);

            txtShadowRotation[a].addEventListener('change', adjustTextShadow);
            txtShadowRotation[a].previousElementSibling.addEventListener('input', adjustTextShadow);
            
            //add function to all sliders to change textbox
            linkRangeToTextbox();
            
            //add function to all textbox to change slider
            linkTextboxToRange();
        }
    }

    //after all assigned controls then create the actual pattern layer
    createCanvasTextLayer(Number(pnlBoxLayer[0].dataset.layer), font)
}











































//=============================CREATE CANVAS FOR LAYERS=====================

var svgOldW = [];
var svgOldH = [];

var txtVectorStrokeColor = document.getElementsByClassName('txtVectorStrokeColor');
var txtVectorStrokeOpacity = document.getElementsByClassName('txtVectorStrokeOpacity');
var txtVectorStrokeWidth = document.getElementsByClassName('txtVectorStrokeWidth');
var txtVectorCornerRadius = document.getElementsByClassName('txtVectorCornerRadius');
var txtVectorStrokeDash = document.getElementsByClassName('txtVectorStrokeDash');
var txtVectorStrokeGap = document.getElementsByClassName('txtVectorStrokeGap');
var chkVectorStrokeCap = document.getElementsByClassName('chkVectorStrokeCap');
var chkVectorStrokeShow = document.getElementsByClassName('chkVectorStrokeShow');

var txtVectorFillColor = document.getElementsByClassName('txtVectorFillColor');
var txtVectorFillOpacity = document.getElementsByClassName('txtVectorFillOpacity');
var chkVectorFillShow = document.getElementsByClassName('chkVectorFillShow');

var txtSubLayer = document.getElementsByClassName('txtSubLayer');

var contNoPath = document.getElementsByClassName('contNoPath');
var contPath = document.getElementsByClassName('contPath');
var tabVectorPreview = document.getElementsByClassName('tabVectorPreview')
var optVectorColor = document.getElementsByClassName('optVectorColor');

var optLineHead = document.getElementsByClassName('optLineHead');

function chooseLayerBlendVector(){
    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {

            //change dropoptionverti text
            
            focusPanel[a].querySelector('.dropdown').children[0].innerText = this.innerText;
            
            var e = Number(focusPanel[a].dataset.layer);
            cnvLayers[e].children[0].children[0].setAttribute('style', `mix-blend-mode:${this.innerText}`);
        } 
    }
}

function adjustVectorStrokeColor() {

    var i = Number(this.closest('.pnlBoxLayer').querySelector('.txtSubLayer').value) - 1;
    var e = Number(this.closest('.pnlBoxLayer').dataset.layer);

    testHexCode(this);
    cnvLayers[e].querySelector('g').children[i].setAttribute('stroke', '#' + this.value);
    this.closest('.pnlBoxLayer').querySelector('g').children[i].setAttribute('stroke', '#' + this.value);

}

function adjustVectorStrokeOpacity(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {

            //check first, if panel is not from vectorNative
            if(focusPanel[a].dataset.type == "vector") {
                //get the tab index
                var i = Number(focusPanel[a].querySelector('.txtSubLayer').value) - 1;
                var e = Number(focusPanel[a].dataset.layer);

                cnvLayers[e].querySelector('g').children[i].setAttribute('stroke-opacity', this.value/100);
                focusPanel[a].querySelector('g').children[i].setAttribute('stroke-opacity', this.value/100);
                focusPanel[a].querySelector('.txtVectorStrokeOpacity').value = this.value;
                focusPanel[a].querySelector('.txtVectorStrokeOpacity').previousElementSibling.value = this.value;

            }

            else {
                //get the tab index
                var e = Number(focusPanel[a].dataset.layer);
                cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-opacity', this.value/100);
                focusPanel[a].querySelector('.txtVectorStrokeOpacity').value = this.value;
                focusPanel[a].querySelector('.txtVectorStrokeOpacity').previousElementSibling.value = this.value;
                
            }
        }
    }
    
}

function adjustVectorStrokeWidth(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    var z = rngZoom.value /100;

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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {
         
            var e = Number(focusPanel[a].dataset.layer);

            renderSVG(e)
        }
    }

}

function adjustVectorCornerRadius(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    var z = rngZoom.value /100;

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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {
         
            var e = Number(focusPanel[a].dataset.layer);

            curveSVG(e);
        }
    }

}

function adjustVectorStrokeDash(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {
            var e = Number(focusPanel[a].dataset.layer);
        
            cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-dasharray', `${leadPanel.querySelector('.txtVectorStrokeDash').value} ${leadPanel.querySelector('.txtVectorStrokeGap').value}`);
            
            if(this.className == "txtVectorStrokeDash") {
                focusPanel[a].querySelector('.txtVectorStrokeDash').value = this.value;
            }
            else if(this.className == "txtVectorStrokeGap") {
                focusPanel[a].querySelector('.txtVectorStrokeGap').value = this.value;
            }
            
            adjustBorder();
        }
    }
}

function adjustVectorStrokeCap(e) {

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

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null ) {

            var e = Number(focusPanel[a].dataset.layer);

            if(leadFlip.dataset.value == "true") {

                cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-linecap', "round");
            }
        
            else if(leadFlip.dataset.value == "false") { 

                cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-linecap', "butt");
            }
        }
    }

}

function adjustVectorStrokeShow(e) {

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

    if(leadFlip.dataset.value == "true") {

        cnvLayers[l].querySelectorAll('g')[1].children[0].setAttribute('stroke-opacity', "100");
    }

    else if(this.dataset.value == "false") { 

        cnvLayers[l].querySelectorAll('g')[1].children[0].setAttribute('stroke-opacity', "0");

        leadFlip.removeEventListener('mouseover', chkBoxHover);
    }

    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null ) {

            var e = Number(focusPanel[a].dataset.layer);

            if(leadFlip.dataset.value == "true") {

                cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-opacity', "100");
            }
        
            else if(leadFlip.dataset.value == "false") { 

                cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-opacity', "0");
            }
        }
    }

    adjustBorder();
}

function adjustVectorFillColor() {
    var i = Number(this.closest('.pnlBoxLayer').querySelector('.txtSubLayer').value) - 1;
    var e = Number(this.closest('.pnlBoxLayer').dataset.layer);

    testHexCode(this);
    cnvLayers[e].querySelector('g').children[i].setAttribute('fill', '#' + this.value);
    this.closest('.pnlBoxLayer').querySelector('g').children[i].setAttribute('fill', '#' + this.value);
}

function adjustVectorFillOpacity(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {

            //check first, if panel is not from vectorNative
            if(focusPanel[a].dataset.type == "vector") {
                //get the tab index
                var i = Number(focusPanel[a].querySelector('.txtSubLayer').value) - 1;
                var e = Number(focusPanel[a].dataset.layer);

                cnvLayers[e].querySelector('g').children[i].setAttribute('fill-opacity', this.value/100);
                focusPanel[a].querySelector('g').children[i].setAttribute('fill-opacity', this.value/100);
                focusPanel[a].querySelector('.txtVectorFillOpacity').value = this.value;
                focusPanel[a].querySelector('.txtVectorFillOpacity').previousElementSibling.value = this.value;
            }

            else {
                //get the tab index
                var e = Number(focusPanel[a].dataset.layer);
                cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill-opacity', this.value/100);
                focusPanel[a].querySelector('.txtVectorFillOpacity').value = this.value;
                focusPanel[a].querySelector('.txtVectorFillOpacity').previousElementSibling.value = this.value;
            }   
        }
    }
}

function adjustVectorFillShow() {

    var e = Number(this.closest('.pnlBoxLayer').dataset.layer);

    if(this.dataset.value == "false") {
        cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill-opacity', "0");
    }
    else {
        cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill-opacity', "100");
    }

    adjustBorder();
}

function adjustVectorNativeStrokeColor() {

    var e = Number(this.closest('.pnlBoxLayer').dataset.layer);

    //change stroke color for lead
    testHexCode(this);
    cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke', '#' + this.value);    

}

function adjustVectorNativeFillColor() {

    var e = Number(this.closest('.pnlBoxLayer').dataset.layer);

    //change stroke color for lead
    testHexCode(this);
    cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill', '#' + this.value);
    
}

function chooseVectorTab() {

    var contPath = this.closest('.contPath');

    for(var a = 1; a < contPath.childElementCount; a++) {
        contPath.children[a].style.display = "none";
    }

    this.parentElement.previousElementSibling.children[0].innerText = this.innerText;
    contPath.querySelector(`.tabVector${this.innerText}`).style.display = "block";
}

function previewVector() {

    //NOTE: this i is index of the 'option' not index of the tabStyle
    var i = Number(this.value) - 1;
    var e = Number(this.closest('.pnlBoxLayer').dataset.layer);
    var panel = this.closest('.pnlBoxLayer');

    //preview in panel
    var tabVectorPreview = this.closest('.tabSubLayer').querySelector('.tabVectorPreview');

    //grayscale all svg children
    if(i + 1 > 0) {
        for(var a = 0; a < tabVectorPreview.querySelector('g').childElementCount; a++) {
            tabVectorPreview.querySelector('g').children[a].setAttribute("style", "filter: opacity(0%)");
        }
        //now recolor this
        tabVectorPreview.querySelector('g').children[i].setAttribute("style", "filter: opacity(100%)");

        //APPEND SELECTIONS WHEN THERE'S A PATH SELECTED
        panel.querySelector('.contNoPath').style.display = "none";
        panel.querySelector('.contPath').style.display = "block";

    }

    else {

        for(var a = 0; a < tabVectorPreview.querySelector('g').childElementCount; a++) {
            tabVectorPreview.querySelector('g').children[a].setAttribute("style", "filter: opacity(100%)");
        }

        //grayscale all svg children
        for(var a = 0; a < cnvLayers[e].querySelector('g').childElementCount; a++) {
            cnvLayers[e].querySelector('g').children[a].setAttribute("style", "filter: none");
        }

        //EMPTY OUT THE TAB SINCE NO PATH IS SELECTED
        panel.querySelector('.contNoPath').style.display = "block";
        panel.querySelector('.contPath').style.display = "none";
    }
    
}

function getAllPathProperties() {

    var panel = this.closest('.pnlBoxLayer');
    var e = Number(panel.dataset.layer);
    var path = panel.querySelector('g');
    var b = Number(this.value)-1;

    panel.querySelectorAll('.dropOptionVerti')[1].innerHTML = "";

    if(b >= 0) {

        //check if path has stroke properties---------------------------------
        if(path.children[b].getAttribute('stroke') != null && path.children[b].getAttribute('fill') == null) {

            panel.querySelector('.txtVectorStrokeColor').value = path.children[b].getAttribute('stroke').replace('#', '');
            panel.querySelector('.txtVectorStrokeColor').nextElementSibling.style.backgroundColor = path.children[b].getAttribute('stroke');
            panel.querySelector('.txtVectorStrokeWidth').value = Number(path.children[b].getAttribute('stroke-width'));
            
            //simulate click on stroke
            panel.querySelectorAll('.dropOptionVerti')[1].innerHTML = 
            `<div class="optVectorColor">Stroke</div>`;
                                    
            //stroke opacity
            if(path.children[b].getAttribute('stroke-opacity') != null) {
                panel.querySelector('.txtVectorStrokeOpacity').value = Number(path.children[b].getAttribute('stroke-opacity')) * 100;
                panel.querySelector('.txtVectorStrokeOpacity').previousElementSibling.value = Number(path.children[b].getAttribute('stroke-opacity')) * 100;
            }
            else {
                path.children[b].setAttribute('stroke-opacity', "100");
                panel.querySelector('.txtVectorStrokeOpacity').value = 100;
                panel.querySelector('.txtVectorStrokeOpacity').previousElementSibling.value = 100;
            }

            panel.querySelectorAll('.optVectorColor')[0].addEventListener('click', chooseVectorTab);
            panel.querySelectorAll('.optVectorColor')[0].click();
        }

        else if(path.children[b].getAttribute('stroke') == null && path.children[b].getAttribute('fill') != null) {
            

            panel.querySelector('.txtVectorFillColor').value = path.children[b].getAttribute('fill').replace('#', '');
            panel.querySelector('.txtVectorFillColor').nextElementSibling.style.backgroundColor = path.children[b].getAttribute('fill');
            
            //simulate click on stroke
            panel.querySelectorAll('.dropOptionVerti')[1].innerHTML = 
            `<div class="optVectorColor">Fill</div>`;
                                    
            //fill opacity
            if(path.children[b].getAttribute('fill-opacity') != null) {
                panel.querySelector('.txtVectorFillOpacity').value = Number(path.children[b].getAttribute('fill-opacity')) * 100;
                panel.querySelector('.txtVectorFillOpacity').previousElementSibling.value = Number(path.children[b].getAttribute('fill-opacity')) * 100;
            }
            else {
                path.children[b].setAttribute('fill-opacity', 100);
                panel.querySelector('.txtVectorFillOpacity').value = 100;
                panel.querySelector('.txtVectorFillOpacity').previousElementSibling.value = 100;
            }

            panel.querySelectorAll('.optVectorColor')[0].addEventListener('click', chooseVectorTab)
            panel.querySelectorAll('.optVectorColor')[0].click();
        }

        else {

            panel.querySelector('.txtVectorStrokeColor').value = path.children[b].getAttribute('stroke').replace('#', '');
            panel.querySelector('.txtVectorStrokeColor').nextElementSibling.style.backgroundColor = path.children[b].getAttribute('stroke');
            
            panel.querySelector('.txtVectorFillColor').value = path.children[b].getAttribute('fill').replace('#', '');
            panel.querySelector('.txtVectorFillColor').nextElementSibling.style.backgroundColor = path.children[b].getAttribute('fill');
                    
            //simulate click on stroke
            panel.querySelectorAll('.dropOptionVerti')[1].innerHTML = 
            `<div class="optVectorColor">Stroke</div>
            <div class="optVectorColor">Fill</div>`;

            //stroke opacity
            if(path.children[b].getAttribute('stroke-opacity') != null) {
                panel.querySelector('.txtVectorStrokeOpacity').value = Number(path.children[b].getAttribute('stroke-opacity')) * 100;
                panel.querySelector('.txtVectorStrokeOpacity').previousElementSibling.value = Number(path.children[b].getAttribute('stroke-opacity')) * 100;
            }
            else {
                path.children[b].setAttribute('stroke-opacity', "100");
                panel.querySelector('.txtVectorStrokeOpacity').value = 100;
                panel.querySelector('.txtVectorStrokeOpacity').previousElementSibling.value = 100;
            }

            //fill opacity
            if(path.children[b].getAttribute('fill-opacity') != null) {
                panel.querySelector('.txtVectorFillOpacity').value = Number(path.children[b].getAttribute('fill-opacity')) * 100;
                panel.querySelector('.txtVectorFillOpacity').previousElementSibling.value = Number(path.children[b].getAttribute('fill-opacity')) * 100;
            }
            else {
                path.children[b].setAttribute('fill-opacity', 100);
                panel.querySelector('.txtVectorFillOpacity').value = 100;
                panel.querySelector('.txtVectorFillOpacity').previousElementSibling.value = 100;
            }

            panel.querySelectorAll('.optVectorColor')[0].addEventListener('click', chooseVectorTab)
            panel.querySelectorAll('.optVectorColor')[1].addEventListener('click', chooseVectorTab)
            panel.querySelectorAll('.optVectorColor')[0].click();
        }
    }

}

function createCanvasVectorLayerUpload(e, n) {     

    cnvLayers[e] = document.createElement('div');
    cnvLayers[e].style.visibility = "visible";
    cnvLayers[e].classList.add('cnvLayers');
    cnvLayers[e].dataset.rotation = 0;
    cnvLayers[e].dataset.layer = e;
    cnvLayers[e].dataset.thumbno = n;
    cnvLayers[e].dataset.type = "vector";
    focusObj[e] = cnvLayers[e];

    //add first image  so we can adjust the left and right of the cnvlayer
    //use [e] to get pnlBoxLayer dataset of thumbNo 
    //index it back to pnlBoxThumb and get children[0] which is img and get src
    var getSVG = configScroll[2].querySelector(`[data-thumbno = "${n}"]`).children[0];
    //getSVG.style.filter = "none";

    cnvLayers[e].innerHTML = getSVG.outerHTML;

    cnvLayers[e].children[0].style.filter = "none";

    //then append cnvlayer to cnvmain
    cnvGrpLayers.appendChild(cnvLayers[e]);
    
    //get which is smaller if canvas width or canvas height
    var aspectRatio;
    var vectorW = Number(cnvLayers[e].querySelector('svg').getAttribute('width'));
    var vectorH = Number(cnvLayers[e].querySelector('svg').getAttribute('height'));

    if(Number(txtSizeWidth.value) > Number(txtSizeHeight.value)) {
        aspectRatio = vectorW / vectorH;

        if(vectorH >= Math.round(txtSizeHeight.value * 0.5)) {
            cnvLayers[e].style.height = `${Math.round(txtSizeHeight.value * 0.5)}px`;
            cnvLayers[e].style.width =  `${Math.round(cnvLayers[e].clientHeight * aspectRatio)}px`;
        }
        else {
            cnvLayers[e].style.height = `${vectorH}px`;
            cnvLayers[e].style.width =  `${vectorH * aspectRatio}px`;
        }
        
    }
    else if(Number(txtSizeWidth.value) < Number(txtSizeHeight.value)) {
        aspectRatio = vectorH / vectorW;

        if(vectorW >= Math.round(txtSizeWidth.value * 0.5)) {
            cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.5)}px`;
            cnvLayers[e].style.height = `${Math.round(cnvLayers[e].clientWidth * aspectRatio)}px`;
        }
        else {
            cnvLayers[e].style.width = `${vectorW}px`;
            cnvLayers[e].style.height = `${vectorW * aspectRatio}px`;
        }
        
    }
    else if(Number(txtSizeWidth.value) == Number(txtSizeHeight.value)) {
        
        aspectRatio = vectorH / vectorW;

        if(vectorW >= Math.round(txtSizeWidth.value * 0.5)) {
            cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.5)}px`;
            cnvLayers[e].style.height = `${Math.round(cnvLayers[e].clientWidth * aspectRatio)}px`;
        }
        else {
            cnvLayers[e].style.width = `${vectorW}px`;
            cnvLayers[e].style.height = `${vectorW * aspectRatio}px`;
        }
    }

    //set min width and height
    aspectRatio = vectorW / vectorH;
    cnvLayers[e].style.minWidth = 20 + 'px';
    cnvLayers[e].style.minHeight = 20 / aspectRatio + 'px';

    //position cnvlayer to center
    cnvLayers[e].style.left = `${(txtSizeWidth.value / 2) - (cnvLayers[e].clientWidth/2)}px`;
    cnvLayers[e].style.top = `${(txtSizeHeight.value / 2) - (cnvLayers[e].clientHeight/2)}px`;

    //resizeVectorParts(e)

    //make width and height as auto
    layerL[e] = cnvLayers[e].offsetLeft;
    layerT[e] = cnvLayers[e].offsetTop;
    layerW[e] = cnvLayers[e].clientWidth;
    layerH[e] = cnvLayers[e].clientHeight;

    //add border
    addBorderLayer(cnvLayers[e], e)

}

//===============================VECTOR LAYER==============================
//actual function to create pnlBoxProperties
function addPnlBoxVectorControlsUpload(e) {  //adding controls only for 'IMAGE' panel boxes
    
    for(var a = 0; a < pnlBoxLayer.length; a++) {

        if(Number(pnlBoxLayer[a].dataset.layer) == e) {
            
            //add the expand and collapse control
            btnExpandCollapseLayer[a].addEventListener('click', expandCollapseControls);

            //add the show and hide control
            btnShowHideLayer[a].addEventListener('click', showHideLayers);

            txtHeaderLayer[a].addEventListener('dblclick', renameTxtHeader);
            txtHeaderLayer[a].addEventListener('change', saveTxtHeader);
            txtHeaderLayer[a].addEventListener('click', blurTxtHeader);
            txtHeaderLayer[a].addEventListener('focusout', saveTxtHeader);

            //btnBasicLayer event listeners
            btnBasicLayer[a].addEventListener('click', btnBottomClick); //default the btnBasic to white
            btnBasicLayer[a].addEventListener('mouseover', btnBottomHover);
            btnBasicLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnBasicLayer[a].addEventListener('click', showBasicLayer);
            btnBasicLayer[a].children[0].style.filter = "saturate(0) brightness(2)";
            btnBasicLayer[a].children[0].style.transition = ".2s";

            //btnSubLayer event listeners
            btnSubLayer[a].addEventListener('click', btnBottomClick); //default the btnStyle to white
            btnSubLayer[a].addEventListener('mouseover', btnBottomHover);
            btnSubLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnSubLayer[a].addEventListener('click', showSubLayer);
            btnSubLayer[a].children[0].style.transition = ".2s";

            //btnColorLayer event listeners
            btnColorLayer[a].addEventListener('click', btnBottomClick); //default the btnStyle to white
            btnColorLayer[a].addEventListener('mouseover', btnBottomHover);
            btnColorLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnColorLayer[a].addEventListener('click', showColorVector);
            btnColorLayer[a].children[0].style.transition = ".2s";

            //assign dropOptionVerti selection for blend mode
            for(var b = 0; b < optLayerBlend.length; b++) {
                optLayerBlend[b].addEventListener('click', chooseLayerBlendVector);
            }

            //width and size
            txtWidthLayer[a].addEventListener('change', adjustLayerWidth);
            txtHeightLayer[a].addEventListener('change', adjustLayerHeight);

            //x and y axis
            txtXLayer[a].addEventListener('change', adjustLayerX);
            txtYLayer[a].addEventListener('change', adjustLayerY);

            chkFlipX[a].addEventListener('click', chkBoxClick);
            chkFlipX[a].addEventListener('click', adjustFlipX);
            chkFlipX[a].addEventListener('mouseover', chkBoxHover);
            chkFlipX[a].addEventListener('mouseleave', chkBoxLeave);
            
            chkFlipY[a].addEventListener('click', chkBoxClick);
            chkFlipY[a].addEventListener('click', adjustFlipY);
            chkFlipY[a].addEventListener('mouseover', chkBoxHover);
            chkFlipY[a].addEventListener('mouseleave', chkBoxLeave);

            txtOpacityLayer[a].addEventListener('change', chooseLayerOpacity);
            txtOpacityLayer[a].previousElementSibling.addEventListener('input', chooseLayerOpacity);

            txtRotationLayer[a].addEventListener('change', chooseLayerRotation);
            txtRotationLayer[a].previousElementSibling.addEventListener('input', chooseLayerRotation);

            txtSubLayer[a].addEventListener('input', previewVector); 
            txtSubLayer[a].addEventListener('input', getAllPathProperties);
            txtSubLayer[a].previousElementSibling.addEventListener('input', previewVector);
            txtSubLayer[a].previousElementSibling.addEventListener('input', getAllPathProperties);

            //get MAX NUMBER OF PATHS
            var getMax = tabVectorPreview[a].querySelector('g').childElementCount;
            txtSubLayer[a].max = getMax;
            txtSubLayer[a].previousElementSibling.max = getMax;

            for(var b = 0; b < optVectorColor.length; b++) {
                optVectorColor[b].addEventListener('click', chooseVectorTab)
            }

            //ADD STROKE EVENTS----------------------------------------
            txtVectorStrokeColor[a].addEventListener('change', adjustVectorStrokeColor);
            txtVectorStrokeColor[a].nextElementSibling.addEventListener('click', letsSummonColorPicker);

            txtVectorStrokeOpacity[a].addEventListener('change', adjustVectorStrokeOpacity);
            txtVectorStrokeOpacity[a].previousElementSibling.addEventListener('input', adjustVectorStrokeOpacity);

            txtVectorStrokeWidth[a].addEventListener('change', adjustVectorStrokeWidth);
            txtVectorStrokeWidth[a].previousElementSibling.addEventListener('input', adjustVectorStrokeWidth);

            //ADD FILL EVENTS-------------------------------------------
            txtVectorFillColor[a].addEventListener('change', adjustVectorFillColor);
            txtVectorFillColor[a].nextElementSibling.addEventListener('click', letsSummonColorPicker);

            txtVectorFillOpacity[a].addEventListener('change', adjustVectorFillOpacity);
            txtVectorFillOpacity[a].previousElementSibling.addEventListener('input', adjustVectorFillOpacity);
            

            //add function to all sliders to change textbox
            linkRangeToTextbox();
            
            //add function to all textbox to change slider
            linkTextboxToRange();

            //update textbox colors for newly added textboxes
            changeTextColor();
        }
    }

    //after all assigned controls then create the actual pattern layer
    createCanvasVectorLayerUpload(Number(pnlBoxLayer[0].dataset.layer), Number(pnlBoxLayer[0].dataset.thumbno))
}

//================================NATIVE VECTOR=============================
function addPnlBoxVectorControlsNative(e) {
    for(var a = 0; a < pnlBoxLayer.length; a++) {

        if(Number(pnlBoxLayer[a].dataset.layer) == e) {
            
            //add the expand and collapse control
            btnExpandCollapseLayer[a].addEventListener('click', expandCollapseControls);

            //add the show and hide control
            btnShowHideLayer[a].addEventListener('click', showHideLayers);

            txtHeaderLayer[a].addEventListener('dblclick', renameTxtHeader);
            txtHeaderLayer[a].addEventListener('change', saveTxtHeader);
            txtHeaderLayer[a].addEventListener('click', blurTxtHeader);
            txtHeaderLayer[a].addEventListener('focusout', saveTxtHeader);

            //btnBasicLayer event listeners
            btnBasicLayer[a].addEventListener('click', btnBottomClick); //default the btnBasic to white
            btnBasicLayer[a].addEventListener('mouseover', btnBottomHover);
            btnBasicLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnBasicLayer[a].addEventListener('click', showBasicLayer);
            btnBasicLayer[a].children[0].style.filter = "saturate(0) brightness(2)";
            btnBasicLayer[a].children[0].style.transition = ".2s";

            //btnColorLayer event listeners
            btnColorLayer[a].addEventListener('click', btnBottomClick); //default the btnStyle to white
            btnColorLayer[a].addEventListener('mouseover', btnBottomHover);
            btnColorLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnColorLayer[a].addEventListener('click', showColorVector2);
            btnColorLayer[a].children[0].style.transition = ".2s";

            //assign dropOptionVerti selection for blend mode
            for(var b = 0; b < optLayerBlend.length; b++) {
                optLayerBlend[b].addEventListener('click', chooseLayerBlendVector);
            }

            //width and size
            txtWidthLayer[a].addEventListener('change', adjustLayerWidth);
            txtHeightLayer[a].addEventListener('change', adjustLayerHeight);

            //x and y axis
            txtXLayer[a].addEventListener('change', adjustLayerX);
            txtYLayer[a].addEventListener('change', adjustLayerY);

            chkFlipX[a].addEventListener('click', chkBoxClick);
            chkFlipX[a].addEventListener('click', adjustFlipX);
            chkFlipX[a].addEventListener('mouseover', chkBoxHover);
            chkFlipX[a].addEventListener('mouseleave', chkBoxLeave);
            
            chkFlipY[a].addEventListener('click', chkBoxClick);
            chkFlipY[a].addEventListener('click', adjustFlipY);
            chkFlipY[a].addEventListener('mouseover', chkBoxHover);
            chkFlipY[a].addEventListener('mouseleave', chkBoxLeave);

            txtOpacityLayer[a].addEventListener('change', chooseLayerOpacity);
            txtOpacityLayer[a].previousElementSibling.addEventListener('input', chooseLayerOpacity);

            txtRotationLayer[a].addEventListener('change', chooseLayerRotation);
            txtRotationLayer[a].previousElementSibling.addEventListener('input', chooseLayerRotation);

            for(var b = 0; b < optVectorColor.length; b++) {
                optVectorColor[b].addEventListener('click', chooseVectorTab)
            }

            //ADD STROKE EVENTS----------------------------------------
            txtVectorStrokeColor[a].addEventListener('change', adjustVectorNativeStrokeColor);
            txtVectorStrokeColor[a].nextElementSibling.addEventListener('click', letsSummonColorPicker);

            txtVectorStrokeOpacity[a].addEventListener('change', adjustVectorStrokeOpacity);
            txtVectorStrokeOpacity[a].previousElementSibling.addEventListener('input', adjustVectorStrokeOpacity);

            txtVectorStrokeWidth[a].addEventListener('change', adjustVectorStrokeWidth);
            txtVectorStrokeWidth[a].previousElementSibling.addEventListener('input', adjustVectorStrokeWidth);

            txtVectorCornerRadius[a].addEventListener('change', adjustVectorCornerRadius);
            txtVectorCornerRadius[a].previousElementSibling.addEventListener('input', adjustVectorCornerRadius);

            txtVectorStrokeDash[a].addEventListener('change', adjustVectorStrokeDash);
            txtVectorStrokeDash[a].previousElementSibling.addEventListener('input', adjustVectorStrokeDash);

            txtVectorStrokeGap[a].addEventListener('change', adjustVectorStrokeDash);
            txtVectorStrokeGap[a].previousElementSibling.addEventListener('input', adjustVectorStrokeDash);

            chkVectorStrokeCap[a].addEventListener('click', chkBoxClick);
            chkVectorStrokeCap[a].addEventListener('click', adjustVectorStrokeCap);
            chkVectorStrokeCap[a].addEventListener('mouseover', chkBoxHover);
            chkVectorStrokeCap[a].addEventListener('mouseleave', chkBoxLeave);
            
            chkVectorStrokeShow[a].addEventListener('click', chkBoxClick);
            chkVectorStrokeShow[a].addEventListener('click', adjustVectorStrokeShow);
            chkVectorStrokeShow[a].addEventListener('mouseover', chkBoxHover);
            chkVectorStrokeShow[a].addEventListener('mouseleave', chkBoxLeave);
            //default true
            chkVectorStrokeShow[a].style.borderColor = "transparent";
            chkVectorStrokeShow[a].style.backgroundColor = "#6885CC";
            chkVectorStrokeShow[a].children[0].style.translate = "12px";
            chkVectorStrokeShow[a].children[0].style.backgroundColor = "white";


            //ADD FILL EVENTS-------------------------------------------
            txtVectorFillColor[a].addEventListener('change', adjustVectorNativeFillColor);
            txtVectorFillColor[a].nextElementSibling.addEventListener('click', letsSummonColorPicker);

            txtVectorFillOpacity[a].addEventListener('change', adjustVectorFillOpacity);
            txtVectorFillOpacity[a].previousElementSibling.addEventListener('input', adjustVectorFillOpacity);
            
            chkVectorFillShow[a].addEventListener('click', chkBoxClick);
            chkVectorFillShow[a].addEventListener('click', adjustVectorFillShow);
            chkVectorFillShow[a].addEventListener('mouseover', chkBoxHover);
            chkVectorFillShow[a].addEventListener('mouseleave', chkBoxLeave);
            //default true
            chkVectorFillShow[a].style.borderColor = "transparent";
            chkVectorFillShow[a].style.backgroundColor = "#6885CC";
            chkVectorFillShow[a].children[0].style.translate = "12px";
            chkVectorFillShow[a].children[0].style.backgroundColor = "white";

            //add function to all sliders to change textbox
            linkRangeToTextbox();
            
            //add function to all textbox to change slider
            linkTextboxToRange();

            //update textbox colors for newly added textboxes
            changeTextColor();
        }
    }

    //after all assigned controls then create the actual pattern layer
    createCanvasVectorLayerNative(Number(pnlBoxLayer[0].dataset.layer), Number(pnlBoxLayer[0].dataset.thumbno))
}

function createCanvasVectorLayerNative(e, n) {     

    cnvLayers[e] = document.createElement('div');
    cnvLayers[e].classList.add('cnvLayers');
    cnvLayers[e].dataset.rotation = 0;
    cnvLayers[e].dataset.layer = e;
    cnvLayers[e].dataset.thumbno = n;
    cnvLayers[e].dataset.type = "vectorNative";
    cnvLayers[e].style.minWidth = 20 + 'px';
    cnvLayers[e].style.minHeight = 20 + 'px';
    cnvLayers[e].style.overflow = "visible";
    cnvLayers[e].style.visibility = "visible";
    focusObj[e] = cnvLayers[e];

    // append cnvlayer to cnvmain
    cnvGrpLayers.appendChild(cnvLayers[e]);

    //createSVGStroke(e);
    createSVG(e);
    //createSVGFill(e);
    
    //make width and height as auto
    layerL[e] = cnvLayers[e].offsetLeft;
    layerT[e] = cnvLayers[e].offsetTop;
    layerW[e] = cnvLayers[e].clientWidth;
    layerH[e] = cnvLayers[e].clientHeight;

    //add border
    addBorderLayer(cnvLayers[e], e)
    
}

//================================NATIVE LINE=============================
function chooseLineHead() {

    var e = Number(this.closest('.pnlBoxLayer').dataset.layer)
    var getSVG = this.children[0].outerHTML;

    this.closest('.pnlDropSide').children[0].children[0].innerHTML = getSVG;
    this.closest('.pnlDropSide').querySelector('svg').style.width = "60%";
    this.closest('.pnlDropSide').querySelector('svg').style.height = "auto";

    //if dropdown is for line start
    if(this.closest('.pnlDropSide').children[0].className == 'dropdownLineStart') {
        
        this.closest('.pnlDropSide').querySelector('svg').style.transform = "translateX(9px)";
    }
    //if dropdown is for line end
    else {
        this.closest('.pnlDropSide').querySelector('svg').style.transform = "translateX(-9px)";
    }

    renderLine(e)
}

function adjustLineNativeStrokeColor(e) {

    var e = Number(this.closest('.pnlBoxLayer').dataset.layer);
    
    //change stroke color for lead
    testHexCode(this);

    var paths = cnvLayers[e].querySelectorAll('path');
    for(var a = 0; a < paths.length; a++) {
        paths[a].setAttribute('stroke', '#' + this.value);
    }
}

function adjustLineStrokeWidth(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            
            var e = Number(focusPanel[a].dataset.layer);

            focusPanel[a].querySelector('.txtVectorStrokeWidth').value = this.value;
            
            cnvLayers[e].style.height =  `${Number(this.value)*5}px`;
            cnvLayers[e].style.minHeight =  `${Number(this.value)*5}px`;
            cnvLayers[e].style.width = layerW[e] + this.value * 8 + 'px';
            cnvLayers[e].style.minWidth = cnvLayers[e].clientHeight * 2 + 'px';

            cnvLayers[e].querySelector('.divLineStart').style.width = this.value * 4 + 'px';
            cnvLayers[e].querySelector('.divLineStart').style.minWidth = this.value * 4 + 'px';

            cnvLayers[e].querySelector('.divLineEnd').style.width = this.value * 4 + 'px';
            cnvLayers[e].querySelector('.divLineEnd').style.minWidth = this.value * 4 + 'px';

            organizeLine(e);
            
            //adjust the X axis when stroke was adjusted
            var newW = layerW[e] - cnvLayers[e].clientWidth;
            cnvLayers[e].style.left = (layerL[e] + newW / 2) + 'px';

            //adjust the Y axis when stroke was adjusted
            var newH = layerH[e] - cnvLayers[e].clientHeight;
            layerH[e] = cnvLayers[e].clientHeight;

            cnvLayers[e].style.top = (layerT[e] + newH / 2) + 'px';
            layerT[e] = cnvLayers[e].offsetTop;

            adjustBorder();
            
            //console.log(cnvLayers[e])
        }
    }

}

function adjustLineStrokeDash(e) {

    var b = 0;
    var key = null;
    var imFocus = false;
    var leadPanel = this.closest('.pnlBoxLayer');
    
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

    for(var a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            
            var e = Number(focusPanel[a].dataset.layer);
        
            cnvLayers[e].querySelector('.divLineMid').querySelector('path').setAttribute('stroke-dasharray', `${leadPanel.querySelector('.txtVectorStrokeDash').value} ${leadPanel.querySelector('.txtVectorStrokeGap').value}`);
            
            if(this.className == "txtVectorStrokeDash") {
                focusPanel[a].querySelector('.txtVectorStrokeDash').value = this.value;
            }
            else if(this.className == "txtVectorStrokeGap") {
                focusPanel[a].querySelector('.txtVectorStrokeGap').value = this.value;
            }
            
            adjustBorder();
        }
    }
}

function adjustLineStrokeCap(e) {

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

   
    for(var a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null ) {

            var e = Number(focusPanel[a].dataset.layer);

            if(leadFlip.dataset.value == "true") {

                cnvLayers[e].querySelector('.divLineMid').querySelector('path').setAttribute('stroke-linecap', "round");
                cnvLayers[e].querySelector('.divLineMid').querySelector('path').setAttribute('stroke-dasharray', `${focusPanel[a].querySelector('.txtVectorStrokeDash').value} ${focusPanel[a].querySelector('.txtVectorStrokeGap').value}`);
            
            }
        
            else if(leadFlip.dataset.value == "false") { 

                cnvLayers[e].querySelector('.divLineMid').querySelector('path').setAttribute('stroke-linecap', "butt");
                cnvLayers[e].querySelector('.divLineMid').querySelector('path').setAttribute('stroke-dasharray', `${focusPanel[a].querySelector('.txtVectorStrokeDash').value} ${focusPanel[a].querySelector('.txtVectorStrokeGap').value}`);
            
            }
        }
    }
}

function addPnlBoxLineControlsNative(e) {
    for(var a = 0; a < pnlBoxLayer.length; a++) {

        if(Number(pnlBoxLayer[a].dataset.layer) == e) {
            
            //add the expand and collapse control
            btnExpandCollapseLayer[a].addEventListener('click', expandCollapseControls);

            //add the show and hide control
            btnShowHideLayer[a].addEventListener('click', showHideLayers);

            txtHeaderLayer[a].addEventListener('dblclick', renameTxtHeader);
            txtHeaderLayer[a].addEventListener('change', saveTxtHeader);
            txtHeaderLayer[a].addEventListener('click', blurTxtHeader);
            txtHeaderLayer[a].addEventListener('focusout', saveTxtHeader);

            //btnBasicLayer event listeners
            btnBasicLayer[a].addEventListener('click', btnBottomClick); //default the btnBasic to white
            btnBasicLayer[a].addEventListener('mouseover', btnBottomHover);
            btnBasicLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnBasicLayer[a].addEventListener('click', showBasicLayer);
            btnBasicLayer[a].children[0].style.filter = "saturate(0) brightness(2)";
            btnBasicLayer[a].children[0].style.transition = ".2s";

            //btnColorLayer event listeners
            btnColorLayer[a].addEventListener('click', btnBottomClick); //default the btnStyle to white
            btnColorLayer[a].addEventListener('mouseover', btnBottomHover);
            btnColorLayer[a].addEventListener('mouseleave', btnBottomLeave);
            btnColorLayer[a].addEventListener('click', showColorVector2);
            btnColorLayer[a].children[0].style.transition = ".2s";

            //assign dropOptionVerti selection for blend mode
            for(var b = 0; b < optLayerBlend.length; b++) {
                optLayerBlend[b].addEventListener('click', chooseLayerBlendVector);
            }

            //width and size
            txtWidthLayer[a].addEventListener('change', adjustLayerWidth);
            txtHeightLayer[a].addEventListener('change', adjustLayerHeight);

            //x and y axis
            txtXLayer[a].addEventListener('change', adjustLayerX);
            txtYLayer[a].addEventListener('change', adjustLayerY);

            chkFlipX[a].addEventListener('click', chkBoxClick);
            chkFlipX[a].addEventListener('click', adjustFlipX);
            chkFlipX[a].addEventListener('mouseover', chkBoxHover);
            chkFlipX[a].addEventListener('mouseleave', chkBoxLeave);
            
            chkFlipY[a].addEventListener('click', chkBoxClick);
            chkFlipY[a].addEventListener('click', adjustFlipY);
            chkFlipY[a].addEventListener('mouseover', chkBoxHover);
            chkFlipY[a].addEventListener('mouseleave', chkBoxLeave);

            txtOpacityLayer[a].addEventListener('change', chooseLayerOpacity);
            txtOpacityLayer[a].previousElementSibling.addEventListener('input', chooseLayerOpacity);

            txtRotationLayer[a].addEventListener('change', chooseLayerRotation);
            txtRotationLayer[a].previousElementSibling.addEventListener('input', chooseLayerRotation);

            //ADD STROKE EVENTS----------------------------------------
            txtVectorStrokeColor[a].addEventListener('change', adjustLineNativeStrokeColor);
            txtVectorStrokeColor[a].nextElementSibling.addEventListener('click', letsSummonColorPicker);

            txtVectorStrokeWidth[a].addEventListener('change', adjustLineStrokeWidth);
            txtVectorStrokeWidth[a].previousElementSibling.addEventListener('input', adjustLineStrokeWidth);

            txtVectorStrokeDash[a].addEventListener('change', adjustLineStrokeDash);
            txtVectorStrokeDash[a].previousElementSibling.addEventListener('input', adjustVectorStrokeDash);

            txtVectorStrokeGap[a].addEventListener('change', adjustLineStrokeDash);
            txtVectorStrokeGap[a].previousElementSibling.addEventListener('input', adjustVectorStrokeDash);

            chkVectorStrokeCap[a].addEventListener('click', chkBoxClick);
            chkVectorStrokeCap[a].addEventListener('click', adjustLineStrokeCap);
            chkVectorStrokeCap[a].addEventListener('mouseover', chkBoxHover);
            chkVectorStrokeCap[a].addEventListener('mouseleave', chkBoxLeave);

            //assign dropOptionVerti selection for blend mode
            for(var b = 0; b < optLineHead.length; b++) {
                optLineHead[b].addEventListener('click', chooseLineHead);
            }

            //add function to all sliders to change textbox
            linkRangeToTextbox();
            
            //add function to all textbox to change slider
            linkTextboxToRange();

            //update textbox colors for newly added textboxes
            changeTextColor();
        }
    }

    //after all assigned controls then create the actual pattern layer
    createCanvasLineLayerNative(Number(pnlBoxLayer[0].dataset.layer), Number(pnlBoxLayer[0].dataset.thumbno))
}

function createCanvasLineLayerNative(e, n) {     

    cnvLayers[e] = document.createElement('div');
    cnvLayers[e].classList.add('cnvLayers');
    cnvLayers[e].dataset.rotation = 0;
    cnvLayers[e].dataset.layer = e;
    cnvLayers[e].dataset.thumbno = n;
    cnvLayers[e].dataset.type = "lineNative";
    cnvLayers[e].style.minWidth = 20 + 'px';
    cnvLayers[e].style.minHeight = 20 + 'px';
    cnvLayers[e].style.overflow = "visible";
    cnvLayers[e].style.display = "flex";
    cnvLayers[e].style.visibility = "visible";
    focusObj[e] = cnvLayers[e];

    // append cnvlayer to cnvmain
    cnvGrpLayers.appendChild(cnvLayers[e]);

    createLine(e);
    
    //make width and height as auto
    layerL[e] = cnvLayers[e].offsetLeft;
    layerT[e] = cnvLayers[e].offsetTop;
    layerW[e] = cnvLayers[e].clientWidth;
    layerH[e] = cnvLayers[e].clientHeight;

    //add border
    addBorderLayer(cnvLayers[e], e)
    
}





















































//===============DROP IMAGES ON CNVPIN=================

function dragDropUpload(e) {
    var reader = [];

    for(var a = 0; a < e.dataTransfer.files.length; a++) {

        //if dropped is a file
        if(e.dataTransfer.items[a].kind == "file") {

            //if file is an image
            if(e.dataTransfer.items[a].type.match("image")) {

                //check if file is svg
                var chkSVG = /svg/;

                var resultSVG = chkSVG.test(e.dataTransfer.items[a].type);

                if(!resultSVG) {

                    reader[a] = new FileReader();

                    reader[a].readAsDataURL(e.dataTransfer.files[a]);

                    reader[a].onload = function() {

                        var img = new Image();
                        img.src = this.result;
                        img.setAttribute('draggable', 'false');
                        img.onload = function() {

                            var div = document.createElement('div');
                            div.classList.add('pnlBoxThumb');
                            div.setAttribute('draggable', 'false');
                            div.dataset.thumbno = pnlBoxThumb.length;
                            div.appendChild(img);

                            configScroll[2].children[0].children[0].prepend(div);

                            //add event listeners to pnlBoxThumbs
                            //index [0] as we use prepend so all new thumbs are [0]
                            pnlBoxThumb[0].addEventListener('dblclick', function() {
                                createPnlBoxImage(this.dataset.thumbno);
                            })

                            createPnlBoxImage(pnlBoxThumb[0].dataset.thumbno);

                            pnlBoxThumb[0].addEventListener('dblclick', dblClickThumb)
                            pnlBoxThumb[0].addEventListener('pointerover', pointerOverThumb);
                            pnlBoxThumb[0].addEventListener('pointerleave', pointerLeaveThumb);

                        }
                        
                    }
                }

                else {

                    reader[a] = new FileReader(); //create a file reader to read the format
                    reader[a].readAsText(e.dataTransfer.files[a]); //read the file to dataURL for raster output
                    reader[a].onload = function() {
                        
                        //use pnlBoxThumb.length as it will always default to existing count
                        //it will help to skip [0] index

                        var div = document.createElement('div');
                        div.classList.add('pnlBoxThumb');
                        div.setAttribute('draggable', 'false');
                        div.dataset.thumbno = pnlBoxThumb.length;
                        div.innerHTML = this.result;

                        var svgChild = "";
                        var getSVGTag;

                        //check first if there's <g> tag already
                        if(div.querySelector('g') == null) {

                            getSVGTag = div.querySelector('svg');

                            for(var c = 0; c < getSVGTag.childElementCount; c++) {
                                svgChild += getSVGTag.children[c].outerHTML;
                            }
                        }
                        else {
                            getSVGTag = div.querySelector('g');

                            for(var c = 0; c < getSVGTag.childElementCount; c++) {
                                svgChild += getSVGTag.children[c].outerHTML;
                            }
                        }

                        //add the <g> tag
                        div.children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;

                        //add the svgChild back
                        div.children[0].children[0].innerHTML = svgChild;

                        configScroll[2].children[0].children[0].prepend(div);

                        //add event listeners to pnlBoxThumbs
                        //index [0] as we use prepend so all new thumbs are [0]

                        pnlBoxThumb[0].addEventListener('dblclick', function() {
                            createPnlBoxVectorUpload(this.dataset.thumbno);
                        })

                        createPnlBoxVectorUpload(pnlBoxThumb[0].dataset.thumbno);

                        pnlBoxThumb[0].addEventListener('dblclick', dblClickThumb)
                        pnlBoxThumb[0].addEventListener('pointerover', pointerOverThumb);
                        pnlBoxThumb[0].addEventListener('pointerleave', pointerLeaveThumb);

                    }
                }

            }
   
        }

    }

    resetAllFocus();
}
cnvPin.addEventListener('drop', dragDropUpload);


//================BOTTOM BUTTON LISTENERS FOR IMAGE LAYERS===========
function showBasicLayer(){

    this.closest('.pnlBoxLayer').querySelector('.tabSliderLayer').style.translate = "0%"; //slide tab
    this.parentElement.parentElement.previousElementSibling.children[0].style.translate = "0%"; //slide scroll thumb
}

function showColorLayer() {
    
    this.closest('.pnlBoxLayer').querySelector('.tabSliderLayer').style.translate = "-100%"; //slide tab to left
    this.parentElement.parentElement.previousElementSibling.children[0].style.translate = "100%"; //slide thumb to right
}

function showStyleLayer() {
    var pnlBottomLayer = this.closest('.pnlBottomLayer');

    this.closest('.pnlBoxLayer').querySelector('.tabSliderLayer').style.translate = "-200%"; //slide tab to left
    this.parentElement.parentElement.previousElementSibling.children[0].style.translate = "200%";

}

//================BOTTOM BUTTON LISTENERS FOR TEXT LAYERS=============
// no more basic since it's the first one too

function showTextLayer() {
    
    this.closest('.pnlBoxLayer').querySelector('.tabSliderLayer').style.translate = "-100%"; //slide tab to left
    this.parentElement.parentElement.previousElementSibling.children[0].style.translate = "100%"; //slide thumb to right
}

// no more style since it's the last one too

//================BOTTOM BUTTON LISTENERS FOR VECTOR LAYERS=============
// no more basic since it's the first one too

function showSubLayer() {
    
    this.closest('.pnlBoxLayer').querySelector('.tabSliderLayer').style.translate = "-100%"; //slide tab to left
    this.parentElement.parentElement.previousElementSibling.children[0].style.translate = "100%"; //slide thumb to right
}

function showColorVector() {
    
    this.closest('.pnlBoxLayer').querySelector('.tabSliderLayer').style.translate = "-200%"; //slide tab to left
    this.parentElement.parentElement.previousElementSibling.children[0].style.translate = "200%"; //slide thumb to right
}

//================BOTTOM BUTTON LISTENERS FOR NATIVE VECTORS============
function showColorVector2() {
    
    this.closest('.pnlBoxLayer').querySelector('.tabSliderLayer').style.translate = "-100%"; //slide tab to left
    this.parentElement.parentElement.previousElementSibling.children[0].style.translate = "100%"; //slide thumb to right
}



//==============================ADD CNVPIN EVENT LISTENERS=========================

cnvPin.addEventListener('pointerdown', scaleBorderDown);
cnvPin.addEventListener('pointermove', scaleBorderMove);
cnvPin.addEventListener('pointerup', scaleBorderUp);

cnvPin.addEventListener('pointerdown', resizeBorderDown);
cnvPin.addEventListener('pointermove', resizeBorderMove);
cnvPin.addEventListener('pointerup', resizeBorderUp);

cnvPin.addEventListener('pointerdown', rotateBorderDown);
cnvPin.addEventListener('pointermove', rotateBorderMove);
cnvPin.addEventListener('pointerup', rotateBorderUp);

cnvPin.addEventListener('pointerdown', dragBorderDown);
cnvPin.addEventListener('pointermove', dragBorderMove);
cnvPin.addEventListener('pointerup', dragBorderUp);

cnvPin.addEventListener('dblclick', editCanvasTextLayer);

//remove out of focus scaling, draggin and resizing signals
document.body.addEventListener('pointerup', function() {
    isScaling = false;
    isRotating = false;
    isResizing = false;
    isDragging = false;

    cnvBox.style.position = "relative";
    cnvGrpLayers.style.boxSizing = "border-box";
    cnvGrpLayers.style.overflow = "hidden";

    //reset cursors
    cnvPin.style.cursor = "default";

    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            pinBody[a].style.cursor = "default";

            pinTL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;

            pinTL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
        }
        
    }
})


//=============================DRAG AND DROP PNLBOX LAYERS=========================

function countdownPanelLayer() {

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

function pointerDownLayer(e) {

    if((this != e.target) && (e.target.closest('.pnlTitleLayer'))) {
        e.preventDefault(); //remove the highlighting on texts
        
        clientY = e.clientY;

        //remove any current focus especially on the renaming
        var checkInputs = document.querySelectorAll('input[type="text"], input[type="number"]');
        checkInputs.forEach(function(input) {
            input.blur();
        })

        for(var a = 0; a < focusPanel.length; a++) {
            if(focusPanel[a] != null) {
                if(focusPanel[a] == e.target.closest('.pnlBoxLayer')) {
                    tmrDrag = setInterval(countdownPanelLayer, 100);
                    break;
                }
           
            }
        }
    }

}
configScroll[5].addEventListener('pointerdown', pointerDownLayer);

function pointerMoveLayer(e) {

    e.preventDefault();

    if(isDragging) {
 
        //this.scrollTop = e.clientY;

        for(var a = 0; a < pnlBoxLayer.length; a++) {
           
            if(e.clientY < pnlBoxLayer[a].getBoundingClientRect().top + (pnlBoxLayer[a].clientHeight/2)) {
                
                patRank = a;

                breaklineDrag.style.display = "block";

                this.insertBefore(breaklineDrag, pnlBoxLayer[patRank]);
           
                break;
            }
            
            else if(e.clientY > pnlBoxLayer[pnlBoxLayer.length-1].getBoundingClientRect().top + (pnlBoxLayer[pnlBoxLayer.length-1].clientHeight /2)) {

                this.appendChild(breaklineDrag);

                break;
            }
        }
    }

}
configScroll[5].addEventListener('pointermove', pointerMoveLayer);
configScroll[5].addEventListener('contextmenu', function(e){
    e.preventDefault();
})

function pointerUpLayer(e) {

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

        rearrangeCanvasLayers()
    }

    counter = 0;
    clientY = null;
    clearInterval(tmrDrag);
    
}
configScroll[5].addEventListener('pointerup', pointerUpLayer);

//================REARRANGE CANVAS DEPENDING ON THE LAYER ARRANGEMENT=======

function rearrangeCanvasLayers() {

    //first rearrange all cnvPatterns
    for(var a = 0; a < pnlBoxLayer.length; a++) {
        
        var e = pnlBoxLayer[a].dataset.layer; 
        
        cnvGrpLayers.prepend(cnvLayers[e]);
        cnvPin.prepend(pinBody[e]);
    }
    
}
