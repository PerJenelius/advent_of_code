'use strict';

const app = {
    startPosition: 50,
    testAnswer: 0,
    realAnswer: 0,
};

const getSumOfMathProblems = (indata) => {
    const datarows = getData(indata);
    const problems = getProblems(datarows);
    let sumOfMathProblems = 0;
    for (let problem of problems) {
        let symbol = problem.pop();
        switch (symbol) {
            case "+": sumOfMathProblems += addNumbers(problem); break;
            case "*": sumOfMathProblems += multiplyNumbers(problem); break;
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
    const characters = [];
    for (let datarow of datarows) {
        const figures = datarow.split(" ")
            .filter(line => line.length > 0);
        characters.push(figures);
    }
    for (let i = 0; i < characters[0].length; ++i) {
        const problem = [];
        for (let character of characters) {
            problem.push(character[i]);
        }
        problems.push(problem);
    }
    return problems;
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
    app.testAnswer = getSumOfMathProblems(testData());
    app.realAnswer = getSumOfMathProblems(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}