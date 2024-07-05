# @toddledev/tailwind-parser

A lightweight library for parsing Tailwind CSS classes and converting HTML with Tailwind classes to a custom node tree structure.

## Installation

```bash
npm install @toddledev/tailwind-parser
```

or

```bash
yarn add @toddledev/tailwind-parser
```

## Usage

### Parsing Tailwind Classes

```javascript
import { parseClassString } from '@toddledev/tailwind-parser';

const classString = 'bg-blue-500 hover:bg-blue-600 p-4';
const { style, variants } = parseClassString(classString);

console.log(style);    // Object containing parsed styles
console.log(variants); // Array of parsed variants
```

### Converting HTML to Node Tree

```javascript
import { tailwindToToddle } from '@toddledev/tailwind-parser';

const html = '<div class="bg-red-500 p-4"><span class="text-white">Hello, World!</span></div>';
const nodeTree = tailwindToToddle(html);

console.log(nodeTree);
```

## API

### `parseClassString(classString: string): { style: Record<string, string>, variants: Variant[] }`

Parses a string of Tailwind CSS classes and returns an object containing the parsed styles and variants.

### `tailwindToToddle(html: string): NodeTree`

Converts an HTML string with Tailwind classes to a custom node tree structure.

## Types

The library exports the following types:

- `Variant`
- `NodeTree`
- `ElementNode`
- `TextNode`

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you find any bugs or have feature requests, please create an issue on the [GitHub repository](https://github.com/toddledev/tailwind-parser/issues).
