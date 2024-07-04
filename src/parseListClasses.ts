import { CSSProperties } from "./tailwind-parser";

export function parseListClasses(className: string): CSSProperties | null {
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
    if (className.startsWith("list-") &&
        !["inside", "outside"].includes(className.slice(5))) {
        const listType = className.slice(5);
        // Check if the listType is a valid CSS list-style-type
        const validListTypes = [
            "disc", "circle", "square", "decimal", "decimal-leading-zero",
            "lower-roman", "upper-roman", "lower-greek", "lower-latin",
            "upper-latin", "armenian", "georgian", "lower-alpha", "upper-alpha",
            "none"
        ];
        if (validListTypes.includes(listType)) {
            return { "list-style-type": listType };
        }
    }

    return null; // No match found or invalid class
}