import { CSSProperties } from "./tailwind-parser";

export function parseVisibilityClasses(className: string): CSSProperties | null {
    // Opacity
    const opacityMatch = className.match(/^opacity-(\d+)$/);
    if (opacityMatch) {
        const opacityValue = parseInt(opacityMatch[1]) / 100;
        if (opacityValue >= 0 && opacityValue <= 1) {
            return { opacity: opacityValue.toString() };
        } else {
            return null;
        }
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