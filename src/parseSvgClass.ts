import { colorMap } from "./tailwind-parser";

export function parseSvgClass(className: string): Record<string, string> | null {
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
