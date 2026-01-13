'use strict';

const app = {
    startPosition: 50,
    testAnswer: 0,
    realAnswer: 0,
};

const getMaximumJoltage = (indata) => {
    const banks = indata.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    let maximumJoltage = 0;
    for (let bank of banks) {
        
    }
    return maximumJoltage;
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