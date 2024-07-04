import { CSSProperties, colorMap } from "./tailwind-parser";


export function parseBackgroundClasses(className: string): CSSProperties | null {
    // Background size
    if (/^bg-(auto|cover|contain)$/.test(className)) {
        return { "background-size": className.split("-")[1] };
    }

    // Background position
    const positionMap: Record<string, string> = {
        "bg-bottom": "bottom",
        "bg-top": "top",
        "bg-center": "center",
        "bg-left": "left",
        "bg-left-bottom": "left bottom",
        "bg-left-top": "left top",
        "bg-right": "right",
        "bg-right-bottom": "right bottom",
        "bg-right-top": "right top",
    };
    if (positionMap[className]) {
        return { "background-position": positionMap[className] };
    }

    // Background attachment
    if (/^bg-(fixed|local|scroll)$/.test(className)) {
        return { "background-attachment": className.split("-")[1] };
    }

    // Background repeat
    if (/^bg-(no-repeat|repeat|repeat-x|repeat-y|repeat-round|repeat-space)$/.test(
        className
    )) {
        return { "background-repeat": className.split("-").slice(1).join("-") };
    }

    // Background opacity
    const opacityMatch = className.match(/^bg-opacity-(\d+)$/);
    if (opacityMatch) {
        return { "--tw-bg-opacity": (parseInt(opacityMatch[1]) / 100).toString() };
    }

    // Background clip
    if (/^bg-clip-(border|content|padding|text)$/.test(className)) {
        return { "background-clip": className.split("-")[2] };
    }

    const colorMatch = className.match(/^bg-(\w+)(?:-(\d+))?$/);
    if (colorMatch) {
        const color = colorMatch[1];
        const shade = colorMatch[2] || (color === "black" || color === "white" ? null : "500");
        if (colorMap[color]) {
            return {
                "background-color": shade
                    ? (colorMap[color] as Record<string, string>)[shade]
                    : (colorMap[color] as string),
            };
        }
    }

    // Background gradients
    if (/^bg-gradient-to-(t|tr|r|br|b|bl|l|tl)$/.test(className)) {
        const direction = className.split("-").pop() as string;
        const directionMap: Record<string, string> = {
            t: "to top",
            tr: "to top right",
            r: "to right",
            br: "to bottom right",
            b: "to bottom",
            bl: "to bottom left",
            l: "to left",
            tl: "to top left",
        };
        return {
            "background-image": `linear-gradient(${directionMap[direction]}, var(--tw-gradient-stops))`,
        };
    }

    // Gradient color stops
    const gradientStopMatch = className.match(/^(from|via|to)-(\w+)(?:-(\d+))?$/);
    if (gradientStopMatch) {
        const [, position, color, shade] = gradientStopMatch;
        if (colorMap[color]) {
            const colorValue = shade
                ? (colorMap[color] as Record<string, string>)[shade]
                : (colorMap[color] as Record<string, string>)["500"] || (colorMap[color] as string);
            return {
                [`--tw-gradient-${position}`]: colorValue,
                "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
            };
        }
    }

    // If no match is found
    return null;
}
