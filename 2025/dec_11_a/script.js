'use strict';

const app = {
    testAnswer: 0,
    realAnswer: 0,
};

const getConnectionCount = (indata, startpoint, endpoint) => {
    const pathways = [];
    const connections = getConnections(indata);
    const startingPoint = connections.find(c => c.device === startpoint);
    for (let output of startingPoint.outputs) {
        pathways.push([startingPoint.device, output]);
    }
    let running = true;
    do {
        for (let i = 0; i < pathways.length; ++i) {
            const device = pathways[i].at(-1);
            for (let connection of connections) {
                if (connection.device === device) {
                    for (let output of connection.outputs) {
                        if (!pathways[i].includes(output)) {
                            pathways.push([...pathways[i], output]);
                        }
                    }
                    pathways.splice(i, 1);
                }
            }
        }
        running = pathways.filter(p => p.at(-1) !== endpoint).length > 0;
    } while (running)
    return pathways.length;
}

const getConnections = (indata) => {
    const datarows = getData(indata);
    const connections = [];
    for (let datarow of datarows) {
        const device = datarow.split(":")[0];
        const outputs = datarow
            .split(": ")[1].split(" ");
        connections.push({"device": device, "outputs": outputs});
    }
    return connections;
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
    app.testAnswer = getConnectionCount(testData(), "you", "out");
    app.realAnswer = getConnectionCount(realData(), "you", "out");
    updateTemplate();
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}