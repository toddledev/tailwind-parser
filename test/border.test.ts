import { parseBorderClasses } from '../src/parseBorderClasses'; // Replace with the actual file name


describe('parseBorderClasses', () => {
  it('should parse border color classes', () => {
    expect(parseBorderClasses('border-red-500')).toEqual({ 'border-color': '#f56565' });
    expect(parseBorderClasses('border-blue-700')).toEqual({ 'border-color': '#2b6cb0' });
    expect(parseBorderClasses('border-transparent')).toEqual({ 'border-color': 'transparent' });
  });

  it('should parse border style classes', () => {
    expect(parseBorderClasses('border-solid')).toEqual({ 'border-style': 'solid' });
    expect(parseBorderClasses('border-dashed')).toEqual({ 'border-style': 'dashed' });
    expect(parseBorderClasses('border-dotted')).toEqual({ 'border-style': 'dotted' });
  });

  it('should parse border width classes', () => {
    expect(parseBorderClasses('border')).toEqual({ 'border-width': '1px' });
    expect(parseBorderClasses('border-2')).toEqual({ 'border-width': '0.5rem' });
    expect(parseBorderClasses('border-t-4')).toEqual({ 'border-top-width': '1rem' });
  });

  it('should parse border opacity classes', () => {
    expect(parseBorderClasses('border-opacity-50')).toEqual({ '--tw-border-opacity': '50%' });
  });


  it('should parse border collapse classes', () => {
    expect(parseBorderClasses('border-collapse')).toEqual({ 'border-collapse': 'collapse' });
    expect(parseBorderClasses('border-separate')).toEqual({ 'border-collapse': 'separate' });
  });

  it('should parse rounded corner classes', () => {
    expect(parseBorderClasses('rounded')).toEqual({ 'border-radius': '0.25rem' });
    expect(parseBorderClasses('rounded-t-lg')).toEqual({
      'border-top-left-radius': '0.5rem',
      'border-top-right-radius': '0.5rem',
    });
    expect(parseBorderClasses('rounded-br-full')).toEqual({ 'border-bottom-right-radius': '9999px' });
  });

  it('should return null for unmatched classes', () => {
    expect(parseBorderClasses('text-lg')).toBeNull();
    expect(parseBorderClasses('bg-red-500')).toBeNull();
  });
});