import { CSSProperties } from "./tailwind-parser";

export function parseTransitionClass(className: string): CSSProperties | null {
    // Animation ease
    const easeMatch = className.match(/^ease-(linear|in|out|in-out)$/);
    if (easeMatch) {
        return { "transition-timing-function": easeMatch[1] };
    }

    // Duration
    const durationMatch = className.match(/^duration-(\d+)$/);
    if (durationMatch) {
        return { "transition-duration": `${durationMatch[1]}ms` };
    }

    // Delay
    const delayMatch = className.match(/^delay-(\d+)$/);
    if (delayMatch) {
        return { "transition-delay": `${delayMatch[1]}ms` };
    }

    // Transition
    if (className === "transition") {
        return {
            "transition-property": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
            "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
            "transition-duration": "150ms",
        };
    }

    // Transition specific properties
    const transitionMatch = className.match(
        /^transition-(all|colors|opacity|shadow|transform)$/
    );
    if (transitionMatch) {
        let property: string;
        switch (transitionMatch[1]) {
            case "all":
                property = "all";
                break;
            case "colors":
                property =
                    "color, background-color, border-color, text-decoration-color, fill, stroke";
                break;
            case "opacity":
                property = "opacity";
                break;
            case "shadow":
                property = "box-shadow";
                break;
            case "transform":
                property = "transform";
                break;
            default:
                return null;
        }
        return {
            "transition-property": property,
            "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
            "transition-duration": "150ms",
        };
    }

    // If no match is found
    return null;
}
