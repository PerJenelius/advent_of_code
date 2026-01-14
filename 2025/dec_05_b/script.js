'use strict';

const app = {
    startPosition: 50,
    testAnswer: 0,
    realAnswer: 0,
};

const getIDsOfFreshIngredients = (indata) => {
    const datarows = getData(indata);
    let freshIngredientIDCount = 0;
    const freshIDRanges = getFreshIDRanges(datarows);
    for (let i = 0; i < freshIDRanges.length; ++i) {
        const range = freshIDRanges[i];
        let rangeSize = (range.end - range.start) + 1;
        for (let j = 0; j < i; ++j) {
            const newRange = freshIDRanges[j];
            if (range.start < newRange.start && range.end > newRange.start) {
                rangeSize -= (range.end - newRange.start) + 1;
            }
            else if (range.end > newRange.end && range.start < newRange.end) {
                rangeSize -= (newRange.end - range.start) + 1;
            }
        }
        freshIngredientIDCount += rangeSize;
    }
    return freshIngredientIDCount;
}

const getFreshIDRanges = (datarows) => {
    const freshIDs = [];
    for (let datarow of datarows) {
        if (!datarow.includes("-")) { continue }
        const startNumber = parseInt(datarow.split("-")[0]);
        const endNumber = parseInt(datarow.split("-")[1]);
        freshIDs.push({"start": startNumber, "end": endNumber});
    }
    return freshIDs;
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
    app.testAnswer = getIDsOfFreshIngredients(testData());
    app.realAnswer = getIDsOfFreshIngredients(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}