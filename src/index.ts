import { StyleVariant, parseClassString } from './tailwind-parser';

interface NodeTree {
  [key: string]: ElementNode | TextNode;
}



interface ElementNode {
  type: 'element';
  tag: string;
  classes: Record<string, { formula: undefined }>;
  attrs: Record<string, { type: 'value'; value: string }>;
  events: Record<string, never>;
  style: Record<string, string>;
  styleVariables: Record<string, never>;
  variants: StyleVariant[];
  children: string[];
}

interface TextNode {
  type: 'text';
  value: { type: 'value'; value: string };
}
export { parseClassString };

export function tailwindToToddle(html: string): NodeTree {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(html, 'text/html');

  if (htmlDoc.body.children.length === 0) {
  
  }

  const nodeTree: NodeTree = {};

  function visitElement(element: Element, id: string): void {
    const children =
      element.childNodes.length !== 0
        ? Array.from(element.childNodes)
        : element.textContent
        ? [element.textContent]
        : [] as (ChildNode | string)[]

    const attrs = Object.fromEntries(
      Array.from(element.attributes)
        .filter(attr => attr.name !== 'class')
        .map(attr => [attr.name, { type: 'value' as const, value: attr.value }])
    );

    const { style, variants } = parseClassString(
      element.getAttribute('class') || ''
    );
    nodeTree[id] = {
      type: 'element',
      tag: element.tagName.toLowerCase(),
      classes: Object.fromEntries(
        Array.from(element.classList)
              .map(name => [name, { formula: undefined }])
      ),
      attrs,
      events: {},
      style,
      styleVariables: {},
      variants,
      children: children
        .map(child => {
          const childId = generateId();
          if (child instanceof Text) {
            const content = child.wholeText.replace(/\s+/g, '');
            if (content === '') {
              return undefined;
            }
            nodeTree[childId] = {
              type: 'text',
              value: {
                type: 'value',
                value: content,
              },
            };
          } else if (child instanceof Element) {
            visitElement(child, childId);
          }
          return childId;
        })
        .filter((c): c is string => c !== undefined),
    };
  }

  switch (htmlDoc.children.length) {
    case 0:
      return {
        root: {
          type: 'text',
          value: { type: 'value', value: htmlDoc.body.textContent || '' },
        },
      };
      case 1: {
        visitElement(htmlDoc.body.children[0], 'root');
        return nodeTree;
      }
      default: {
        const children =
        htmlDoc.body.childNodes.length !== 0
          ? Array.from(htmlDoc.body.childNodes)
          : htmlDoc.body.textContent
          ? [htmlDoc.body.textContent]
          : [] as (ChildNode | string)[]
        nodeTree.root = {
          type:"element",
          tag:"div",
          attrs:{},
          style:{},
          classes:{},
          children: children.map(child => {
            const childId = generateId();
            if (child instanceof Text) {
              const content = child.wholeText
              if (content === '') {
                return undefined;
              }
              nodeTree[childId] = {
                type: 'text',
                value: {
                  type: 'value',
                  value: content,
                },
              };
            } else if (child instanceof Element) {
              visitElement(child, childId);
            }
            return childId;
          }).filter((c):c is string => c !== undefined),
          events:{},
          styleVariables:{},
          variants:[]
        }
        return nodeTree
      }
      

  }

  
  return nodeTree;
}

function generateId(size = 21): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  return new Array(size).fill(0)
    .map(() => chars[Math.round(Math.random() * chars.length)])
    .join('');
}
