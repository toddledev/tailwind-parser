import { parseTransitionClass } from '../src/parseTransitionClass';

describe('parseTransitionClass', () => {
  // Animation ease tests
  test('parses ease-linear correctly', () => {
    expect(parseTransitionClass('ease-linear')).toEqual({ 'transition-timing-function': 'linear' });
  });

  test('parses ease-in correctly', () => {
    expect(parseTransitionClass('ease-in')).toEqual({ 'transition-timing-function': 'in' });
  });

  test('parses ease-out correctly', () => {
    expect(parseTransitionClass('ease-out')).toEqual({ 'transition-timing-function': 'out' });
  });

  test('parses ease-in-out correctly', () => {
    expect(parseTransitionClass('ease-in-out')).toEqual({ 'transition-timing-function': 'in-out' });
  });

  // Duration tests
  test('parses duration-100 correctly', () => {
    expect(parseTransitionClass('duration-100')).toEqual({ 'transition-duration': '100ms' });
  });

  test('parses duration-1000 correctly', () => {
    expect(parseTransitionClass('duration-1000')).toEqual({ 'transition-duration': '1000ms' });
  });

  // Delay tests
  test('parses delay-150 correctly', () => {
    expect(parseTransitionClass('delay-150')).toEqual({ 'transition-delay': '150ms' });
  });

  test('parses delay-2000 correctly', () => {
    expect(parseTransitionClass('delay-2000')).toEqual({ 'transition-delay': '2000ms' });
  });

  // Transition test
  test('parses transition correctly', () => {
    expect(parseTransitionClass('transition')).toEqual({
      'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration': '150ms',
    });
  });

  // Transition specific properties tests
  test('parses transition-all correctly', () => {
    expect(parseTransitionClass('transition-all')).toEqual({
      'transition-property': 'all',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration': '150ms',
    });
  });

  test('parses transition-colors correctly', () => {
    expect(parseTransitionClass('transition-colors')).toEqual({
      'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration': '150ms',
    });
  });

  test('parses transition-opacity correctly', () => {
    expect(parseTransitionClass('transition-opacity')).toEqual({
      'transition-property': 'opacity',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration': '150ms',
    });
  });

  test('parses transition-shadow correctly', () => {
    expect(parseTransitionClass('transition-shadow')).toEqual({
      'transition-property': 'box-shadow',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration': '150ms',
    });
  });

  test('parses transition-transform correctly', () => {
    expect(parseTransitionClass('transition-transform')).toEqual({
      'transition-property': 'transform',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration': '150ms',
    });
  });

  // Invalid input tests
  test('returns null for invalid input', () => {
    expect(parseTransitionClass('invalid-class')).toBeNull();
  });

  test('returns null for empty string', () => {
    expect(parseTransitionClass('')).toBeNull();
  });
});