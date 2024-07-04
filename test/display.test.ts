import { parseDisplayClasses } from '../src/parseDisplayClasses'; // Replace with the actual file name

describe('parseDisplayClasses', () => {
  // Box sizing tests
  test('parses box-border correctly', () => {
    expect(parseDisplayClasses('box-border')).toEqual({ 'box-sizing': 'border' });
  });

  test('parses box-content correctly', () => {
    expect(parseDisplayClasses('box-content')).toEqual({ 'box-sizing': 'content' });
  });

  // Display tests
  test('parses block correctly', () => {
    expect(parseDisplayClasses('block')).toEqual({ display: 'block' });
  });

  test('parses hidden correctly', () => {
    expect(parseDisplayClasses('hidden')).toEqual({ display: 'none' });
  });

  test('parses inline correctly', () => {
    expect(parseDisplayClasses('inline')).toEqual({ display: 'inline' });
  });

  test('parses inline-block correctly', () => {
    expect(parseDisplayClasses('inline-block')).toEqual({ display: 'inline-block' });
  });

  test('parses inline-flex correctly', () => {
    expect(parseDisplayClasses('inline-flex')).toEqual({ display: 'inline-flex' });
  });

  test('parses inline-grid correctly', () => {
    expect(parseDisplayClasses('inline-grid')).toEqual({ display: 'inline-grid' });
  });

  test('parses flex correctly', () => {
    expect(parseDisplayClasses('flex')).toEqual({ display: 'flex' });
  });

  test('parses grid correctly', () => {
    expect(parseDisplayClasses('grid')).toEqual({ display: 'grid' });
  });

  test('parses flow-root correctly', () => {
    expect(parseDisplayClasses('flow-root')).toEqual({ display: 'flow-root' });
  });

  // Invalid input tests
  test('returns null for invalid box-sizing class', () => {
    expect(parseDisplayClasses('box-invalid')).toBeNull();
  });

  test('returns null for non-existent display class', () => {
    expect(parseDisplayClasses('non-existent-class')).toBeNull();
  });

  test('returns null for empty string', () => {
    expect(parseDisplayClasses('')).toBeNull();
  });
});