import { parseOutlineClass } from '../src/parseOutlineClass'; // Replace with the actual file name

describe('parseOutlineClass', () => {
  test('should return null for non-outline class', () => {
    expect(parseOutlineClass('bg-red-500')).toBeNull();
  });

  test('should return correct CSS for outline-black', () => {
    expect(parseOutlineClass('outline-black')).toEqual({ outline: '2px solid #000000' });
  });

  test('should return correct CSS for outline-white', () => {
    expect(parseOutlineClass('outline-white')).toEqual({ outline: '2px solid #ffffff' });
  });

  test('should return null for unsupported outline color', () => {
    expect(parseOutlineClass('outline-red')).toBeNull();
  });

  test('should be case-sensitive', () => {
    expect(parseOutlineClass('Outline-black')).toBeNull();
    expect(parseOutlineClass('OUTLINE-WHITE')).toBeNull();
  });

  test('should not match partial class names', () => {
    expect(parseOutlineClass('my-outline-black')).toBeNull();
    expect(parseOutlineClass('outline-black-500')).toBeNull();
  });


  test('should return null for empty string', () => {
    expect(parseOutlineClass('')).toBeNull();
  });
});