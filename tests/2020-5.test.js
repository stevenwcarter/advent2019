import { findRow, findColumn, findSeatId } from '../2020-5';

const testInput1 = 'BFFFBBFRRR';
const testInput2 = 'FFFBBBFRRR';
const testInput3 = 'BBFFBBFRLL';

describe('Year 2020 Day 5', () => {
  it('part 1', () => {
    expect(findRow(testInput1)).toEqual(70);
    expect(findColumn(testInput1)).toEqual(7);
    expect(findSeatId(testInput1)).toEqual(567);

    expect(findRow(testInput2)).toEqual(14);
    expect(findColumn(testInput2)).toEqual(7);
    expect(findSeatId(testInput2)).toEqual(119);

    expect(findRow(testInput3)).toEqual(102);
    expect(findColumn(testInput3)).toEqual(4);
    expect(findSeatId(testInput3)).toEqual(820);
  });
});
