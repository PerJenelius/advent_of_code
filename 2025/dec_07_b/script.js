'use strict';

const app = {
    startPosition: 50,
    testAnswer: 0,
    realAnswer: 0,
};

const getNumberOfTimelines = (indata) => {
    const datarows = getData(indata);
    const splitIndices = new Array(datarows[0].length).fill(0);
    const startIndex = datarows[0].indexOf("S");
    splitIndices[startIndex] = 1;
    for (let datarow of datarows) {
        for (let i = 0; i < datarow.length; ++i) {
            if (datarow[i] === "^" && splitIndices[i] > 0) {
                splitIndices[i-1] += splitIndices[i];
                splitIndices[i+1] += splitIndices[i];
                splitIndices[i] = 0;
            }
        }
    }
    let numberOfTimelines = 0;
    splitIndices.map((item) => numberOfTimelines += item);
    return numberOfTimelines;
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
    app.testAnswer = getNumberOfTimelines(testData());
    app.realAnswer = getNumberOfTimelines(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}