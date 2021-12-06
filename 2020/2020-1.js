/* global process */
import { readInputAsNumbers } from './utils.js';
import fs from 'fs';

const part1TestInput = [1721,
  979,
  366,
  299,
  675,
  1456];
const part1Input = fs.readFileSync('./2020-1-input.txt', 'utf8');

const inputArray = readInputAsNumbers(part1Input);

// part 1
const numberMap = inputArray.reduce((acc, a) => {
  acc[a] = 1;
  return acc;
}, {});


inputArray.forEach(element => {
  const otherNum = 2020 - element;
  if (numberMap[otherNum]) {
    console.log(otherNum, element, element*otherNum);
  }
});

inputArray.forEach(element => {
  const otherNum = 2020 - element;
  inputArray.forEach(otherElement => {
    const thirdNum = otherNum - otherElement;
    if (numberMap[thirdNum]) {
      console.log(thirdNum, otherElement, element, thirdNum * otherElement * element);
    }
  });
});