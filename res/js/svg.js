//======================CREATE VECTOR===================

function createSVG(e) {

    var n = Number(cnvLayers[e].dataset.thumbno);

    var getSVG = configScroll[3].querySelector(`[data-thumbno = "${n}"]`).children[0].children[0];

    cnvLayers[e].innerHTML = getSVG.outerHTML;

    //process the svg and add <g> tag
    var svgChild = cnvLayers[e].children[0].children[0].outerHTML;
    
    //add the <g> tag
    cnvLayers[e].children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;

    //add the svgChild back
    cnvLayers[e].children[0].children[0].innerHTML = svgChild;


    //resize cvnlayers according to SVG library position
    var getPost;
    for(var a = 0; a < elements.length; a++) {
        if(elements[a] != null) {
            if(elements[a].id.toLowerCase() == getSVG.id.toLowerCase()) {

                getPost = elements[a].post;
            }
        }
    }

    var aspectRatio;
    var bbox = getSVG.getBBox();
    var bboxW = Number(bbox.width);
    var bboxH = Number(bbox.height);

    //check the element position
    if(getPost == 'center') {

        if(Number(txtSizeWidth.value) > Number(txtSizeHeight.value)) {
            if(bboxW > bboxH) {
                aspectRatio = bboxH / bboxW;
                cnvLayers[e].style.height = `${Math.round(txtSizeHeight.value * 0.25)}px`;
                cnvLayers[e].style.width =  `${cnvLayers[e].clientHeight / aspectRatio}px`;
            }
            else if(bboxW < bboxH) {
                aspectRatio = bboxW / bboxH;

                cnvLayers[e].style.height = `${Math.round(txtSizeHeight.value * 0.25)}px`;
                cnvLayers[e].style.width =  `${cnvLayers[e].clientHeight * aspectRatio}px`;
            }
            else if(bboxW == bboxH) {
                aspectRatio = bboxW / bboxH;

                cnvLayers[e].style.height = `${Math.round(txtSizeHeight.value * 0.25)}px`;
                cnvLayers[e].style.width =  `${cnvLayers[e].clientHeight / aspectRatio}px`;
            }
           
        }
        else if(Number(txtSizeWidth.value) < Number(txtSizeHeight.value)) {
            if(bboxW > bboxH) {
                aspectRatio = bboxH / bboxW;
                cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                cnvLayers[e].style.height = `${cnvLayers[e].clientWidth * aspectRatio}px`;
            }
            else if(bboxW < bboxH) {
                aspectRatio = bboxW / bboxH;
                cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                cnvLayers[e].style.height = `${cnvLayers[e].clientWidth / aspectRatio}px`;
            }

            else if(bboxW == bboxH) {
                aspectRatio = bboxH / bboxW;
                cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                cnvLayers[e].style.height = `${cnvLayers[e].clientWidth / aspectRatio}px`;
            }
        }
    
        else if(Number(txtSizeWidth.value) == Number(txtSizeHeight.value)) {
         
            if(bboxW > bboxH) {
                aspectRatio = bboxH / bboxW;
                cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                cnvLayers[e].style.height = `${cnvLayers[e].clientWidth * aspectRatio}px`;
            }
            else if(bboxW < bboxH) {
                aspectRatio = bboxW / bboxH;
                cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                cnvLayers[e].style.height = `${cnvLayers[e].clientWidth / aspectRatio}px`;
            }

            else if(bboxW == bboxH) {
                aspectRatio = bboxH / bboxW;
                cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                cnvLayers[e].style.height = `${cnvLayers[e].clientWidth / aspectRatio}px`;
            }
            
        }
        
    }

    cnvLayers[e].style.left = `${(txtSizeWidth.value / 2) - (cnvLayers[e].clientWidth/2)}px`;
    cnvLayers[e].style.top = `${(txtSizeHeight.value / 2) - (cnvLayers[e].clientHeight/2)}px`;

    //register the default Width and Height of this SVG
    svgOldW[e] = Number(cnvLayers[e].children[0].getAttribute('viewBox').split(' ')[2]);
    svgOldH[e] = Number(cnvLayers[e].children[0].getAttribute('viewBox').split(' ')[3]);
    
    var panel = configScroll[5].querySelector(`[data-layer='${e}']`);

    //get fill and stroke color
    var fillColor = panel.querySelector('.txtVectorFillColor').value;
    var strokeColor = panel.querySelector('.txtVectorStrokeColor').value;
    var strokeWidth = Number(panel.querySelector('.txtVectorStrokeWidth').value);
    
    //position both children as absolute
    cnvLayers[e].children[0].style.position = "absolute";
    cnvLayers[e].children[0].setAttribute('width', cnvLayers[e].clientWidth);
    cnvLayers[e].children[0].setAttribute('height', cnvLayers[e].clientHeight);
    cnvLayers[e].children[0].setAttribute('viewBox', `0 0 ${cnvLayers[e].clientWidth} ${cnvLayers[e].clientHeight}`)

    var newW = Number(cnvLayers[e].children[0].getAttribute('width'));
    var newH = Number(cnvLayers[e].children[0].getAttribute('height'));
    var scaleX = newW / svgOldW[e];
    var scaleY = newH / svgOldH[e];

    var svgType = cnvLayers[e].querySelector('g').children[0].tagName;

    var match;
    var newPath = "";

    if(svgType == 'path') {

        //get path string
        var path = cnvLayers[e].querySelector('path').getAttribute('d');
        
        //create regex
        const regex = /([a-zA-Z])([^a-zA-z]*)/gi;
    
        while ((match = regex.exec(path)) !== null) {
            
            if(match[1].toUpperCase() != 'Z') {
            
                if(match[1].toUpperCase() == 'M') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'L') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'H') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
            
                    newPath += `${match[1]} ${val1}`;

                }
                else if(match[1].toUpperCase() == 'V') {
                    var val2 = Number(match[2].split(' ')[0]) * scaleY;

                    newPath += `${match[1]} ${val2}`;
                }
                
                else if(match[1].toUpperCase() == 'C') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    var val5 = Number(match[2].split(' ')[4]) * scaleX;
                    var val6 = Number(match[2].split(' ')[5]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6}`;

                }
                
                else if(match[1].toUpperCase() == 'S') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'Q') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'T') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;

                }
                else if(match[1].toUpperCase() == 'A') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[0]);
                    var val4 = Number(match[2].split(' ')[1]);

                    var val5 = Number(match[2].split(' ')[0]);
                    var val6 = Number(match[2].split(' ')[1]) * scaleY;

                    var val7 = Number(match[2].split(' ')[0]) * scaleX;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6} ${val7}`;
                }
            }
            else {
                newPath += 'Z';
            }
        }

        //append the scaled path
        var appendDefs = `
        <mask id="vectorMask${e}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g>
                <path d="${newPath}" fill="black" />
            </g>
        </mask>`
        cnvLayers[e].children[0].insertAdjacentHTML('afterbegin', appendDefs);
        cnvLayers[e].children[0].children[1].querySelector('path').setAttribute('d', newPath);

        
        var node  = cnvLayers[e].children[0].children[1];
        var clone = node.cloneNode(true);
        cnvLayers[e].children[0].appendChild(clone);

        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${e})`);
        cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        cnvLayers[e].querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        cnvLayers[e].querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }   

    else if(svgType == 'ellipse') {
        var cx = Number(cnvLayers[e].querySelector('ellipse').getAttribute('cx'));
        var cy = Number(cnvLayers[e].querySelector('ellipse').getAttribute('cy'));
        var rx = Number(cnvLayers[e].querySelector('ellipse').getAttribute('rx'));
        var ry = Number(cnvLayers[e].querySelector('ellipse').getAttribute('ry'));

        var appendDefs = `
        <mask id="vectorMask${e}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g>
                <ellipse cx="${cx * scaleX}" cy="${cy * scaleY}" rx="${rx * scaleX}" ry="${ry * scaleY}" fill="black" />
            </g>
        </mask>`

        cnvLayers[e].children[0].insertAdjacentHTML('afterbegin', appendDefs);
        cnvLayers[e].children[0].children[1].querySelector('ellipse').setAttribute('cx', cx * scaleX);
        cnvLayers[e].children[0].children[1].querySelector('ellipse').setAttribute('cy', cy * scaleY);
        cnvLayers[e].children[0].children[1].querySelector('ellipse').setAttribute('rx', rx * scaleX);
        cnvLayers[e].children[0].children[1].querySelector('ellipse').setAttribute('ry', ry * scaleY);

        var node  = cnvLayers[e].children[0].children[1];
        var clone = node.cloneNode(true);
        cnvLayers[e].children[0].appendChild(clone);

        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${e})`);
        cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        cnvLayers[e].querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        cnvLayers[e].querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }

    else if(svgType == 'rect') {
        
        var rx = 0;
        var ry = 0;
        var rw = cnvLayers[e].clientWidth;
        var rh = cnvLayers[e].clientHeight;

        var appendDefs = `
        <mask id="vectorMask${e}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g>
                <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="black" />
            </g>
        </mask>`

        cnvLayers[e].children[0].insertAdjacentHTML('afterbegin', appendDefs);
        cnvLayers[e].children[0].children[1].querySelector('rect').setAttribute('x', rx);
        cnvLayers[e].children[0].children[1].querySelector('rect').setAttribute('y', ry);
        cnvLayers[e].children[0].children[1].querySelector('rect').setAttribute('width', rw);
        cnvLayers[e].children[0].children[1].querySelector('rect').setAttribute('height', rh);

        var node  = cnvLayers[e].children[0].children[1];
        var clone = node.cloneNode(true);
        cnvLayers[e].children[0].appendChild(clone);

        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${e})`);
        cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        cnvLayers[e].querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        cnvLayers[e].querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }
    
    cnvLayers[e].children[0].setAttribute('width', cnvLayers[e].clientWidth + strokeWidth*2);
    cnvLayers[e].children[0].setAttribute('height', cnvLayers[e].clientHeight + strokeWidth*2);
    cnvLayers[e].children[0].setAttribute('viewBox', `0 0 ${cnvLayers[e].clientWidth + strokeWidth*2} ${cnvLayers[e].clientHeight + strokeWidth*2}`);

    cnvLayers[e].children[0].style.left = 0 - (cnvLayers[e].children[0].clientWidth - cnvLayers[e].clientWidth) / 2 + 'px';
    cnvLayers[e].children[0].style.top = 0 - (cnvLayers[e].children[0].clientHeight - cnvLayers[e].clientHeight) / 2 + 'px';
}

function getNewVector(Ax, Ay, Bx, By, r) {

    var ABx = Bx - Ax;
    var ABy = By - Ay;
    var magnitudeAB = Math.sqrt((ABx ** 2) + (ABy ** 2));
    var normalizeX = ABx / magnitudeAB;
    var normalizeY = ABy / magnitudeAB;

    var newAx, newBx, newAy, newBy, cpAx, cpAy, cpBx, cpBy;

    newAx = Ax + (r * normalizeX);
    newBx = Bx - (r * normalizeX);

    newAy = Ay + (r * normalizeY);
    newBy = By - (r * normalizeY);

    cpAx = Ax + (r / 2 * normalizeX);
    cpAy = Ay + (r / 2 * normalizeY);

    cpBx = Bx - (r / 2 * normalizeX);
    cpBy = By - (r / 2 * normalizeY);

    return [newAx, newAy, newBx, newBy, cpAx, cpAy, cpBx, cpBy];

}

function resizeDefaultPath(e) {
    
    var n = Number(cnvLayers[e].dataset.thumbno);

    var getSVG = configScroll[3].querySelector(`[data-thumbno = "${n}"]`).children[0].children[0];

    cnvLayers[e].innerHTML = getSVG.outerHTML;

    //process the svg and add <g> tag
    var svgChild = cnvLayers[e].children[0].children[0].outerHTML;
    
    //add the <g> tag
    cnvLayers[e].children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;

    //add the svgChild back
    cnvLayers[e].children[0].children[0].innerHTML = svgChild;

    //register the default Width and Height of this SVG
    svgOldW[e] = Number(cnvLayers[e].children[0].getAttribute('viewBox').split(' ')[2]);
    svgOldH[e] = Number(cnvLayers[e].children[0].getAttribute('viewBox').split(' ')[3]);
    
    var panel = configScroll[5].querySelector(`[data-layer='${e}']`);

    //get fill and stroke color
    var fillColor = panel.querySelector('.txtVectorFillColor').value;
    var strokeColor = panel.querySelector('.txtVectorStrokeColor').value;
    var strokeWidth = Number(panel.querySelector('.txtVectorStrokeWidth').value);
    
    //position both children as absolute
    cnvLayers[e].children[0].setAttribute('width', cnvLayers[e].clientWidth);
    cnvLayers[e].children[0].setAttribute('height', cnvLayers[e].clientHeight);
    cnvLayers[e].children[0].setAttribute('viewBox', `0 0 ${cnvLayers[e].clientWidth} ${cnvLayers[e].clientHeight}`)

    var newW = Number(cnvLayers[e].children[0].getAttribute('width'));
    var newH = Number(cnvLayers[e].children[0].getAttribute('height'));
    var scaleX = newW / svgOldW[e];
    var scaleY = newH / svgOldH[e];

    var svgType = cnvLayers[e].querySelector('g').children[0].tagName;

    if(svgType == 'path') {

        //get path string
        var path = cnvLayers[e].querySelector('path').getAttribute('d');
    
        //create regex
        const regex = /([a-zA-Z])([^a-zA-z]*)/gi;
        
        var match;
        var newPath = "";

        while ((match = regex.exec(path)) !== null) {
            
            if(match[1].toUpperCase() != 'Z') {
            
                if(match[1].toUpperCase() == 'M') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'L') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'H') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
            
                    newPath += `${match[1]} ${val1}`;

                }
                else if(match[1].toUpperCase() == 'V') {
                    var val2 = Number(match[2].split(' ')[0]) * scaleY;

                    newPath += `${match[1]} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'C') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    var val5 = Number(match[2].split(' ')[4]) * scaleX;
                    var val6 = Number(match[2].split(' ')[5]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6}`;

                }
                else if(match[1].toUpperCase() == 'S') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'Q') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'T') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;

                }
                else if(match[1].toUpperCase() == 'A') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[0]);
                    var val4 = Number(match[2].split(' ')[1]);

                    var val5 = Number(match[2].split(' ')[0]);
                    var val6 = Number(match[2].split(' ')[1]) * scaleY;

                    var val7 = Number(match[2].split(' ')[0]) * scaleX;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6} ${val7}`;
                }

            }
            else {
                newPath += 'Z';
            }

        }

        var appendDefs = `
        <mask id="vectorMask${e}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g style="mix-blend-mode:normal" opacity="1">
                <path d="${newPath}" fill="black" />
            </g>
        </mask>`
        cnvLayers[e].children[0].insertAdjacentHTML('afterbegin', appendDefs);
        cnvLayers[e].children[0].children[1].querySelector('path').setAttribute('d', newPath);
        
        var node  = cnvLayers[e].children[0].children[1];
        var clone = node.cloneNode(true);
        cnvLayers[e].children[0].appendChild(clone);

        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${e})`);
        cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        cnvLayers[e].querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        cnvLayers[e].querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }
    
    cnvLayers[e].children[0].setAttribute('width', cnvLayers[e].clientWidth + strokeWidth*2);
    cnvLayers[e].children[0].setAttribute('height', cnvLayers[e].clientHeight + strokeWidth*2);
    cnvLayers[e].children[0].setAttribute('viewBox', `0 0 ${cnvLayers[e].clientWidth + strokeWidth*2} ${cnvLayers[e].clientHeight + strokeWidth*2}`);

    cnvLayers[e].children[0].style.left = 0 - (cnvLayers[e].children[0].clientWidth - cnvLayers[e].clientWidth) / 2 + 'px';
    cnvLayers[e].children[0].style.top = 0 - (cnvLayers[e].children[0].clientHeight - cnvLayers[e].clientHeight) / 2 + 'px';
    
    return newPath;

}

function curveSVG(e) {

    var i = 0;
    var newPath = [];
    var svgShape = cnvLayers[e].querySelector('svg').id;
    var svgType = cnvLayers[e].querySelector('g').children[0].tagName;
    var panel = configScroll[5].querySelector(`[data-layer='${e}']`);
    var cornerRadius = panel.querySelector('.txtVectorCornerRadius').value;

    if(svgType == 'path') {

        var lastCP;
        var lastCoor;

        //get reformatted path string
        var splitPath = resizeDefaultPath(e).split(/(?=\s*[a-zA-Z])/);

        //REFORMAT SPLITPATH
        for(var a = 0; a < splitPath.length; a++) {
            //CONVERT ANY HORIZONTAL TO LINE ATTRIBUTE
            if(splitPath[a].charAt(0) == 'H') {
                var currX = splitPath[a].split(' ')[1];
                var prevY = splitPath[a-1].split(' ')[2];
                splitPath[a] = 'L ' + currX + ' ' + prevY;
                
            }
            //CONVERT ANY VERTICAL TO LINE ATTRIBUTE
            else if(splitPath[a].charAt(0) == 'V') {
                var currY = splitPath[a].split(' ')[1];
                var prevX = splitPath[a-1].split(' ')[1];
                splitPath[a] = 'L ' + prevX + ' ' + currY;
            }
        }

        for(var a = 0; a < splitPath.length; a++) {

            if(splitPath[a+1] != null) {

                var Ax = Number(splitPath[a].split(' ')[1]);
                var Ay = Number(splitPath[a].split(' ')[2]);

                //if splitpath is not null or go back from the start
                var Bx = Number(splitPath[a+1].split(' ')[1]);
                var By = Number(splitPath[a+1].split(' ')[2]);

                var newAx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[0];
                var newAy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[1];
                var newBx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[2];
                var newBy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[3];
                var newCPAx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[4];
                var newCPAy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[5];
                var newCPBx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[6];
                var newCPBy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[7];
                
                ////CHECK IF MOVE TO LINE
                if(splitPath[a].charAt(0).toUpperCase() == 'M' && splitPath[a+1].charAt(0).toUpperCase() == 'L') {
                    
                    if(svgShape.search('star') < 0) {
                        //prepare last control point
                        lastCP = [newCPAx, newCPAy];
                        //copy first coordinates to last
                        lastCoor = [newAx, newAy, 'Z'];

                        newPath[i]  = ['M', newAx, newAy];
                        i++;
                        newPath[i] = ['L', newBx, newBy];
                        i++;
                        newPath[i] = ['C', newCPBx, newCPBy];
                        i++;
                    }
                    else {
                        //prepare last control point
                        lastCP = [newCPAx, newCPAy];
                        //copy first coordinates to last
                        lastCoor = [newAx, newAy, 'Z'];

                        newPath[i]  = ['M', newAx, newAy];
                        i++;
                        newPath[i] = ['L', Bx, By];
                        i++;  
                    }
                }

                //CHECK IF MOVE TO CURVE
                else if(splitPath[a].charAt(0).toUpperCase() == 'M' && splitPath[a+1].charAt(0).toUpperCase() == 'C') {
                    
                    lastCoor = [splitPath[a].split(' ')[1], splitPath[a].split(' ')[2], 'Z'];

                    newPath[i] = [];
                    for(var b = 0; b < splitPath[a].split(' ').length; b++) {
                        newPath[i].push(splitPath[a].split(' ')[b]);
                    }
                    i++;

                }

                //CHECK IF LINE TO LINE
                else if(splitPath[a].charAt(0).toUpperCase() == 'L' && splitPath[a+1].charAt(0).toUpperCase() == 'L') {
                    
                    if(svgShape.search('star') < 0) {
                        newPath[i] = [newCPAx, newCPAy, newAx, newAy];
                        i++;
                        newPath[i] = ['L', newBx, newBy];
                        i++;
                        newPath[i] = ['C', newCPBx, newCPBy];
                        i++;
                    }
                    else {
                        if(a%2 != 0) {
                            newPath[i] = ['L', newBx, newBy];
                            i++;
                            newPath[i] = ['C', newCPBx, newCPBy];
                            i++;
                        }
                        else {
                            newPath[i] = [newCPAx, newCPAy, newAx, newAy];
                            i++;
                            newPath[i] = ['L', Bx, By];
                            i++;
                  
                        }
                    } 
                }

                //CHECK IF CURVE TO CURVE
                else if(splitPath[a].charAt(0).toUpperCase() == 'C' && splitPath[a+1].charAt(0).toUpperCase() == 'C') {
                    
                    newPath[i] = [];
                    for(var b = 0; b < splitPath[a].split(' ').length; b++) {
                        newPath[i].push(splitPath[a].split(' ')[b]);
                    }
                    i++;
                }
            }
            else {
                
                var Ax = Number(splitPath[a].split(' ')[1]);
                var Ay = Number(splitPath[a].split(' ')[2]);

                //if splitpath is not null or go back from the start
               
                var Bx = Number(splitPath[0].split(' ')[1]);
                var By = Number(splitPath[0].split(' ')[2]);

                var newAx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[0];
                var newAy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[1];
                var newBx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[2];
                var newBy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[3];
                var newCPAx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[4];
                var newCPAy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[5];

                
                //check then if initial line is straight
                if(splitPath[a].charAt(0).toUpperCase() == 'Z' && splitPath[0].charAt(0).toUpperCase() == 'M') {
                    
                    if(splitPath[a-1].split(' ')[0] == 'L') {
                        newPath[i] = lastCP;
                        i++;
                        newPath[i] = lastCoor;
                    }
                    else if(splitPath[a-1].split(' ')[0] == 'C') {
                        newPath[i] = [];
                        for(var b = 0; b < splitPath[a-1].split(' ').length; b++) {
                            newPath[i].push(splitPath[a-1].split(' ')[b]);
                        }
                        i++;
                        newPath[i] = ['Z'];

                    }
                    
            
                }
            }
            
        }

        //now connect the loose ends
        var finalPath = "";
        for(var a = 0; a < newPath.length; a++) {
            
            if(newPath[a].length > 0) {
                for(var b = 0; b < newPath[a].length; b++) {
                    finalPath += newPath[a][b];
                    finalPath += ' ';
                }
            }
         
        }
        
        cnvLayers[e].querySelectorAll('path')[0].setAttribute('d', finalPath);
        cnvLayers[e].querySelectorAll('path')[1].setAttribute('d', finalPath);
        cnvLayers[e].querySelectorAll('path')[2].setAttribute('d', finalPath);
    }

    else if(svgType == 'rect') {
        cnvLayers[e].querySelectorAll('rect')[1].setAttribute('rx', cornerRadius);
        cnvLayers[e].querySelectorAll('rect')[2].setAttribute('rx', cornerRadius);
        cnvLayers[e].querySelectorAll('rect')[3].setAttribute('rx', cornerRadius);
    }
}

function renderSVG(e) {

    var n = Number(cnvLayers[e].dataset.thumbno);

    var getSVG = configScroll[3].querySelector(`[data-thumbno = "${n}"]`).children[0].children[0];

    cnvLayers[e].innerHTML = getSVG.outerHTML;

    //process the svg and add <g> tag
    var svgChild = cnvLayers[e].children[0].children[0].outerHTML;
    
    //add the <g> tag
    cnvLayers[e].children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;

    //add the svgChild back
    cnvLayers[e].children[0].children[0].innerHTML = svgChild;

    //register the default Width and Height of this SVG
    svgOldW[e] = Number(cnvLayers[e].children[0].getAttribute('viewBox').split(' ')[2]);
    svgOldH[e] = Number(cnvLayers[e].children[0].getAttribute('viewBox').split(' ')[3]);
    
    var panel = configScroll[5].querySelector(`[data-layer='${e}']`);

    //get fill and stroke color
    var fillColor = panel.querySelector('.txtVectorFillColor').value;
    var strokeColor = panel.querySelector('.txtVectorStrokeColor').value;
    var strokeWidth = Number(panel.querySelector('.txtVectorStrokeWidth').value);
    
    //position both children as absolute
    cnvLayers[e].children[0].setAttribute('width', cnvLayers[e].clientWidth);
    cnvLayers[e].children[0].setAttribute('height', cnvLayers[e].clientHeight);
    cnvLayers[e].children[0].setAttribute('viewBox', `0 0 ${cnvLayers[e].clientWidth} ${cnvLayers[e].clientHeight}`)

    var newW = Number(cnvLayers[e].children[0].getAttribute('width'));
    var newH = Number(cnvLayers[e].children[0].getAttribute('height'));
    var scaleX = newW / svgOldW[e];
    var scaleY = newH / svgOldH[e];

    var svgType = cnvLayers[e].querySelector('g').children[0].tagName;

    if(svgType == 'path') {

        //get path string
        var path = cnvLayers[e].querySelector('path').getAttribute('d');
        
        //create regex
        const regex = /([a-zA-Z])([^a-zA-z]*)/gi;
        
        var match;
        var newPath = "";

        while ((match = regex.exec(path)) !== null) {
            
            if(match[1].toUpperCase() != 'Z') {
            
                if(match[1].toUpperCase() == 'M') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'L') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'H') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
            
                    newPath += `${match[1]} ${val1}`;

                }
                else if(match[1].toUpperCase() == 'V') {
                    var val2 = Number(match[2].split(' ')[0]) * scaleY;

                    newPath += `${match[1]} ${val2}`;
                }
                
                else if(match[1].toUpperCase() == 'C') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    var val5 = Number(match[2].split(' ')[4]) * scaleX;
                    var val6 = Number(match[2].split(' ')[5]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6}`;

                }
                
                else if(match[1].toUpperCase() == 'S') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'Q') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'T') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;

                }
                else if(match[1].toUpperCase() == 'A') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[0]);
                    var val4 = Number(match[2].split(' ')[1]);

                    var val5 = Number(match[2].split(' ')[0]);
                    var val6 = Number(match[2].split(' ')[1]) * scaleY;

                    var val7 = Number(match[2].split(' ')[0]) * scaleX;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6} ${val7}`;
                }

            }
            else {
                newPath += 'Z';
            }

        }

        var appendDefs = `
        <mask id="vectorMask${e}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g style="mix-blend-mode:normal" opacity="1">
                <path d="${newPath}" fill="black" />
            </g>
        </mask>`
        cnvLayers[e].children[0].insertAdjacentHTML('afterbegin', appendDefs);
        cnvLayers[e].children[0].children[1].querySelector('path').setAttribute('d', newPath);
        
        var node  = cnvLayers[e].children[0].children[1];
        var clone = node.cloneNode(true);
        cnvLayers[e].children[0].appendChild(clone)

        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${e})`);
        cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);
        
        cnvLayers[e].querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        cnvLayers[e].querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }

    else if(svgType == 'ellipse') {
        var cx = Number(cnvLayers[e].querySelector('ellipse').getAttribute('cx'));
        var cy = Number(cnvLayers[e].querySelector('ellipse').getAttribute('cy'));
        var rx = Number(cnvLayers[e].querySelector('ellipse').getAttribute('rx'));
        var ry = Number(cnvLayers[e].querySelector('ellipse').getAttribute('ry'));

        var appendDefs = `
        <mask id="vectorMask${e}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g>
                <ellipse cx="${cx * scaleX}" cy="${cy * scaleY}" rx="${rx * scaleX}" ry="${ry * scaleY}" fill="black" />
            </g>
        </mask>`

        cnvLayers[e].children[0].insertAdjacentHTML('afterbegin', appendDefs);
        cnvLayers[e].children[0].children[1].querySelector('ellipse').setAttribute('cx', cx * scaleX);
        cnvLayers[e].children[0].children[1].querySelector('ellipse').setAttribute('cy', cy * scaleY);
        cnvLayers[e].children[0].children[1].querySelector('ellipse').setAttribute('rx', rx * scaleX);
        cnvLayers[e].children[0].children[1].querySelector('ellipse').setAttribute('ry', ry * scaleY);

        var node  = cnvLayers[e].children[0].children[1];
        var clone = node.cloneNode(true);
        cnvLayers[e].children[0].appendChild(clone);

        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${e})`);
        cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        cnvLayers[e].querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        cnvLayers[e].querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);

    }

    else if(svgType == 'rect') {
 
        var rx = 0;
        var ry = 0;
        var rw = cnvLayers[e].clientWidth;
        var rh = cnvLayers[e].clientHeight;

        var appendDefs = `
        <mask id="vectorMask${e}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g>
                <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="black" />
            </g>
        </mask>`

        cnvLayers[e].children[0].insertAdjacentHTML('afterbegin', appendDefs);
        cnvLayers[e].children[0].children[1].querySelector('rect').setAttribute('x', rx);
        cnvLayers[e].children[0].children[1].querySelector('rect').setAttribute('y', ry);
        cnvLayers[e].children[0].children[1].querySelector('rect').setAttribute('width', rw);
        cnvLayers[e].children[0].children[1].querySelector('rect').setAttribute('height', rh);

        var node  = cnvLayers[e].children[0].children[1];
        var clone = node.cloneNode(true);
        cnvLayers[e].children[0].appendChild(clone);

        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        cnvLayers[e].querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${e})`);
        cnvLayers[e].querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        cnvLayers[e].querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        cnvLayers[e].querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }
    
    cnvLayers[e].children[0].setAttribute('width', cnvLayers[e].clientWidth + strokeWidth*2);
    cnvLayers[e].children[0].setAttribute('height', cnvLayers[e].clientHeight + strokeWidth*2);
    cnvLayers[e].children[0].setAttribute('viewBox', `0 0 ${cnvLayers[e].clientWidth + strokeWidth*2} ${cnvLayers[e].clientHeight + strokeWidth*2}`);

    cnvLayers[e].children[0].style.left = 0 - (cnvLayers[e].children[0].clientWidth - cnvLayers[e].clientWidth) / 2 + 'px';
    cnvLayers[e].children[0].style.top = 0 - (cnvLayers[e].children[0].clientHeight - cnvLayers[e].clientHeight) / 2 + 'px';

    curveSVG(e)
}


//======================CREATE LINE===================

function createLine(e) {
    
    var panel = configScroll[5].querySelector(`[data-layer='${e}']`);

    //get fill and stroke color
    //var fillColor = panel.querySelector('.txtVectorFillColor').value;
    var strokeColor = panel.querySelector('.txtVectorStrokeColor').value;
    var strokeWidth = Number(panel.querySelector('.txtVectorStrokeWidth').value);
      
 
    //create div start line
    var divLineStart = document.createElement('div');
    divLineStart.innerHTML = elements[1].source;
    divLineStart.classList.add('divLineStart');
    cnvLayers[e].appendChild(divLineStart);

    //reposition divLineStart SVG
    divLineStart.style.width = `${strokeWidth*4}px`;
    divLineStart.style.minWidth = `${strokeWidth*4}px`;

    var divLineMid = document.createElement('div');
    divLineMid.innerHTML = elements[0].source;
    divLineMid.classList.add('divLineMid');
    cnvLayers[e].appendChild(divLineMid);

    var pathW = Number(divLineMid.children[0].getAttribute('width'));
    var pathH = Number(divLineMid.children[0].getAttribute('height'));
    divLineMid.querySelector('path').setAttribute('d', `M0 ${pathH/2}H${pathW}`)

    var divLineEnd = document.createElement('div');
    divLineEnd.innerHTML = elements[1].source;
    divLineEnd.classList.add('divLineEnd');
    cnvLayers[e].appendChild(divLineEnd);

    //reposition divLineEnd SVG
    divLineEnd.style.width = `${strokeWidth*4}px`;
    divLineEnd.style.minWidth = `${strokeWidth*4}px`;

    var paths = cnvLayers[e].querySelectorAll('path');
    paths.forEach(function(input) {
        input.setAttribute('stroke', '#' + strokeColor);
        input.setAttribute('stroke-width', strokeWidth);
        input.setAttribute('vector-effect', 'non-scaling-stroke');
    })

    cnvLayers[e].style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
    cnvLayers[e].style.height =  `${strokeWidth*5}px`;
    cnvLayers[e].style.minHeight =  `${strokeWidth*5}px`;
    cnvLayers[e].style.minWidth = cnvLayers[e].clientHeight * 2 + 'px';
    cnvLayers[e].style.left = `${(txtSizeWidth.value / 2) - (cnvLayers[e].clientWidth/2)}px`;
    cnvLayers[e].style.top = `${(txtSizeHeight.value / 2) - (cnvLayers[e].clientHeight/2)}px`;

}

function organizeLine(e) {
    var panel = configScroll[5].querySelector(`[data-layer="${e}"]`)
    var startHead = panel.querySelector('.dropdownLineStart').querySelector('svg').id;
    var endHead = panel.querySelector('.dropdownLineEnd').querySelector('svg').id;

    var strokeColor = panel.querySelector('.txtVectorStrokeColor').value;
    var strokeWidth = Number(panel.querySelector('.txtVectorStrokeWidth').value);

    var divLineStart = cnvLayers[e].querySelector('.divLineStart');
    var divLineMid = cnvLayers[e].querySelector('.divLineMid');
    var divLineEnd = cnvLayers[e].querySelector('.divLineEnd');

    for(var a = 0; a < elements.length; a++) {
        if(elements[a].id == startHead) {

            divLineStart.innerHTML = elements[a].source;
            //start with starthead
            if(startHead == "line miter") {
                cnvLayers[e].querySelector('.divLineStart').style.display = "none";

                var pathW = Number(divLineMid.clientWidth);
                var pathH = Number(divLineMid.clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

            }
            else if(startHead == "line round") {
                //redraw path 1px smaller from both ends
                divLineStart.style.display = "flex";
                
                var pathW = Number(divLineStart.children[0].getAttribute('width'));
                var pathH = Number(divLineStart.children[0].getAttribute('height'));
                divLineStart.querySelector('path').setAttribute('d', `M${3} ${pathH/2}H${pathW}`)
                divLineStart.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineStart.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineStart.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

                pathW = Number(cnvLayers[e].clientWidth - divLineEnd.clientWidth - divLineStart.clientWidth);
                pathH = Number(cnvLayers[e].clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').style.width = pathW + 'px'
                divLineMid.querySelector('svg').style.height = pathH + 'px'
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');
            }
            else {

                divLineStart.style.display = "flex";
                
                //all paths for any custom heads
                var paths = divLineStart.querySelectorAll('path');
                paths.forEach(function(input) {
                    input.setAttribute('stroke', '#' + strokeColor);
                    input.setAttribute('stroke-width', strokeWidth);
                    input.setAttribute('vector-effect', 'non-scaling-stroke');
                    
                    if(elements[a].fill == 'true') {
                        input.setAttribute('fill', '#' + strokeColor);
                    }
                    else if(elements[a].fill == 'false') {
                        input.setAttribute('fill', 'transparent');
                    }
                })
                
                pathW = Number(cnvLayers[e].clientWidth - divLineEnd.clientWidth - divLineStart.clientWidth);
                pathH = Number(cnvLayers[e].clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').style.width = pathW + 'px'
                divLineMid.querySelector('svg').style.height = pathH + 'px'
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');
            }
        }

        if(elements[a].id == endHead) {

            divLineEnd.innerHTML = elements[a].source;
            //start with endhead
            if(endHead == "line miter") {
                cnvLayers[e].querySelector('.divLineEnd').style.display = "none";

                var pathW = Number(divLineMid.clientWidth);
                var pathH = Number(divLineMid.clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');
            }
            else if(endHead == "line round") {
                divLineEnd.style.display = "flex";
            
                var pathW = Number(divLineEnd.children[0].getAttribute('width'));
                var pathH = Number(divLineEnd.children[0].getAttribute('height'));
                divLineEnd.querySelector('path').setAttribute('d', `M${3} ${pathH/2}H${pathW}`)
                divLineEnd.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineEnd.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineEnd.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

                pathW = Number(cnvLayers[e].clientWidth - divLineEnd.clientWidth - divLineStart.clientWidth);
                pathH = Number(cnvLayers[e].clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').style.width = pathW + 'px'
                divLineMid.querySelector('svg').style.height = pathH + 'px'
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');
            }
            else {
                cnvLayers[e].querySelector('.divLineEnd').style.display = "flex";
                        
                var paths = divLineEnd.querySelectorAll('path');
                paths.forEach(function(input) {
                    input.setAttribute('stroke', '#' + strokeColor);
                    input.setAttribute('stroke-width', strokeWidth);
                    input.setAttribute('vector-effect', 'non-scaling-stroke');
                    
                    if(elements[a].fill == 'true') {
                        input.setAttribute('fill', '#' + strokeColor);
                    }
                    else if(elements[a].fill == 'false') {
                        input.setAttribute('fill', 'transparent');
                    }
                })

                pathW = Number(cnvLayers[e].clientWidth - divLineEnd.clientWidth - divLineStart.clientWidth);
                pathH = Number(cnvLayers[e].clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').style.width = pathW + 'px'
                divLineMid.querySelector('svg').style.height = pathH + 'px'
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');
            }
        }
    }
}

function renderLine(e) {
    var panel = configScroll[5].querySelector(`[data-layer="${e}"]`)
    var startHead = panel.querySelector('.dropdownLineStart').querySelector('svg').id;
    var endHead = panel.querySelector('.dropdownLineEnd').querySelector('svg').id;

    for(var a = 0; a < elements.length; a++) {
        if(elements[a].id == startHead) {
            organizeLine(e)
        }
        if(elements[a].id == endHead) {
            organizeLine(e)
        }
    }   
}

