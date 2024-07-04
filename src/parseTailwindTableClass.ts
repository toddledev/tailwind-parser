import { CSSProperties, TableClasses } from "./tailwind-parser";

export function parseTailwindTableClass(className: string): CSSProperties | null {
    const tableClasses: TableClasses = {
        table: { display: "table" },
        "table-caption": { display: "table-caption" },
        "table-cell": { display: "table-cell" },
        "table-column": { display: "table-column" },
        "table-column-group": { display: "table-column-group" },
        "table-footer-group": { display: "table-footer-group" },
        "table-header-group": { display: "table-header-group" },
        "table-row-group": { display: "table-row-group" },
        "table-row": { display: "table-row" },
        "table-auto": { "table-layout": "auto" },
        "table-fixed": { "table-layout": "fixed" },
    };

    const regex = new RegExp(`^(${Object.keys(tableClasses).join("|")})$`);
    const match = className.match(regex);

    if (match) {
        return tableClasses[match[0]];
    }

    return null;
}
