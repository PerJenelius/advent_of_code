'use strict';

const app = {
    realAnswer: 0,
    regions: [],
    fields: [],
    fieldDescriptions: [],
    buildCoords: {width: 0, length: 0},
    possible: true
};

const getRegionCount = (indata) => {
    let regionCount = 0;
    const datarows = getData(indata);
    const shapes = getShapes(datarows);
    const regions = getRegions(datarows);
    for (let region of regions) {
        let field = getField(region);
        // Start by stacking all of the 2:s
        field = placeShapeTwo(field, shapes[2], region.presents.find(p => p.index === 2).count);
        // Move on to stacking an equal amount of 4:s and 5:s
        const fourCount = region.presents.find(p => p.index === 4).count;
        const fiveCount = region.presents.find(p => p.index === 5).count;
        let presentCount = fourCount < fiveCount ? fourCount * 2 : fiveCount * 2;
        field = placeFourAndFive(field, [shapes[4], shapes[5]], presentCount);
        region.presents.find(p => p.index === 4).count = fourCount - (presentCount / 2);
        region.presents.find(p => p.index === 5).count = fiveCount - (presentCount / 2);
        // Next, stack the 1:s
        field = placeShapeOne(field, shapes[1], region.presents.find(p => p.index === 1).count);
        // Now stack the 3:s
        field = placeShapeThree(field, shapes[3], region.presents.find(p => p.index === 3).count);
        // Now stack the 0:s
        field = placeShapeZero(field, shapes[0], region.presents.find(p => p.index === 0).count);
        // Now stack any remaining 5:s
        field = placeShapeFive(field, shapes[5], region.presents.find(p => p.index === 5).count);
        // Finally, stack any remaining 4:s
        field = placeShapeFour(field, shapes[4], region.presents.find(p => p.index === 4).count);
        if (app.possible) { 
            ++regionCount;
        }
        app.fields.push(field);
        app.buildCoords = {width: 0, length: 0};
        app.possible = true;
    }
    initateDropdown(datarows);
    app.regions = regions;
    displayField(app.fields[0]);
    return regionCount;
}

const placeShapeZero = (field, shape, presentCount) => {
    let extraline = 1;
    let flipped = false;
    for (let i = 0; i < presentCount; ++i) {
        if (!shapeFitsOnRow(field, shape[0].length)) {
            app.buildCoords = {width: 0, length: app.buildCoords.length + shape.length + extraline};
            extraline = 0;
        }
        if (!rowFitsInField(field, shape.length + 1)) {
            app.possible = false;
            return field;
        }
        const char = flipped ? '+' : 'X';
        field = placeShape(field, shape, char);
        flipped = !flipped;
        app.buildCoords.width += 3;
    }
    return field;
}

const placeShapeOne = (field, shape, presentCount) => {
    let flipped = false;
    for (let i = 0; i < presentCount; ++i) {
        if (!shapeFitsOnRow(field, shape[0].length)) {
            const shapeLength = flipped ? shape.length : shape.length + 1;
            app.buildCoords = {width: 0, length: app.buildCoords.length + shapeLength};
            flipped = false;
        }
        if (!rowFitsInField(field, shape.length + 1)) {
            app.possible = false;
            return field;
        }
        if (!flipped) {
            let newShape = rotateShape(shape, 3);
            field = placeShape(field, newShape, '+');
            app.buildCoords.width += 1;
            app.buildCoords.length += 1;
        }
        else {
            let newShape = rotateShape(shape, 1);
            field = placeShape(field, newShape, 'X');
            app.buildCoords.width += 3;
            app.buildCoords.length -= 1;
        }
        flipped = !flipped;
    }
    if (flipped) {
        app.buildCoords.width += 2;
        app.buildCoords.length -= 1;
    }
    return field;
}

const placeShapeTwo = (field, shape, presentCount) => {
    let flipped = false;
    for (let i = 0; i < presentCount; ++i) {
        if (!shapeFitsOnRow(field, shape[0].length)) {
            app.buildCoords = {width: 0, length: app.buildCoords.length + shape.length};
            flipped = false;
        }
        if (!rowFitsInField(field, shape.length)) {
            app.possible = false;
            return field;
        }
        if (!flipped) {
            field = placeShape(field, shape, '+');
            app.buildCoords.width += 1;
        }
        else {
            let newShape = rotateShape(shape, 2);
            field = placeShape(field, newShape, 'X');
            app.buildCoords.width += 3;
        }
        flipped = !flipped;
    }
    if (flipped) {
        app.buildCoords.width += 2;
    }
    return field;
}

const placeShapeThree = (field, shape, presentCount) => {
    let flipped = false;
    for (let i = 0; i < presentCount; ++i) {
        if (!shapeFitsOnRow(field, shape[0].length)) {
            const shapeLength = flipped ? shape.length : shape.length + 1;
            app.buildCoords = {width: 0, length: app.buildCoords.length + shapeLength};
            flipped = false;
        }
        if (!rowFitsInField(field, shape.length + 1)) {
            app.possible = false;
            return field;
        }
        if (!flipped) {
            field = placeShape(field, shape, 'Z');
            app.buildCoords.width += 2;
            app.buildCoords.length += 1;
            flipped = true;
        }
        else {
            field = placeShape(field, shape, 'o');
            app.buildCoords.width += 2;
            app.buildCoords.length -= 1;
            flipped = false;
        }
    }
    app.buildCoords.width += 1;
    if (flipped) {
        app.buildCoords.length -= 1;
    }
    return field;
}

const placeShapeFour = (field, shape, presentCount) => {
    let flipped = false;
    for (let i = 0; i < presentCount; ++i) {
        if (!shapeFitsOnRow(field, shape[0].length)) {
            app.buildCoords = {width: 0, length: app.buildCoords.length + shape.length};
            flipped = false;
        }
        if (!rowFitsInField(field, shape.length)) {
            app.possible = false;
            return field;
        }
        if (!flipped) {
            let newShape = rotateShape(shape, 2);
            field = placeShape(field, newShape, 'Z');
            app.buildCoords.width += 1;
        }
        else {
            field = placeShape(field, shape, 'o');
            app.buildCoords.width += 3;
        }
        flipped = !flipped;
    }
    if (flipped) {
        app.buildCoords.width += 1;
    }
    return field;
}

const placeShapeFive = (field, shape, presentCount) => {
    let flipped = false;
    for (let i = 0; i < presentCount; ++i) {
        if (!shapeFitsOnRow(field, shape[0].length)) {
            app.buildCoords = {width: 0, length: app.buildCoords.length + shape.length};
            flipped = false;
        }
        if (!rowFitsInField(field, shape.length)) {
            app.possible = false;
            return field;
        }
        if (!flipped) {
            let newShape = rotateShape(shape, 3);
            field = placeShape(field, newShape, '+');
            app.buildCoords.width += 2;
        }
        else {
            let newShape = rotateShape(shape, 1);
            field = placeShape(field, newShape, 'X');
            app.buildCoords.width += 3;
        }
        flipped = !flipped;
    }
    if (flipped) {
        app.buildCoords.width += 1;
    }
    return field;
}

const placeFourAndFive = (field, shapes, presentCount) => {
    let flipped = false;
    let shape = shapes[1];
    for (let i = 0; i < presentCount; ++i) {
        if (!shapeFitsOnRow(field, shape[0].length)) {
            app.buildCoords = {width: 0, length: app.buildCoords.length + shape.length};
            flipped = false;
        }
        if (!rowFitsInField(field, shape.length)) {
            app.possible = false;
            return field;
        }
        switch (shape) {
            case shapes[0]: {
                if (!flipped) {
                    let newShape = rotateShape(shape, 2);
                    field = placeShape(field, newShape, 'X');
                    app.buildCoords.width += 1;
                    flipped = true;
                }
                else {
                    field = placeShape(field, shape, '+');
                    app.buildCoords.width += 2;
                    shape = shapes[1];
                }
            }; break;
            case shapes[1]: {
                if (!flipped) {
                    let newShape = rotateShape(shape, 3);
                    field = placeShape(field, newShape, 'Z');
                    app.buildCoords.width += 2;
                    shape = shapes[0];
                }
                else {
                    let newShape = rotateShape(shape, 1);
                    field = placeShape(field, newShape, 'o');
                    app.buildCoords.width += 3;
                    flipped = false;
                }
            }; break;
        }
    }
    switch (shape) {
        case shapes[0]: {
            if (!flipped) {
                app.buildCoords.width += 1;
            }
            else {
                app.buildCoords.width += 2;
            }
        }; break;
        case shapes[1]: {
            if (flipped) {
                app.buildCoords.width += 1;
            }
        }; break;
    }
    return field;
}

const shapeFitsOnRow = (field, width) => {
    return app.buildCoords.width + width <= field[0].length;
}

const rowFitsInField = (field, length) => {
    return app.buildCoords.length + length <= field.length;
}

const rotateShape = (shape, turns) => {
    for (let i = 0; i < turns; ++i) {
        shape = [
            [shape[2][0], shape[1][0], shape[0][0]],
            [shape[2][1], shape[1][1], shape[0][1]],
            [shape[2][2], shape[1][2], shape[0][2]]
        ];
    }
    return shape;
}

const placeShape = (field, shape, char) => {
    for (let l = 0; l < shape.length; ++l) {
        for (let w = 0; w < shape[l].length; ++w) {
            if (shape[l][w]) {
                field[app.buildCoords.length + l][app.buildCoords.width + w] = char;
            }
        }
    }
    return field;
}

const displayField = (field) => {
    const textarea = document.querySelector('#output');
    textarea.innerHTML = '';
    for (let line of field) {
        for (let char of line) {
            textarea.innerHTML += char;
        }
        textarea.innerHTML += '\n';
    }
}

const initateDropdown = (datarows) => {
    let dataSelect = document.querySelector('#select');
    for (let datarow of datarows) {
        if (!datarow.includes('x')) { continue; }
        let option = document.createElement("option");
        option.text = datarow;
        dataSelect.add(option);
        app.fieldDescriptions.push(datarow);
    }
}

const getShapes = (datarows) => {
    const presents = [];
    let currentPresent = [];
    for (let datarow of datarows) {
        if (datarow.includes("x")) { break; }
        const presentRow = [];
        for (let char of datarow) {
            if (!isNaN(parseInt(char))) {
                if (currentPresent.length === 0) { continue; }
                presents.push(currentPresent);
                currentPresent = [];
                break;
            } 
            else {
                switch (char) {
                    case '#': presentRow.push(true); break;
                    case '.': presentRow.push(false); break;
                }
            }
        }
        if (presentRow.length > 0) {
            currentPresent.push(presentRow);
        }
    }
    presents.push(currentPresent);
    return presents;
}

const getRegions = (datarows) => {
    const regions = [];
    for (let datarow of datarows) {
        if (!datarow.includes('x')) { continue; }
        const width = datarow.split(':')[0].split('x')[0];
        const length = datarow.split(':')[0].split('x')[1];
        const presents = [];
        const presentCount = datarow.split(':')[1].trim().split(' ');
        for (let i = 0; i < presentCount.length; ++i) {
            const count = parseInt(presentCount[i]);
            presents.push({'index': i, 'count': count});
        }
        regions.push({'width': width, 'length': length, 'presents': presents});
    }
    return regions;
}

const getField = (region) => {
    const field = [];
    for (let i = 0; i < region.length; ++i) {
        const line = [];
        for (let j = 0; j < region.width; ++j) {
            line.push('.');
        }
        field.push(line);
    }
    return field;
}

const getData = (indata) => {
    return indata.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
}

const updateTemplate = () => {
    document.querySelector('#real-answer').innerHTML = app.realAnswer;
}

const main = () => {
    app.realAnswer = getRegionCount(realData());
    updateTemplate();
}

document.getElementById('select').addEventListener('change', function() {
    const index = app.fieldDescriptions.indexOf(this.value);
    displayField(app.fields[index]);
});

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}