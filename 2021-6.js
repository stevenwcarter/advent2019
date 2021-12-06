/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';

const testInput = `3,4,3,1,2`;

const part1Input = fs.readFileSync('./2021-6-input.txt', 'utf8');

const input = part1Input
  .split(',')
  .map(a => parseInt(a, 10))
  .sort();
// const input = testInput
//   .split(',')
//   .map(a => parseInt(a, 10))
//   .sort();
console.log(input);
const ageCounts = input.reduce((acc, val) => {
  acc[val] = val in acc ? acc[val] + 1 : 1;
  return acc;
}, {});
console.log(ageCounts);

const ageOneDay = arr => {
  let newAgeCounts = {};
  newAgeCounts['8'] = arr['0'];
  newAgeCounts['7'] = arr['8'];
  newAgeCounts['6'] = (arr['0'] ? arr['0'] : 0) + (arr['7'] ? arr['7'] : 0);
  newAgeCounts['5'] = arr['6'];
  newAgeCounts['4'] = arr['5'];
  newAgeCounts['3'] = arr['4'];
  newAgeCounts['2'] = arr['3'];
  newAgeCounts['1'] = arr['2'];
  newAgeCounts['0'] = arr['1'];
  return newAgeCounts;
};

let fishCounts = { ...ageCounts };
for (let day = 0; day < 256; day++) {
  fishCounts = ageOneDay(fishCounts);
}
console.log(Object.keys(fishCounts).reduce((acc, k) => acc + fishCounts[k], 0));
