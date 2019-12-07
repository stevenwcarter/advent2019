import { intCodeSolver } from './utils.js';

const input =
  '3,8,1001,8,10,8,105,1,0,0,21,46,63,76,97,118,199,280,361,442,99999,3,9,102,4,9,9,101,2,9,9,1002,9,5,9,101,4,9,9,102,2,9,9,4,9,99,3,9,101,5,9,9,102,3,9,9,101,3,9,9,4,9,99,3,9,1001,9,2,9,102,3,9,9,4,9,99,3,9,1002,9,5,9,101,4,9,9,1002,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,5,9,101,3,9,9,1002,9,5,9,1001,9,5,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99';

const inputArray = input.split(',').map(a => parseInt(a, 10));

// https://initjs.org/all-permutations-of-a-set-f1be174c79f8
const getAllPermutations = vals => {
  var results = [];

  if (vals.length === 1) {
    results.push(vals);
    return results;
  }

  for (var i = 0; i < vals.length; i++) {
    var firstChar = vals[i];
    var charsLeft = vals.substring(0, i) + vals.substring(i + 1);
    var innerPermutations = getAllPermutations(charsLeft);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }

  return results;
};

const phaseAttempts = getAllPermutations('12340');

const bestResult = phaseAttempts.reduce(
  (best, phase) => {
    const phases = phase.split('').map(a => parseInt(a, 10));
    let in1 = 0;
    let in2 = 0;
    let in3 = 0;
    let in4 = 0;
    let in5 = 0;
    let output = 0;

    intCodeSolver([...inputArray], 0, [phases[0], in1], val => (in2 = val));
    intCodeSolver([...inputArray], 0, [phases[1], in2], val => (in3 = val));
    intCodeSolver([...inputArray], 0, [phases[2], in3], val => (in4 = val));
    intCodeSolver([...inputArray], 0, [phases[3], in4], val => (in5 = val));
    intCodeSolver([...inputArray], 0, [phases[4], in5], val => (output = val));

    if (output > best.signal) {
      best.signal = output;
      best.phase = phase;
    }
    return best;
  },
  { phase: '', signal: 0 }
);

console.log('Part 1: ', bestResult);

const part2PhaseAttempts = getAllPermutations('56789');

const part2BestResult = part2PhaseAttempts.reduce(
  (best, phase) => {
    const phases = phase.split('').map(a => parseInt(a, 10));

    const array1 = [...inputArray];
    const array2 = [...inputArray];
    const array3 = [...inputArray];
    const array4 = [...inputArray];
    const array5 = [...inputArray];

    let in1 = [phases[0], 0];
    let in2 = [phases[1]];
    let in3 = [phases[2]];
    let in4 = [phases[3]];
    let in5 = [phases[4]];

    let output = 0;

    let lastPos1 = 0;
    let lastPos2 = 0;
    let lastPos3 = 0;
    let lastPos4 = 0;
    let lastPos5 = 0;

    const out5 = val => {
      in1.push(val);
      output = val;
    };

    const checkIfRunning = () =>
      lastPos1 >= 0 && lastPos2 >= 0 && lastPos3 >= 0 && lastPos4 >= 0 && lastPos5 >= 0;

    while (checkIfRunning()) {
      lastPos1 = intCodeSolver(array1, lastPos1, in1, val => in2.push(val));
      lastPos2 = intCodeSolver(array2, lastPos2, in2, val => in3.push(val));
      lastPos3 = intCodeSolver(array3, lastPos3, in3, val => in4.push(val));
      lastPos4 = intCodeSolver(array4, lastPos4, in4, val => in5.push(val));
      lastPos5 = intCodeSolver(array5, lastPos5, in5, out5);
    }

    if (output > best.signal) {
      best.signal = output;
      best.phase = phase;
    }

    return best;
  },
  { phase: '', signal: 0 }
);

console.log('Part 2: ', part2BestResult);
