'use strict';

const app = {
    startPosition: 50,
    testAnswer: 0,
    realAnswer: 0,
};

const getCombination = (indata) => {
    const datalines = indata.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    let position = app.startPosition;
    let numberOfZeroes = 0;
    for (let dataline of datalines) {
        let rotations = parseInt(dataline.substr(1));
        for (let i = 0; i < rotations; i++) {
            if (dataline[0] === 'L') {
                if (position === 0) {
                    position = 99;
                } else if (position === 1) {
                    position = 0;
                    ++numberOfZeroes;
                } else {
                    position -= 1;
                }
            }
            else if (dataline[0] === 'R') {
                if (position === 99) {
                    position = 0;
                    ++numberOfZeroes;
                } else {
                    ++position;
                }
            }
        }
    }
    return numberOfZeroes;
}

const updateTemplate = () => {
    document.querySelector('#test-answer').innerHTML = app.testAnswer;
    document.querySelector('#real-answer').innerHTML = app.realAnswer;
}

const main = () => {
    app.testAnswer = getCombination(testData());
    app.realAnswer = getCombination(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}