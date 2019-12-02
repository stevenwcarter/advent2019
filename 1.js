import _ from 'lodash';
import { readInputAsNumbers } from './utils.js';
import fs from 'fs';

const part1Input = fs.readFileSync('./1-input.txt', 'utf8');

const inputArray = readInputAsNumbers(part1Input);

// part 1

export const calcFuelForPart = (mass) => Math.floor(mass/3)-2;


if (process.env.NODE_ENV !== 'test') {
const totalFuel = inputArray.reduce((totalFuel, mass) => totalFuel += calcFuelForPart(mass), 0);

console.log('Part 1 : ', totalFuel);
}

// part 2

const handleNegatives = (input) => input > 0 ? input : 0;

export const calcFuelForPartPlusFuel = (mass) => {
    const fuelCost = calcFuelForPart(mass);

    if (fuelCost > 0) {
        return fuelCost + handleNegatives(calcFuelForPartPlusFuel(fuelCost));
    }
};

if (process.env.NODE_ENV !== 'test') {
    const totalFuelPlusFuel = inputArray.reduce((totalFuel, mass) => totalFuel += calcFuelForPartPlusFuel(mass), 0);

    console.log('Part 2 : ', totalFuelPlusFuel);
}


