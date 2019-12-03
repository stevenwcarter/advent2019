import _ from 'lodash';
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';

const part1Input = fs.readFileSync('./3-input.txt', 'utf8');

// part 1

const calculateHits = (instructions) => {
    let x = 0;
    let y = 0;
    let steps = 0;
    const hits = {};

    const processHit = (x,y) => {
        steps++;
        const key = `${x},${y}`;
        if (!hits[key]) {
            hits[key] = steps;
        }
    }


    instructions.forEach(inst => {
        const [direction, ...remaining] = inst.split('');
        const amount = parseInt(remaining.join(''), 10);
        if (direction === 'R') {
            for (let i = 0; i < amount; i++) {
                x++;
                processHit(x, y);
                
            }
        } else if (direction === 'L') {
            for (let i = 0; i < amount; i++) {
                x--;
                processHit(x, y);
            }
        } else if (direction === 'U') {
            for (let i = 0; i < amount; i++) {
                y++;
                processHit(x, y);
            }
        } else if (direction === 'D') {
            for (let i = 0; i < amount; i++) {
                y--;
                processHit(x, y);
            }
        } else {
            console.error('unknown direction ', direction);
        }
    });
    return hits;
}

const calcManhattan = (hit) => {
    const [left, right] = hit.split(',');
    return Math.abs(parseInt(left, 10)) + Math.abs(parseInt(right, 10));
}

export const solvePart1 = (part1Input) => {
    const [leftWire, rightWire] = readInputAsStrings(part1Input);

    const leftWireInstructions = leftWire.split(',');
    const rightWireInstructions = rightWire.split(',');

    const leftHit = calculateHits(leftWireInstructions);
    const rightHit = calculateHits(rightWireInstructions);

    return Object.keys(leftHit).reduce((minHit, current) => {
        if (rightHit[current]) {
            const dist = calcManhattan(current);
            if (dist < minHit) {
                minHit = dist;
            }
        }
        return minHit;
    }, 99999999999999999999999);
}


if (process.env.NODE_ENV !== 'test') {
    console.log(solvePart1(part1Input));
}

// part 2

export const solvePart2 = (part1Input) => {
    const [leftWire, rightWire] = readInputAsStrings(part1Input);

    const leftWireInstructions = leftWire.split(',');
    const rightWireInstructions = rightWire.split(',');

    const leftHit = calculateHits(leftWireInstructions);
    const rightHit = calculateHits(rightWireInstructions);

    return Object.keys(leftHit).reduce((minHit, current) => {
        if (rightHit[current]) {
            const steps = leftHit[current] + rightHit[current];
            if (steps < minHit) {
                minHit = steps;
            }
        }
        return minHit;
    }, 99999999999);
}


if (process.env.NODE_ENV !== 'test') {
    console.log(solvePart2(part1Input));
}