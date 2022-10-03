/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';
import Set from 'collections/set';

const testInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

const part1Input = fs.readFileSync('./2021-13-input.txt', 'utf8');

const input = part1Input;

let [startingDots, startingInstructions] = input.split('\n\n').map((x) => x.split('\n'));
startingDots = startingDots.map((d) => d.split(',').map((a) => parseInt(a, 10)));
startingInstructions = startingInstructions.map((i) => {
  const [x, y] = i.split(' ').at(-1).split('=');
  return [x, Number(y)];
});

const performFold = (dots, fold) => {
  const [axis, foldLine] = fold;
  const axisI = axis == 'x' ? 0 : 1;
  return dots.map((dot) => {
    if (dot[axisI] > foldLine) {
      dot[axisI] = foldLine - (dot[axisI] - foldLine);
    }
    return dot;
  });
};

const part1 = () => {
  let [dots, instructions] = [[...startingDots], [...startingInstructions]];
  dots = performFold(dots, instructions[0]);
  console.log(new Set(dots.map((x) => x.join(','))).size);
};

const part2 = () => {
  let [dots, instructions] = [[...startingDots], [...startingInstructions]];
  dots = instructions.reduce(performFold, dots);
  let height = 0;
  let width = 0;
  let grid = {};
  dots.forEach(([x, y]) => {
    if (x > width) width = x;
    if (y > height) height = y;
    grid[`${x},${y}`] = 1;
  });
  let foldedPaper = [];
  for (let y = 0; y <= height; y++) {
    let line = '';
    for (let x = 0; x <= width; x++) {
      line += grid[`${x},${y}`] ? '#' : '.';
    }
    foldedPaper.push(line);
  }
  console.log(foldedPaper.join('\n'));
};

part1();
part2();
