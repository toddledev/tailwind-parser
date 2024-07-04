import { parsePositioningClasses } from '../src/parsePositioningClasses';

describe('parsePositioningClasses', () => {
  // Alignment tests
  test('parses alignment classes correctly', () => {
    expect(parsePositioningClasses('align-baseline')).toEqual({ 'vertical-align': 'baseline' });
    expect(parsePositioningClasses('align-top')).toEqual({ 'vertical-align': 'top' });
    expect(parsePositioningClasses('align-middle')).toEqual({ 'vertical-align': 'middle' });
    expect(parsePositioningClasses('align-bottom')).toEqual({ 'vertical-align': 'bottom' });
    expect(parsePositioningClasses('align-text-top')).toEqual({ 'vertical-align': 'top' });
    expect(parsePositioningClasses('align-text-bottom')).toEqual({ 'vertical-align': 'bottom' });
  });

  // Clear tests
  test('parses clear classes correctly', () => {
    expect(parsePositioningClasses('clear-left')).toEqual({ clear: 'left' });
    expect(parsePositioningClasses('clear-right')).toEqual({ clear: 'right' });
    expect(parsePositioningClasses('clear-both')).toEqual({ clear: 'both' });
    expect(parsePositioningClasses('clear-none')).toEqual({ clear: 'none' });
  });

  // Float tests
  test('parses float classes correctly', () => {
    expect(parsePositioningClasses('float-right')).toEqual({ float: 'right' });
    expect(parsePositioningClasses('float-left')).toEqual({ float: 'left' });
    expect(parsePositioningClasses('float-none')).toEqual({ float: 'none' });
  });

  // Inset tests
  test('parses inset classes correctly', () => {
    expect(parsePositioningClasses('inset-0')).toEqual({ top: '0rem', right: '0rem', bottom: '0rem', left: '0rem' });
    expect(parsePositioningClasses('inset-x-2')).toEqual({ left: '0.5rem', right: '0.5rem' });
    expect(parsePositioningClasses('inset-y-4')).toEqual({ top: '1rem', bottom: '1rem' });
    expect(parsePositioningClasses('top-full')).toEqual({ top: '100%' });
    expect(parsePositioningClasses('left-auto')).toEqual({ left: 'auto' });
    expect(parsePositioningClasses('right-px')).toEqual({ right: '1px' });
  });

  // Object fit and position tests
  test('parses object-fit classes correctly', () => {
    expect(parsePositioningClasses('object-contain')).toEqual({ 'object-fit': 'contain' });
    expect(parsePositioningClasses('object-cover')).toEqual({ 'object-fit': 'cover' });
    expect(parsePositioningClasses('object-fill')).toEqual({ 'object-fit': 'fill' });
    expect(parsePositioningClasses('object-none')).toEqual({ 'object-fit': 'none' });
    expect(parsePositioningClasses('object-scale-down')).toEqual({ 'object-fit': 'scale-down' });
  });

  test('parses object-position classes correctly', () => {
    expect(parsePositioningClasses('object-bottom')).toEqual({ 'object-position': 'bottom' });
    expect(parsePositioningClasses('object-center')).toEqual({ 'object-position': 'center' });
    expect(parsePositioningClasses('object-left-top')).toEqual({ 'object-position': 'left top' });
    expect(parsePositioningClasses('object-right-bottom')).toEqual({ 'object-position': 'right bottom' });
  });

  // Z-index tests
  test('parses z-index classes correctly', () => {
    expect(parsePositioningClasses('z-10')).toEqual({ 'z-index': '10' });
    expect(parsePositioningClasses('z-auto')).toEqual({ 'z-index': 'auto' });
  });

  // Position tests
  test('parses position classes correctly', () => {
    expect(parsePositioningClasses('static')).toEqual({ position: 'static' });
    expect(parsePositioningClasses('relative')).toEqual({ position: 'relative' });
    expect(parsePositioningClasses('absolute')).toEqual({ position: 'absolute' });
    expect(parsePositioningClasses('fixed')).toEqual({ position: 'fixed' });
    expect(parsePositioningClasses('sticky')).toEqual({ position: 'sticky' });
  });

  // Negative value tests
  test('parses negative classes correctly', () => {
    expect(parsePositioningClasses('-inset-2')).toEqual({ top: '-0.5rem', right: '-0.5rem', bottom: '-0.5rem', left: '-0.5rem' });
    expect(parsePositioningClasses('-top-4')).toEqual({ top: '-1rem' });
  });

  // No match test
  test('returns null for non-matching classes', () => {
    expect(parsePositioningClasses('text-red-500')).toBeNull();
    expect(parsePositioningClasses('bg-blue-300')).toBeNull();
  });
});