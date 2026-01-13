'use strict';

const app = {
    startPosition: 50,
    testAnswer: 0,
    realAnswer: 0,
};

const getNumberOfFreshIngredients = (indata) => {
    const datarows = getData(indata);
    let freshIngredients = [];
    const freshIDRanges = getFreshIDRanges(datarows);
    for (let datarow of datarows) {
        if (datarow.includes("-")) { continue }
        let articleID = parseInt(datarow);
        for (let freshIDRange of freshIDRanges) {
            if (articleID >= freshIDRange.start && articleID <= freshIDRange.end) {
                if (!freshIngredients.includes(articleID)) {
                    freshIngredients.push(articleID);
                }
            }
        }
    }
    return freshIngredients.length;
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
    app.testAnswer = getNumberOfFreshIngredients(testData());
    app.realAnswer = getNumberOfFreshIngredients(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}