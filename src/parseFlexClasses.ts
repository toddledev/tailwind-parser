import { CSSProperties } from "./tailwind-parser";

export function parseFlexClasses(className: string): CSSProperties | null {
    const flexRegex: { [key: string]: RegExp; } = {
        flex: /^flex$/,
        flexRow: /^flex-(row|row-reverse|col|col-reverse)$/,
        flexSize: /^flex-(initial|1|auto|none)$/,
        flexWrap: /^flex-(no-wrap|wrap|wrap-reverse)$/,
        items: /^items-(stretch|start|end|center|baseline)$/,
        content: /^content-(start|end|center|between|around|evenly)$/,
        justify: /^justify-(start|end|center|between|around|evenly)$/,
        self: /^self-(auto|start|end|center|stretch|baseline)$/,
        flexGrow: /^flex-grow(-0)?$/,
        flexShrink: /^flex-shrink(-0)?$/,
        order: /^order-(\d+)$/,
        justifyItems: /^justify-items-(auto|start|end|center|stretch)$/,
        justifySelf: /^justify-self-(auto|start|end|center|stretch)$/,
        space: /^space-(x|y)-(\d+|px|reverse)$/,
    };

    for (const [key, regex] of Object.entries(flexRegex)) {
        const match = className.match(regex);
        if (match) {
            switch (key) {
                case "flex":
                    return { display: "flex" };
                case "flexRow":
                    return { "flex-direction": match[1] === "col" ? "column" : match[1].replace("col-reverse", "column-reverse") };
                case "flexSize":
                    return { flex: match[1] === "1" ? "1 1 0%" : match[1] };
                case "flexWrap":
                    return { "flex-wrap": match[1].replace("no-wrap", "nowrap") };
                case "items":
                    return { "align-items": match[1] };
                case "content":
                    return { "align-content": match[1] };
                case "justify":
                    return {
                        "justify-content": match[1] === "between" ? "space-between" : match[1],
                    };
                case "self":
                    return { "align-self": match[1] };
                case "flexGrow":
                    return { "flex-grow": match[1] ? "0" : "1" };
                case "flexShrink":
                    return { "flex-shrink": match[1] ? "0" : "1" };
                case "order":
                    return { order: match[1] };
                case "justifyItems":
                    return { "justify-items": match[1] };
                case "justifySelf":
                    return { "justify-self": match[1] };
                case "space":
                    if (match[2] === "reverse") {
                        return {
                            [`margin-${match[1] === "x" ? "right" : "bottom"}`]: `calc(var(--tw-space-${match[1]}) * -1)`,
                        };
                    } else {
                        const value = match[2] === "px" ? "1px" : `${parseInt(match[2]) * 0.25}rem`;
                        return {
                            [`--tw-space-${match[1]}`]: value,
                            [`margin-${match[1] === "x" ? "left" : "top"}`]: `var(--tw-space-${match[1]})`,
                        };
                    }
            }
        }
    }

    return null;
}