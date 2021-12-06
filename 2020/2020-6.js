/* global process */
import fs from 'fs';
import _ from 'lodash';

// const part1Input = `abc

// a
// b
// c

// ab
// ac

// a
// a
// a
// a

// b`;
const part1Input = fs.readFileSync('./2020-6-input.txt', 'utf8');

const inputArray = part1Input.split(/\r|\n|\r\n/);

// part 1
const groupedYesses = inputArray.reduce(
  (acc, line) => {
    if (line.length > 0) {
      acc[acc.length - 1].count++;
      const parts = line.split('');
      parts.forEach(a => {
        if (acc[acc.length - 1][a]) {
          acc[acc.length - 1][a]++;
        } else {
          acc[acc.length - 1][a] = 1;
        }
      });
    } else {
      acc.push({ count: 0 });
    }

    return acc;
  },
  [{ count: 0 }]
);

const part1Answer = groupedYesses.reduce((acc, a) => {
  acc += Object.keys(a).filter(b => b !== 'count').length;
  return acc;
}, 0);

const part2Answer = groupedYesses.reduce((acc, a) => {
  acc += Object.keys(a)
    .filter(b => b !== 'count')
    .reduce((accInner, b) => {
      const value = a[b];
      if (value === a.count) {
        accInner++;
      }
      return accInner;
    }, 0);
  return acc;
}, 0);

console.log(part1Answer, part2Answer);
