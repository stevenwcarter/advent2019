/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';

const testInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const part1Input = fs.readFileSync('./2021-10-input.txt', 'utf8');

const input = readInputAsStrings(part1Input);
// const input = readInputAsStrings(testInput);

const OPEN_PAREN = '(';
const OPEN_SQUARE = '[';
const OPEN_CURLY = '{';
const OPEN_ANGLE = '<';
const CLOSE_PAREN = ')';
const CLOSE_SQUARE = ']';
const CLOSE_CURLY = '}';
const CLOSE_ANGLE = '>';

let corruptions = [];
let fixes = [];
input.forEach((line) => {
  const parts = line.split('');
  let stack = [];
  let lineFixes = [];
  let corruption = undefined;
  for (let i = 0; i < parts.length && !corruption; i++) {
    let item = parts[i];
    if (item === OPEN_PAREN || item === OPEN_SQUARE || item === OPEN_CURLY || item === OPEN_ANGLE) {
      stack.push(item);
    } else if (stack.length > 0 && stack.at(-1) === OPEN_PAREN) {
      if (item === CLOSE_PAREN) {
        stack.pop();
      } else {
        corruption = item;
      }
    } else if (stack.length > 0 && stack.at(-1) === OPEN_SQUARE) {
      if (item === CLOSE_SQUARE) {
        stack.pop();
      } else {
        corruption = item;
      }
    } else if (stack.length > 0 && stack.at(-1) === OPEN_CURLY) {
      if (item === CLOSE_CURLY) {
        stack.pop();
      } else {
        corruption = item;
      }
    } else if (stack.length > 0 && stack.at(-1) === OPEN_ANGLE) {
      if (item === CLOSE_ANGLE) {
        stack.pop();
      } else {
        corruption = item;
      }
    }
  }
  if (!corruption) {
    for (let i = stack.length - 1; i >= 0; i--) {
      let item = stack[i];
      if (item === OPEN_ANGLE) {
        lineFixes.push(CLOSE_ANGLE);
      } else if (item === OPEN_CURLY) {
        lineFixes.push(CLOSE_CURLY);
      } else if (item === OPEN_PAREN) {
        lineFixes.push(CLOSE_PAREN);
      } else if (item === OPEN_SQUARE) {
        lineFixes.push(CLOSE_SQUARE);
      }
    }
    fixes.push(lineFixes);
  } else {
    corruptions.push(corruption);
  }
});

const fixValue = (part) => {
  switch (part) {
    case CLOSE_ANGLE:
      return 4;
    case CLOSE_CURLY:
      return 3;
    case CLOSE_SQUARE:
      return 2;
    case CLOSE_PAREN:
      return 1;
    default:
      return 0;
  }
};

const part1Score = corruptions.reduce((acc, corruption) => {
  if (corruption === CLOSE_ANGLE) {
    return acc + 25137;
  } else if (corruption === CLOSE_CURLY) {
    return acc + 1197;
  } else if (corruption === CLOSE_SQUARE) {
    return acc + 57;
  } else if (corruption === CLOSE_PAREN) {
    return acc + 3;
  }
  return acc;
}, 0);
console.log(part1Score);

const score = fixes.reduce((acc, lineFix) => {
  return acc.concat([
    lineFix.reduce((acc2, part) => {
      return acc2 * 5 + fixValue(part);
    }, 0),
  ]);
}, []);
const median = (arr) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return nums[mid];
};
console.log(median(score));
