import { solvePart1, solvePart2 } from '../3';

const testInput1 = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;

const testInput2 = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;

describe('Day 3', () => {
  it('part 1', () => {
    expect(solvePart1(testInput1)).toEqual(159);
    expect(solvePart1(testInput2)).toEqual(135);
  });
  it('part 2', () => {
    expect(solvePart2(testInput1)).toEqual(610);
    expect(solvePart2(testInput2)).toEqual(410);
  });
});
