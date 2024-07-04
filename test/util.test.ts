import { parseUtilClass } from '../src/parseUtilClass';

describe('parseUtilClass', () => {
  // Cursor tests
  test('parses cursor classes correctly', () => {
    expect(parseUtilClass('cursor-auto')).toEqual({ cursor: 'auto' });
    expect(parseUtilClass('cursor-default')).toEqual({ cursor: 'default' });
    expect(parseUtilClass('cursor-pointer')).toEqual({ cursor: 'pointer' });
    expect(parseUtilClass('cursor-wait')).toEqual({ cursor: 'wait' });
    expect(parseUtilClass('cursor-text')).toEqual({ cursor: 'text' });
    expect(parseUtilClass('cursor-move')).toEqual({ cursor: 'move' });
    expect(parseUtilClass('cursor-not-allowed')).toEqual({ cursor: 'not-allowed' });
  });

  // Appearance test
  test('parses appearance-none correctly', () => {
    expect(parseUtilClass('appearance-none')).toEqual({ appearance: 'none' });
  });

  // Placeholder color tests
//   test('parses placeholder color classes correctly', () => {
//     expect(parseUtilClass('placeholder-transparent')).toEqual({ '::placeholder': { color: 'transparent' } });
//     expect(parseUtilClass('placeholder-current')).toEqual({ '::placeholder': { color: 'currentColor' } });
//     expect(parseUtilClass('placeholder-black')).toEqual({ '::placeholder': { color: '#000' } });
//     expect(parseUtilClass('placeholder-white')).toEqual({ '::placeholder': { color: '#fff' } });
//     expect(parseUtilClass('placeholder-gray-100')).toEqual({ '::placeholder': { color: '#f7fafc' } });
//     expect(parseUtilClass('placeholder-red-600')).toEqual({ '::placeholder': { color: '#e53e3e' } });
//   });

  // Placeholder opacity test
  test('parses placeholder opacity classes correctly', () => {
    expect(parseUtilClass('placeholder-opacity-50')).toEqual({ '::placeholder': { opacity: 0.5 } });
  });

  // Outline test
  test('parses outline-none correctly', () => {
    expect(parseUtilClass('outline-none')).toEqual({ outline: 'none' });
  });

  // Overflow tests
  test('parses overflow classes correctly', () => {
    expect(parseUtilClass('overflow-auto')).toEqual({ overflow: 'auto' });
    expect(parseUtilClass('overflow-hidden')).toEqual({ overflow: 'hidden' });
    expect(parseUtilClass('overflow-x-scroll')).toEqual({ 'overflow-x': 'scroll' });
    expect(parseUtilClass('overflow-y-visible')).toEqual({ 'overflow-y': 'visible' });
  });

  // Scrolling tests
  test('parses scrolling classes correctly', () => {
    expect(parseUtilClass('scrolling-touch')).toEqual({ '-webkit-overflow-scrolling': 'touch' });
    expect(parseUtilClass('scrolling-auto')).toEqual({ '-webkit-overflow-scrolling': 'auto' });
  });

  // Pointer events tests
  test('parses pointer events classes correctly', () => {
    expect(parseUtilClass('pointer-events-none')).toEqual({ 'pointer-events': 'none' });
    expect(parseUtilClass('pointer-events-auto')).toEqual({ 'pointer-events': 'auto' });
  });

  // Resize tests
  test('parses resize classes correctly', () => {
    expect(parseUtilClass('resize')).toEqual({ resize: 'both' });
    expect(parseUtilClass('resize-none')).toEqual({ resize: 'none' });
    expect(parseUtilClass('resize-y')).toEqual({ resize: 'y' });
    expect(parseUtilClass('resize-x')).toEqual({ resize: 'x' });
  });

  // Select tests
  test('parses select classes correctly', () => {
    expect(parseUtilClass('select-none')).toEqual({ 'user-select': 'none' });
    expect(parseUtilClass('select-text')).toEqual({ 'user-select': 'text' });
    expect(parseUtilClass('select-all')).toEqual({ 'user-select': 'all' });
    expect(parseUtilClass('select-auto')).toEqual({ 'user-select': 'auto' });
  });

  // Number variant tests
  test('parses number variant classes correctly', () => {
    expect(parseUtilClass('lining-nums')).toEqual({ 'font-variant-numeric': 'lining-nums' });
    expect(parseUtilClass('oldstyle-nums')).toEqual({ 'font-variant-numeric': 'oldstyle-nums' });
    expect(parseUtilClass('normal-nums')).toEqual({ 'font-variant-numeric': 'normal' });
    expect(parseUtilClass('stacked-fractions')).toEqual({ 'font-variant-numeric': 'stacked-fractions' });
  });

  // Test for unmatched class
  test('returns null for unmatched class', () => {
    expect(parseUtilClass('non-existent-class')).toBeNull();
  });
});