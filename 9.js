import fs from 'fs';
import { readInputAsStrings, readInputAsNumbers } from './utils';

const part1Input = fs.readFileSync('./8-input.txt', 'utf8');

const inputArray = readInputAsStrings(part1Input);
// const inputArray = readInputAsNumbers(part1Input);
