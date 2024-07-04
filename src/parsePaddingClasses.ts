import { CSSProperties } from "./tailwind-parser";

export function parsePaddingClasses(className: string): CSSProperties | null {
    const paddingValues: Record<string, string> = {
        "0": "0px",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "11": "2.75rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "32": "8rem",
        "40": "10rem",
        "48": "12rem",
        "56": "14rem",
        "64": "16rem",
        px: "1px",
    };

    const paddingRegex = /^(p|pb|pr|pt|pl|px|py)-(0|1|2|3|4|5|6|8|10|11|12|16|20|24|32|40|48|56|64|px)$/;
    const match = className.match(paddingRegex);

    if (!match) return null;

    const [, direction, size] = match;
    const value = paddingValues[size];

    const styles: CSSProperties = {};

    switch (direction) {
        case "p":
            styles.padding = value;
            break;
        case "pb":
            styles["padding-bottom"] = value;
            break;
        case "pr":
            styles["padding-right"] = value;
            break;
        case "pt":
            styles["padding-top"] = value;
            break;
        case "pl":
            styles["padding-left"] = value;
            break;
        case "px":
            styles["padding-left"] = value;
            styles["padding-right"] = value;
            break;
        case "py":
            styles["padding-top"] = value;
            styles["padding-bottom"] = value;
            break;
    }

    return styles;
}
