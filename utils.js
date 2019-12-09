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
    fn: (input, pos, operand1, operand2, operand3) =>
      (input[operand3] = checkNum(operand1) + checkNum(operand2)),
    newPos: (input, pos) => checkNum(pos) + 4
  },
  2: {
    fn: (input, pos, operand1, operand2, operand3) =>
      (input[operand3] = checkNum(operand1) * checkNum(operand2)),
    newPos: (input, pos) => checkNum(pos) + 4
  },
  3: {
    fn: (input, pos, operand1, operand2, operand3, inputVal) =>
      (input[operand1] = inputVal.shift()),
    newPos: (input, pos) => pos + 2
  },
  4: {
    fn: (input, pos, operand1, operand2, operand3, inputVal, outputFunc) => outputFunc(operand1),
    newPos: (input, pos) => checkNum(pos) + 2
  },
  5: {
    newPos: (input, pos, operand1, operand2, operand3) =>
      operand1 !== 0 ? operand2 : checkNum(pos) + 3
  },
  6: {
    newPos: (input, pos, operand1, operand2, operand3) =>
      operand1 === 0 ? operand2 : checkNum(pos) + 3
  },
  7: {
    fn: (input, pos, operand1, operand2, operand3) =>
      (input[operand3] = operand1 < operand2 ? 1 : 0),
    newPos: (input, pos) => checkNum(pos) + 4
  },
  8: {
    fn: (input, pos, operand1, operand2, operand3) =>
      (input[operand3] = operand1 === operand2 ? 1 : 0),
    newPos: (input, pos) => checkNum(pos) + 4
  },
  9: {
    fn: (input, pos, operand1, operand2, operand3, inputVal, out, base) =>
      checkNum(base) + checkNum(operand1),
    newPos: (input, pos) => checkNum(pos) + 2
  }
};

export const overwriteArray = (array1, array2) => {
  return array2;
};

const checkNum = num => num || 0;

export const intCodeSolver = (
  input,
  pos = 0,
  inputVal = [],
  out = output => console.log('out: ', output),
  base = checkNum(0)
) => {
  let exit = false;

  while (!exit) {
    const [opCode, paramMode1, paramMode2, paramMode3] = paramCodes(checkNum(input[pos]));
    if (opCode === 99) {
      exit = true;
      return undefined;
    }
    if (opCode === 3 && inputVal.length === 0) {
      return pos;
    }

    let operand1 =
      paramMode1 === 0 && opCode !== 3
        ? input[input[pos + 1]]
        : paramMode1 === 2
        ? opCode !== 3
          ? input[input[pos + 1] + base]
          : input[pos + 1] + base
        : input[pos + 1];
    let operand2 =
      paramMode2 === 0 && opCode !== 3
        ? input[input[pos + 2]]
        : paramMode2 === 2
        ? input[input[pos + 2] + base]
        : input[pos + 2];
    let operand3 =
      paramMode3 === 0 && opCode !== 1 && opCode !== 2 && opCode !== 7 && opCode !== 8
        ? input[input[pos + 3]]
        : paramMode3 === 2
        ? opCode !== 1 && opCode !== 2 && opCode !== 7 && opCode !== 8
          ? input[input[pos + 3] + base]
          : input[pos + 3] + base
        : input[pos + 3];

    operand1 = checkNum(operand1);
    operand2 = checkNum(operand2);
    operand3 = checkNum(operand3);

    const solver = opCodeSolver[opCode];
    if (solver) {
      if (solver.fn) {
        if (opCode === 9) {
          base = solver.fn(input, pos, operand1, operand2, operand3, inputVal, out, base);
        } else {
          solver.fn(input, pos, operand1, operand2, operand3, inputVal, out, base);
        }
      }
    } else {
      console.log('could not find solver for ', opCode, opCode, typeof opCode);
    }
    if ((opCode > 9 && opCode !== 99) || opCode < 0) {
      console.log('unknown opCode', opCode);
    }
    const newPos = solver.newPos(input, pos, operand1, operand2, operand3);

    pos = newPos;
  }
};
