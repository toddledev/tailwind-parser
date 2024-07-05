import { CSSProperties } from "./tailwind-parser";

export function parseSizeClasses(className: string): CSSProperties | null {

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

    const fixedValues: Record<string, string> = {
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

    function getSizeValue(value: string): string {
        if (value === "auto") return "auto";
        if (value === "px") return "1px";
        if (value === "full") return "100%";
        if (value === "screen") return "100vh";

        if (fractions[value]) return fractions[value];
        if (fixedValues[value]) return fixedValues[value];

        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue)) {
            return `${numericValue * 0.25}rem`;
        }

        const arbitraryMatch = value.match(/^\[(.*?)\]$/);
        if (arbitraryMatch) {
            return arbitraryMatch[1];
        }

        return value;
    }

    // Height
    const heightMatch = className.match(/^h-(\d+|auto|px|full|screen|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12|\[.*?\])$/);
    if (heightMatch) {
        const value = heightMatch[1];
        return { height: getSizeValue(value) };
    }

    // Max Height
    const maxHeightMatch = className.match(/^max-h-(full|screen|px|\d+|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12|\[.*?\])$/);
    if (maxHeightMatch) {
        const value = maxHeightMatch[1];
        return { "max-height": getSizeValue(value) };
    }

    // Min Height
    const minHeightMatch = className.match(/^min-h-(0|full|screen|\d+|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12|\[.*?\])$/);
    if (minHeightMatch) {
        const value = minHeightMatch[1];
        return { "min-height": getSizeValue(value) };
    }

    // Width
    const widthMatch = className.match(/^w-(\d+|auto|px|full|screen|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12|\[.*?\])$/);
    if (widthMatch) {
        const value = widthMatch[1];
        return { width: getSizeValue(value) };
    }

    // Max Width
    const maxWidthMatch = className.match(/^max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|screen-sm|screen-md|screen-lg|screen-xl|screen-2xl|none|0|max|min|prose|\d+|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12|\[.*?\])$/);
    if (maxWidthMatch) {
        const value = maxWidthMatch[1];
        return { "max-width": getSizeValue(value) };
    }

    // Min Width
    const minWidthMatch = className.match(/^min-w-(0|full|max|min|\d+|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12|\[.*?\])$/);
    if (minWidthMatch) {
        const value = minWidthMatch[1];
        return { "min-width": getSizeValue(value) };
    }

    return null;
}
