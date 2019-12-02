import _ from 'lodash';

export const readInputAsNumbers = (input) => input.split(/\r|\n|\r\n/).map(a => parseInt(_.trim(a), 10)).filter(a => _.isNumber(a) && !_.isNaN(a));
export const readInputAsStrings = (input) => input.split(/\r|\n|\r\n/).map(_.trim).filter(a => !_.isEmpty(a));

export const intCodeSolver = (input, pos) => {
    const opCode = input[pos];
    const operand1 = input[input[pos+1]];
    const operand2 = input[input[pos+2]];
    const outputPos = input[pos+3];

    if (opCode === 99) {
        return input;
    } else if (opCode === 1) {
        input[outputPos] = operand1 + operand2;
    } else if (opCode === 2) {
        input[outputPos] = operand1 * operand2;
    } else {
        console.error("should not have happened", opCode);
    }

    return intCodeSolver(input, pos+4);
};