'use strict';

const app = {
    startPosition: 50,
    testAnswer: 0,
    realAnswer: 0,
};

const getCircuitSizes = (indata, operations) => {
    const datarows = getData(indata);
    const distances = getDistances(datarows, operations);
    const ccts = [];
    for (let i = 0; i < datarows.length; ++i) {
        let indexes = [];
        for (let j = 0; j < distances.length; ++j) {
            if (distances[j].box1 === i || distances[j].box2 === i) {
                indexes.push([j]);
            }
        }
        if (indexes.length === 0) {
            ccts.push([i]);
            continue;
        }
        for (let index of indexes) {
            const distance = distances[index];
            let index1 = -1, index2 = -1;
            for (let k = 0; k < ccts.length; ++k) {
                if (ccts[k].includes(distance.box1)) {
                    index1 = k;
                }
                if (ccts[k].includes(distance.box2)) {
                    index2 = k;
                }
            }
            if (index1 > 0 && index2 > 0) {
                // konkatinera arrayer?
                continue;
            }
            else if (index1 > 0 && !ccts[index1].includes(distance.box2)) {
                ccts[index1].push(distance.box2);
            }
            else if (index2 > 0 && !ccts[index2].includes(distance.box1)) {
                ccts[index2].push(distance.box1);
            } else {
                ccts.push([i]);
            }
        }
    }
    const circuits = ccts.sort((a,b) => b.length - a.length).slice(0, 3);
    
    console.log("distances", distances);
    console.log("circuits", ccts);
    console.log("sortedCircuits", circuits);

    let circuitSizes = 1;
    for (let circuit of circuits) {
        circuitSizes *= circuit.length;
    }

    return circuitSizes;
}

const getDistances = (datarows, operations) => {
    let distances = [];
    for (let i = 0; i < datarows.length; ++i) {
        const p = getCoordinates(datarows[i]);
        for (let j = i+1; j < datarows.length; ++j) {
            const q = getCoordinates(datarows[j]);
            const distance = Math.sqrt(
                (p[0]- q[0])**2 + (p[1]- q[1])**2 + (p[2]- q[2])**2
            );
            distances.push({
                "box1": i,
                "box2": j,
                "distance": distance
            });
        }
    }
    return distances
        .sort((a, b) => a.distance - b.distance)
        .slice(0, operations);
}

const getCoordinates = (datarow) => {
    return datarow.split(',')
        .map((coord) => parseInt(coord));
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
    app.testAnswer = getCircuitSizes(testData(), 10);
    app.realAnswer = getCircuitSizes(realData(), 1000);
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}