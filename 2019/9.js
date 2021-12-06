import fs from 'fs';
import { intCodeSolver } from './utils';

const part1Input = fs
  .readFileSync('9-input.txt', 'utf8')
  .split(',')
  .map(a => parseInt(a));

// console.log(
//   intCodeSolver([109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99]).splice(
//     0,
//     17
//   )
// );

const solvePart1 = () => intCodeSolver([...part1Input], 0, [1]);

const solvePart2 = () => intCodeSolver([...part1Input], 0, [2]);

if (process.env.NODE_ENV !== 'test') {
  solvePart1();
  solvePart2();
}
