import { CSSProperties } from "./tailwind-parser";

export function parseOutlineClass(className: string): CSSProperties | null {
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
