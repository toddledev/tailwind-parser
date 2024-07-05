export function parseTailwindBreakpoint(breakpoint:string):{"type":"min-width" | "max-width" | "min-height" | "max-height", value:string} | null {
    const standardBreakpoints:Record<string,string> = {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
    };

    // Check if it's a standard min-width breakpoint
    if (breakpoint in standardBreakpoints) {
        return {
            type: 'min-width',
            value: standardBreakpoints[breakpoint]
        };
    }

    // Check if it's a standard max-width breakpoint
    const maxStandardMatch = breakpoint.match(/^max-(.+)$/);
    if (maxStandardMatch && maxStandardMatch[1] in standardBreakpoints) {
        return {
            type: 'max-width',
            value: standardBreakpoints[maxStandardMatch[1]]
        };
    }

    // Check for custom min-width breakpoint
    const minWidthMatch = breakpoint.match(/^min-\[(\d+)(px|rem|em)\]$/);
    if (minWidthMatch) {
        return {
            type: 'min-width',
            value: `${minWidthMatch[1]}${minWidthMatch[2]}`
        };
    }

    // Check for custom max-width breakpoint
    const maxWidthMatch = breakpoint.match(/^max-\[(\d+)(px|rem|em)\]$/);
    if (maxWidthMatch) {
        return {
            type: 'max-width',
            value: `${maxWidthMatch[1]}${maxWidthMatch[2]}`
        };
    }

    // If no match found, return null or throw an error
    return null;
}
