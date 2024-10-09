
var elementCategory = [];

elementCategory[0] = "Shapes";


//=======================VECTOR ELEMENTS=========================

var elements = [];

elements[0] = {
    id: 'line',
    type: 'line',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'shapes, straight line, regular line',
    source: `<svg id="line" width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 1L18 1" stroke="white" stroke-width="1"/>
    </svg>`,
}

elements[1] = {
    id: 'line miter',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line miter, blunt line, square line',
    source: ``,
}


elements[2] = {
    id: 'line round',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line round, round line',
    source: `<svg id="line" width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 1L18 1" stroke="white" stroke-width="1" stroke-linecap="round"/>
    </svg>`,
    }

elements[3] = {
    id: 'line arrow',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line arrow',
    source: `<svg id="line arrow" width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 1L1 3.5L3.5 6M1.5 3.5H6" stroke="white"/>
    </svg>`,
}

elements[4] = {
    id: 'line arrow fill',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'true',
    tags: 'line arrow, arrowhead, arrow head, arrow fill',
    source: `<svg id="line arrow fill" width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2.5L5 4V2.5V1L2 2.5Z" fill="white"/>
    <path d="M5 2.5V4L2 2.5L5 1V2.5ZM5 2.5H6" stroke="white"/>
    </svg>`,
}

elements[5] = {
    id: 'line circle',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line circle, line ellipse',
    source: `<svg id="line circle" width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2.5C5 3.60457 4.10457 4.5 3 4.5C1.89543 4.5 1 3.60457 1 2.5C1 1.39543 1.89543 0.500004 3 0.500004C4.10457 0.500004 5 1.39543 5 2.5ZM5 2.5H6" stroke="white"/>
    </svg>`,
}

elements[6] = {
    id: 'line circle fill',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'true',
    tags: 'line circle, line ellipse, line circle fill, line ellipse fill',
    source: `<svg id="line circle fill" width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2.5C5 3.60457 4.10457 4.5 3 4.5C1.89543 4.5 1 3.60457 1 2.5C1 1.39543 1.89543 0.500004 3 0.500004C4.10457 0.500004 5 1.39543 5 2.5ZM5 2.5H6" stroke="white" fill="white"/>
    </svg>`,
}

elements[7] = {
    id: 'line diamond',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line diamond',
    source: `<svg id="line diamond" width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3.50001L3 1.50001L1 3.50001L3 5.50001L5 3.50001ZM5 3.50001H6" stroke="white"/>
    </svg>`,
}

elements[8] = {
    id: 'line diamond fill',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'true',
    tags: 'line diamond, line diamond fill',
    source: `<svg id="line diamond fill" width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3.50001L3 1.50001L1 3.50001L3 5.50001L5 3.50001ZM5 3.50001H6" stroke="white" fill="white"/>
    </svg>`,
}

elements[9] = {
    id: 'line square',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line square',
    source: `<svg id="line square" width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2.5V0.500004H1V4.5H5V2.5ZM5 2.5H6" stroke="white"/>
    </svg>`,
}

elements[10] = {
    id: 'line square fill',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'true',
    tags: 'line square, line square fill',
    source: `<svg id="line square fill" width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2.5V0.500004H1V4.5H5V2.5ZM5 2.5H6" stroke="white" fill="white"/>
    </svg>`,
}

elements[11] = {
    id: 'line triangle',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line triangle',
    source: `<svg id="line triangle" width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3.5L1 5.23205L1 1.76795L4 3.5ZM4 3.5L6 3.5" stroke="white"/>
    </svg>`,
}

elements[12] = {
    id: 'line triangle fill',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'true',
    tags: 'line triangle, line triangle fill',
    source: `<svg id="line triangle fill" width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3.5L1 5.23205L1 1.76795L4 3.5ZM4 3.5L6 3.5" stroke="white"/>
    </svg>`,
}


elements[13] = {
    id: 'Circle',
    type: 'vector',
    size: 'mini',
    post: 'center',
    tags: 'shapes, circle, polygon, geometry, round, ellipse',
    source: `<svg id="circle" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="9" cy="9" rx="9" ry="9" fill="white"/>
    </svg>`,
}

elements[14] = {
    id: 'Diamond',
    type: 'vector',
    size: 'mini',
    post: 'center',
    tags: 'shapes, diamond, polygon, geometry, four sides, square, rectangle',
    source: `<svg id="diamond" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0L16 8L8 16L0 8L8 0Z" fill="white"/>
    </svg>`,
}

elements[15] = {
    id: 'Heart',
    type: 'vector',
    size: 'mini',
    post: 'center',
    tags: 'shapes, heart, polygon, geometry, valentines, love, emotion, affection, romance, friendship',
    source: `<svg id="heart" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.0336378 4.47612C0.390511 1.18647 4.69729 -2.50708 8.01808 2.32004C11.3389 -2.50708 15.6045 1.18647 15.9614 4.47612C16.3477 8.03711 13.775 9.48387 10.8298 11.7025C10.3318 12.0157 9.07236 12.9103 8.00794 13.9895C6.95965 12.9103 5.67698 12.0157 5.16526 11.7025C2.66472 9.93548 -0.352672 8.03711 0.0336378 4.47612Z" fill="white"/>
    </svg>`,
}

elements[16] = {
    id: 'Hexagon',
    type: 'vector',
    size: 'mini',
    post: 'center',
    tags: 'shapes, hexagon, polygon, geometry, six sides, honeybee, beehive',
    source: `<svg id="hexagon" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0L13.9282 4V12L7 16L0.0717969 12V4L7 0Z" fill="white"/>
    </svg>`,
}

elements[17] = {
    id: 'Pentagon',
    type: 'vector',
    size: 'mini',
    post: 'center',
    tags: 'shapes, pentagon, polygon, geometry, five sides, pentagram',
    source: `<svg id="pentagon" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0L15.6085 5.52786L12.7023 14.4721H3.29772L0.391548 5.52786L8 0Z" fill="white"/>
    </svg>`,
}

elements[18] = {
    id: 'Square',
    type: 'vector',
    size: 'mini',
    post: 'center',
    tags: 'shapes, square, polygon, geometry, four sides, rectangle, tile, box, grid',
    source: `<svg id="square" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="12" height="12" rx="0.01" fill="white"/>
    </svg>`,
}

elements[19] = {
    id: 'Star',
    type: 'vector',
    size: 'mini',
    post: 'center',
    tags: 'shapes, star, polygon, geometry, celestial, twinkle, costellation, night sky, stellar, glitter, shooting star',
    source: `<svg id="star" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0L10.7273 4.24616L15.6085 5.52786L12.4129 9.43384L12.7023 14.4721L8 12.64L3.29772 14.4721L3.5871 9.43384L0.391548 5.52786L5.27268 4.24616L8 0Z" fill="white"/>
    </svg>`,
}

elements[20] = {
    id: 'Triangle',
    type: 'vector',
    size: 'mini',
    post: 'center',
    tags: 'shapes, triangle, polygon, geometry, pizza, tris',
    source: `<svg id="triangle" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0L0.0717964 12H13.9282L7 0Z" fill="white"/>
    </svg>`,
}




