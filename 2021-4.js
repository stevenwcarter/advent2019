/* global process */
import { readInputAsNumbers, readInputAsStrings } from './utils.js';
import fs from 'fs';

const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const part1Input = fs.readFileSync('./2021-4-input.txt', 'utf8');

const input = readInputAsStrings(testInput);
// const input = readInputAsStrings(part1Input);

const [numbersLine, ...boardlines] = [...input];

const numbers = numbersLine.split(',').reduce((acc, num) => acc.concat(parseInt(num, 10)), []);

const boards = [];

for (let i = 0; i < boardlines.length; i += 5) {
  const board = {};
  for (let x = i; x < i + 5; x++) {
    const line = boardlines[x].split(/\s+/);
    for (let y = 0; y < 5; y++) {
      board[(x % 5) + ',' + y] = { val: parseInt(line[y], 10), picked: false };
    }
  }
  boards.push(board);
}

const checkForWinner = board => {
  const pickedEntries = Object.keys(board).filter(k => board[k].picked);
  for (let x = 0; x < 5; x++) {
    if (pickedEntries.filter(key => key.startsWith('' + x)).length === 5) {
      return true;
    }
  }
  for (let y = 0; y < 5; y++) {
    if (pickedEntries.filter(key => key.endsWith('' + y)).length === 5) {
      return true;
    }
  }
  return false;
};

const calculateScore = (winningBoard, lastNumber) => {
  const unpickedEntries = Object.keys(winningBoard).filter(k => !winningBoard[k].picked);

  const summation = unpickedEntries.map(e => winningBoard[e].val).reduce((acc, v) => acc + v, 0);
  return summation * lastNumber;
};

let winnerFound = false;
let lastWinnerFound = false;
for (let i = 0; i < numbers.length && !winnerFound; i++) {
  const number = numbers[i];
  boards.map(b => {
    Object.keys(b).map(k => {
      if (b[k].val === number) {
        b[k].picked = true;
      }
    });
  });

  const winningBoard = boards.filter(checkForWinner);
  if (winningBoard.length > 0) {
    winnerFound = true;
    console.log(calculateScore(winningBoard[0], number));
  }
}

let reducingBoards = [...boards];
for (let i = 0; i < numbers.length && !lastWinnerFound; i++) {
  const number = numbers[i];
  reducingBoards.map(b => {
    Object.keys(b).map(k => {
      if (b[k].val === number) {
        b[k].picked = true;
      }
    });
  });

  const winningBoards = reducingBoards.filter(checkForWinner);
  if (winningBoards.length < reducingBoards.length) {
    reducingBoards = reducingBoards.filter(b => !checkForWinner(b));
  } else {
    lastWinnerFound = true;
    console.log(calculateScore(winningBoards[0], number));
  }
}
