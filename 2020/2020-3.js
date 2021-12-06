/* global process */
import { readInputAsNumbers } from './utils.js';
import fs from 'fs';

// const part1Input = `..##.......
// #...#...#..
// .#....#..#.
// ..#.#...#.#
// .#...##..#.
// ..#.##.....
// .#.#.#....#
// .#........#
// #.##...#...
// #...##....#
// .#..#...#.#`;
const part1Input = fs.readFileSync('./2020-3-input.txt', 'utf8');

const inputArray = part1Input.split(/\r|\n|\r\n/);
const WIDTH = inputArray[0].split('').length;
const HEIGHT = inputArray.length;
// const inputArray = readInputAsNumbers(part1Input);

// part 1

let x,y = 0;
const checkPosition = (x,y) => {
    let ourX = x;
    let ourY = y;
    while (ourX > (WIDTH-1)) {
        ourX=ourX-WIDTH;
    }

    if (ourY > HEIGHT-1) {
        return '';
    }

    return inputArray[ourY].split('')[ourX];
}


const traverse = (x,y,xd,yd, treesHit) => {
    x+=xd;
    y+=yd;

    if (checkPosition(x,y) === '#') {
        treesHit++;
    }

    if (y < (HEIGHT-1)) {
        return traverse(x,y,xd,yd, treesHit);
    } else {
        return treesHit;
    }
}

const threeOne = traverse(0,0,3,1,0);
console.log('part1:', threeOne);

// part 2

console.log('part2:',
    traverse(0,0,1,1,0) *
    threeOne *
    traverse(0,0,5,1,0) *
    traverse(0,0,7,1,0) *
    traverse(0,0,1,2,0)
)