'use strict';

const app = {
    testAnswer: 0,
    realAnswer: 0,
};

const getMaximumJoltage = (indata) => {
    let maximumJoltage = 0;
    const banks = getData(indata);
    for (let bank of banks) {
        
    }
    return maximumJoltage;
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
    app.testAnswer = getMaximumJoltage(testData());
    // app.realAnswer = getMaximumJoltage(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}