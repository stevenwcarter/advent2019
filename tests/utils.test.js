import * as Utils from '../utils';

import { intCodeSolver } from '../utils';



describe('Utils', () => {
    describe('readInputAsNumbers', () => {
        it('should handle blank lines', () => {
            expect(Utils.readInputAsNumbers(`
            
            
            1
            2
            3
            4
            `)).toEqual([1,2,3,4]);
        });
        it('should handle non-numbers', () => {
            expect(Utils.readInputAsNumbers(`
            a
            
            1
            2
            3
            4
            `)).toEqual([1,2,3,4]);
        });
    });
    describe('readInputAsStrings', () => {
        it('should handle blank lines', () => {
            expect(Utils.readInputAsStrings(`
            
            a
            1
            2
            3
            4
            `)).toEqual(["a","1","2","3","4"]);
        });
    });

    describe('intCodeSolver', () => {
        it('should calculate intCodes correctly (example 1)', () => {
            expect(intCodeSolver([1,0,0,0,99], 0)).toEqual([2,0,0,0,99]);
        });
        it('should calculate intCodes correctly (example 2)', () => {
            expect(intCodeSolver([2,3,0,3,99], 0)).toEqual([2,3,0,6,99]);
        });
        it('should calculate intCodes correctly (example 3)', () => {
            expect(intCodeSolver([2,4,4,5,99,0], 0)).toEqual([2,4,4,5,99,9801]);
        });
        it('should calculate intCodes correctly (example 4)', () => {
            expect(intCodeSolver([1,1,1,4,99,5,6,0,99], 0)).toEqual([30,1,1,4,2,5,6,0,99]);
        });
    });
});