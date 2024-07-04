import { CSSProperties, GridRegex } from "./tailwind-parser";

export function parseGridClasses(className: string): CSSProperties | null {
    const gridRegexes: GridRegex[] = [
        { regex: /^col-auto$/, style: { "grid-column": "auto" } },
        {
            regex: /^col-span-(\d+|full)$/,
            style: (match) => ({
                "grid-column": match[1] === "full"
                    ? "1 / -1"
                    : `span ${match[1]} / span ${match[1]}`,
            }),
        },
        {
            regex: /^col-start-(\d+|auto)$/,
            style: (match) => ({ "grid-column-start": match[1] }),
        },
        {
            regex: /^col-end-(\d+|auto)$/,
            style: (match) => ({ "grid-column-end": match[1] }),
        },
        {
            regex: /^gap-(\d+|px)$/,
            style: (match) => ({
                gap: match[1] === "px" ? "1px" : `${parseInt(match[1]) * 0.25}rem`,
            }),
        },
        {
            regex: /^row-gap-(\d+|px)$/,
            style: (match) => ({
                "row-gap": match[1] === "px" ? "1px" : `${parseInt(match[1]) * 0.25}rem`,
            }),
        },
        {
            regex: /^col-gap-(\d+|px)$/,
            style: (match) => ({
                "column-gap": match[1] === "px" ? "1px" : `${parseInt(match[1]) * 0.25}rem`,
            }),
        },
        {
            regex: /^grid-rows-(\d+)$/,
            style: (match) => ({
                "grid-template-rows": `repeat(${match[1]}, minmax(0, 1fr))`,
            }),
        },
        {
            regex: /^grid-cols-(\d+)$/,
            style: (match) => ({
                "grid-template-columns": `repeat(${match[1]}, minmax(0, 1fr))`,
            }),
        },
        {
            regex: /^grid-flow-(row|col)(-dense)?$/,
            style: (match) => ({
                "grid-auto-flow": match[2] ? `${match[1]} dense` : match[1],
            }),
        },
        {
            regex: /^row-span-(\d+|full)$/,
            style: (match) => ({
                "grid-row": match[1] === "full"
                    ? "1 / -1"
                    : `span ${match[1]} / span ${match[1]}`,
            }),
        },
        {
            regex: /^row-start-(auto|\d+)$/,
            style: (match) => ({ "grid-row-start": match[1] }),
        },
        {
            regex: /^row-end-(auto|\d+)$/,
            style: (match) => ({ "grid-row-end": match[1] }),
        },
        {
            regex: /^auto-(cols|rows)-(auto|fr|max|min)$/,
            style: (match) => ({
                [`grid-auto-${match[1]}`]: match[2],
            }),
        },
        {
            regex: /^gap-(x|y)-(\d+|px)$/,
            style: (match) => ({
                [`${match[1] === "x" ? "column" : "row"}-gap`]: match[2] === "px" ? "1px" : `${parseInt(match[2]) * 0.25}rem`,
            }),
        },
        {
            regex: /^place-content-(around|between|center|end|evenly|start|stretch)$/,
            style: (match) => ({ "place-content": match[1] }),
        },
        {
            regex: /^place-items-(auto|center|end|start|stretch)$/,
            style: (match) => ({ "place-items": match[1] }),
        },
        {
            regex: /^place-self-(auto|center|end|start|stretch)$/,
            style: (match) => ({ "place-self": match[1] }),
        },
        { regex: /^row-auto$/, style: { "grid-row": "auto" } },
    ];

    for (const { regex, style } of gridRegexes) {
        const match = className.match(regex);
        if (match) {
            return typeof style === "function" ? style(match) : style;
        }
    }

    return null;
}