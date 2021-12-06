/* global process */
import { readInputAsNumbers } from './utils.js';
import fs from 'fs';
import _ from 'lodash';

const part1Input = fs.readFileSync('./2020-5-input.txt', 'utf8');

const inputArray = part1Input.split(/\r|\n|\r\n/);

// part 1

export const findRow = input => {
  const vals = input.split('').filter(a => a === 'F' || a === 'B');
  let foundUpperRange = 127;
  let foundLowerRange = 0;
  let returnVal = 0;
  vals.forEach((a, idx) => {
    if (vals.length - 1 === idx) {
      if (a === 'F') {
        returnVal = foundLowerRange;
      } else {
        returnVal = foundUpperRange;
      }
    } else {
      if (a === 'F') {
        foundUpperRange -= Math.pow(2, vals.length - idx - 1);
      } else if (a === 'B') {
        foundLowerRange += Math.pow(2, vals.length - idx - 1);
      }
    }
  });

  return returnVal;
};

export const findColumn = input => {
  const vals = input.split('').filter(a => a === 'L' || a === 'R');
  let foundUpperRange = 7;
  let foundLowerRange = 0;
  let returnVal = 0;
  vals.forEach((a, idx) => {
    if (vals.length - 1 === idx) {
      if (a === 'L') {
        returnVal = foundLowerRange;
      } else {
        returnVal = foundUpperRange;
      }
    } else {
      if (a === 'L') {
        foundUpperRange -= Math.pow(2, vals.length - idx - 1);
      } else if (a === 'R') {
        foundLowerRange += Math.pow(2, vals.length - idx - 1);
      }
    }
  });

  return returnVal;
};
export const findSeatId = input => findRow(input) * 8 + findColumn(input);

console.log(inputArray);
const counts = inputArray.map(findSeatId);
console.log(counts);
const max = counts.reduce((acc, val) => {
  if (val > acc) {
    acc = val;
  }

  return acc;
}, 0);

console.log(max);

// let seatId = 1000;
// let found = false;
// while (!found && seatId > -100) {
//   if (!_.includes(counts, seatId)) {
//     if (_.includes(counts, seatId - 1) && _.includes(counts, seatId + 1)) {
//       found = true;
//     }
//   }
//   seatId--;
// }
counts.sort((a, b) => b - a);

for (let i = 894; i > 0; i--) {
  if (!_.includes(counts, i)) {
    console.log(i);
  }
}
