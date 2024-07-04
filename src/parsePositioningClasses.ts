import { CSSProperties } from "./tailwind-parser";

export function parsePositioningClasses(className: string): CSSProperties | null {
      // Alignment
      if (/^align-(baseline|top|middle|bottom|text-top|text-bottom)$/.test(className)) {
        const alignValue = className.split("-")
        return { "vertical-align": alignValue[alignValue.length -1] };
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
        /^(-?)(inset-x|inset-y|inset|top|right|bottom|left)(-(.+))?$/
    );
    if (insetMatch) {
        const [, sign, direction, , value] = insetMatch;
        let cssValue:string;
    
        if (value === undefined) {
            cssValue = '0px';
        } else if (value === 'px') {
            cssValue = '1px';
        } else if (value === 'full') {
            cssValue = '100%';
        } else if (value === 'auto') {
            cssValue = 'auto';
        } else if (/^\d+$/.test(value)) {
            cssValue = `${parseInt(value) * 0.25}rem`;
        } else {
            // Handle fractional values like '1/2'
            const fractionMatch = value.match(/^(\d+)\/(\d+)$/);
            if (fractionMatch) {
                const [, numerator, denominator] = fractionMatch;
                cssValue = `${(parseInt(numerator) / parseInt(denominator)) * 100}%`;
            } else {
                cssValue = value;
            }
        }
    
        // Apply negative sign if present
        if (sign === '-') {
            cssValue = `-${cssValue}`;
        }
    
        const property = direction === "inset"
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
        return { "object-fit": className.split("-").slice(1).join("-") };
    }
    if (/^object-(bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top)$/.test(
        className
    )) {
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
