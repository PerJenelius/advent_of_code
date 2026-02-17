'use strict';

const app = {
    testAnswer: 0,
    realAnswer: 0,
    bankLength: 12
};

const getMaximumJoltage = (indata) => {
    let maximumJoltage = 0;
    const banks = getData(indata);
    for (let bank of banks) {
        let joltage = "";
        let startIndex = 0;
        let added = false;
        for (let joltIndex = 0; joltIndex < app.bankLength; ++joltIndex) {
            added = false;
            for (let digit = 9; digit >= 0; --digit) {
                for (let bankIndex = startIndex; bankIndex < bank.length; ++bankIndex) {
                    const remainder = bank.length - bankIndex;
                    const capacity = app.bankLength - joltage.length;
                    if (parseInt(bank[bankIndex]) === digit && remainder >= capacity && !added) {
                        joltage += digit.toString();
                        startIndex = bankIndex + 1;
                        added = true;
                        break;
                    }
                }
            }
        }
        maximumJoltage += parseInt(joltage);
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