/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';
import _, { sumBy } from 'lodash';

const sum = (list) => list.reduce((acc, i) => acc + i, 0);

const testInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const part1Input = fs.readFileSync('./2021-14-input.txt', 'utf8');

const inputlines = readInputAsStrings(part1Input);
// const inputlines = readInputAsStrings(testInput);

const [baseTemplate, rulesRaw] = part1Input.split('\n\n');

console.log(baseTemplate, '---', rulesRaw);

const rulesMap = rulesRaw.split('\n').reduce((acc, rule) => {
  const [key, value] = rule.split(' -> ');
  acc[key] = value;
  return acc;
}, {});

console.log(rulesMap);

const getElements = (template) => {
  const parts = template.split('');
  let elements = [];
  for (let i = 0; i < parts.length - 1; i++) {
    elements.push([parts[i], parts[i + 1]]);
  }
  return elements;
};

let steps = 10;
let template = baseTemplate;
for (let i = 0; i < steps; i++) {
  const elements = getElements(template);
  //   console.log(elements);
  let newTemplate = elements[0][0];
  elements.map((element) => {
    newTemplate += rulesMap[element[0] + element[1]] + element[1];
  });
  template = newTemplate;
  //   console.log(template);
}

const incidentCounts = template.split('').reduce((acc, s) => {
  if (acc[s] && acc[s] > 0) {
    acc[s]++;
  } else {
    acc[s] = 1;
  }
  return acc;
}, {});

console.log(incidentCounts);

let max = 0;
let min = 9999999999999999;
Object.keys(incidentCounts).forEach((key) => {
  const val = incidentCounts[key];
  if (val > max) {
    max = val;
  }
  if (val < min) {
    min = val;
  }
});

console.log(max - min);
