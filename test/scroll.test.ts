import { parseScrollClass } from '../src/parseScrollClass'; // Replace with the actual file name

describe('parseScrollClass', () => {
  test('should return null for invalid class names', () => {
    expect(parseScrollClass('invalid-class')).toBeNull();
    expect(parseScrollClass('overscroll')).toBeNull();
    expect(parseScrollClass('overscroll-x')).toBeNull();
    expect(parseScrollClass('overscroll-y')).toBeNull();
  });

  test('should parse overscroll classes correctly', () => {
    expect(parseScrollClass('overscroll-contain')).toEqual({
      'overscroll-behavior': 'contain',
    });
    expect(parseScrollClass('overscroll-auto')).toEqual({
      'overscroll-behavior': 'auto',
    });
    expect(parseScrollClass('overscroll-none')).toEqual({
      'overscroll-behavior': 'none',
    });
  });

  test('should parse overscroll-x classes correctly', () => {
    expect(parseScrollClass('overscroll-x-contain')).toEqual({
      'overscroll-behavior-x': 'contain',
    });
    expect(parseScrollClass('overscroll-x-auto')).toEqual({
      'overscroll-behavior-x': 'auto',
    });
    expect(parseScrollClass('overscroll-x-none')).toEqual({
      'overscroll-behavior-x': 'none',
    });
  });

  test('should parse overscroll-y classes correctly', () => {
    expect(parseScrollClass('overscroll-y-contain')).toEqual({
      'overscroll-behavior-y': 'contain',
    });
    expect(parseScrollClass('overscroll-y-auto')).toEqual({
      'overscroll-behavior-y': 'auto',
    });
    expect(parseScrollClass('overscroll-y-none')).toEqual({
      'overscroll-behavior-y': 'none',
    });
  });

  test('should be case-sensitive', () => {
    expect(parseScrollClass('Overscroll-contain')).toBeNull();
    expect(parseScrollClass('overscroll-X-auto')).toBeNull();
    expect(parseScrollClass('OVERSCROLL-Y-NONE')).toBeNull();
  });

  test('should not parse partial matches', () => {
    expect(parseScrollClass('overscroll-contain-extra')).toBeNull();
    expect(parseScrollClass('prefix-overscroll-x-auto')).toBeNull();
    expect(parseScrollClass('overscroll-y-none-suffix')).toBeNull();
  });
});