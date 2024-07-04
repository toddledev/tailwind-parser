    import { CSSProperties, MarginValues } from "./tailwind-parser";

    export function parseMarginClasses(className: string): CSSProperties | null {
        const marginValues: MarginValues = {
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
            auto: "auto",
        };

        const marginRegex = /^-?(m|mb|mr|mt|ml|mx|my)-(0|1|2|3|4|5|6|8|10|11|12|16|20|24|32|40|48|56|64|px|auto)$/;
        const match = className.match(marginRegex);

        if (!match) return null;

        const [, direction, size] = match;
        const value = marginValues[size];
        const isNegative = className.startsWith("-");

        const styles: CSSProperties = {};

        switch (direction) {
            case "m":
                styles.margin = isNegative ? `-${value}` : value;
                break;
            case "mb":
                styles["margin-bottom"] = isNegative ? `-${value}` : value;
                break;
            case "mr":
                styles["margin-right"] = isNegative ? `-${value}` : value;
                break;
            case "mt":
                styles["margin-top"] = isNegative ? `-${value}` : value;
                break;
            case "ml":
                styles["margin-left"] = isNegative ? `-${value}` : value;
                break;
            case "mx":
                styles["margin-left"] = isNegative ? `-${value}` : value;
                styles["margin-right"] = isNegative ? `-${value}` : value;
                break;
            case "my":
                styles["margin-top"] = isNegative ? `-${value}` : value;
                styles["margin-bottom"] = isNegative ? `-${value}` : value;
                break;
        }

        return styles;
    }
