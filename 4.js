/* global process */
// input
import _ from 'lodash';
const lower = 367479;
const upper = 893698;

// part 1

const twoAdjacentRule = pass => {
  const input = String(pass).split('');
  return (
    input[0] === input[1] ||
    input[1] === input[2] ||
    input[2] === input[3] ||
    input[3] === input[4] ||
    input[4] === input[5]
  );
};

const increasingRule = pass => {
  const numerals = String(pass)
    .split('')
    .map(a => parseInt(a, 10));

  const test = numerals.reduce((acc, number) => {
    if (acc === 99) {
      // do nothing
    } else if (number >= acc) {
      acc = number;
    } else if (number < acc) {
      acc = 99;
    }
    return acc;
  }, 0);
  return test !== 99;
};

const testPass1 = pass => twoAdjacentRule(pass) && increasingRule(pass);

export const solvePart1 = () =>
  _.range(lower, upper).reduce((acc, i) => (acc += testPass1(i) ? 1 : 0), 0);

if (process.env.NODE_ENV !== 'test') {
  console.log('Part 1: ', solvePart1());
}

// part 2

const part2Rule = pass => {
  const input = String(pass).split('');
  return (
    (input[0] === input[1] && input[1] !== input[2]) ||
    (input[1] === input[2] && input[2] !== input[3] && input[1] !== input[0]) ||
    (input[2] === input[3] && input[3] !== input[4] && input[2] !== input[1]) ||
    (input[3] === input[4] && input[4] !== input[5] && input[3] !== input[2]) ||
    (input[4] === input[5] && input[4] !== input[3])
  );
};

const testPass2 = pass => twoAdjacentRule(pass) && increasingRule(pass) && part2Rule(pass);

export const solvePart2 = part1Input =>
  _.range(lower, upper).reduce((acc, i) => (acc += testPass2(i) ? 1 : 0), 0);

if (process.env.NODE_ENV !== 'test') {
  console.log('Part 2: ', solvePart2());
}
