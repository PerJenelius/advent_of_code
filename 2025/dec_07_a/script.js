'use strict';

const app = {
    testAnswer: 0,
    realAnswer: 0,
};

const getNumberOfSplits = (indata) => {
    const datarows = getData(indata);
    const splitIndices = [];
    let numberOfSplits = 0;
    splitIndices.push(datarows[0].indexOf("S"));
    for (let datarow of datarows) {
        for (let i = 0; i < datarow.length; ++i) {
            if (datarow[i] === "^" && splitIndices.includes(i)) {
                ++numberOfSplits;
                splitIndices.splice(splitIndices.indexOf(i), 1);
                if (!splitIndices.includes(i-1) && i-1 >= 0) {
                    splitIndices.push(i-1);
                }
                if (!splitIndices.includes(i+1) && i+1 < datarow.length) {
                    splitIndices.push(i+1);
                }
            }
        }
    }
    return numberOfSplits;
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
    app.testAnswer = getNumberOfSplits(testData());
    app.realAnswer = getNumberOfSplits(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}