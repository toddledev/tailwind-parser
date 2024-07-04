import { parseBackgroundClasses } from "./parseBackgroundClasses";
import { parseBorderClasses } from "./parseBorderClasses";
import { parseDisplayClasses } from "./parseDisplayClasses";
import { parseFlexClasses } from "./parseFlexClasses";
import { parseGridClasses } from "./parseGridClasses";
import { parseListClasses } from "./parseListClasses";
import { parseMarginClasses } from "./parseMarginClasses";
import { parseOutlineClass } from "./parseOutlineClass";
import { parsePaddingClasses } from "./parsePaddingClasses";
import { parsePositioningClasses } from "./parsePositioningClasses";
import { parseRingClasses } from "./parseRingClasses";
import { parseScrollClass } from "./parseScrollClass";
import { parseShadowClass } from "./parseShadowClass";
import { parseSizeClasses } from "./parseSizeClasses";
import { parseSvgClass } from "./parseSvgClass";
import { parseTailwindTableClass } from "./parseTailwindTableClass";
import { parseTextClass } from "./parseTextClass";
import { parseTransformClass } from "./parseTransformClass";
import { parseTransitionClass } from "./parseTransitionClass";
import { parseUtilClass } from "./parseUtilClass";
import { parseVisibilityClasses } from "./parseVisibilityClasses";

type modifier = 
| "className"
| "hover"
| "focus"
| "focusWithin"
| "active"
| "disabled"
| "firstChild"
| "lastChild"
| "evenChild"
| "empty"

export interface Variant {
    style: CSSProperties
    className?: string;
    hover?: boolean;
    focus?: boolean;
    focusWithin?: boolean;
    active?: boolean;
    disabled?: boolean;
    firstChild?: boolean;
    lastChild?: boolean;
    evenChild?: boolean;
    empty?: boolean;
    pseudoElement?: string;
  }

const TAILWIND_MODIFIERS = new Set<modifier>([
    "className",
    "hover",
    "focus",
    "focusWithin",
    "active",
    "disabled",
    "firstChild",
    "lastChild",
    "evenChild",
    "empty",
  ]);
  
  const TAILWIND_PSEUDO_ELEMENT = new Set(["after", "before"]);
  export const defaultStyles =  {
    "flex-direction": "row",
    display: "block",
    "border-style": "solid",
    "border-width": "0",
  };
  
  export function parseClassString(className: string):{style:Record<string, string>, variants:Variant[]} {
    let style = defaultStyles;
    let variantMap:Record<string, Variant> = {};
    if (className.trim() === "") {
      return { style, variants: [] };
    }
    const classes = className.split(" ").filter((a) => a !== "");
    for (let cls of classes) {
      const parts = cls.split(":");
      if (parts.length === 1) {
        style = {
          ...style,
          ...parseClass(parts[0]),
        };
        continue;
      }
      const modifiers = parts.slice(0, parts.length - 1);
      const key = modifiers.join(":");
      variantMap[key] = variantMap[key] ?? {
        style: {},
      };
      let variant = variantMap[key];
      variant.style = {
        ...variant.style,
        ...parseClass(parts[parts.length - 1]),
      };
      for (let modifier of modifiers) {
        if (TAILWIND_MODIFIERS.has(modifier as modifier)) {
          (variant[modifier as modifier] as any) = true;
          continue;
        }
        if (TAILWIND_PSEUDO_ELEMENT.has(modifier)) {
          variant.pseudoElement = modifier;
          continue;
        }
      }
    }
    const result = { style, variants: Object.values(variantMap) };
    return result;
  }
  
  // Background colors
  export const colorMap:ColorMap = {
    transparent: "transparent",
    current: "currentColor",
    black: "#000",
    white: "#fff",
    gray: {
      "50": "#F9FAFB",
      "100": "#f7fafc",
      "200": "#edf2f7",
      "300": "#e2e8f0",
      "400": "#cbd5e0",
      "500": "#a0aec0",
      "600": "#718096",
      "700": "#4a5568",
      "800": "#2d3748",
      "900": "#1a202c",
    },
    red: {
      "50": "#FEF2F2",
      "100": "#fff5f5",
      "200": "#fed7d7",
      "300": "#feb2b2",
      "400": "#fc8181",
      "500": "#f56565",
      "600": "#e53e3e",
      "700": "#c53030",
      "800": "#9b2c2c",
      "900": "#742a2a",
    },
    orange: {
      "100": "#fffaf0",
      "200": "#feebc8",
      "300": "#fbd38d",
      "400": "#f6ad55",
      "500": "#ed8936",
      "600": "#dd6b20",
      "700": "#c05621",
      "800": "#9c4221",
      "900": "#7b341e",
    },
    yellow: {
      "50": "#FFFBEB",
      "100": "#fffff0",
      "200": "#fefcbf",
      "300": "#faf089",
      "400": "#f6e05e",
      "500": "#ecc94b",
      "600": "#d69e2e",
      "700": "#b7791f",
      "800": "#975a16",
      "900": "#744210",
    },
    green: {
      "50": "#F0FDF4",
      "100": "#f0fff4",
      "200": "#c6f6d5",
      "300": "#9ae6b4",
      "400": "#68d391",
      "500": "#48bb78",
      "600": "#38a169",
      "700": "#2f855a",
      "800": "#276749",
      "900": "#22543d",
    },
    teal: {
      "100": "#e6fffa",
      "200": "#b2f5ea",
      "300": "#81e6d9",
      "400": "#4fd1c5",
      "500": "#38b2ac",
      "600": "#319795",
      "700": "#2c7a7b",
      "800": "#285e61",
      "900": "#234e52",
    },
    blue: {
      "50": "#EFF6FF",
      "100": "#ebf8ff",
      "200": "#bee3f8",
      "300": "#90cdf4",
      "400": "#63b3ed",
      "500": "#4299e1",
      "600": "#3182ce",
      "700": "#2b6cb0",
      "800": "#2c5282",
      "900": "#2a4365",
    },
    indigo: {
      "50": "#EEF2FF",
      "100": "#ebf4ff",
      "200": "#c3dafe",
      "300": "#a3bffa",
      "400": "#7f9cf5",
      "500": "#667eea",
      "600": "#5a67d8",
      "700": "#4c51bf",
      "800": "#434190",
      "900": "#3c366b",
    },
    purple: {
      "50": "#F5F3FF",
      "100": "#faf5ff",
      "200": "#e9d8fd",
      "300": "#d6bcfa",
      "400": "#b794f4",
      "500": "#9f7aea",
      "600": "#805ad5",
      "700": "#6b46c1",
      "800": "#553c9a",
      "900": "#44337a",
    },
    pink: {
      "50": "#FDF2F8",
      "100": "#fff5f7",
      "200": "#fed7e2",
      "300": "#fbb6ce",
      "400": "#f687b3",
      "500": "#ed64a6",
      "600": "#d53f8c",
      "700": "#b83280",
      "800": "#97266d",
      "900": "#702459",
    },
  };
  
  interface ColorMap {
    [color: string]: string | { [shade: string]: string };
  }
  
  export interface GridRegex {
    regex: RegExp;
    style: { [key: string]: string } | ((match: RegExpMatchArray) => { [key: string]: string });
  }
  
export interface MarginValues {
    [key: string]: string;
  }
  

  
  export interface TableClasses {
    [key: string]: { [key: string]: string };
  }
  
export type CSSProperties = {
    [key: string]: string | number | CSSProperties;
  };
  
  const parsers = [
    parseBackgroundClasses,
    parseBorderClasses,
    parseDisplayClasses,
    parseFlexClasses,
    parseGridClasses,
    parseSizeClasses,
    parseMarginClasses,
    parsePaddingClasses,
    parsePositioningClasses,
    parseListClasses,
    parseVisibilityClasses,
    parseRingClasses,
    parseOutlineClass,
    parseScrollClass,
    parseShadowClass,
    parseSvgClass,
    parseTailwindTableClass,
    parseTextClass,
    parseTransformClass,
    parseUtilClass,
    parseTransitionClass,
  ];
  
  function parseClass(cls: string):CSSProperties {
    for (let parser of parsers) {
      let style = parser(cls);
      if (style) {
        return style;
      }
    }
    console.error("COULD NOT PARSE ", cls);
    return {};
  }
  