import { CSSProperties, colorMap } from "./tailwind-parser";

export function parseBorderClasses(className: string): CSSProperties | null {
    // Border color
    const borderColorMatch = className.match(
        /^border-(\[#(?:[0-9a-fA-F]{3}){1,2}\]|transparent|current|black|white|(\w+)-(50|[1-9][0-9]{2}))$/
    );
    if (borderColorMatch) {
        const [, colorValue, colorFamily, colorShade] = borderColorMatch;
        let color: string | undefined;
        if (colorValue.startsWith('[') && colorValue.endsWith(']')) {
            color = colorValue.slice(1, -1);
        } else if (colorValue in colorMap) {
            color = colorMap[colorValue] as string;
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
    const borderWidthMatch = className.match(/^border(-([trbl]))?(-(\d+|(\[[\d.]+[a-z]+\])))?$/);
    if (borderWidthMatch) {
        const [, , side, , width, arbitraryWidth] = borderWidthMatch;
        const prop = side
            ? `border-${side === "r"
                ? "right"
                : side === "l"
                    ? "left"
                    : side === "t"
                        ? "top"
                        : "bottom"}-width`
            : "border-width";
        let value: string;
        if (arbitraryWidth) {
            value = arbitraryWidth.slice(1, -1);
        } else if (width) {
            value = `${parseInt(width) / 4}rem`;
        } else {
            value = "1px";
        }
        return { [prop]: value };
    }

    // Standalone "border" class
    if (className === "border") {
        return { "border-width": "1px" };
    }

    // Border opacity
    const borderOpacityMatch = className.match(/^border-opacity-(\d+|(\[[\d.]+%?\]))$/);
    if (borderOpacityMatch) {
        const [, opacity, arbitraryOpacity] = borderOpacityMatch;
        const value = arbitraryOpacity ? arbitraryOpacity.slice(1, -1) : `${opacity}%`;
        return { "--tw-border-opacity": value };
    }

    // Divide
    const divideMatch = className.match(/^divide-(x|y)(-reverse)?(-(\d+|(\[[\d.]+[a-z]+\])))$/);
    if (divideMatch) {
        const [, direction, reverse, , size, arbitrarySize] = divideMatch;
        const prop = `--tw-divide-${direction}-reverse`;
        const value = reverse ? "1" : "0";
        const widthProp = `border-${direction === "x" ? "left" : "top"}-width`;
        let widthValue: string;
        if (arbitrarySize) {
            widthValue = arbitrarySize.slice(1, -1);
        } else if (size) {
            widthValue = `${parseInt(size) / 4}rem`;
        } else {
            widthValue = "1px";
        }
        return {
            [prop]: value,
            [widthProp]: widthValue,
            "& > :not([hidden]) ~ :not([hidden])": {
                [prop]: value,
                [widthProp]: widthValue,
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
        /^rounded(-([trblse]|tl|tr|br|bl))?(-(\w+|(\[[\d.]+[a-z%]+\])))?$/
    );
    if (roundedMatch) {
        const [, , side, , size, arbitrarySize] = roundedMatch;
        let props: string[];
        if (side) {
            switch (side) {
                case "t":
                    props = ["border-top-left-radius", "border-top-right-radius"];
                    break;
                case "r":
                    props = ["border-top-right-radius", "border-bottom-right-radius"];
                    break;
                case "b":
                    props = ["border-bottom-left-radius", "border-bottom-right-radius"];
                    break;
                case "l":
                    props = ["border-top-left-radius", "border-bottom-left-radius"];
                    break;
                case "tl":
                    props = ["border-top-left-radius"];
                    break;
                case "tr":
                    props = ["border-top-right-radius"];
                    break;
                case "br":
                    props = ["border-bottom-right-radius"];
                    break;
                case "bl":
                    props = ["border-bottom-left-radius"];
                    break;
                default:
                    props = ["border-radius"];
            }
        } else {
            props = ["border-radius"];
        }

        let value: string;
        if (arbitrarySize) {
            value = arbitrarySize.slice(1, -1);
        } else if (size) {
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
                default:
                    value = "0.25rem";
            }
        } else {
            value = "0.25rem";
        }

        const result: CSSProperties = {};
        props.forEach(prop => {
            result[prop] = value;
        });
        return result;
    }

    // If no match is found
    return null;
}