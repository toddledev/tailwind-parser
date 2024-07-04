import { parseVisibilityClasses } from '../src/parseVisibilityClasses'

describe('parseVisibilityClasses', () => {
  // Opacity tests
  test('parses opacity-0 correctly', () => {
    expect(parseVisibilityClasses('opacity-0')).toEqual({ opacity: '0' });
  });

  test('parses opacity-50 correctly', () => {
    expect(parseVisibilityClasses('opacity-50')).toEqual({ opacity: '0.5' });
  });

  test('parses opacity-100 correctly', () => {
    expect(parseVisibilityClasses('opacity-100')).toEqual({ opacity: '1' });
  });

  // Visibility tests
  test('parses visible correctly', () => {
    expect(parseVisibilityClasses('visible')).toEqual({ visibility: 'visible' });
  });

  test('parses invisible correctly', () => {
    expect(parseVisibilityClasses('invisible')).toEqual({ visibility: 'hidden' });
  });

  // Screen reader tests
  test('parses sr-only correctly', () => {
    expect(parseVisibilityClasses('sr-only')).toEqual({
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: '0',
    });
  });

  test('parses not-sr-only correctly', () => {
    expect(parseVisibilityClasses('not-sr-only')).toEqual({
      position: 'static',
      width: 'auto',
      height: 'auto',
      padding: '0',
      margin: '0',
      overflow: 'visible',
      clip: 'auto',
      whiteSpace: 'normal',
    });
  });

  // Edge cases and invalid inputs
  test('returns null for invalid class names', () => {
    expect(parseVisibilityClasses('invalid-class')).toBeNull();
  });

  test('returns null for empty string', () => {
    expect(parseVisibilityClasses('')).toBeNull();
  });

  test('returns null for opacity with invalid number', () => {
    expect(parseVisibilityClasses('opacity-abc')).toBeNull();
  });

  test('returns null for opacity out of range', () => {
    expect(parseVisibilityClasses('opacity-101')).toBeNull();
  });
});