import { tailwindToToddle } from '../src';
import { defaultStyles } from '../src/tailwind-parser';


describe('margin', () => {
  it('can handle numbers', () => {
    const result = tailwindToToddle(`<button class="mx-2 my-1">Hello</button>`)
    expect(result.root.type === "element" && result.root.style).toEqual({
      ...defaultStyles,
      "margin-left": "0.5rem",
      "margin-right": "0.5rem",
      "margin-top": "0.25rem",
      "margin-bottom": "0.25rem",
    })
  });
});
