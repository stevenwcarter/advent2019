import * as Utils from '../utils';

import { intCodeSolver } from '../utils';

describe('Utils', () => {
  describe('readInputAsNumbers', () => {
    it('should handle blank lines', () => {
      expect(
        Utils.readInputAsNumbers(`
            
            
            1
            2
            3
            4
            `)
      ).toEqual([1, 2, 3, 4]);
    });
    it('should handle non-numbers', () => {
      expect(
        Utils.readInputAsNumbers(`
            a
            
            1
            2
            3
            4
            `)
      ).toEqual([1, 2, 3, 4]);
    });
  });
  describe('readInputAsStrings', () => {
    it('should handle blank lines', () => {
      expect(
        Utils.readInputAsStrings(`
            
            a
            1
            2
            3
            4
            `)
      ).toEqual(['a', '1', '2', '3', '4']);
    });
  });

  describe('intCodeSolver', () => {
    it('should calculate intCodes correctly (example 1)', () => {
      expect(intCodeSolver([1, 0, 0, 0, 99], 0)).toEqual([2, 0, 0, 0, 99]);
    });
    it('should calculate intCodes correctly (example 2)', () => {
      expect(intCodeSolver([2, 3, 0, 3, 99], 0)).toEqual([2, 3, 0, 6, 99]);
    });
    it('should calculate intCodes correctly (example 3)', () => {
      expect(intCodeSolver([2, 4, 4, 5, 99, 0], 0)).toEqual([2, 4, 4, 5, 99, 9801]);
    });
    it('should calculate intCodes correctly (example 4)', () => {
      expect(intCodeSolver([1, 1, 1, 4, 99, 5, 6, 0, 99], 0)).toEqual([
        30,
        1,
        1,
        4,
        2,
        5,
        6,
        0,
        99
      ]);
    });
  });

  describe('paramCodes', () => {
    it('should do param codes', () => {
      expect(Utils.paramCodes('10045')).toEqual([45, 0, 0, 1]);
    });
  });

  describe('intCode part 2 day 5', () => {
    it('longer test below 8', () => {
      const input =
        '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99';
      const inputArray = input.split(',').map(a => parseInt(a, 10));
      let check = -1;
      const outputFunc = val => {
        check = val;
      };
      Utils.intCodeSolver([...inputArray], 0, 2, outputFunc);
      expect(check).toBe(999);
    });
    it('longer test equals 8', () => {
      const input =
        '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99';
      const inputArray = input.split(',').map(a => parseInt(a, 10));
      let check = -1;
      const outputFunc = val => {
        check = val;
      };

      Utils.intCodeSolver([...inputArray], 0, 8, outputFunc);
      expect(check).toBe(1000);
    });
    it('longer test > 8', () => {
      const input =
        '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99';
      const inputArray = input.split(',').map(a => parseInt(a, 10));
      let check = -1;
      const outputFunc = val => {
        check = val;
      };

      Utils.intCodeSolver([...inputArray], 0, 9, outputFunc);
      expect(check).toBe(1001);
    });
    it('shorter test', () => {
      const input = '3,3,1107,-1,8,3,4,3,99';
      const inputArray = input.split(',').map(a => parseInt(a, 10));
      let check = -1;
      const outputFunc = val => {
        check = val;
      };
      Utils.intCodeSolver(inputArray, 0, 7, outputFunc);
      expect(check).toBe(1);
    });
    it('test2', () => {
      const input = '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9';
      const inputArray = input.split(',').map(a => parseInt(a, 10));
      let check = -1;
      const outputFunc = val => {
        check = val;
      };
      Utils.intCodeSolver(inputArray, 0, 0, outputFunc);
      expect(check).toBe(0);

      const inputArray2 = input.split(',').map(a => parseInt(a, 10));
      Utils.intCodeSolver(inputArray2, 0, 9, outputFunc);
      expect(check).toBe(1);
    });
  });
});
