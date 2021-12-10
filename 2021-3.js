/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;
const part1Input = fs.readFileSync('./2021-3-input.txt', 'utf8');

// const input = readInputAsStrings(testInput);
const input = readInputAsStrings(part1Input);

const findGammaAndEpsilon = (array) => {
  const ones = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const zeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  array.map((line) => {
    const parts = line.split('');
    for (var i = 0; i < parts.length; i++) {
      const elem = parts[i];
      if (elem === '1') {
        ones[i] = ones[i] + 1;
      } else if (elem === '0') {
        zeros[i] = zeros[i] + 1;
      } else {
        console.error('unknown elem: ', elem);
      }
    }
  });

  let gamma = '';
  let epsilon = '';
  for (var i = 0; i < 12; i++) {
    // console.log(i, ones[i], zeros[i]);
    if (ones[i] > zeros[i]) {
      gamma += '1';
      epsilon += '0';
    } else if (zeros[i] > ones[i]) {
      gamma += '0';
      epsilon += '1';
    } else if (ones[i] > 0 && zeros[i] === ones[i]) {
      gamma += '1';
      epsilon += '0';
    }
  }

  return [gamma, epsilon];
};

const [gamma, epsilon] = findGammaAndEpsilon(input);

// console.log(gamma, epsilon);
// console.log(parseInt(gamma, 2), parseInt(epsilon, 2));
// console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));

let oxygen = [...input];
let co2 = [...input];

for (let i = 0; i < oxygen[0].length && oxygen.length > 1; i++) {
  const [gamma] = findGammaAndEpsilon(oxygen);
  oxygen = oxygen.filter((elem) => elem[i] === gamma[i]);
}
for (let i = 0; i < co2[0].length && co2.length > 1; i++) {
  const [, epsilon] = findGammaAndEpsilon(co2);
  //   console.log(epsilon);
  co2 = co2.filter((elem) => elem[i] === epsilon[i]);
  //   console.log(co2);
}
const oxygenDecimal = parseInt(oxygen, 2);
console.log(oxygen, oxygenDecimal);
const co2Decimal = parseInt(co2, 2);
console.log(co2, co2Decimal);
console.log(oxygenDecimal * co2Decimal);
