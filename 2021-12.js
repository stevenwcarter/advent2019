/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';

const testInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const part1Input = fs.readFileSync('./2021-12-input.txt', 'utf8');
const START = 'start';
const END = 'end';

const input = readInputAsStrings(part1Input).map((a) => a.split('-'));
// const input = readInputAsStrings(testInput).map((a) => a.split('-'));

console.log(input);

const possiblePaths = {};
input.forEach((path) => {
  const left = path[0];
  const right = path[1];
  possiblePaths[left] = possiblePaths[left] ? possiblePaths[left].concat([right]) : [right];
  possiblePaths[right] = possiblePaths[right] ? possiblePaths[right].concat([left]) : [left];
});
console.log('Possible: ', possiblePaths);

const pathCount = (currentNode, paths, fullPath, repeat1SmallCave) => {
  let newPath = fullPath.concat(currentNode);

  if (currentNode === END) {
    paths.push(newPath);
    return;
  }

  possiblePaths[currentNode].forEach((path) => {
    if (path === path.toUpperCase() || !newPath.includes(path)) {
      pathCount(path, paths, newPath, repeat1SmallCave);
    } else if (repeat1SmallCave && path !== START && path !== END) {
      pathCount(path, paths, newPath, false);
    }
  });
};

let part1Paths = [];
pathCount('start', part1Paths, []);
console.log('1: ', part1Paths.length);

let part2Paths = [];
pathCount('start', part2Paths, [], true);
console.log('2: ', part2Paths.length);
