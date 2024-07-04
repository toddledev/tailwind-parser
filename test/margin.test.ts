import { parseMarginClasses } from '../src/parseMarginClasses'; // Replace with the actual file name

describe('parseMarginClasses', () => {
  it('should return null for invalid class names', () => {
    expect(parseMarginClasses('invalid-class')).toBeNull();
    expect(parseMarginClasses('m-invalid')).toBeNull();
    expect(parseMarginClasses('margin-2')).toBeNull();
  });

  it('should parse margin classes correctly', () => {
    expect(parseMarginClasses('m-2')).toEqual({ margin: '0.5rem' });
    expect(parseMarginClasses('m-4')).toEqual({ margin: '1rem' });
    expect(parseMarginClasses('m-px')).toEqual({ margin: '1px' });
    expect(parseMarginClasses('m-auto')).toEqual({ margin: 'auto' });
  });

  it('should parse margin-bottom classes correctly', () => {
    expect(parseMarginClasses('mb-3')).toEqual({ 'margin-bottom': '0.75rem' });
    expect(parseMarginClasses('mb-6')).toEqual({ 'margin-bottom': '1.5rem' });
  });

  it('should parse margin-right classes correctly', () => {
    expect(parseMarginClasses('mr-8')).toEqual({ 'margin-right': '2rem' });
    expect(parseMarginClasses('mr-12')).toEqual({ 'margin-right': '3rem' });
  });

  it('should parse margin-top classes correctly', () => {
    expect(parseMarginClasses('mt-16')).toEqual({ 'margin-top': '4rem' });
    expect(parseMarginClasses('mt-24')).toEqual({ 'margin-top': '6rem' });
  });

  it('should parse margin-left classes correctly', () => {
    expect(parseMarginClasses('ml-32')).toEqual({ 'margin-left': '8rem' });
    expect(parseMarginClasses('ml-48')).toEqual({ 'margin-left': '12rem' });
  });

  it('should parse horizontal margin classes correctly', () => {
    expect(parseMarginClasses('mx-2')).toEqual({ 'margin-left': '0.5rem', 'margin-right': '0.5rem' });
    expect(parseMarginClasses('mx-4')).toEqual({ 'margin-left': '1rem', 'margin-right': '1rem' });
  });

  it('should parse vertical margin classes correctly', () => {
    expect(parseMarginClasses('my-3')).toEqual({ 'margin-top': '0.75rem', 'margin-bottom': '0.75rem' });
    expect(parseMarginClasses('my-6')).toEqual({ 'margin-top': '1.5rem', 'margin-bottom': '1.5rem' });
  });

  it('should handle negative margin classes', () => {
    expect(parseMarginClasses('-m-2')).toEqual({ margin: '-0.5rem' });
    expect(parseMarginClasses('-mt-4')).toEqual({ 'margin-top': '-1rem' });
    expect(parseMarginClasses('-mx-3')).toEqual({ 'margin-left': '-0.75rem', 'margin-right': '-0.75rem' });
  });

  it('should handle edge cases', () => {
    expect(parseMarginClasses('m-0')).toEqual({ margin: '0px' });
    expect(parseMarginClasses('m-64')).toEqual({ margin: '16rem' });
    expect(parseMarginClasses('-m-px')).toEqual({ margin: '-1px' });
  });
});