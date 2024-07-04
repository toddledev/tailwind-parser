import { parseBackgroundClasses } from '../src/parseBackgroundClasses'; // Replace with the actual file name

describe('parseBackgroundClasses', () => {
  // Background size
  test('parses background size classes correctly', () => {
    expect(parseBackgroundClasses('bg-auto')).toEqual({ 'background-size': 'auto' });
    expect(parseBackgroundClasses('bg-cover')).toEqual({ 'background-size': 'cover' });
    expect(parseBackgroundClasses('bg-contain')).toEqual({ 'background-size': 'contain' });
  });

  // Background position
  test('parses background position classes correctly', () => {
    expect(parseBackgroundClasses('bg-bottom')).toEqual({ 'background-position': 'bottom' });
    expect(parseBackgroundClasses('bg-top')).toEqual({ 'background-position': 'top' });
    expect(parseBackgroundClasses('bg-center')).toEqual({ 'background-position': 'center' });
    expect(parseBackgroundClasses('bg-left-top')).toEqual({ 'background-position': 'left top' });
    expect(parseBackgroundClasses('bg-right-bottom')).toEqual({ 'background-position': 'right bottom' });
  });

  // Background attachment
  test('parses background attachment classes correctly', () => {
    expect(parseBackgroundClasses('bg-fixed')).toEqual({ 'background-attachment': 'fixed' });
    expect(parseBackgroundClasses('bg-local')).toEqual({ 'background-attachment': 'local' });
    expect(parseBackgroundClasses('bg-scroll')).toEqual({ 'background-attachment': 'scroll' });
  });

  // Background repeat
  test('parses background repeat classes correctly', () => {
    expect(parseBackgroundClasses('bg-no-repeat')).toEqual({ 'background-repeat': 'no-repeat' });
    expect(parseBackgroundClasses('bg-repeat')).toEqual({ 'background-repeat': 'repeat' });
    expect(parseBackgroundClasses('bg-repeat-x')).toEqual({ 'background-repeat': 'repeat-x' });
    expect(parseBackgroundClasses('bg-repeat-round')).toEqual({ 'background-repeat': 'repeat-round' });
  });

  // Background opacity
  test('parses background opacity classes correctly', () => {
    expect(parseBackgroundClasses('bg-opacity-50')).toEqual({ '--tw-bg-opacity': '0.5' });
    expect(parseBackgroundClasses('bg-opacity-75')).toEqual({ '--tw-bg-opacity': '0.75' });
  });

  // Background clip
  test('parses background clip classes correctly', () => {
    expect(parseBackgroundClasses('bg-clip-border')).toEqual({ 'background-clip': 'border' });
    expect(parseBackgroundClasses('bg-clip-content')).toEqual({ 'background-clip': 'content' });
    expect(parseBackgroundClasses('bg-clip-padding')).toEqual({ 'background-clip': 'padding' });
    expect(parseBackgroundClasses('bg-clip-text')).toEqual({ 'background-clip': 'text' });
  });

  // Background color
  test('parses background color classes correctly', () => {
    // You'll need to mock or provide the colorMap for these tests

    expect(parseBackgroundClasses('bg-red-500')).toEqual({ 'background-color': '#f56565' });
    expect(parseBackgroundClasses('bg-blue')).toEqual({ 'background-color': '#4299e1' });
    expect(parseBackgroundClasses('bg-black')).toEqual({ 'background-color': '#000' });
    expect(parseBackgroundClasses('bg-white')).toEqual({ 'background-color': '#fff' });
  });

  // Background gradients
  test('parses background gradient classes correctly', () => {
    expect(parseBackgroundClasses('bg-gradient-to-r')).toEqual({
      'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))',
    });
    expect(parseBackgroundClasses('bg-gradient-to-tl')).toEqual({
      'background-image': 'linear-gradient(to top left, var(--tw-gradient-stops))',
    });
  });

  // Gradient color stops
  test('parses gradient color stop classes correctly', () => {
 
    expect(parseBackgroundClasses('from-red-500')).toEqual({
      '--tw-gradient-from': '#f56565',
      '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
    });
    expect(parseBackgroundClasses('via-blue')).toEqual({
      '--tw-gradient-via': '#4299e1',
      '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
    });
  });

  // Invalid class
  test('returns null for invalid classes', () => {
    expect(parseBackgroundClasses('invalid-class')).toBeNull();
  });
});