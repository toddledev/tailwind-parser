import { parseTransformClass } from '../src/parseTransformClass';

describe('parseTransformClass', () => {
  // Transform tests
  test('transform', () => {
    expect(parseTransformClass('transform')).toEqual({
      transform: 'translate(0px, 0px) rotate(0deg) skewX(0) skewY(0) scaleX(1) scaleY(1)',
    });
  });

  test('transform-none', () => {
    expect(parseTransformClass('transform-none')).toEqual({ transform: 'none' });
  });

  test('transform-gpu', () => {
    expect(parseTransformClass('transform-gpu')).toEqual({
      transform: 'translate3d(0, 0, 0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)',
    });
  });

  // Origin tests
  test.each([
    ['origin-center', 'center'],
    ['origin-top', 'top'],
    ['origin-right', 'right'],
    ['origin-bottom', 'bottom'],
    ['origin-left', 'left'],
    ['origin-top-right', 'top right'],
    ['origin-top-left', 'top left'],
    ['origin-bottom-right', 'bottom right'],
    ['origin-bottom-left', 'bottom left'],
  ])('%s', (input, expected) => {
    expect(parseTransformClass(input)).toEqual({ 'transform-origin': expected });
  });

  // Translate tests
  test.each([
    ['translate-x-full', { transform: 'x(100%)' }],
    ['translate-y-1/2', { transform: 'y(50%)' }],
    ['translate-x-px', { transform: 'x(1px)' }],
    ['translate-y-1/4', { transform: 'y(25%)' }],
    ['translate-x-2', { transform: 'x(0.5rem)' }],
    ['-translate-y-3', { transform: 'y(-0.75rem)' }],
  ])('%s', (input, expected) => {
    expect(parseTransformClass(input)).toEqual(expected);
  });

  // Scale tests
  test.each([
    ['scale-50', { transform: 'scale(0.5)' }],
    ['scale-x-150', { transform: 'scaleX(1.5)' }],
    ['scale-y-75', { transform: 'scaleY(0.75)' }],
  ])('%s', (input, expected) => {
    expect(parseTransformClass(input)).toEqual(expected);
  });

  // Rotate tests
  test.each([
    ['rotate-45', { transform: 'rotate(45deg)' }],
    ['-rotate-90', { transform: 'rotate(-90deg)' }],
  ])('%s', (input, expected) => {
    expect(parseTransformClass(input)).toEqual(expected);
  });

  // Skew tests
  test.each([
    ['skew-x-12', { transform: 'skew-x(12deg)' }],
    ['-skew-y-6', { transform: 'skew-y(-6deg)' }],
  ])('%s', (input, expected) => {
    expect(parseTransformClass(input)).toEqual(expected);
  });

  // No match test
  test('no match', () => {
    expect(parseTransformClass('invalid-class')).toBeNull();
  });
});