import { parseListClasses } from '../src/parseListClasses'

describe('parseListClasses', () => {
  test('should parse list-none correctly', () => {
    expect(parseListClasses('list-none')).toEqual({ 'list-style-type': 'none' });
  });

  test('should parse list-disc correctly', () => {
    expect(parseListClasses('list-disc')).toEqual({ 'list-style-type': 'disc' });
  });

  test('should parse list-decimal correctly', () => {
    expect(parseListClasses('list-decimal')).toEqual({ 'list-style-type': 'decimal' });
  });

  test('should parse list-square correctly', () => {
    expect(parseListClasses('list-square')).toEqual({ 'list-style-type': 'square' });
  });

  test('should parse list-inside correctly', () => {
    expect(parseListClasses('list-inside')).toEqual({ 'list-style-position': 'inside' });
  });

  test('should parse list-outside correctly', () => {
    expect(parseListClasses('list-outside')).toEqual({ 'list-style-position': 'outside' });
  });

  test('should parse custom list-style-type correctly', () => {
    expect(parseListClasses('list-circle')).toEqual({ 'list-style-type': 'circle' });
  });

  test('should return null for non-matching class names', () => {
    expect(parseListClasses('text-center')).toBeNull();
  });

  test('should return null for empty string', () => {
    expect(parseListClasses('')).toBeNull();
  });

  test('should return null for invalid list- prefix', () => {
    expect(parseListClasses('list-')).toBeNull();
  });

  test('should not parse list-inside as a custom list-style-type', () => {
    expect(parseListClasses('list-inside')).not.toEqual({ 'list-style-type': 'inside' });
  });

  test('should not parse list-outside as a custom list-style-type', () => {
    expect(parseListClasses('list-outside')).not.toEqual({ 'list-style-type': 'outside' });
  });
});