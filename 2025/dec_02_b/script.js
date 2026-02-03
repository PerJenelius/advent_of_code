'use strict';

const app = {
    testAnswer: 0,
    realAnswer: 0,
};

const addInvalidIDs = (indata) => {
    let sumOfIndvalidIDs = 0;
    const ranges = indata.split(',');
    for (let range of ranges) {
        const startNumber = parseInt(range.split('-')[0]);
        const endNumber = parseInt(range.split('-')[1]);
        for (let i = startNumber; i <= endNumber; i++) {
            const numberString = i.toString();
            let maxLength = Math.floor(numberString.length / 2);
            let invalidCases = 0;
            for (let j=1; j<=maxLength; ++j) {
                let invalid = true;
                const parts = [];
                for (let k=0; k<numberString.length; k=k+j) {
                    parts.push(numberString.substring(k, k+j));
                }
                for (let part of parts) {
                    if (part !== parts[0]) {
                        invalid = false;
                    }
                }
                if (invalid) {
                    ++invalidCases;
                }
            }
            if (invalidCases > 0) {
                sumOfIndvalidIDs += i;
            }
        }
    }
    return sumOfIndvalidIDs;
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