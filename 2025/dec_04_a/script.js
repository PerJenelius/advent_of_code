'use strict';

const app = {
    startPosition: 50,
    testAnswer: 0,
    realAnswer: 0,
};

const getNumberOfFreeRolls = (indata) => {
    const rows = getData(indata);
    let numberOfFreeRolls = 0;
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[0].length; x++) {
            if (rows[y][x] === ".") {
                continue;
            }
            if (getNumberOfAdjacentRolls(rows, x, y) < 4) {
                ++numberOfFreeRolls;
            }
        }
    }
    return numberOfFreeRolls;
}

const getNumberOfAdjacentRolls = (rows, x, y) => {
    let numberOfAdjacentRolls = 0;
    for (let i = -1; i <= 1; ++i) {
        for (let j = -1; j <= 1; ++j) {
            if (y+i < 0 || y+i >= rows.length || x+j < 0 || x+j >= rows[0].length || (i === 0 && j === 0) ) {
                continue;
            }
            if (rows[y+i][x+j] === "@") {
                ++numberOfAdjacentRolls;
            }
        }
    }
    return numberOfAdjacentRolls;
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
    app.testAnswer = getNumberOfFreeRolls(testData());
    app.realAnswer = getNumberOfFreeRolls(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}