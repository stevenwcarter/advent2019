/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';
import { sumBy } from 'lodash';

const sum = (list) => list.reduce((acc, i) => acc + i, 0);

const testInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |fgae cfgab fg bagce`;

const part1Input = fs.readFileSync('./2021-8-input.txt', 'utf8');

const inputlines = readInputAsStrings(part1Input);
// const inputlines = readInputAsStrings(testInput);

// const value = input.reduce((acc, line) => {
//   const segments = line.split('|')[1].split(' ');
//   for (let i = 0; i < segments.length; i++) {
//     const segment = segments[i];
//     if (
//       segment.length === 7 ||
//       segment.length === 4 ||
//       segment.length === 3 ||
//       segment.length === 2
//     ) {
//       acc += 1;
//     }
//   }
//   return acc;
// }, 0);
// console.log(value);

const permutations = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

const validSegmentDefinitions = [
  'abcefg',
  'cf',
  'acdeg',
  'acdfg',
  'bcdf',
  'abdfg',
  'abdefg',
  'acf',
  'abcdefg',
  'abcdfg',
];

const toWire = (num, permutation) =>
  [...num]
    .map((letter) => originalOrder[permutation.indexOf(letter)])
    .sort()
    .join('');

const originalOrder = 'a b c d e f g'.split(' ');
const possiblePermutations = permutations(originalOrder);

const outputs = inputlines.map((line) => {
  const lineParts = line.replace(' | ', '|').split('|');
  const inputElements = lineParts[0].split(' ');
  const outputElements = lineParts[1].split(' ');

  const correctPermutation = possiblePermutations.find((permutation) => {
    return inputElements
      .map((num) => toWire(num, permutation))
      .every((num) => validSegmentDefinitions.includes(num));
  });

  return outputElements
    .map((num) => toWire(num, correctPermutation))
    .map((num) => validSegmentDefinitions.indexOf(num));
});

console.log(sum(outputs.map((n) => Number(n.join('')))));
