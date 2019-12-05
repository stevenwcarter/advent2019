import { calcFuelForPart, calcFuelForPartPlusFuel } from '../1';

describe('1', () => {
  describe('calcFuelForPart', () => {
    it('should calculate mass correctly', () => {
      expect(calcFuelForPart(12)).toBe(2);
      expect(calcFuelForPart(14)).toBe(2);
      expect(calcFuelForPart(1969)).toBe(654);
      expect(calcFuelForPart(100756)).toBe(33583);
    });
  });

  describe('calcFuelForPartPlusFuel', () => {
    it('should calculate fuel cost when considering fuel', () => {
      expect(calcFuelForPartPlusFuel(1969)).toBe(966);
    });
  });
});
