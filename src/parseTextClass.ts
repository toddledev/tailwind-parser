import { CSSProperties, colorMap } from "./tailwind-parser";

export function parseTextClass(className: string): CSSProperties | null {
    // Text rendering
    if (/^antialiased$/.test(className)) {
        return {
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale",
        };
    }
    if (/^subpixel-antialiased$/.test(className)) {
        return {
            "-webkit-font-smoothing": "auto",
            "-moz-osx-font-smoothing": "auto",
        };
    }

    // Text opacity
    const textOpacityMatch = className.match(/^text-opacity-(\d+)$/);
    if (textOpacityMatch) {
        return { opacity: String(Number(textOpacityMatch[1]) / 100) };
    }

    // Word breaking
    if (/^break-normal$/.test(className)) {
        return { "word-break": "normal", "overflow-wrap": "normal" };
    }
    if (/^break-words$/.test(className)) {
        return { "overflow-wrap": "break-word" };
    }
    if (/^break-all$/.test(className)) {
        return { "word-break": "break-all" };
    }
    if (/^truncate$/.test(className)) {
        return {
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
        };
    }

    // Text transform
    if (/^uppercase$/.test(className)) {
        return { "text-transform": "uppercase" };
    }
    if (/^lowercase$/.test(className)) {
        return { "text-transform": "lowercase" };
    }
    if (/^capitalize$/.test(className)) {
        return { "text-transform": "capitalize" };
    }
    if (/^normal-case$/.test(className)) {
        return { "text-transform": "none" };
    }

    // Line height
    const lineHeightMap: { [key: string]: string; } = {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        "3": ".75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
    };
    const leadingMatch = className.match(/^leading-([\w-]+)$/);
    if (leadingMatch && lineHeightMap[leadingMatch[1]]) {
        return { "line-height": lineHeightMap[leadingMatch[1]] };
    }

    // Text decoration
    if (/^underline$/.test(className)) {
        return { "text-decoration": "underline" };
    }
    if (/^line-through$/.test(className)) {
        return { "text-decoration": "line-through" };
    }
    if (/^no-underline$/.test(className)) {
        return { "text-decoration": "none" };
    }

    // Font weight
    const fontWeightMap: { [key: string]: string; } = {
        hairline: "100",
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
    };
    const fontWeightMatch = className.match(/^font-([\w-]+)$/);
    if (fontWeightMatch && fontWeightMap[fontWeightMatch[1]]) {
        return { "font-weight": fontWeightMap[fontWeightMatch[1]] };
    }

    // Font size
    const fontSizeMap: { [key: string]: string; } = {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
    };
    const fontSizeMatch = className.match(/^text-([\w-]+)$/);
    if (fontSizeMatch && fontSizeMap[fontSizeMatch[1]]) {
        return { "font-size": fontSizeMap[fontSizeMatch[1]] };
    }

    // Font family
    if (/^font-sans$/.test(className)) {
        return {
            "font-family": 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        };
    }
    if (/^font-serif$/.test(className)) {
        return {
            "font-family": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        };
    }
    if (/^font-mono$/.test(className)) {
        return {
            "font-family": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        };
    }

    // Text alignment
    if (/^text-left$/.test(className)) {
        return { "text-align": "left" };
    }
    if (/^text-center$/.test(className)) {
        return { "text-align": "center" };
    }
    if (/^text-right$/.test(className)) {
        return { "text-align": "right" };
    }
    if (/^text-justify$/.test(className)) {
        return { "text-align": "justify" };
    }

    // Font style
    if (/^italic$/.test(className)) {
        return { "font-style": "italic" };
    }
    if (/^not-italic$/.test(className)) {
        return { "font-style": "normal" };
    }

    // Whitespace
    const whitespaceMap: { [key: string]: string; } = {
        normal: "normal",
        nowrap: "nowrap",
        pre: "pre",
        "pre-line": "pre-line",
        "pre-wrap": "pre-wrap",
    };
    const whitespaceMatch = className.match(/^whitespace-([\w-]+)$/);
    if (whitespaceMatch && whitespaceMap[whitespaceMatch[1]]) {
        return { "white-space": whitespaceMap[whitespaceMatch[1]] };
    }

    // Letter spacing
    const trackingMap: { [key: string]: string; } = {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
    };
    const trackingMatch = className.match(/^tracking-([\w-]+)$/);
    if (trackingMatch && trackingMap[trackingMatch[1]]) {
        return { "letter-spacing": trackingMap[trackingMatch[1]] };
    }

    const textColorMatch = className.match(/^text-([\w]+)(?:-([\d]+))?$/);

    if (textColorMatch) {
        const color = textColorMatch[1];
        const shade = textColorMatch[2] || "500";
        if (colorMap[color]) {
            if (typeof colorMap[color] === "string") {
                return { color: colorMap[color] as string };
            } else if ((colorMap[color] as Record<string, string>)[shade]) {
                return { color: (colorMap[color] as Record<string, string>)[shade] };
            }
        }
    }

    return null;
}
