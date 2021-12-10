/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const part1Input = fs.readFileSync('./2021-5-input.txt', 'utf8');

// const input = readInputAsStrings(testInput);
const input = readInputAsStrings(part1Input);

const coords = input.reduce((acc, line) => {
  const [coord1, coord2] = line.split(' -> ');
  const [x1, y1] = coord1.split(',').map((a) => parseInt(a, 10));
  const [x2, y2] = coord2.split(',').map((a) => parseInt(a, 10));
  return acc.concat([[x1, y1, x2, y2]]);
}, []);

const usable = coords.filter((entries) => {
  const [x1, y1, x2, y2] = [...entries];
  return x1 === x2 || y1 === y2;
});

const diagram1 = {};
const getValue = (key) => {
  console.log(diagram1[key]);
  if (key in diagram1) {
    return diagram1[key];
  }
  return 0;
};

usable.map((entries) => {
  const [x1, y1, x2, y2] = [...entries];
  let staticVal = 0;
  let min = 0;
  let max = 0;
  let axis = 'x';
  if (x1 === x2) {
    staticVal = x1;
    if (y1 < y2) {
      min = y1;
      max = y2;
    } else {
      min = y2;
      max = y1;
    }
  } else if (y1 === y2) {
    staticVal = y1;
    axis = 'y';
    if (x1 < x2) {
      min = x1;
      max = x2;
    } else {
      min = x2;
      max = x1;
    }
  }
  for (let i = min; i <= max; i++) {
    let key = '';
    if (axis === 'x') {
      key = staticVal + ',' + i;
    } else {
      key = i + ',' + staticVal;
    }
    diagram1[key] = key in diagram1 ? diagram1[key] + 1 : 1;
  }
});
console.log(Object.keys(diagram1).filter((k) => diagram1[k] >= 2).length);

const rangeArray = (start, stop) => {
  let range = [];
  if (start < stop) {
    for (let i = start; i <= stop; i++) {
      range.push(i);
    }
  } else {
    for (let i = start; i >= stop; i--) {
      range.push(i);
    }
  }
  return range;
};

const diagram2 = {};
coords.map((entries) => {
  let [x1, y1, x2, y2] = [...entries];
  if (x1 === x2 || y1 === y2) {
    let staticVal = 0;
    let min = 0;
    let max = 0;
    let axis = 'x';
    if (x1 === x2) {
      staticVal = x1;
      if (y1 < y2) {
        min = y1;
        max = y2;
      } else {
        min = y2;
        max = y1;
      }
    } else if (y1 === y2) {
      staticVal = y1;
      axis = 'y';
      if (x1 < x2) {
        min = x1;
        max = x2;
      } else {
        min = x2;
        max = x1;
      }
    }
    for (let i = min; i <= max; i++) {
      let key = '';
      if (axis === 'x') {
        key = staticVal + ',' + i;
      } else {
        key = i + ',' + staticVal;
      }
      diagram2[key] = key in diagram2 ? diagram2[key] + 1 : 1;
    }
  } else {
    const xranges = rangeArray(x1, x2);
    const yranges = rangeArray(y1, y2);
    for (let i = 0; i < xranges.length; i++) {
      const x = xranges[i];
      const y = yranges[i];
      const key = x + ',' + y;
      diagram2[key] = key in diagram2 ? diagram2[key] + 1 : 1;
    }
  }
});
console.log(Object.keys(diagram2).filter((k) => diagram2[k] >= 2).length);
