'use strict';

const app = {
    testAnswer: 0,
    realAnswer: 0,
};

const addInvalidIDs = (indata) => {
    let numberOfIndvalidIDs = 0;
    const ranges = indata.split(',');
    for (let range of ranges) {
        const startNumber = parseInt(range.split('-')[0]);
        const endNumber = parseInt(range.split('-')[1]);
        for (let i = startNumber; i <= endNumber; i++) {
            const numberString = i.toString();
            if (numberString.length % 2 !== 0) {
                continue;
            }
            const halfwayIndex = Math.floor(numberString.length / 2);
            const firstHalf = numberString.substring(0, halfwayIndex);
            const secondHalf = numberString.substring(halfwayIndex);
            if (firstHalf === secondHalf) {
                numberOfIndvalidIDs += i;
            }
        }
    }
    return numberOfIndvalidIDs;
}

const updateTemplate = () => {
    document.querySelector('#test-answer').innerHTML = app.testAnswer;
    document.querySelector('#real-answer').innerHTML = app.realAnswer;
}

const main = () => {
    app.testAnswer = addInvalidIDs(testData());
    app.realAnswer = addInvalidIDs(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}