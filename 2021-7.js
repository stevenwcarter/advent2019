/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';

const testInput = `16,1,2,0,4,2,7,1,2,14`;

const part1Input = fs.readFileSync('./2021-7-input.txt', 'utf8');

// const input = testInput.split(',').map((a) => parseInt(a, 10));
const input = part1Input.split(',').map((a) => parseInt(a, 10));

const findAverage = (array) => array.reduce((a, b) => a + b, 0) / input.length;

const min = Math.min(...input);
const max = Math.max(...input);

// let minFuelCost = 9999999999;
// let minHorizPos = 999999;
// for (let i = min; i < max; i++) {
//   const fuelCost = input.reduce((acc, elem) => {
//     acc += Math.abs(elem - i);
//     return acc;
//   }, 0);
//   if (fuelCost < minFuelCost) {
//     minFuelCost = fuelCost;
//     minHorizPos = i;
//   }
// }
//
// console.log(minFuelCost, minHorizPos);

const fuelCostForDistance = (dist) => {
  let cost = 0;
  for (let i = 1; i <= dist; i++) {
    cost += i;
  }
  return cost;
};

let minFuelCost = 9999999999;
let minHorizPos = 999999;
for (let i = min; i < max; i++) {
  const fuelCost = input.reduce((acc, elem) => {
    const dist = Math.abs(elem - i);
    const fuelCost = fuelCostForDistance(dist);
    return acc + fuelCost;
  }, 0);
  if (fuelCost < minFuelCost) {
    minFuelCost = fuelCost;
    minHorizPos = i;
  }
}

console.log(minFuelCost, minHorizPos);
