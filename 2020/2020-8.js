/* global process */
import fs from 'fs';
import _ from 'lodash';

// const part1Input = `nop +0
// acc +1
// jmp +4
// acc +3
// jmp -3
// acc -99
// acc +1
// jmp -4
// acc +6`;
const part1Input = fs.readFileSync('./2020-8-input.txt', 'utf8');

const inputArray = part1Input.split(/\r|\n|\r\n/);

// part 1
const instructionsArray = inputArray.map(line => {
  const [oper, valueString] = line.split(' ');
  return [oper, parseInt(valueString, 10)];
});

const calculateAcc = (inArray, pointer, acc, seenIndexes) => {
  const instruction = inArray[pointer];
  if (_.includes(seenIndexes, pointer)) {
    console.log('Acc at point when program loops is', acc);
    return acc;
  }
  seenIndexes.push(pointer);
  if (instruction[0] === 'nop') {
    pointer++;
  } else if (instruction[0] === 'acc') {
    acc += instruction[1];
    pointer++;
  } else if (instruction[0] === 'jmp') {
    pointer += instruction[1];
  }

  return calculateAcc(inArray, pointer, acc, seenIndexes);
};

const calculateAccAtTermination = (modifiedInstructionsArray, pointer, acc, seenIndexes) => {
  const instruction = modifiedInstructionsArray[pointer];
  if (_.includes(seenIndexes, pointer)) {
    return;
  }
  seenIndexes.push(pointer);
  if (instruction[0] === 'nop') {
    pointer++;
  } else if (instruction[0] === 'acc') {
    acc += instruction[1];
    pointer++;
  } else if (instruction[0] === 'jmp') {
    pointer += instruction[1];
  }

  return calculateAccAtTermination(modifiedInstructionsArray, pointer, acc, seenIndexes);
};

console.log(calculateAcc(instructionsArray, 0, 0, []));
console.log(calculateAccAtTermination(instructionsArray, 0, 0, []));
