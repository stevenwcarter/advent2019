/* global process */
import { readInputAsStrings } from './utils.js';
import fs from 'fs';

const part1Input = fs.readFileSync('./6-input.txt', 'utf8');

const inputArray = readInputAsStrings(part1Input);

const orbits = {};

inputArray.map(orbit => {
  const [base, orbiter] = orbit.split(')');

  orbits[orbiter] = base;
});

const direct = Object.keys(orbits).length;

const findDirectOrbits = key => (orbits[key] ? 1 + findDirectOrbits(orbits[key]) : 0);

const indirect = Object.keys(orbits).reduce(
  (acc, inner) => acc + findDirectOrbits(orbits[inner]),
  0
);

const findOrbitChain = startOrbit => {
  const subOrbit = orbits[startOrbit];

  return subOrbit ? [subOrbit].concat(findOrbitChain(subOrbit)) : [];
};

const findShortestTransferCount = (startOrbit1, startOrbit2) => {
  let hohmannTransferCount = 0;
  let commonOrbit = undefined;

  const youPathToCom = findOrbitChain(startOrbit1);
  const sanPathToCom = findOrbitChain(startOrbit2);

  youPathToCom.map((subOrbit, index) => {
    if (!commonOrbit) {
      const subPosition = sanPathToCom.indexOf(subOrbit);
      if (!commonOrbit && subPosition !== -1) {
        commonOrbit = subOrbit;
        hohmannTransferCount += index + subPosition;
      }
    }
  });

  return hohmannTransferCount;
};

const hohmannTransferCount = findShortestTransferCount('YOU', 'SAN');

console.log('Part 1');
console.log('Direct orbit count: ', direct);
console.log('Indirect orbit count: ', indirect);
console.log('Total of direct and indirect orbits: ', direct + indirect);
console.log();
console.log('Part 2');
console.log('Shortest Hohmann transfer count: ', hohmannTransferCount);
