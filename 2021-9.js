/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';

const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const part1Input = fs.readFileSync('./2021-9-input.txt', 'utf8');

const input = readInputAsStrings(part1Input);
// const input = readInputAsStrings(testInput);

const arrayOfArrays = input.map((line) => line.split('').map((a) => parseInt(a, 10)));

// console.log(arrayOfArrays);

const getPoint = (array, x, y) => {
  return x >= array.length || x < 0 || y >= array[x].length || y < 0 ? 99 : array[x][y];
};

const checkArea = (array, x, y) => {
  const checkPoint = array[x][y];
  return (
    checkPoint < getPoint(array, x + 1, y) &&
    checkPoint < getPoint(array, x - 1, y) &&
    checkPoint < getPoint(array, x, y + 1) &&
    checkPoint < getPoint(array, x, y - 1)
  );
};

let riskLevel = 0;
for (let x = 0; x < arrayOfArrays.length; x++) {
  for (let y = 0; y < arrayOfArrays[x].length; y++) {
    if (checkArea(arrayOfArrays, x, y)) {
      //   console.log(x, y, arrayOfArrays[x][y]);
      riskLevel += 1 + arrayOfArrays[x][y];
    }
  }
}

console.log(riskLevel);

const lowPoints = [];

for (let i = 0; i < arrayOfArrays.length; i++) {
  for (let j = 0; j < arrayOfArrays[i].length; j++) {
    const current = arrayOfArrays[i][j];
    const bottom = getPoint(arrayOfArrays, i + 1, j);
    const top = getPoint(arrayOfArrays, i - 1, j);
    const right = getPoint(arrayOfArrays, i, j + 1);
    const left = getPoint(arrayOfArrays, i, j - 1);

    if (current < top && current < bottom && current < right && current < left) {
      lowPoints.push([i, j]);
    }
  }
}

const getBasinSize = ([y, x]) => {
  if (
    y < 0 ||
    y > arrayOfArrays.length - 1 ||
    x < 0 ||
    x > arrayOfArrays[0].length - 1 ||
    arrayOfArrays[y][x] === -1 ||
    arrayOfArrays[y][x] === 9
  )
    return 0;

  arrayOfArrays[y][x] = -1;

  return (
    1 +
    getBasinSize([y + 1, x]) +
    getBasinSize([y - 1, x]) +
    getBasinSize([y, x + 1]) +
    getBasinSize([y, x - 1])
  );
};

const basinSizes = lowPoints.map(getBasinSize);
basinSizes.sort((a, b) => a - b);
console.log(basinSizes.slice(-3).reduce((a, b) => a * b, 1));
