'use strict';

const app = {
    startPosition: 50,
    testAnswer: 0,
    realAnswer: 0,
};

const getMaximumJoltage = (indata) => {
    const banks = getData(indata);
    let maximumJoltage = 0;
    for (let bank of banks) {
        let firstMaxIndex = 0;
        for (let i = 0; i < (bank.length - 1); i++) {
            if (parseInt(bank[i]) > parseInt(bank[firstMaxIndex])) {
                firstMaxIndex = i;
            }
        }
        let secondMaxIndex = firstMaxIndex + 1;
        for (let j = (firstMaxIndex + 1); j < bank.length; j++) {
            if (parseInt(bank[j]) > parseInt(bank[secondMaxIndex])) {
                secondMaxIndex = j;
            }
        }
        maximumJoltage += parseInt(`${bank[firstMaxIndex]}${bank[secondMaxIndex]}`);
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
    app.realAnswer = getMaximumJoltage(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}