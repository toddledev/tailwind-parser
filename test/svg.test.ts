import { parseSvgClass } from '../src/parseSvgClass';

describe('parseSvgClass', () => {
  test('returns correct styles for "svg" class', () => {
    expect(parseSvgClass('svg')).toEqual({
      display: 'inline-block',
      'vertical-align': 'middle',
    });
  });

  test('returns correct styles for "fill-current" class', () => {
    expect(parseSvgClass('fill-current')).toEqual({
      fill: 'currentColor',
    });
  });

  test('returns correct styles for "stroke-current" class', () => {
    expect(parseSvgClass('stroke-current')).toEqual({
      stroke: 'currentColor',
    });
  });

  test('returns correct styles for stroke width classes', () => {
    expect(parseSvgClass('stroke-1')).toEqual({
      'stroke-width': '1',
    });
    expect(parseSvgClass('stroke-2')).toEqual({
      'stroke-width': '2',
    });
    expect(parseSvgClass('stroke-10')).toEqual({
      'stroke-width': '10',
    });
  });

  test('returns correct styles for stroke color classes', () => {
    expect(parseSvgClass('stroke-red-500')).toEqual({
      stroke: '#f56565',
    });
    expect(parseSvgClass('stroke-blue-700')).toEqual({
      stroke: '#2b6cb0',
    });
  });

  test('returns null for unknown classes', () => {
    expect(parseSvgClass('unknown-class')).toBeNull();
    expect(parseSvgClass('text-lg')).toBeNull();
    expect(parseSvgClass('bg-gray-200')).toBeNull();
  });

  test('returns null for invalid stroke width classes', () => {
    expect(parseSvgClass('stroke-')).toBeNull();
    expect(parseSvgClass('stroke-a')).toBeNull();
  });

  test('returns null for invalid stroke color classes', () => {
    expect(parseSvgClass('stroke-invalid-100')).toBeNull();
    expect(parseSvgClass('stroke-red-')).toBeNull();
    expect(parseSvgClass('stroke-blue-1000')).toBeNull();
  });
});