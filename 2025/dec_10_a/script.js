'use strict';

const app = {
    testAnswer: 0,
    realAnswer: 0,
};

const getButtonPressCount = (indata) => {
    const datarows = getData(indata);
    const lightDiagrams = getLightDiagrams(datarows);
    const schematics = getSchematics(datarows);
    let buttonPressCount = 0;
    for (let i = 0; i < lightDiagrams.length; ++i) {
        buttonPressCount += getButtonPresses(lightDiagrams[i], schematics[i]);
    }

    console.log("lightDiagrams", lightDiagrams);
    console.log("schematics", schematics);

    return buttonPressCount;
}

const getButtonPresses = (lightDiagram, schematic) => {
    let buttonPresses = 0;
    const lights = Array(lightDiagram.length).fill(0);
    for (let i = 0; i < schematic.length; ++i) {
        for (j = 0; j <= i; ++j) {
            const buttons = [];
            for (let k = 0; k < schematic.length; ++k) {
                
            }
        }
    }
    return buttonPresses;
}

const getSchematics = (datarows) => {
    const schematics = [];
    for (let datarow of datarows) {
        const configs = datarow
            .split(']')[1].split('{')[0].split(' ');
        const diagram = [];
        for (let config of configs) {
            if (config.length === 0) { continue }
            const buttons = config
                .replace('(', '').replace(')', '')
                .split(',')
                .map(button => {
                    return parseInt(button)
                });
            diagram.push(buttons);
        }
        schematics.push(diagram);
    }
    return schematics;
}

const getLightDiagrams = (datarows) => {
    const lightDiagrams = [];
    for (let datarow of datarows) {
        const config = datarow
            .split(' ')[0]
            .replace('[', '').replace(']', '');
        const diagram = [];
        for (let symbol of config) {
            switch (symbol) {
                case '#': diagram.push(1); break;
                case '.': diagram.push(0); break;
            }
        }
        lightDiagrams.push(diagram);
    }
    return lightDiagrams;
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
    app.testAnswer = getButtonPressCount(testData());
    // app.realAnswer = getButtonPressCount(realData());
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}