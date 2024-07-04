import { CSSProperties } from "./tailwind-parser";

export function parseTransformClass(className: string): CSSProperties | null {
    // Transform
    if (className === "transform")
        return {
            transform: "translate(0px, 0px) rotate(0deg) skewX(0) skewY(0) scaleX(1) scaleY(1)"
        };
    if (className === "transform-none") return { transform: "none" };
    if (className === "transform-gpu")
        return {
            transform: "translate3d(0, 0, 0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)"
        };

    // Origin
    const originMatch = className.match(
        /^origin-(center|top|right|bottom|left|top-right|top-left|bottom-right|bottom-left)$/
    );
    if (originMatch) {
        return { "transform-origin": originMatch[1].replace("-", " ") };
    }

    // Translate
    const translateMatch = className.match(/^(-?)(translate-[xy])-(.+)$/);
    if (translateMatch) {
        const [, sign, axis, value] = translateMatch;
        let cssValue = value === "full"
            ? "100%"
            : value === "1/2"
                ? "50%"
                : value === "px"
                    ? "1px"
                    : value.includes("/")
                        ? `${(parseInt(value.split("/")[0]) / parseInt(value.split("/")[1])) * 100}%`
                        : `${parseInt(value) * 0.25}rem`;
        cssValue = sign === '-' ? `-${cssValue}` : cssValue;
        return { transform: `${axis.split('-')[1]}(${cssValue})` };
    }

    // Scale
    const scaleMatch = className.match(/^scale(-[xy])?-(\d+)$/);
    if (scaleMatch) {
        const [, axis, value] = scaleMatch;
        const cssValue = parseInt(value) / 100;
        return axis
            ? { transform: `scale${axis.substring(1).toUpperCase()}(${cssValue})` }
            : { transform: `scale(${cssValue})` };
    }

    // Rotate
    const rotateMatch = className.match(/^(-?)rotate-(\d+)$/);
    if (rotateMatch) {
        const [, sign, value] = rotateMatch;
        const degree = sign === '-' ? `-${value}` : value;
        return { transform: `rotate(${degree}deg)` };
    }

    // Skew
    const skewMatch = className.match(/^(-?)(skew-[xy])-(\d+)$/);
    if (skewMatch) {
        const [, sign, axis, value] = skewMatch;
        const degree = sign === '-' ? `-${value}` : value;
        return { transform: `${axis}(${degree}deg)` };
    }

    // If no match is found
    return null;
}