/* global process */
import { readInputAsNumbers } from './utils.js';
import fs from 'fs';
import _ from 'lodash';

const part1Input = fs.readFileSync('./2020-4-input.txt', 'utf8');

const inputArray = part1Input.split(/\r|\n|\r\n/);
const FIELDS_REQUIRED = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

// part 1

const passports = inputArray
  .reduce(
    (acc, line) => {
      if (line.length > 0) {
        acc[acc.length - 1] += ' ' + line;
        acc[acc.length - 1] = acc[acc.length - 1].trim();
      } else {
        acc.push('');
      }

      return acc;
    },
    ['']
  )
  .reduce((acc, passport) => {
    const fields = passport.split(' ');
    const passportMappedFields = fields.reduce((fieldObject, field) => {
      const [fieldName, fieldValue] = field.split(':');
      fieldObject[fieldName] = fieldValue;
      return fieldObject;
    }, {});

    acc.push(passportMappedFields);
    return acc;
  }, []);

console.log(passports);

let valid = 0;
passports.map(passport => {
  let fieldCount = 0;
  FIELDS_REQUIRED.map(field => {
    fieldCount += passport[field] ? 1 : 0;
  });

  if (fieldCount === FIELDS_REQUIRED.length) {
    valid++;
  }
});

console.log('part1: ', valid);

// part 2

let validPartTwo = 0;
const validEntries = [];
passports.map(passport => {
  let fieldCount = 0;
  FIELDS_REQUIRED.map(field => {
    fieldCount += passport[field] ? 1 : 0;
  });

  if (fieldCount === FIELDS_REQUIRED.length) {
    const byr = parseInt(passport.byr, 10);
    if (byr < 1920 || byr > 2002) {
      return;
    }
    if (!_.includes(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'], passport.ecl)) {
      return;
    }
    const eyr = parseInt(passport.eyr, 10);
    if (eyr < 2020 || eyr > 2030) {
      return;
    }
    const iyr = parseInt(passport.iyr, 10);
    if (iyr < 2010 || iyr > 2020) {
      return;
    }
    if (!/^[0-9]{9}$/.test(passport.pid)) {
      return;
    }
    if (!/^#[0-9a-f]{6}$/.test(passport.hcl)) {
      return;
    }
    if (/[0-9]*cm/.test(passport.hgt)) {
      const heightCm = parseInt(passport.hgt.replace('cm', ''), 10);
      if (heightCm < 150 || heightCm > 193) {
        return;
      }
    } else {
      const heightIn = parseInt(passport.hgt.replace('in', ''), 10);
      if (heightIn < 59 || heightIn > 76) {
        return;
      }
    }

    validEntries.push(passport);
    validPartTwo++;
  }
});

const ecl = validEntries.map(p => p.pid);
ecl.map(e => {
  console.log(e);
});

console.log('part2', validPartTwo);
