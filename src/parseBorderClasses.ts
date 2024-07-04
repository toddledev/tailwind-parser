import { CSSProperties, colorMap } from "./tailwind-parser";

export function parseBorderClasses(className: string): CSSProperties | null {

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
            ? `border-${side === "r"
                ? "right"
                : side === "l"
                    ? "left"
                    : side === "t"
                        ? "top"
                        : "bottom"}-width`
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

        const result: CSSProperties = {};
        props.forEach(prop => {
            result[prop] = value;
        });
        return result;
    }

    // If no match is found
    return null;
}
