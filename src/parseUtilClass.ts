import { CSSProperties } from "./tailwind-parser";

export function parseUtilClass(className: string): CSSProperties | null {
    // Cursor
    const cursorMatch = className.match(
        /^cursor-(auto|default|move|pointer|text|wait|not-allowed)$/
    );
    if (cursorMatch) {
        return { cursor: cursorMatch[1] };
    }

    // Appearance
    if (className === "appearance-none") {
        return { appearance: "none" };
    }

    // Placeholder color
    const placeholderColorMatch = className.match(
        /^placeholder-(transparent|current|black|white|gray|red|orange|yellow|green|teal|blue|indigo|purple|pink)-(\d+)$/
    );
    if (placeholderColorMatch) {
        const color = placeholderColorMatch[1];
        const shade = placeholderColorMatch[2];
        let colorValue: string;

        if (color === "transparent") {
            colorValue = "transparent";
        } else if (color === "current") {
            colorValue = "currentColor";
        } else if (color === "black") {
            colorValue = "#000";
        } else if (color === "white") {
            colorValue = "#fff";
        } else {
            // You would need to define the actual color values from Tailwind's theme
            const colors: { [key: string]: { [key: string]: string; }; } = {
                gray: { "100": "#f7fafc", "600": "#718096" },
                red: { "100": "#fff5f5", "600": "#e53e3e" },
                orange: { "100": "#fffaf0", "600": "#dd6b20" },
                yellow: { "100": "#fffff0", "600": "#d69e2e" },
                green: { "100": "#f0fff4", "600": "#38a169" },
                teal: { "100": "#e6fffa", "600": "#319795" },
                blue: { "100": "#ebf8ff", "600": "#3182ce" },
                indigo: { "100": "#ebf4ff", "600": "#5a67d8" },
                purple: { "100": "#faf5ff", "600": "#805ad5" },
                pink: { "100": "#fff5f7", "600": "#d53f8c" },
            };
            colorValue = colors[color][shade];
        }

        return { "::placeholder": { color: colorValue } };
    }

    // Placeholder opacity
    const placeholderOpacityMatch = className.match(
        /^placeholder-opacity-(\d+)$/
    );
    if (placeholderOpacityMatch) {
        const opacity = parseInt(placeholderOpacityMatch[1]) / 100;
        return { "::placeholder": { opacity: opacity } };
    }

    // Outline
    if (className === "outline-none") {
        return { outline: "none" };
    }

    // Overflow
    const overflowMatch = className.match(
        /^overflow-(auto|hidden|visible|scroll|x-auto|y-auto|x-hidden|y-hidden|x-visible|y-visible|x-scroll|y-scroll)$/
    );
    if (overflowMatch) {
        const value = overflowMatch[1];
        if (value.startsWith("x-") || value.startsWith("y-")) {
            const [axis, overflow] = value.split("-");
            return { [`overflow-${axis}`]: overflow };
        }
        return { overflow: value };
    }

    // Scrolling
    if (className === "scrolling-touch") {
        return { "-webkit-overflow-scrolling": "touch" };
    }
    if (className === "scrolling-auto") {
        return { "-webkit-overflow-scrolling": "auto" };
    }

    // Pointer events
    if (className === "pointer-events-none") {
        return { "pointer-events": "none" };
    }
    if (className === "pointer-events-auto") {
        return { "pointer-events": "auto" };
    }

    // Resize
    const resizeMatch = className.match(/^resize(-none|-y|-x)?$/);
    if (resizeMatch) {
        const value = resizeMatch[1] ? resizeMatch[1].substring(1) : "both";
        return { resize: value };
    }

    // Select
    const selectMatch = className.match(/^select-(none|text|all|auto)$/);
    if (selectMatch) {
        return { "user-select": selectMatch[1] };
    }

    // Number variants
    if (className === "lining-nums") {
        return { "font-variant-numeric": "lining-nums" };
    }
    if (className === "oldstyle-nums") {
        return { "font-variant-numeric": "oldstyle-nums" };
    }
    if (className === "normal-nums") {
        return { "font-variant-numeric": "normal" };
    }
    if (className === "stacked-fractions") {
        return { "font-variant-numeric": "stacked-fractions" };
    }
     // Content
     const contentMatch = className.match(/^content-\["(.*)"\]$/);
     if (contentMatch) {
         return { "content": `"${contentMatch[1]}"` };
     }
 

    // If no match is found
    return null;
}
