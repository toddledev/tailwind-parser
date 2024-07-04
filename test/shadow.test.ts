import { parseShadowClass } from '../src/parseShadowClass'; // Replace with the actual file name

describe('parseShadowClass', () => {
  test('should return correct box-shadow for shadow-xs', () => {
    expect(parseShadowClass('shadow-xs')).toEqual({ 'box-shadow': '0 0 0 1px rgba(0, 0, 0, 0.05)' });
  });

  test('should return correct box-shadow for shadow-sm', () => {
    expect(parseShadowClass('shadow-sm')).toEqual({ 'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.05)' });
  });

  test('should return correct box-shadow for shadow', () => {
    expect(parseShadowClass('shadow')).toEqual({ 'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' });
  });

  test('should return correct box-shadow for shadow-md', () => {
    expect(parseShadowClass('shadow-md')).toEqual({ 'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' });
  });

  test('should return correct box-shadow for shadow-lg', () => {
    expect(parseShadowClass('shadow-lg')).toEqual({ 'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' });
  });

  test('should return correct box-shadow for shadow-xl', () => {
    expect(parseShadowClass('shadow-xl')).toEqual({ 'box-shadow': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' });
  });

  test('should return correct box-shadow for shadow-2xl', () => {
    expect(parseShadowClass('shadow-2xl')).toEqual({ 'box-shadow': '0 25px 50px -12px rgba(0, 0, 0, 0.25)' });
  });

  test('should return correct box-shadow for shadow-inner', () => {
    expect(parseShadowClass('shadow-inner')).toEqual({ 'box-shadow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' });
  });

  test('should return correct box-shadow for shadow-outline', () => {
    expect(parseShadowClass('shadow-outline')).toEqual({ 'box-shadow': '0 0 0 3px rgba(66, 153, 225, 0.5)' });
  });

  test('should return correct box-shadow for shadow-none', () => {
    expect(parseShadowClass('shadow-none')).toEqual({ 'box-shadow': 'none' });
  });

  test('should return null for invalid shadow class', () => {
    expect(parseShadowClass('shadow-invalid')).toBeNull();
  });

  test('should return null for non-shadow class', () => {
    expect(parseShadowClass('text-lg')).toBeNull();
  });

  test('should return null for empty string', () => {
    expect(parseShadowClass('')).toBeNull();
  });
});