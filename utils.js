import _ from 'lodash';

export const readInputAsNumbers = input =>
  input
    .split(/\r|\n|\r\n/)
    .map(a => parseInt(_.trim(a), 10))
    .filter(a => _.isNumber(a) && !_.isNaN(a));

export const readInputAsStrings = input =>
  input
    .split(/\r|\n|\r\n/)
    .map(_.trim)
    .filter(a => !_.isEmpty(a));

export const paramCodes = input => {
  const inputString = String(input);
  const opCode = parseInt(inputString.substr(-2, 2));
  const paramMode1 = inputString.length >= 3 ? parseInt(inputString.substr(-3, 1), 10) : 0;
  const paramMode2 = inputString.length >= 4 ? parseInt(inputString.substr(-4, 1), 10) : 0;
  const paramMode3 = inputString.length >= 5 ? parseInt(inputString.substr(-5, 1), 10) : 0;
  return [opCode, paramMode1, paramMode2, paramMode3];
};

export const intCodeSolver = (input, pos, inputVal, out = () => {}) => {
  const [opCode, paramMode1, paramMode2, paramMode3] = paramCodes(input[pos]);
  const operand1 = paramMode1 === 0 && opCode !== 3 ? input[input[pos + 1]] : input[pos + 1];
  const operand2 = paramMode2 === 0 ? input[input[pos + 2]] : input[pos + 2];
  const operand3 =
    paramMode3 === 0 && opCode !== 1 && opCode !== 2 && opCode !== 7 && opCode !== 8
      ? input[input[pos + 3]]
      : input[pos + 3];

  if (opCode === 99) {
    return input;
  } else if (opCode === 1) {
    input[operand3] = operand1 + operand2;
    return intCodeSolver(input, pos + 4, inputVal, out);
  } else if (opCode === 2) {
    input[operand3] = operand1 * operand2;
    return intCodeSolver(input, pos + 4, inputVal, out);
  } else if (opCode === 3) {
    input[operand1] = inputVal;
    return intCodeSolver(input, pos + 2, inputVal, out);
  } else if (opCode === 4) {
    out(operand1);
    return intCodeSolver(input, pos + 2, inputVal, out);
  } else if (opCode === 5) {
    if (operand1 !== 0) {
      return intCodeSolver(input, operand2, inputVal, out);
    } else {
      return intCodeSolver(input, pos + 3, inputVal, out);
    }
  } else if (opCode === 6) {
    if (operand1 === 0) {
      return intCodeSolver(input, operand2, inputVal, out);
    } else {
      return intCodeSolver(input, pos + 3, inputVal, out);
    }
  } else if (opCode === 7) {
    input[operand3] = operand1 < operand2 ? 1 : 0;
    return intCodeSolver(input, pos + 4, inputVal, out);
  } else if (opCode === 8) {
    input[operand3] = operand1 === operand2 ? 1 : 0;
    return intCodeSolver(input, pos + 4, inputVal, out);
  } else {
    console.error('should not have happened', opCode);
  }

  return intCodeSolver(input, pos + 4, inputVal, out);
};
