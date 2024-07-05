import { parseFlexClasses } from '../src/parseFlexClasses'; // Replace with the actual file name

describe('parseFlexClasses', () => {
  test('should return null for non-matching class', () => {
    expect(parseFlexClasses('bg-red-500')).toBeNull();
  });

  test('should parse flex class', () => {
    expect(parseFlexClasses('flex')).toEqual({ display: 'flex' });
  });

  test('should parse flex-row class', () => {
    expect(parseFlexClasses('flex-row')).toEqual({ 'flex-direction': 'row' });
  });
  
  test('should parse flex-col class', () => {
    expect(parseFlexClasses('flex-col')).toEqual({ 'flex-direction': 'column' });
  });

  test('should parse flex-col-reverse class', () => {
    expect(parseFlexClasses('flex-col-reverse')).toEqual({ 'flex-direction': 'column-reverse' });
  });

  test('should parse flex-1 class', () => {
    expect(parseFlexClasses('flex-1')).toEqual({ flex: '1 1 0%' });
  });

  test('should parse flex-initial class', () => {
    expect(parseFlexClasses('flex-initial')).toEqual({ flex: 'initial' });
  });

  test('should parse flex-wrap class', () => {
    expect(parseFlexClasses('flex-wrap')).toEqual({ 'flex-wrap': 'wrap' });
  });

  test('should parse flex-no-wrap class', () => {
    expect(parseFlexClasses('flex-no-wrap')).toEqual({ 'flex-wrap': 'nowrap' });
  });

  test('should parse items-center class', () => {
    expect(parseFlexClasses('items-center')).toEqual({ 'align-items': 'center' });
  });

  test('should parse content-between class', () => {
    expect(parseFlexClasses('content-between')).toEqual({ 'align-content': 'between' });
  });

  test('should parse justify-around class', () => {
    expect(parseFlexClasses('justify-around')).toEqual({ 'justify-content': 'around' });
  });

  test('should parse self-stretch class', () => {
    expect(parseFlexClasses('self-stretch')).toEqual({ 'align-self': 'stretch' });
  });

  test('should parse flex-grow class', () => {
    expect(parseFlexClasses('flex-grow')).toEqual({ 'flex-grow': '1' });
  });

  test('should parse flex-grow-0 class', () => {
    expect(parseFlexClasses('flex-grow-0')).toEqual({ 'flex-grow': '0' });
  });

  test('should parse flex-shrink class', () => {
    expect(parseFlexClasses('flex-shrink')).toEqual({ 'flex-shrink': '1' });
  });

  test('should parse order-3 class', () => {
    expect(parseFlexClasses('order-3')).toEqual({ order: '3' });
  });

  test('should parse justify-items-start class', () => {
    expect(parseFlexClasses('justify-items-start')).toEqual({ 'justify-items': 'start' });
  });

  test('should parse justify-self-end class', () => {
    expect(parseFlexClasses('justify-self-end')).toEqual({ 'justify-self': 'end' });
  });

  test('should parse space-x-4 class', () => {
    expect(parseFlexClasses('space-x-4')).toEqual({
      '--tw-space-x': '1rem',
      'margin-left': 'var(--tw-space-x)',
    });
  });

  test('should parse space-y-px class', () => {
    expect(parseFlexClasses('space-y-px')).toEqual({
      '--tw-space-y': '1px',
      'margin-top': 'var(--tw-space-y)',
    });
  });

  test('should parse space-x-reverse class', () => {
    expect(parseFlexClasses('space-x-reverse')).toEqual({
      'margin-right': 'calc(var(--tw-space-x) * -1)',
    });
  });
});