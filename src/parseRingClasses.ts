import { colorMap } from "./tailwind-parser";

export function parseRingClasses(className: string): Record<string, string> | null {
    // Helper function to get color from colorMap
    function getColor(colorName: string): string | null {
        const [color, shade] = colorName.split("-");
        if (colorMap[color]) {
            return shade ? (colorMap[color] as { [shade: string]: string; })[shade] : colorMap[color] as string;
        }
        return null;
    }

    // Ring width
    const ringWidthMatch = className.match(/^ring(-\d+)?$/);
    if (ringWidthMatch) {
        const width = ringWidthMatch[1] ? parseInt(ringWidthMatch[1].slice(1)) : 3;
        return {
            "box-shadow": `0 0 0 ${width}px var(--tw-ring-color)`,
            "--tw-ring-offset-shadow": "0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
            "--tw-ring-shadow": `0 0 0 calc(${width}px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
        };
    }

    // Ring color
    const ringColorMatch = className.match(/^ring-([\w-]+)$/);
    if (ringColorMatch) {
        const color = getColor(ringColorMatch[1]);
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
    const ringOffsetWidthMatch = className.match(/^ring-offset-(\d+)$/);
    if (ringOffsetWidthMatch) {
        const width = parseInt(ringOffsetWidthMatch[1]);
        return {
            "--tw-ring-offset-width": `${width}px`,
        };
    }

    // Ring offset color
    const ringOffsetColorMatch = className.match(/^ring-offset-([\w-]+)$/);
    if (ringOffsetColorMatch) {
        const color = getColor(ringOffsetColorMatch[1]);
        if (color) {
            return {
                "--tw-ring-offset-color": color,
            };
        }
    }

    // Ring opacity
    const ringOpacityMatch = className.match(/^ring-opacity-(\d+)$/);
    if (ringOpacityMatch) {
        const opacity = parseInt(ringOpacityMatch[1]) / 100;
        return {
            "--tw-ring-opacity": opacity.toString(),
        };
    }

    return null;
}
