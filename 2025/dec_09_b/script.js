'use strict';

const app = {
    testAnswer: 0,
    realAnswer: 0,
};

const getLargestRectangle = (indata) => {
    const coordinates = getCoordinates(indata);
    const redGreenTiles = getRedGreenTiles(coordinates);
    let largestRectangle = 0;
    for (let i = 0; i < coordinates.length; ++i) {
        for (let j = i + 1; j < coordinates.length; ++j) {
            const width = Math.abs(coordinates[i].x - coordinates[j].x) + 1;
            const height = Math.abs(coordinates[i].y - coordinates[j].y) + 1;
            const area = width * height;
            largestRectangle = area > largestRectangle ? area : largestRectangle;
        }
    }
    return largestRectangle;
}

const getRedGreenTiles = (coordinates) => {
    const redGreenTiles = [];
    const maxX = coordinates.sort((a,b) => b.x - a.x)[0].x;
    const maxY = coordinates.sort((a,b) => b.y - a.y)[0].y;
    for (let y = 0; y <= maxY; ++y) {
        for (let x = 0; x <= maxX; ++x) {
            
        }
    }

    console.log("coordinates", coordinates);
    console.log("maxX", maxX);
    console.log("maxY", maxY);

    for (let coordinate of coordinates) {

    }
    return redGreenTiles;
}

const getCoordinates = (indata) => {
    const datarows = getData(indata);
    const coordinates = [];
    for (let datarow of datarows) {
        const x = parseInt(datarow.split(',')[0]);
        const y = parseInt(datarow.split(',')[1]);
        coordinates.push({'x': x, 'y': y});
    }
    return coordinates;
}

const getData = (indata) => {
    return indata.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
}

const updateTemplate = () => {
    document.querySelector('#test-answer').innerHTML = app.testAnswer;
    document.querySelector('#real-answer').innerHTML = app.realAnswer;
}

const main = () => {
    app.testAnswer = getLargestRectangle(testData());
    // app.realAnswer = getLargestRectangle(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}