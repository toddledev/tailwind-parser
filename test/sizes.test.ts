import { parseSizeClasses } from '../src/parseSizeClasses'; // Replace with the actual file name


describe('parseSizeClasses', () => {
  // Height tests
  test('parses height classes correctly', () => {
    expect(parseSizeClasses('h-4')).toEqual({ height: '1rem' });
    expect(parseSizeClasses('h-auto')).toEqual({ height: 'auto' });
    expect(parseSizeClasses('h-px')).toEqual({ height: '1px' });
    expect(parseSizeClasses('h-full')).toEqual({ height: '100%' });
    expect(parseSizeClasses('h-screen')).toEqual({ height: '100vh' });
  });

  // Max Height tests
  test('parses max-height classes correctly', () => {
    expect(parseSizeClasses('max-h-full')).toEqual({ 'max-height': '100%' });
    expect(parseSizeClasses('max-h-screen')).toEqual({ 'max-height': '100vh' });
    expect(parseSizeClasses('max-h-px')).toEqual({ 'max-height': '1px' });
    expect(parseSizeClasses('max-h-4')).toEqual({ 'max-height': '1rem' });
  });

  // Min Height tests
  test('parses min-height classes correctly', () => {
    expect(parseSizeClasses('min-h-0')).toEqual({ 'min-height': '0rem' });
    expect(parseSizeClasses('min-h-full')).toEqual({ 'min-height': '100%' });
    expect(parseSizeClasses('min-h-screen')).toEqual({ 'min-height': '100vh' });
    expect(parseSizeClasses('min-h-4')).toEqual({ 'min-height': '1rem' });
  });

  // Width tests
  test('parses width classes correctly', () => {
    expect(parseSizeClasses('w-4')).toEqual({ width: '1rem' });
    expect(parseSizeClasses('w-auto')).toEqual({ width: 'auto' });
    expect(parseSizeClasses('w-px')).toEqual({ width: '1px' });
    expect(parseSizeClasses('w-full')).toEqual({ width: '100%' });
    expect(parseSizeClasses('w-screen')).toEqual({ width: '100vh' });
    expect(parseSizeClasses('w-1/2')).toEqual({ width: '50%' });
    expect(parseSizeClasses('w-1/3')).toEqual({ width: '33.333333%' });
    expect(parseSizeClasses('w-2/3')).toEqual({ width: '66.666667%' });
    expect(parseSizeClasses('w-1/4')).toEqual({ width: '25%' });
    expect(parseSizeClasses('w-3/4')).toEqual({ width: '75%' });
    expect(parseSizeClasses('w-1/5')).toEqual({ width: '20%' });
    expect(parseSizeClasses('w-2/6')).toEqual({ width: '33.333333%' });
    expect(parseSizeClasses('w-7/12')).toEqual({ width: '58.333333%' });
  });

  // Max Width tests
  test('parses max-width classes correctly', () => {
    expect(parseSizeClasses('max-w-xs')).toEqual({ 'max-width': '20rem' });
    expect(parseSizeClasses('max-w-sm')).toEqual({ 'max-width': '24rem' });
    expect(parseSizeClasses('max-w-md')).toEqual({ 'max-width': '28rem' });
    expect(parseSizeClasses('max-w-lg')).toEqual({ 'max-width': '32rem' });
    expect(parseSizeClasses('max-w-xl')).toEqual({ 'max-width': '36rem' });
    expect(parseSizeClasses('max-w-2xl')).toEqual({ 'max-width': '42rem' });
    expect(parseSizeClasses('max-w-7xl')).toEqual({ 'max-width': '80rem' });
    expect(parseSizeClasses('max-w-full')).toEqual({ 'max-width': '100%' });
    expect(parseSizeClasses('max-w-screen-sm')).toEqual({ 'max-width': '640px' });
    expect(parseSizeClasses('max-w-screen-xl')).toEqual({ 'max-width': '1280px' });
    expect(parseSizeClasses('max-w-none')).toEqual({ 'max-width': 'none' });
    expect(parseSizeClasses('max-w-0')).toEqual({ 'max-width': '0rem' });
    expect(parseSizeClasses('max-w-prose')).toEqual({ 'max-width': '65ch' });
    expect(parseSizeClasses('max-w-4')).toEqual({ 'max-width': '1rem' });
  });

  // Min Width tests
  test('parses min-width classes correctly', () => {
    expect(parseSizeClasses('min-w-0')).toEqual({ 'min-width': '0rem' });
    expect(parseSizeClasses('min-w-full')).toEqual({ 'min-width': '100%' });
    expect(parseSizeClasses('min-w-min')).toEqual({ 'min-width': 'min-content' });
    expect(parseSizeClasses('min-w-max')).toEqual({ 'min-width': 'max-content' });
    expect(parseSizeClasses('min-w-4')).toEqual({ 'min-width': '1rem' });
  });

  // Invalid class tests
  test('returns null for invalid classes', () => {
    expect(parseSizeClasses('invalid-class')).toBeNull();
    expect(parseSizeClasses('w-invalid')).toBeNull();
    expect(parseSizeClasses('h-invalid')).toBeNull();
    expect(parseSizeClasses('max-w-invalid')).toBeNull();
    expect(parseSizeClasses('min-h-invalid')).toBeNull();
  });
});