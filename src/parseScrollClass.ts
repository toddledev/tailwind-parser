import { CSSProperties } from "./tailwind-parser";

export function parseScrollClass(className: string): CSSProperties | null {
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
