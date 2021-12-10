/* global process */
import { readInputAsNumbers } from './utils.js';
import fs from 'fs';

const part1TestInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
const part1Input = fs.readFileSync('./2021-1-input.txt', 'utf8');

const inputArray = readInputAsNumbers(part1Input);

const countLargerThanPrevious = (arrayInput) => {
  let previous;
  return arrayInput.reduce((acc, meas, index) => {
    if (index !== 0 && meas > previous) {
      acc++;
    }
    previous = meas;
    return acc;
  }, 0);
};

// part 1
console.log(countLargerThanPrevious(inputArray));

// part 2
const movingWindow3 = [];
const arr = inputArray;
for (let i = 0; i < inputArray.length - 2; i++) {
  movingWindow3.push(inputArray[i] + inputArray[i + 1] + inputArray[i + 2]);
}

console.log(countLargerThanPrevious(movingWindow3));
