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
  const colorMap:ColorMap = {
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
  
  function parseBackgroundClasses(className: string): CSSProperties | null {
    // Background size
    if (/^bg-(auto|cover|contain)$/.test(className)) {
      return { "background-size": className.split("-")[1] };
    }
  
    // Background position
    const positionMap: Record<string, string> = {
      "bg-bottom": "bottom",
      "bg-top": "top",
      "bg-center": "center",
      "bg-left": "left",
      "bg-left-bottom": "left bottom",
      "bg-left-top": "left top",
      "bg-right": "right",
      "bg-right-bottom": "right bottom",
      "bg-right-top": "right top",
    };
    if (positionMap[className]) {
      return { "background-position": positionMap[className] };
    }
  
    // Background attachment
    if (/^bg-(fixed|local|scroll)$/.test(className)) {
      return { "background-attachment": className.split("-")[1] };
    }
  
    // Background repeat
    if (
      /^bg-(no-repeat|repeat|repeat-x|repeat-y|repeat-round|repeat-space)$/.test(
        className
      )
    ) {
      return { "background-repeat": className.split("-").slice(1).join("-") };
    }
  
    // Background opacity
    const opacityMatch = className.match(/^bg-opacity-(\d+)$/);
    if (opacityMatch) {
      return { "--tw-bg-opacity": (parseInt(opacityMatch[1]) / 100).toString() };
    }
  
    // Background clip
    if (/^bg-clip-(border|content|padding|text)$/.test(className)) {
      return { "background-clip": className.split("-")[2] };
    }
  
    const colorMatch = className.match(/^bg-(\w+)(?:-(\d+))?$/);
    if (colorMatch) {
      const color = colorMatch[1];
      const shade =
        colorMatch[2] || (color === "black" || color === "white" ? null : "500");
      if (colorMap[color]) {
        return {
          "background-color": shade
            ? (colorMap[color] as Record<string, string>)[shade]
            : (colorMap[color] as string),
        };
      }
    }
  
    // Background gradients
    if (/^bg-gradient-to-(t|tr|r|br|b|bl|l|tl)$/.test(className)) {
      const direction = className.split("-").pop() as string;
      const directionMap: Record<string, string> = {
        t: "to top",
        tr: "to top right",
        r: "to right",
        br: "to bottom right",
        b: "to bottom",
        bl: "to bottom left",
        l: "to left",
        tl: "to top left",
      };
      return {
        "background-image": `linear-gradient(${directionMap[direction]}, var(--tw-gradient-stops))`,
      };
    }
  
    // Gradient color stops
    const gradientStopMatch = className.match(/^(from|via|to)-(\w+)(?:-(\d+))?$/);
    if (gradientStopMatch) {
      const [, position, color, shade] = gradientStopMatch;
      if (colorMap[color]) {
        const colorValue = shade
          ? (colorMap[color] as Record<string, string>)[shade]
          : (colorMap[color] as Record<string, string>)["500"] || (colorMap[color] as string);
        return {
          [`--tw-gradient-${position}`]: colorValue,
          "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
        };
      }
    }
  
    // If no match is found
    return null;
  }
  
 
  
  function parseBorderClasses(className: string): CSSProperties | null {

    // Border color
    const borderColorMatch = className.match(
      /^border-(transparent|current|black|white|(\w+)-(50|[1-9][0-9]{2}))$/
    );
    if (borderColorMatch) {
      const [, colorName, colorFamily, colorShade] = borderColorMatch;
      let color: string | undefined;
      if (colorName in colorMap) {
        color = colorMap[colorName] as string;
      } else if (colorFamily && colorShade) {
        color = (colorMap[colorFamily] as Record<string, string>)?.[colorShade];
      }
      if (color) {
        return { "border-color": color };
      }
    }
  
    // Border style
    const borderStyleMatch = className.match(
      /^border-(solid|dashed|dotted|double|none)$/
    );
    if (borderStyleMatch) {
      return { "border-style": borderStyleMatch[1] };
    }
  
    // Border width
    const borderWidthMatch = className.match(/^border(-([trbl]))?(-(\d+))?$/);
    if (borderWidthMatch) {
      const [, , side, , width] = borderWidthMatch;
      const prop = side
        ? `border-${
            side === "r"
              ? "right"
              : side === "l"
              ? "left"
              : side === "t"
              ? "top"
              : "bottom"
          }-width`
        : "border-width";
      const value = width ? `${parseInt(width) / 4}rem` : "1px";
      return { [prop]: value };
    }
  
    // Border opacity
    const borderOpacityMatch = className.match(/^border-opacity-(\d+)$/);
    if (borderOpacityMatch) {
      return { "--tw-border-opacity": borderOpacityMatch[1] + "%" };
    }
  
    // Divide
    const divideMatch = className.match(/^divide-(x|y)(-reverse)?(-(\d+))?$/);
    if (divideMatch) {
      const [, direction, reverse, , size] = divideMatch;
      const prop = `--tw-divide-${direction}-reverse`;
      const value = reverse ? "1" : "0";
      const widthProp = `border-${direction === "x" ? "left" : "top"}-width`;
      const widthValue = size ? `${parseInt(size) / 4}rem` : "1px";
      return {
        [prop]: value,
        [widthProp]: widthValue,
        "& > :not([hidden]) ~ :not([hidden])": {
          [prop]: value,
          [widthProp]: widthValue,
        },
      };
    }
  
    // Divide color
    const divideColorMatch = className.match(/^divide-([a-z]+)-(\d{100,900})$/);
    if (divideColorMatch) {
      const [, colorFamily, colorShade] = divideColorMatch;
      const color = (colorMap[colorFamily] as Record<string, string>)?.[colorShade];
      if (color) {
        return {
          "& > :not([hidden]) ~ :not([hidden])": {
            "border-color": color,
          },
        };
      }
    }
  
    // Divide opacity
    const divideOpacityMatch = className.match(/^divide-opacity-(\d+)$/);
    if (divideOpacityMatch) {
      return {
        "& > :not([hidden]) ~ :not([hidden])": {
          "--tw-divide-opacity": divideOpacityMatch[1] + "%",
        },
      };
    }
  
    // Border collapse
    if (className === "border-collapse") {
      return { "border-collapse": "collapse" };
    }
    if (className === "border-separate") {
      return { "border-collapse": "separate" };
    }
  
    // Rounded corners
    const roundedMatch = className.match(
      /^rounded(-([trblse]|tl|tr|br|bl))?(-(\w+))?$/
    );
    if (roundedMatch) {
      const [, , side, , size] = roundedMatch;
      let prop = "border-radius";
      if (side) {
        prop = `border-${
          side === "r"
            ? "right"
            : side === "l"
            ? "left"
            : side === "t"
            ? "top"
            : side === "b"
            ? "bottom"
            : side === "s"
            ? "start"
            : side === "e"
            ? "end"
            : side
        }-radius`;
      }
      let value = "0.25rem";
      if (size) {
        switch (size) {
          case "none":
            value = "0";
            break;
          case "sm":
            value = "0.125rem";
            break;
          case "md":
            value = "0.375rem";
            break;
          case "lg":
            value = "0.5rem";
            break;
          case "xl":
            value = "0.75rem";
            break;
          case "2xl":
            value = "1rem";
            break;
          case "3xl":
            value = "1.5rem";
            break;
          case "full":
            value = "9999px";
            break;
        }
      }
      return { [prop]: value };
    }
  
    // If no match is found
    return null;
  }

  
  function parseDisplayClasses(className: string): CSSProperties| null {
    interface DisplayMap {
        [key: string]: string;
      }
    // Box
    if (/^box-(border|content)$/.test(className)) {
      return { "box-sizing": className.split("-")[1] };
    }
  
    // Display
    const displayMap: DisplayMap = {
      block: "block",
      hidden: "none",
      inline: "inline",
      "inline-block": "inline-block",
      "inline-flex": "inline-flex",
      "inline-grid": "inline-grid",
      flex: "flex",
      grid: "grid",
      "flow-root": "flow-root",
    };
  
    if (className in displayMap) {
      return { display: displayMap[className] };
    }
  
  
    // If no match is found
    return null;
  }
  
  
  function parseFlexClasses(className: string): CSSProperties | null {
    const flexRegex: { [key: string]: RegExp } = {
      flex: /^flex$/,
      flexRow: /^flex-(row|row-reverse|col|col-reverse)$/,
      flexSize: /^flex-(initial|1|auto|none)$/,
      flexWrap: /^flex-(no-wrap|wrap|wrap-reverse)$/,
      items: /^items-(stretch|start|end|center|baseline)$/,
      content: /^content-(start|end|center|between|around|evenly)$/,
      justify: /^justify-(start|end|center|between|around|evenly)$/,
      self: /^self-(auto|start|end|center|stretch|baseline)$/,
      flexGrow: /^flex-grow(-0)?$/,
      flexShrink: /^flex-shrink(-0)?$/,
      order: /^order-(\d+)$/,
      justifyItems: /^justify-items-(auto|start|end|center|stretch)$/,
      justifySelf: /^justify-self-(auto|start|end|center|stretch)$/,
      space: /^space-(x|y)-(\d+|px|reverse)$/,
    };
  
    for (const [key, regex] of Object.entries(flexRegex)) {
      const match = className.match(regex);
      if (match) {
        switch (key) {
          case "flex":
            return { display: "flex" };
          case "flexRow":
            return { "flex-direction": match[1] };
          case "flexSize":
            return { flex: match[1] === "1" ? "1 1 0%" : match[1] };
          case "flexWrap":
            return { "flex-wrap": match[1].replace("no-wrap", "nowrap") };
          case "items":
            return { "align-items": match[1] };
          case "content":
            return { "align-content": match[1] };
          case "justify":
            return {
              "justify-content":
                match[1] === "between" ? "space-between" : match[1],
            };
          case "self":
            return { "align-self": match[1] };
          case "flexGrow":
            return { "flex-grow": match[1] ? "0" : "1" };
          case "flexShrink":
            return { "flex-shrink": match[1] ? "0" : "1" };
          case "order":
            return { order: match[1] };
          case "justifyItems":
            return { "justify-items": match[1] };
          case "justifySelf":
            return { "justify-self": match[1] };
          case "space":
            if (match[2] === "reverse") {
              return {
                [`margin-${match[1] === "x" ? "right" : "bottom"}`]:
                  `calc(var(--tw-space-${match[1]}) * -1)`,
              };
            } else {
              const value =
                match[2] === "px" ? "1px" : `${parseInt(match[2]) * 0.25}rem`;
              return {
                [`--tw-space-${match[1]}`]: value,
                [`margin-${
                  match[1] === "x" ? "left" : "top"
                }`]: `var(--tw-space-${match[1]})`,
              };
            }
        }
      }
    }
  
    return null;
  }
  
  interface GridRegex {
    regex: RegExp;
    style: { [key: string]: string } | ((match: RegExpMatchArray) => { [key: string]: string });
  }
  
  function parseGridClasses(className: string):CSSProperties | null {
    const gridRegexes: GridRegex[] = [
      { regex: /^col-auto$/, style: { gridColumn: "auto" } },
      {
        regex: /^col-span-(\d+|full)$/,
        style: (match) => ({
          gridColumn:
            match[1] === "full"
              ? "1 / -1"
              : `span ${match[1]} / span ${match[1]}`,
        }),
      },
      {
        regex: /^col-start-(\d+|auto)$/,
        style: (match) => ({ gridColumnStart: match[1] }),
      },
      {
        regex: /^col-end-(\d+|auto)$/,
        style: (match) => ({ gridColumnEnd: match[1] }),
      },
      {
        regex: /^gap-(\d+|px)$/,
        style: (match) => ({
          gap: match[1] === "px" ? "1px" : `${parseInt(match[1]) * 0.25}rem`,
        }),
      },
      {
        regex: /^row-gap-(\d+|px)$/,
        style: (match) => ({
          rowGap: match[1] === "px" ? "1px" : `${parseInt(match[1]) * 0.25}rem`,
        }),
      },
      {
        regex: /^col-gap-(\d+|px)$/,
        style: (match) => ({
          columnGap:
            match[1] === "px" ? "1px" : `${parseInt(match[1]) * 0.25}rem`,
        }),
      },
      {
        regex: /^grid-rows-(\d+)$/,
        style: (match) => ({
          gridTemplateRows: `repeat(${match[1]}, minmax(0, 1fr))`,
        }),
      },
      {
        regex: /^grid-cols-(\d+)$/,
        style: (match) => ({
          gridTemplateColumns: `repeat(${match[1]}, minmax(0, 1fr))`,
        }),
      },
      {
        regex: /^grid-flow-(row|col)(-dense)?$/,
        style: (match) => ({
          gridAutoFlow: match[2] ? `${match[1]} dense` : match[1],
        }),
      },
      {
        regex: /^row-span-(\d+|full)$/,
        style: (match) => ({
          gridRow:
            match[1] === "full"
              ? "1 / -1"
              : `span ${match[1]} / span ${match[1]}`,
        }),
      },
      {
        regex: /^row-start-(auto|\d+)$/,
        style: (match) => ({ gridRowStart: match[1] }),
      },
      {
        regex: /^row-end-(auto|\d+)$/,
        style: (match) => ({ gridRowEnd: match[1] }),
      },
      {
        regex: /^auto-(cols|rows)-(auto|fr|max|min)$/,
        style: (match) => ({
          [`gridAuto${match[1].charAt(0).toUpperCase() + match[1].slice(1)}`]:
            match[2],
        }),
      },
      {
        regex: /^gap-(x|y)-(\d+|px)$/,
        style: (match) => ({
          [`${match[1] === "x" ? "column" : "row"}Gap`]:
            match[2] === "px" ? "1px" : `${parseInt(match[2]) * 0.25}rem`,
        }),
      },
      {
        regex: /^place-content-(around|between|center|end|evenly|start|stretch)$/,
        style: (match) => ({ placeContent: match[1] }),
      },
      {
        regex: /^place-items-(auto|center|end|start|stretch)$/,
        style: (match) => ({ placeItems: match[1] }),
      },
      {
        regex: /^place-self-(auto|center|end|start|stretch)$/,
        style: (match) => ({ placeSelf: match[1] }),
      },
      { regex: /^row-auto$/, style: { gridRow: "auto" } },
    ];
  
    for (const { regex, style } of gridRegexes) {
      const match = className.match(regex);
      if (match) {
        return typeof style === "function" ? style(match) : style;
      }
    }
  
    return null;
  }
  
  function parseSizeClasses(className: string): CSSProperties | null {
    function getSizeValue(value: string): string {
        if (value === "auto") return "auto";
        if (value === "px") return "1px";
        if (value === "full") return "100%";
        if (value === "screen") return "100vh";

        const fractions: Record<string, string> = {
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "1/5": "20%",
            "2/5": "40%",
            "3/5": "60%",
            "4/5": "80%",
            "1/6": "16.666667%",
            "2/6": "33.333333%",
            "3/6": "50%",
            "4/6": "66.666667%",
            "5/6": "83.333333%",
            "1/12": "8.333333%",
            "2/12": "16.666667%",
            "3/12": "25%",
            "4/12": "33.333333%",
            "5/12": "41.666667%",
            "6/12": "50%",
            "7/12": "58.333333%",
            "8/12": "66.666667%",
            "9/12": "75%",
            "10/12": "83.333333%",
            "11/12": "91.666667%",
        };

        if (fractions[value]) return fractions[value];

        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue)) {
            return `${numericValue * 0.25}rem`;
        }

        return value;
    }

    function getMaxWidthValue(value: string): string {
        const maxWidths: Record<string, string> = {
            xs: "20rem",
            sm: "24rem",
            md: "28rem",
            lg: "32rem",
            xl: "36rem",
            "2xl": "42rem",
            "3xl": "48rem",
            "4xl": "56rem",
            "5xl": "64rem",
            "6xl": "72rem",
            "7xl": "80rem",
            full: "100%",
            "screen-sm": "640px",
            "screen-md": "768px",
            "screen-lg": "1024px",
            "screen-xl": "1280px",
            "screen-2xl": "1536px",
            none: "none",
            "0": "0rem",
            max: "max-content",
            min: "min-content",
            prose: "65ch",
        };

        if (maxWidths[value]) return maxWidths[value];

        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue)) {
            return `${numericValue * 0.25}rem`;
        }

        return value;
    }

    // Height
    const heightMatch = className.match(/^h-(\d+|auto|px|full|screen)$/);
    if (heightMatch) {
        const value = heightMatch[1];
        return { height: getSizeValue(value) };
    }

    // Max Height
    const maxHeightMatch = className.match(/^max-h-(full|screen|px|\d+)$/);
    if (maxHeightMatch) {
        const value = maxHeightMatch[1];
        return { "max-height": getSizeValue(value) };
    }

    // Min Height
    const minHeightMatch = className.match(/^min-h-(0|full|screen|\d+)$/);
    if (minHeightMatch) {
        const value = minHeightMatch[1];
        return { "min-height": getSizeValue(value) };
    }

    // Width
    const widthMatch = className.match(
        /^w-(\d+|auto|px|full|screen|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12)$/
    );
    if (widthMatch) {
        const value = widthMatch[1];
        return { width: getSizeValue(value) };
    }

    // Max Width
    const maxWidthMatch = className.match(
        /^max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|screen-sm|screen-md|screen-lg|screen-xl|screen-2xl|none|0|max|min|prose|\d+)$/
    );
    if (maxWidthMatch) {
        const value = maxWidthMatch[1];
        return { "max-width": getMaxWidthValue(value) };
    }

    // Min Width
    const minWidthMatch = className.match(/^min-w-(0|full|max|min|\d+)$/);
    if (minWidthMatch) {
        const value = minWidthMatch[1];
        return { "min-width": getSizeValue(value) };
    }

    return null;
}
  
interface MarginValues {
    [key: string]: string;
  }
  

  
  function parseMarginClasses(className: string): CSSProperties | null {
    const marginValues: MarginValues = {
      "0": "0px",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "8": "2rem",
      "10": "2.5rem",
      "11": "2.75rem",
      "12": "3rem",
      "16": "4rem",
      "20": "5rem",
      "24": "6rem",
      "32": "8rem",
      "40": "10rem",
      "48": "12rem",
      "56": "14rem",
      "64": "16rem",
      px: "1px",
      auto: "auto",
    };
  
    const marginRegex =
      /^-?(m|mb|mr|mt|ml|mx|my)-(0|1|2|3|4|5|6|8|10|11|12|16|20|24|32|40|48|56|64|px|auto)$/;
    const match = className.match(marginRegex);
  
    if (!match) return null;
  
    const [, direction, size] = match;
    const value = marginValues[size];
    const isNegative = className.startsWith("-");
  
    const styles: CSSProperties = {};
  
    switch (direction) {
      case "m":
        styles.margin = isNegative ? `-${value}` : value;
        break;
      case "mb":
        styles["margin-bottom"] = isNegative ? `-${value}` : value;
        break;
      case "mr":
        styles["margin-right"] = isNegative ? `-${value}` : value;
        break;
      case "mt":
        styles["margin-top"] = isNegative ? `-${value}` : value;
        break;
      case "ml":
        styles["margin-left"] = isNegative ? `-${value}` : value;
        break;
      case "mx":
        styles["margin-left"] = isNegative ? `-${value}` : value;
        styles["margin-right"] = isNegative ? `-${value}` : value;
        break;
      case "my":
        styles["margin-top"] = isNegative ? `-${value}` : value;
        styles["margin-bottom"] = isNegative ? `-${value}` : value;
        break;
    }
  
    return styles;
  }
  function parsePaddingClasses(className: string): CSSProperties | null {
    const paddingValues:Record<string, string> = {
      "0": "0px",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "8": "2rem",
      "10": "2.5rem",
      "11": "2.75rem",
      "12": "3rem",
      "16": "4rem",
      "20": "5rem",
      "24": "6rem",
      "32": "8rem",
      "40": "10rem",
      "48": "12rem",
      "56": "14rem",
      "64": "16rem",
      px: "1px",
    };
  
    const paddingRegex = /^(p|pb|pr|pt|pl|px|py)-(0|1|2|3|4|5|6|8|10|11|12|16|20|24|32|40|48|56|64|px)$/;
    const match = className.match(paddingRegex);
  
    if (!match) return null;
  
    const [, direction, size] = match;
    const value = paddingValues[size];
  
    const styles: CSSProperties = {};
  
    switch (direction) {
      case "p":
        styles.padding = value;
        break;
      case "pb":
        styles["padding-bottom"] = value;
        break;
      case "pr":
        styles["padding-right"] = value;
        break;
      case "pt":
        styles["padding-top"] = value;
        break;
      case "pl":
        styles["padding-left"] = value;
        break;
      case "px":
        styles["padding-left"] = value;
        styles["padding-right"] = value;
        break;
      case "py":
        styles["padding-top"] = value;
        styles["padding-bottom"] = value;
        break;
    }
  
    return styles;
  }
  
  

  function parsePositioningClasses(className: string): CSSProperties | null {
    // Alignment
    if (
      /^align-(baseline|top|middle|bottom|text-top|text-bottom)$/.test(className)
    ) {
      return { "vertical-align": className.split("-")[1] };
    }
  
    // Clear
    if (/^clear-(left|right|both|none)$/.test(className)) {
      return { clear: className.split("-")[1] };
    }
  
    // Float
    if (/^float-(right|left|none)$/.test(className)) {
      return { float: className.split("-")[1] };
    }
  
    // Inset
    const insetMatch = className.match(
      /^-?(inset|inset-x|inset-y|top|right|bottom|left)-(.+)$/
    );
    if (insetMatch) {
      const [, direction, value] = insetMatch;
      const cssValue =
        value === "px"
          ? "1px"
          : value === "full"
          ? "100%"
          : value === "auto"
          ? "auto"
          : /^\d+$/.test(value)
          ? `${parseInt(value) * 0.25}rem`
          : value;
  
      const property =
        direction === "inset"
          ? ["top", "right", "bottom", "left"]
          : direction === "inset-x"
          ? ["left", "right"]
          : direction === "inset-y"
          ? ["top", "bottom"]
          : [direction];
  
      return Object.fromEntries(property.map((prop) => [prop, cssValue]));
    }
  
    // Object fit and position
    if (/^object-(contain|cover|fill|none|scale-down)$/.test(className)) {
      return { "object-fit": className.split("-")[1] };
    }
    if (
      /^object-(bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top)$/.test(
        className
      )
    ) {
      return { "object-position": className.split("-").slice(1).join(" ") };
    }
  
    // Z-index
    const zIndexMatch = className.match(/^z-(.+)$/);
    if (zIndexMatch) {
      return { "z-index": zIndexMatch[1] };
    }
  
    // Position
    if (/^(static|relative|absolute|fixed|sticky)$/.test(className)) {
      return { position: className };
    }
  
    // Negative values
    if (className.startsWith("-")) {
      const positiveClass = className.slice(1);
      const positiveResult = parsePositioningClasses(positiveClass);
      if (positiveResult) {
        return Object.fromEntries(
          Object.entries(positiveResult).map(([key, value]) => [key, `-${value}`])
        );
      }
    }
  
    // No match found
    return null;
  }
  
  function parseListClasses(className: string): CSSProperties | null {
    const listTypeRegex = /^list-(none|disc|decimal|square)$/;
    const listPositionRegex = /^list-(inside|outside)$/;
  
    if (listTypeRegex.test(className)) {
      const listType = className.match(listTypeRegex)?.[1];
      return listType ? { "list-style-type": listType } : null;
    }
  
    if (listPositionRegex.test(className)) {
      const listPosition = className.match(listPositionRegex)?.[1];
      return listPosition ? { "list-style-position": listPosition } : null;
    }
  
    // Handle list-* (any valid CSS list-style-type)
    if (
      className.startsWith("list-") &&
      !["inside", "outside"].includes(className.slice(5))
    ) {
      const listType = className.slice(5);
      return { "list-style-type": listType };
    }
  
    return null; // No match found
  }


  function parseVisibilityClasses(className: string): CSSProperties | null {
    // Opacity
    const opacityMatch = className.match(/^opacity-(\d+)$/);
    if (opacityMatch) {
      const opacityValue = parseInt(opacityMatch[1]) / 100;
      return { opacity: opacityValue.toString() };
    }
  
    // Visibility
    switch (className) {
      case "visible":
        return { visibility: "visible" };
      case "invisible":
        return { visibility: "hidden" };
      case "sr-only":
        return {
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: "0",
        };
      case "not-sr-only":
        return {
          position: "static",
          width: "auto",
          height: "auto",
          padding: "0",
          margin: "0",
          overflow: "visible",
          clip: "auto",
          whiteSpace: "normal",
        };
    }
  
    // If no match is found
    return null;
  }
  

  
  function parseRingClasses(className: string): Record<string, string> | null {
    // Helper function to get color from colorMap
    function getColor(colorName: string): string | null {
      const [color, shade] = colorName.split("-");
      if (colorMap[color]) {
        return shade ? (colorMap[color] as { [shade: string]: string })[shade] : colorMap[color] as string;
      }
      return null;
    }
  
    // Ring width
    const ringWidthMatch = className.match(/^ring(-\d+)?$/);
    if (ringWidthMatch) {
      const width = ringWidthMatch[1] ? parseInt(ringWidthMatch[1].slice(1)) : 3;
      return {
        "box-shadow": `0 0 0 ${width}px var(--tw-ring-color)`,
        "--tw-ring-offset-shadow": "0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
        "--tw-ring-shadow": `0 0 0 calc(${width}px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
      };
    }
  
    // Ring color
    const ringColorMatch = className.match(/^ring-([\w-]+)$/);
    if (ringColorMatch) {
      const color = getColor(ringColorMatch[1]);
      if (color) {
        return {
          "--tw-ring-color": color,
        };
      }
    }
  
    // Ring inset
    if (className === "ring-inset") {
      return {
        "--tw-ring-inset": "inset",
      };
    }
  
    // Ring offset width
    const ringOffsetWidthMatch = className.match(/^ring-offset-(\d+)$/);
    if (ringOffsetWidthMatch) {
      const width = parseInt(ringOffsetWidthMatch[1]);
      return {
        "--tw-ring-offset-width": `${width}px`,
      };
    }
  
    // Ring offset color
    const ringOffsetColorMatch = className.match(/^ring-offset-([\w-]+)$/);
    if (ringOffsetColorMatch) {
      const color = getColor(ringOffsetColorMatch[1]);
      if (color) {
        return {
          "--tw-ring-offset-color": color,
        };
      }
    }
  
    // Ring opacity
    const ringOpacityMatch = className.match(/^ring-opacity-(\d+)$/);
    if (ringOpacityMatch) {
      const opacity = parseInt(ringOpacityMatch[1]) / 100;
      return {
        "--tw-ring-opacity": opacity.toString(),
      };
    }
  
    return null;
  }


  function parseOutlineClass(className: string): CSSProperties | null {
    const outlineRegex = /^outline-(.+)$/;
    const match = className.match(outlineRegex);
  
    if (!match) return null;
  
    const color = match[1];
  
    switch (color) {
      case "black":
        return { outline: "2px solid #000000" };
      case "white":
        return { outline: "2px solid #ffffff" };
      default:
        return null;
    }
  }
  
  function parseScrollClass(className: string): CSSProperties | null {
    const overscrollMatch = className.match(/^overscroll-(contain|auto|none)$/);
    const overscrollXMatch = className.match(
        /^overscroll-x-(contain|auto|none)$/
    );
    const overscrollYMatch = className.match(
        /^overscroll-y-(contain|auto|none)$/
    );

    if (overscrollMatch) {
        return {
            "overscroll-behavior": overscrollMatch[1],
        };
    }

    if (overscrollXMatch) {
        return {
            "overscroll-behavior-x": overscrollXMatch[1],
        };
    }

    if (overscrollYMatch) {
        return {
            "overscroll-behavior-y": overscrollYMatch[1],
        };
    }

    return null; // Return null if no match is found
}
  

  
  function parseShadowClass(className: string): { "box-shadow": string } | null {
    const shadowMap:Record<string, string> = {
      "shadow-xs": "0 0 0 1px rgba(0, 0, 0, 0.05)",
      "shadow-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "shadow-md":
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "shadow-lg":
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "shadow-xl":
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "shadow-2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "shadow-inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      "shadow-outline": "0 0 0 3px rgba(66, 153, 225, 0.5)",
      "shadow-none": "none",
    };
  
    const regex = /^shadow(-xs|-sm|-md|-lg|-xl|-2xl|-inner|-outline|-none)?$/;
    const match = className.match(regex);
  
    if (match) {
      const shadowValue = shadowMap[className];
      return shadowValue ? { "box-shadow": shadowValue } : null;
    }
  
    return null;
  }

  
  function parseSvgClass(className: string): Record<string, string> | null {
    function getTailwindColor(colorName: string, shade: string): string | null {
      if (colorMap[colorName] && typeof colorMap[colorName] === 'object' && (colorMap[colorName] as Record<string, string>)[shade]) {
        return (colorMap[colorName] as Record<string, string>)[shade];
      } else if (colorMap[colorName] && typeof colorMap[colorName] === "string") {
        return colorMap[colorName] as string;
      }
      return null;
    }
  
    // SVG
    if (className === "svg") {
      return { display: "inline-block", "vertical-align": "middle" };
    }
  
    // Fill current
    if (className === "fill-current") {
      return { fill: "currentColor" };
    }
  
    // Stroke current
    if (className === "stroke-current") {
      return { stroke: "currentColor" };
    }
  
    // Stroke width
    const strokeWidthMatch = className.match(/^stroke-(\d+)$/);
    if (strokeWidthMatch) {
      const width = parseInt(strokeWidthMatch[1]);
      return { "stroke-width": `${width}` };
    }
  
    // Stroke color
    const strokeColorMatch = className.match(/^stroke-([a-z]+)-(\d+)$/);
    if (strokeColorMatch) {
      const color = getTailwindColor(strokeColorMatch[1], strokeColorMatch[2]);
      return color ? { stroke: color } : null;
    }
  
    // No match found
    return null;
  }
  
  interface TableClasses {
    [key: string]: { [key: string]: string };
  }
  
  function parseTailwindTableClass(className: string): CSSProperties | null {
    const tableClasses: TableClasses = {
      table: { display: "table" },
      "table-caption": { display: "table-caption" },
      "table-cell": { display: "table-cell" },
      "table-column": { display: "table-column" },
      "table-column-group": { display: "table-column-group" },
      "table-footer-group": { display: "table-footer-group" },
      "table-header-group": { display: "table-header-group" },
      "table-row-group": { display: "table-row-group" },
      "table-row": { display: "table-row" },
      "table-auto": { "table-layout": "auto" },
      "table-fixed": { "table-layout": "fixed" },
    };
  
    const regex = new RegExp(`^(${Object.keys(tableClasses).join("|")})$`);
    const match = className.match(regex);
  
    if (match) {
      return tableClasses[match[0]];
    }
  
    return null;
  }

  
  function parseTextClass(className: string): CSSProperties | null {
    // Text rendering
    if (/^antialiased$/.test(className)) {
      return {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      };
    }
    if (/^subpixel-antialiased$/.test(className)) {
      return {
        "-webkit-font-smoothing": "auto",
        "-moz-osx-font-smoothing": "auto",
      };
    }
  
    // Text opacity
    const textOpacityMatch = className.match(/^text-opacity-(\d+)$/);
    if (textOpacityMatch) {
      return { opacity: String(Number(textOpacityMatch[1]) / 100) };
    }
  
    // Word breaking
    if (/^break-normal$/.test(className)) {
      return { "word-break": "normal", "overflow-wrap": "normal" };
    }
    if (/^break-words$/.test(className)) {
      return { "overflow-wrap": "break-word" };
    }
    if (/^break-all$/.test(className)) {
      return { "word-break": "break-all" };
    }
    if (/^truncate$/.test(className)) {
      return {
        overflow: "hidden",
        "text-overflow": "ellipsis",
        "white-space": "nowrap",
      };
    }
  
    // Text transform
    if (/^uppercase$/.test(className)) {
      return { "text-transform": "uppercase" };
    }
    if (/^lowercase$/.test(className)) {
      return { "text-transform": "lowercase" };
    }
    if (/^capitalize$/.test(className)) {
      return { "text-transform": "capitalize" };
    }
    if (/^normal-case$/.test(className)) {
      return { "text-transform": "none" };
    }
  
    // Line height
    const lineHeightMap: { [key: string]: string } = {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
      "3": ".75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
      "9": "2.25rem",
      "10": "2.5rem",
    };
    const leadingMatch = className.match(/^leading-([\w-]+)$/);
    if (leadingMatch && lineHeightMap[leadingMatch[1]]) {
      return { "line-height": lineHeightMap[leadingMatch[1]] };
    }
  
    // Text decoration
    if (/^underline$/.test(className)) {
      return { "text-decoration": "underline" };
    }
    if (/^line-through$/.test(className)) {
      return { "text-decoration": "line-through" };
    }
    if (/^no-underline$/.test(className)) {
      return { "text-decoration": "none" };
    }
  
    // Font weight
    const fontWeightMap: { [key: string]: string } = {
      hairline: "100",
      thin: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    };
    const fontWeightMatch = className.match(/^font-([\w-]+)$/);
    if (fontWeightMatch && fontWeightMap[fontWeightMatch[1]]) {
      return { "font-weight": fontWeightMap[fontWeightMatch[1]] };
    }
  
    // Font size
    const fontSizeMap: { [key: string]: string } = {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    };
    const fontSizeMatch = className.match(/^text-([\w-]+)$/);
    if (fontSizeMatch && fontSizeMap[fontSizeMatch[1]]) {
      return { "font-size": fontSizeMap[fontSizeMatch[1]] };
    }
  
    // Font family
    if (/^font-sans$/.test(className)) {
      return {
        "font-family":
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      };
    }
    if (/^font-serif$/.test(className)) {
      return {
        "font-family":
          'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      };
    }
    if (/^font-mono$/.test(className)) {
      return {
        "font-family":
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      };
    }
  
    // Text alignment
    if (/^text-left$/.test(className)) {
      return { "text-align": "left" };
    }
    if (/^text-center$/.test(className)) {
      return { "text-align": "center" };
    }
    if (/^text-right$/.test(className)) {
      return { "text-align": "right" };
    }
    if (/^text-justify$/.test(className)) {
      return { "text-align": "justify" };
    }
  
    // Font style
    if (/^italic$/.test(className)) {
      return { "font-style": "italic" };
    }
    if (/^not-italic$/.test(className)) {
      return { "font-style": "normal" };
    }
  
    // Whitespace
    const whitespaceMap: { [key: string]: string } = {
      normal: "normal",
      nowrap: "nowrap",
      pre: "pre",
      "pre-line": "pre-line",
      "pre-wrap": "pre-wrap",
    };
    const whitespaceMatch = className.match(/^whitespace-([\w-]+)$/);
    if (whitespaceMatch && whitespaceMap[whitespaceMatch[1]]) {
      return { "white-space": whitespaceMap[whitespaceMatch[1]] };
    }
  
    // Letter spacing
    const trackingMap: { [key: string]: string } = {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    };
    const trackingMatch = className.match(/^tracking-([\w-]+)$/);
    if (trackingMatch && trackingMap[trackingMatch[1]]) {
      return { "letter-spacing": trackingMap[trackingMatch[1]] };
    }
  
    const textColorMatch = className.match(/^text-([\w]+)(?:-([\d]+))?$/);
  
    if (textColorMatch) {
      const color = textColorMatch[1];
      const shade = textColorMatch[2] || "500";
      if (colorMap[color]) {
        if (typeof colorMap[color] === "string") {
          return { color: colorMap[color] as string };
        } else if ((colorMap[color] as Record<string,string>)[shade]) {
          return { color:(colorMap[color] as Record<string,string>)[shade] };
        }
      }
    }
  
    return null;
  }
  
  function parseTransformClass(className: string): CSSProperties | null {
    // Transform
    if (className === "transform")
        return {
            transform: "translate(0px, 0px) rotate(0deg) skewX(0) skewY(0) scaleX(1) scaleY(1)"
        };
    if (className === "transform-none") return { transform: "none" };
    if (className === "transform-gpu")
        return {
            transform: "translate3d(0, 0, 0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)"
        };

    // Origin
    const originMatch = className.match(
        /^origin-(center|top|right|bottom|left|top-right|top-left|bottom-right|bottom-left)$/
    );
    if (originMatch) {
        return { "transform-origin": originMatch[1].replace("-", " ") };
    }

    // Translate
    const translateMatch = className.match(/^-?(translate-[xy])-(.+)$/);
    if (translateMatch) {
        const [, axis, value] = translateMatch;
        const cssValue =
            value === "full"
                ? "100%"
                : value === "1/2"
                ? "50%"
                : value === "px"
                ? "1px"
                : value.includes("/")
                ? `${
                      (parseInt(value.split("/")[0]) / parseInt(value.split("/")[1])) *
                      100
                  }%`
                : `${parseInt(value) * 0.25}rem`;
        return { transform: `${axis.split('-')[1]}(${cssValue})` };
    }

    // Scale
    const scaleMatch = className.match(/^scale(-[xy])?-(\d+)$/);
    if (scaleMatch) {
        const [, axis, value] = scaleMatch;
        const cssValue = parseInt(value) / 100;
        return axis
            ? { transform: `scale${axis}(${cssValue})` }
            : { transform: `scale(${cssValue})` };
    }

    // Rotate
    const rotateMatch = className.match(/^-?rotate-(\d+)$/);
    if (rotateMatch) {
        return { transform: `rotate(${rotateMatch[1]}deg)` };
    }

    // Skew
    const skewMatch = className.match(/^-?(skew-[xy])-(\d+)$/);
    if (skewMatch) {
        const [, axis, value] = skewMatch;
        return { transform: `${axis}(${value}deg)` };
    }

    // If no match is found
    return null;
}
  
type CSSProperties = {
    [key: string]: string | number | CSSProperties;
  };
  
  function parseUtilClass(className: string): CSSProperties | null {
    // Cursor
    const cursorMatch = className.match(
      /^cursor-(auto|default|move|pointer|text|wait|not-allowed)$/
    );
    if (cursorMatch) {
      return { cursor: cursorMatch[1] };
    }
  
    // Appearance
    if (className === "appearance-none") {
      return { appearance: "none" };
    }
  
    // Placeholder color
    const placeholderColorMatch = className.match(
      /^placeholder-(transparent|current|black|white|gray|red|orange|yellow|green|teal|blue|indigo|purple|pink)-(\d+)$/
    );
    if (placeholderColorMatch) {
      const color = placeholderColorMatch[1];
      const shade = placeholderColorMatch[2];
      let colorValue: string;
  
      if (color === "transparent") {
        colorValue = "transparent";
      } else if (color === "current") {
        colorValue = "currentColor";
      } else if (color === "black") {
        colorValue = "#000";
      } else if (color === "white") {
        colorValue = "#fff";
      } else {
        // You would need to define the actual color values from Tailwind's theme
        const colors: { [key: string]: { [key: string]: string } } = {
          gray: { "100": "#f7fafc", "600": "#718096" },
          red: { "100": "#fff5f5", "600": "#e53e3e" },
          orange: { "100": "#fffaf0", "600": "#dd6b20" },
          yellow: { "100": "#fffff0", "600": "#d69e2e" },
          green: { "100": "#f0fff4", "600": "#38a169" },
          teal: { "100": "#e6fffa", "600": "#319795" },
          blue: { "100": "#ebf8ff", "600": "#3182ce" },
          indigo: { "100": "#ebf4ff", "600": "#5a67d8" },
          purple: { "100": "#faf5ff", "600": "#805ad5" },
          pink: { "100": "#fff5f7", "600": "#d53f8c" },
        };
        colorValue = colors[color][shade];
      }
  
      return { "::placeholder": { color: colorValue } };
    }
  
    // Placeholder opacity
    const placeholderOpacityMatch = className.match(
      /^placeholder-opacity-(\d+)$/
    );
    if (placeholderOpacityMatch) {
      const opacity = parseInt(placeholderOpacityMatch[1]) / 100;
      return { "::placeholder": { opacity: opacity } };
    }
  
    // Outline
    if (className === "outline-none") {
      return { outline: "none" };
    }
  
    // Overflow
    const overflowMatch = className.match(
      /^overflow-(auto|hidden|visible|scroll|x-auto|y-auto|x-hidden|y-hidden|x-visible|y-visible|x-scroll|y-scroll)$/
    );
    if (overflowMatch) {
      const value = overflowMatch[1];
      if (value.startsWith("x-") || value.startsWith("y-")) {
        const [axis, overflow] = value.split("-");
        return { [`overflow-${axis}`]: overflow };
      }
      return { overflow: value };
    }
  
    // Scrolling
    if (className === "scrolling-touch") {
      return { "-webkit-overflow-scrolling": "touch" };
    }
    if (className === "scrolling-auto") {
      return { "-webkit-overflow-scrolling": "auto" };
    }
  
    // Pointer events
    if (className === "pointer-events-none") {
      return { "pointer-events": "none" };
    }
    if (className === "pointer-events-auto") {
      return { "pointer-events": "auto" };
    }
  
    // Resize
    const resizeMatch = className.match(/^resize(-none|-y|-x)?$/);
    if (resizeMatch) {
      const value = resizeMatch[1] ? resizeMatch[1].substring(1) : "both";
      return { resize: value };
    }
  
    // Select
    const selectMatch = className.match(/^select-(none|text|all|auto)$/);
    if (selectMatch) {
      return { "user-select": selectMatch[1] };
    }
  
    // Number variants
    if (className === "lining-nums") {
      return { "font-variant-numeric": "lining-nums" };
    }
    if (className === "oldstyle-nums") {
      return { "font-variant-numeric": "oldstyle-nums" };
    }
    if (className === "normal-nums") {
      return { "font-variant-numeric": "normal" };
    }
    if (className === "stacked-fractions") {
      return { "font-variant-numeric": "stacked-fractions" };
    }
  
    // If no match is found
    return null;
  }
  
  function parseTransitionClass(className: string):CSSProperties | null {
    // Animation ease
    const easeMatch = className.match(/^ease-(linear|in|out|in-out)$/);
    if (easeMatch) {
      return { "transition-timing-function": easeMatch[1] };
    }
  
    // Duration
    const durationMatch = className.match(/^duration-(\d+)$/);
    if (durationMatch) {
      return { "transition-duration": `${durationMatch[1]}ms` };
    }
  
    // Delay
    const delayMatch = className.match(/^delay-(\d+)$/);
    if (delayMatch) {
      return { "transition-delay": `${delayMatch[1]}ms` };
    }
  
    // Transition
    if (className === "transition") {
      return {
        "transition-property":
          "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
        "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
        "transition-duration": "150ms",
      };
    }
  
    // Transition specific properties
    const transitionMatch = className.match(
      /^transition-(all|colors|opacity|shadow|transform)$/
    );
    if (transitionMatch) {
      let property: string;
      switch (transitionMatch[1]) {
        case "all":
          property = "all";
          break;
        case "colors":
          property =
            "color, background-color, border-color, text-decoration-color, fill, stroke";
          break;
        case "opacity":
          property = "opacity";
          break;
        case "shadow":
          property = "box-shadow";
          break;
        case "transform":
          property = "transform";
          break;
        default:
          return null;
      }
      return {
        "transition-property": property,
        "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
        "transition-duration": "150ms",
      };
    }
  
    // If no match is found
    return null;
  }
  
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
  