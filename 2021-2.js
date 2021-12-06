/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';

const testInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
const part1Input = fs.readFileSync('./2021-2-input.txt', 'utf8');

// const input = readInputAsStrings(testInput);
const input = readInputAsStrings(part1Input);

let depth1 = 0;
let distance1 = 0;
input.map(line => {
  const [direction, x] = line.split(' ');
  if (direction === 'forward') {
    distance1 += parseInt(x, 10);
  } else if (direction === 'down') {
    depth1 += parseInt(x, 10);
  } else if (direction === 'up') {
    depth1 -= parseInt(x, 10);
    if (depth1 < 0) {
      depth1 = 0;
    }
  } else {
    console.log('unknown direction ', direction, line);
  }
});
console.log(depth1, distance1, depth1 * distance1);

let depth2 = 0;
let distance2 = 0;
let aim = 0;

input.map(line => {
  const [direction, x] = line.split(' ');
  if (direction === 'forward') {
    distance2 += parseInt(x, 10);
    depth2 += aim * parseInt(x, 10);
  } else if (direction === 'down') {
    aim += parseInt(x, 10);
  } else if (direction === 'up') {
    aim -= parseInt(x, 10);
  } else {
    console.log('unknown direction ', direction, line);
  }
  if (depth1 < 0) {
    depth2 = 0;
  }
});
console.log(depth2, distance2, depth2 * distance2);
