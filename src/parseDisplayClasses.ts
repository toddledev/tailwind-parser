import { CSSProperties } from "./tailwind-parser";

export function parseDisplayClasses(className: string): CSSProperties | null {
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
