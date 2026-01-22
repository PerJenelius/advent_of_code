'use strict';

const app = {
    startPosition: 50,
    testAnswer: 0,
    realAnswer: 0,
};

const getSumOfMathProblems = (indata) => {
    const datarows = getData(indata);
    const problems = getProblems(datarows);

    // console.log("datarows", datarows);
    // console.log("problems", problems);

    let sumOfMathProblems = 0;
    for (let problem of problems) {
        switch (problem.operator) {
            case "+": sumOfMathProblems += addNumbers(problem.numbers); break;
            case "*": sumOfMathProblems += multiplyNumbers(problem.numbers); break;
        }
    }
    return sumOfMathProblems;
}

const addNumbers = (problem) => {
    let sum = 0;
    for (let number of problem) {
        sum += parseInt(number);
    }
    return sum;
}

const multiplyNumbers = (problem) => {
    let sum = 1;
    for (let number of problem) {
        sum *= parseInt(number);
    }
    return sum;
}

const getProblems = (datarows) => {
    const problems = [];
    let factors = [];
    let numberCount = 0;
    let operator = "";
    // for (let x = 0; x < datarows[0].length; ++x) {
    for (let x = datarows[0].length -1; x >= 0; --x) {
        let spaceCount = 0;
        for (let y = 0; y < datarows.length; ++y) {
            if (datarows[y][x] === " ") {
                ++spaceCount;
            }
            else if (["*", "+"].includes(datarows[y][x])) {
                operator = datarows[y][x];
            } else {
                factors[numberCount] += datarows[y][x];
            }
        }
        if (spaceCount >= 4) {
            problems.push({ "operator": operator, "numbers": getNumbers(factors) });
            factors = [];
            numberCount = 0;
        }
        ++numberCount;
    }
    problems.push({ "operator": operator, "numbers": getNumbers(factors) });
    return problems;
}

const getNumbers = (factors) => {
    const numbers = [];
    factors.map((factor) => {
        numbers.push(
            parseInt(factor.replace('undefined', ''))
        );
    });
    return numbers;
}

const getData = (indata) => {
    return indata.split('\n')
        .filter(line => line.length > 0);
}

const updateTemplate = () => {
    document.querySelector('#test-answer').innerHTML = app.testAnswer;
    document.querySelector('#real-answer').innerHTML = app.realAnswer;
}

const main = () => {
    app.testAnswer = getSumOfMathProblems(testData());
    app.realAnswer = getSumOfMathProblems(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}