import { parseClassString, defaultStyles } from '../src/tailwind-parser'; // Update with the correct import path

describe('parseClassString', () => {
  it('should return default styles and empty variants for empty string', () => {
    const result = parseClassString('');
    expect(result.style).toEqual(defaultStyles);
    expect(result.variants).toEqual([]);
  });

  it('should parse single class without modifiers', () => {
    const result = parseClassString('mx-2');
    expect(result.style).toMatchObject({
      'margin-left': '0.5rem',
      'margin-right': '0.5rem'
    });
    expect(result.variants).toEqual([]);
  });

  it('should parse multiple classes without modifiers', () => {
    const result = parseClassString('mx-2 py-4');
    expect(result.style).toMatchObject({
      'margin-left': '0.5rem',
      'margin-right': '0.5rem',
      'padding-top': '1rem',
      'padding-bottom': '1rem'
    });
    expect(result.variants).toEqual([]);
  });

  it('should parse class with single modifier', () => {
    const result = parseClassString('hover:bg-red-500');
    expect(result.style).toEqual(defaultStyles);
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'background-color': '#f56565' },
      hover: true
    });
  });
  it('should parse class with single breakpoint', () => {
    const result = parseClassString('md:flex-col');
    expect(result.style).toEqual(defaultStyles);
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'flex-direction': 'column' },
      mediaQuery:{"min-width":"768px"}
    });
    
  });

  it('should parse class with multiple modifiers', () => {
    const result = parseClassString('sm:hover:focus:bg-blue-500');
    expect(result.style).toEqual(defaultStyles);
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'background-color': '#4299e1' },
      hover: true,
      focus: true,
      mediaQuery: { 'min-width': '640px' }
    });
  });

  it('should parse classes with breakpoints', () => {
    const result = parseClassString('sm:bg-red-100 min-[600px]:bg-blue-100 max-md:bg-green-100');
    expect(result.style).toMatchObject(defaultStyles);
    expect(result.variants).toHaveLength(3);
    expect(result.variants).toContainEqual({
      style: { 'background-color': '#fff5f5' },
      mediaQuery:{'min-width': "640px"}
    });
    expect(result.variants).toContainEqual({
      style: { 'background-color': '#ebf8ff' },
      mediaQuery:{'min-width': "600px"}
    });
    expect(result.variants).toContainEqual({
      style: { 'background-color': '#f0fff4' },
      mediaQuery:{'max-width': "768px"}
    });
    
  });

  it('should parse multiple classes with modifiers', () => {
    const result = parseClassString('mx-2 hover:bg-red-500 sm:py-4');
    expect(result.style).toMatchObject({
      'margin-left': '0.5rem',
      'margin-right': '0.5rem'
    });
    expect(result.variants).toHaveLength(2);
    expect(result.variants).toContainEqual({
      style: { 'background-color': '#f56565' },
      hover: true
    });
    expect(result.variants).toContainEqual({
      style: { 'padding-top': '1rem', 'padding-bottom': '1rem' },
      mediaQuery: { 'min-width': '640px' }
    });
  });

  it('should parse pseudo-element modifier', () => {
    const result = parseClassString('before:content-[""]');
    expect(result.style).toEqual(defaultStyles);
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { content: '""' },
      pseudoElement: 'before'
    });
  });

  it('should handle multiple breakpoints', () => {
    const result = parseClassString('sm:mx-2 md:mx-4 lg:mx-6');
    expect(result.style).toEqual(defaultStyles);
    expect(result.variants).toHaveLength(3);
    expect(result.variants).toContainEqual({
      style: { 'margin-left': '0.5rem', 'margin-right': '0.5rem' },
      mediaQuery: { 'min-width': '640px' }
    });
    expect(result.variants).toContainEqual({
      style: { 'margin-left': '1rem', 'margin-right': '1rem' },
      mediaQuery: { 'min-width': '768px' }
    });
    expect(result.variants).toContainEqual({
      style: { 'margin-left': '1.5rem', 'margin-right': '1.5rem' },
      mediaQuery: { 'min-width': '1024px' }
    });
  });
});