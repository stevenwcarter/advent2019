/* global process */
import { readInputAsStrings } from './utils.js';
import fs from 'fs';

const part1Input = fs.readFileSync('./6-input.txt', 'utf8');

// const part1Input = `COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L`;
const inputArray = readInputAsStrings(part1Input);

const orbits = {};

inputArray.map(orbit => {
  const [first, orbiter] = orbit.split(')');

  if (!orbits[orbiter]) {
    orbits[orbiter] = [];
  }
  orbits[orbiter].push(first);
});

// const direct = Object.keys(orbits).reduce((acc, key) => {
//   acc += orbits[key].length;
//   return acc;
// }, 0);

// const foundOrbits = {};
const findDirectOrbits = key => {
  const orbit = orbits[key];

  console.log(orbit);

  if (!orbit || orbit.length === 0) {
    return 0;
  }

  const newOrbitCount = orbit.length;

  return orbit.reduce((acc, laterOrbit) => {
    acc += findDirectOrbits(laterOrbit);
    return acc;
  }, newOrbitCount);
};

// const indirect = Object.keys(orbits).reduce((acc, inner) => {
//   acc += findDirectOrbits(orbits[inner]);
//   return acc;
// }, 0);

// console.log(indirect);
// console.log(direct + indirect);

console.log('SANTA');
findDirectOrbits(orbits['SAN']);

console.log('YOU');
findDirectOrbits(orbits['YOU']);
