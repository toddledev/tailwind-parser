import { parsePaddingClasses } from '../src/parsePaddingClasses'; // Replace with the actual file name

describe('parsePaddingClasses', () => {
  it('should return null for invalid class names', () => {
    expect(parsePaddingClasses('invalid-class')).toBeNull();
    expect(parsePaddingClasses('p-invalid')).toBeNull();
    expect(parsePaddingClasses('px-100')).toBeNull();
  });

  it('should parse padding for all sides', () => {
    expect(parsePaddingClasses('p-4')).toEqual({ padding: '1rem' });
    expect(parsePaddingClasses('p-[15px]')).toEqual({ padding: '15px' });
    expect(parsePaddingClasses('p-px')).toEqual({ padding: '1px' });
});

it('should parse padding for individual sides', () => {
    expect(parsePaddingClasses('pt-2')).toEqual({ 'padding-top': '0.5rem' });
    expect(parsePaddingClasses('pr-3')).toEqual({ 'padding-right': '0.75rem' });
    expect(parsePaddingClasses('pb-6')).toEqual({ 'padding-bottom': '1.5rem' });
    expect(parsePaddingClasses('pl-8')).toEqual({ 'padding-left': '2rem' });
    expect(parsePaddingClasses('pl-[10%]')).toEqual({ 'padding-left': '10%' });
});

it('should parse padding for horizontal and vertical sides', () => {
    expect(parsePaddingClasses('px-4')).toEqual({
        'padding-left': '1rem',
        'padding-right': '1rem',
    });
    expect(parsePaddingClasses('py-2')).toEqual({
        'padding-top': '0.5rem',
        'padding-bottom': '0.5rem',
    });
    expect(parsePaddingClasses('py-[-10%]')).toEqual({ 'padding-top': '-10%', 'padding-bottom':"-10%" });
  });

  it('should handle different size values', () => {
    expect(parsePaddingClasses('p-0')).toEqual({ padding: '0px' });
    expect(parsePaddingClasses('p-1')).toEqual({ padding: '0.25rem' });
    expect(parsePaddingClasses('p-16')).toEqual({ padding: '4rem' });
    expect(parsePaddingClasses('p-64')).toEqual({ padding: '16rem' });
  });

  it('should handle px value', () => {
    expect(parsePaddingClasses('p-px')).toEqual({ padding: '1px' });
    expect(parsePaddingClasses('pt-px')).toEqual({ 'padding-top': '1px' });
  });
});