import { parseTailwindTableClass } from '../src/parseTailwindTableClass';

describe('parseTailwindTableClass', () => {
  it('should return correct CSS properties for "table" class', () => {
    expect(parseTailwindTableClass('table')).toEqual({ display: 'table' });
  });

  it('should return correct CSS properties for "table-caption" class', () => {
    expect(parseTailwindTableClass('table-caption')).toEqual({ display: 'table-caption' });
  });

  it('should return correct CSS properties for "table-cell" class', () => {
    expect(parseTailwindTableClass('table-cell')).toEqual({ display: 'table-cell' });
  });

  it('should return correct CSS properties for "table-column" class', () => {
    expect(parseTailwindTableClass('table-column')).toEqual({ display: 'table-column' });
  });

  it('should return correct CSS properties for "table-column-group" class', () => {
    expect(parseTailwindTableClass('table-column-group')).toEqual({ display: 'table-column-group' });
  });

  it('should return correct CSS properties for "table-footer-group" class', () => {
    expect(parseTailwindTableClass('table-footer-group')).toEqual({ display: 'table-footer-group' });
  });

  it('should return correct CSS properties for "table-header-group" class', () => {
    expect(parseTailwindTableClass('table-header-group')).toEqual({ display: 'table-header-group' });
  });

  it('should return correct CSS properties for "table-row-group" class', () => {
    expect(parseTailwindTableClass('table-row-group')).toEqual({ display: 'table-row-group' });
  });

  it('should return correct CSS properties for "table-row" class', () => {
    expect(parseTailwindTableClass('table-row')).toEqual({ display: 'table-row' });
  });

  it('should return correct CSS properties for "table-auto" class', () => {
    expect(parseTailwindTableClass('table-auto')).toEqual({ 'table-layout': 'auto' });
  });

  it('should return correct CSS properties for "table-fixed" class', () => {
    expect(parseTailwindTableClass('table-fixed')).toEqual({ 'table-layout': 'fixed' });
  });

  it('should return null for non-matching class names', () => {
    expect(parseTailwindTableClass('non-existing-class')).toBeNull();
  });

  it('should return null for empty string', () => {
    expect(parseTailwindTableClass('')).toBeNull();
  });

  it('should return null for class names that partially match', () => {
    expect(parseTailwindTableClass('table-')).toBeNull();
    expect(parseTailwindTableClass('table-something')).toBeNull();
  });
});