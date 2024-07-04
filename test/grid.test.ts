import { parseGridClasses } from '../src/parseGridClasses'; // Replace with the actual file name

describe('parseGridClasses', () => {
  test('col-auto', () => {
    expect(parseGridClasses('col-auto')).toEqual({ 'grid-column': 'auto' });
  });

  test('col-span-3', () => {
    expect(parseGridClasses('col-span-3')).toEqual({ 'grid-column': 'span 3 / span 3' });
  });

  test('col-span-full', () => {
    expect(parseGridClasses('col-span-full')).toEqual({ 'grid-column': '1 / -1' });
  });

  test('col-start-2', () => {
    expect(parseGridClasses('col-start-2')).toEqual({ 'grid-column-start': '2' });
  });

  test('col-end-auto', () => {
    expect(parseGridClasses('col-end-auto')).toEqual({ 'grid-column-end': 'auto' });
  });

  test('gap-4', () => {
    expect(parseGridClasses('gap-4')).toEqual({ 'gap': '1rem' });
  });

  test('gap-px', () => {
    expect(parseGridClasses('gap-px')).toEqual({ 'gap': '1px' });
  });

  test('row-gap-2', () => {
    expect(parseGridClasses('row-gap-2')).toEqual({ 'row-gap': '0.5rem' });
  });

  test('col-gap-px', () => {
    expect(parseGridClasses('col-gap-px')).toEqual({ 'column-gap': '1px' });
  });

  test('grid-rows-3', () => {
    expect(parseGridClasses('grid-rows-3')).toEqual({ 'grid-template-rows': 'repeat(3, minmax(0, 1fr))' });
  });

  test('grid-cols-4', () => {
    expect(parseGridClasses('grid-cols-4')).toEqual({ 'grid-template-columns': 'repeat(4, minmax(0, 1fr))' });
  });

  test('grid-flow-row', () => {
    expect(parseGridClasses('grid-flow-row')).toEqual({ 'grid-auto-flow': 'row' });
  });

  test('grid-flow-col-dense', () => {
    expect(parseGridClasses('grid-flow-col-dense')).toEqual({ 'grid-auto-flow': 'col dense' });
  });

  test('row-span-2', () => {
    expect(parseGridClasses('row-span-2')).toEqual({ 'grid-row': 'span 2 / span 2' });
  });

  test('row-span-full', () => {
    expect(parseGridClasses('row-span-full')).toEqual({ 'grid-row': '1 / -1' });
  });

  test('row-start-3', () => {
    expect(parseGridClasses('row-start-3')).toEqual({ 'grid-row-start': '3' });
  });

  test('row-end-auto', () => {
    expect(parseGridClasses('row-end-auto')).toEqual({ 'grid-row-end': 'auto' });
  });

  test('auto-cols-fr', () => {
    expect(parseGridClasses('auto-cols-fr')).toEqual({ 'grid-auto-cols': 'fr' });
  });

  test('auto-rows-min', () => {
    expect(parseGridClasses('auto-rows-min')).toEqual({ 'grid-auto-rows': 'min' });
  });

  test('gap-x-4', () => {
    expect(parseGridClasses('gap-x-4')).toEqual({ 'column-gap': '1rem' });
  });

  test('gap-y-px', () => {
    expect(parseGridClasses('gap-y-px')).toEqual({ 'row-gap': '1px' });
  });

  test('place-content-center', () => {
    expect(parseGridClasses('place-content-center')).toEqual({ 'place-content': 'center' });
  });

  test('place-items-start', () => {
    expect(parseGridClasses('place-items-start')).toEqual({ 'place-items': 'start' });
  });

  test('place-self-end', () => {
    expect(parseGridClasses('place-self-end')).toEqual({ 'place-self': 'end' });
  });

  test('row-auto', () => {
    expect(parseGridClasses('row-auto')).toEqual({ 'grid-row': 'auto' });
  });

  test('invalid class', () => {
    expect(parseGridClasses('invalid-class')).toBeNull();
  });
});