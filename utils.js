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
  const inputString = String(input).padStart(5, '0');
  const opCode = parseInt(inputString.substr(-2, 2));
  const paramMode1 = parseInt(inputString.substr(-3, 1), 10);
  const paramMode2 = parseInt(inputString.substr(-4, 1), 10);
  const paramMode3 = parseInt(inputString.substr(-5, 1), 10);
  return [opCode, paramMode1, paramMode2, paramMode3];
};

export const opCodeSolver = {
  1: {
    fn: (input, pos, operand1, operand2, operand3) => (input[operand3] = operand1 + operand2),
    newPos: (input, pos) => pos + 4
  },
  2: {
    fn: (input, pos, operand1, operand2, operand3) => (input[operand3] = operand1 * operand2),
    newPos: (input, pos) => pos + 4
  },
  3: {
    fn: (input, pos, operand1, operand2, operand3, inputVal) => (input[operand1] = inputVal),
    newPos: (input, pos) => pos + 2
  },
  4: {
    fn: (input, pos, operand1, operand2, operand3, inputVal, outputFunc) => outputFunc(operand1),
    newPos: (input, pos) => pos + 2
  },
  5: {
    newPos: (input, pos, operand1, operand2) => (operand1 !== 0 ? operand2 : pos + 3)
  },
  6: {
    newPos: (input, pos, operand1, operand2) => (operand1 === 0 ? operand2 : pos + 3)
  },
  7: {
    fn: (input, pos, operand1, operand2, operand3) =>
      (input[operand3] = operand1 < operand2 ? 1 : 0),
    newPos: (input, pos) => pos + 4
  },
  8: {
    fn: (input, pos, operand1, operand2, operand3) =>
      (input[operand3] = operand1 === operand2 ? 1 : 0),
    newPos: (input, pos) => pos + 4
  }
};

export const intCodeSolver = (input, pos, inputVal, out = () => {}) => {
  const [opCode, paramMode1, paramMode2, paramMode3] = paramCodes(input[pos]);
  if (opCode === 99) {
    return input;
  }

  const operand1 = paramMode1 === 0 && opCode !== 3 ? input[input[pos + 1]] : input[pos + 1];
  const operand2 = paramMode2 === 0 ? input[input[pos + 2]] : input[pos + 2];
  const operand3 =
    paramMode3 === 0 && opCode !== 1 && opCode !== 2 && opCode !== 7 && opCode !== 8
      ? input[input[pos + 3]]
      : input[pos + 3];

  const solver = opCodeSolver[opCode];
  solver.fn && solver.fn(input, pos, operand1, operand2, operand3, inputVal, out);
  const newPos = solver.newPos(input, pos, operand1, operand2, operand3);

  return intCodeSolver(input, newPos, inputVal, out);
};
