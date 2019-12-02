import * as Utils from '../utils';

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
});