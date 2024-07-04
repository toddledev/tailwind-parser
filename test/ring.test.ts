import { parseRingClasses } from '../src/parseRingClasses';

describe('parseRingClasses', () => {
  test('should parse ring width', () => {
    expect(parseRingClasses('ring')).toEqual({
      'box-shadow': '0 0 0 3px var(--tw-ring-color)',
      '--tw-ring-offset-shadow': '0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
      '--tw-ring-shadow': '0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    });

    expect(parseRingClasses('ring-2')).toEqual({
      'box-shadow': '0 0 0 2px var(--tw-ring-color)',
      '--tw-ring-offset-shadow': '0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
      '--tw-ring-shadow': '0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    });
  });

  test('should parse ring color', () => {
    expect(parseRingClasses('ring-blue-500')).toEqual({
      '--tw-ring-color': '#4299e1',
    });

    expect(parseRingClasses('ring-red-700')).toEqual({
      '--tw-ring-color': '#c53030',
    });
  });

  test('should parse ring inset', () => {
    expect(parseRingClasses('ring-inset')).toEqual({
      '--tw-ring-inset': 'inset',
    });
  });

  test('should parse ring offset width', () => {
    expect(parseRingClasses('ring-offset-2')).toEqual({
      '--tw-ring-offset-width': '2px',
    });

    expect(parseRingClasses('ring-offset-8')).toEqual({
      '--tw-ring-offset-width': '8px',
    });
  });

  test('should parse ring offset color', () => {
    expect(parseRingClasses('ring-offset-blue-500')).toEqual({
      '--tw-ring-offset-color': '#4299e1',
    });

    expect(parseRingClasses('ring-offset-red-700')).toEqual({
      '--tw-ring-offset-color': '#c53030',
    });
  });

  test('should parse ring opacity', () => {
    expect(parseRingClasses('ring-opacity-50')).toEqual({
      '--tw-ring-opacity': '0.5',
    });

    expect(parseRingClasses('ring-opacity-75')).toEqual({
      '--tw-ring-opacity': '0.75',
    });
  });

  test('should return null for invalid classes', () => {
    expect(parseRingClasses('not-a-ring-class')).toBeNull();
    expect(parseRingClasses('ring-invalid-color')).toBeNull();
    expect(parseRingClasses('ring-offset-invalid-color')).toBeNull();
  });
});