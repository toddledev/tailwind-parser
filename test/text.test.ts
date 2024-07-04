import { parseTextClass } from '../src/parseTextClass';

describe('parseTextClass', () => {
  test('antialiased', () => {
    expect(parseTextClass('antialiased')).toEqual({
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    });
  });

  test('subpixel-antialiased', () => {
    expect(parseTextClass('subpixel-antialiased')).toEqual({
      "-webkit-font-smoothing": "auto",
      "-moz-osx-font-smoothing": "auto",
    });
  });

  test('text opacity', () => {
    expect(parseTextClass('text-opacity-50')).toEqual({ opacity: "0.5" });
  });

  test('break-normal', () => {
    expect(parseTextClass('break-normal')).toEqual({
      "word-break": "normal",
      "overflow-wrap": "normal"
    });
  });

  test('break-words', () => {
    expect(parseTextClass('break-words')).toEqual({ "overflow-wrap": "break-word" });
  });

  test('break-all', () => {
    expect(parseTextClass('break-all')).toEqual({ "word-break": "break-all" });
  });

  test('truncate', () => {
    expect(parseTextClass('truncate')).toEqual({
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "white-space": "nowrap",
    });
  });

  test('uppercase', () => {
    expect(parseTextClass('uppercase')).toEqual({ "text-transform": "uppercase" });
  });

  test('lowercase', () => {
    expect(parseTextClass('lowercase')).toEqual({ "text-transform": "lowercase" });
  });

  test('capitalize', () => {
    expect(parseTextClass('capitalize')).toEqual({ "text-transform": "capitalize" });
  });

  test('normal-case', () => {
    expect(parseTextClass('normal-case')).toEqual({ "text-transform": "none" });
  });

  test('leading-normal', () => {
    expect(parseTextClass('leading-normal')).toEqual({ "line-height": "1.5" });
  });

  test('underline', () => {
    expect(parseTextClass('underline')).toEqual({ "text-decoration": "underline" });
  });

  test('line-through', () => {
    expect(parseTextClass('line-through')).toEqual({ "text-decoration": "line-through" });
  });

  test('no-underline', () => {
    expect(parseTextClass('no-underline')).toEqual({ "text-decoration": "none" });
  });

  test('font-bold', () => {
    expect(parseTextClass('font-bold')).toEqual({ "font-weight": "700" });
  });

  test('text-xl', () => {
    expect(parseTextClass('text-xl')).toEqual({ "font-size": "1.25rem" });
  });

  test('font-sans', () => {
    expect(parseTextClass('font-sans')).toEqual({
      "font-family": 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    });
  });

  test('text-center', () => {
    expect(parseTextClass('text-center')).toEqual({ "text-align": "center" });
  });

  test('italic', () => {
    expect(parseTextClass('italic')).toEqual({ "font-style": "italic" });
  });

  test('whitespace-nowrap', () => {
    expect(parseTextClass('whitespace-nowrap')).toEqual({ "white-space": "nowrap" });
  });

  test('tracking-wide', () => {
    expect(parseTextClass('tracking-wide')).toEqual({ "letter-spacing": "0.025em" });
  });

  test('text color', () => {
    expect(parseTextClass('text-blue-500')).toEqual({ color: "#4299e1" });
  });

  test('invalid class', () => {
    expect(parseTextClass('invalid-class')).toBeNull();
  });
});