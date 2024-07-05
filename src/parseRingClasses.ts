import { colorMap } from "./tailwind-parser";

export function parseRingClasses(className: string): Record<string, string> | null {
    // Helper function to get color from colorMap or parse arbitrary value
    function getColorOrArbitrary(value: string): string | null {
        if (value.startsWith('[') && value.endsWith(']')) {
            return value.slice(1, -1);
        }
        const [color, shade] = value.split("-");
        if (colorMap[color]) {
            return shade ? (colorMap[color] as { [shade: string]: string; })[shade] : colorMap[color] as string;
        }
        return null;
    }

    // Ring width
    const ringWidthMatch = className.match(/^ring(-\d+|\[.+\])?$/);
    if (ringWidthMatch) {
        const width = ringWidthMatch[1]
            ? ringWidthMatch[1].startsWith('[')
                ? ringWidthMatch[1].slice(1, -1)
                : `${parseInt(ringWidthMatch[1].slice(1))}px`
            : '3px';
        return {
            "box-shadow": `0 0 0 ${width} var(--tw-ring-color)`,
            "--tw-ring-offset-shadow": "0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
            "--tw-ring-shadow": `0 0 0 calc(${width} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
        };
    }

    // Ring color
    const ringColorMatch = className.match(/^ring-([\w-]+|\[.+\])$/);
    if (ringColorMatch) {
        const color = getColorOrArbitrary(ringColorMatch[1]);
        if (color) {
            return {
                "--tw-ring-color": color,
            };
        }
    }

    // Ring inset
    if (className === "ring-inset") {
        return {
            "--tw-ring-inset": "inset",
        };
    }

    // Ring offset width
    const ringOffsetWidthMatch = className.match(/^ring-offset-(\d+|\[.+\])$/);
    if (ringOffsetWidthMatch) {
        const width = ringOffsetWidthMatch[1].startsWith('[')
            ? ringOffsetWidthMatch[1].slice(1, -1)
            : `${parseInt(ringOffsetWidthMatch[1])}px`;
        return {
            "--tw-ring-offset-width": width,
        };
    }

    // Ring offset color
    const ringOffsetColorMatch = className.match(/^ring-offset-([\w-]+|\[.+\])$/);
    if (ringOffsetColorMatch) {
        const color = getColorOrArbitrary(ringOffsetColorMatch[1]);
        if (color) {
            return {
                "--tw-ring-offset-color": color,
            };
        }
    }

    // Ring opacity
    const ringOpacityMatch = className.match(/^ring-opacity-(\d+|\[.+\])$/);
    if (ringOpacityMatch) {
        const opacity = ringOpacityMatch[1].startsWith('[')
            ? ringOpacityMatch[1].slice(1, -1)
            : (parseInt(ringOpacityMatch[1]) / 100).toString();
        return {
            "--tw-ring-opacity": opacity,
        };
    }

    return null;
}