import type { ReactNode } from "react";
import "./table-row.css";

/**
 * 
 * @returns 
 */
export function TableHeaderRow({ children }: TableHeaderRowProps) {
    return (
        <tr>
            <th></th>
            {children}
        </tr>
    );
}


interface TableHeaderRowProps {
    children: ReactNode[] | ReactNode
}

/**
 * 
 * @returns 
 */
export function TableBodyRow({ number, children }: TableBodyRowProps) {

    return (
        <tr
            onDoubleClick={e => {
                if ((e.target as HTMLElement).nodeName === "INPUT") {
                    return;
                }

                console.log("Clicked a row: " + number);
            }}
        >
            <th></th>
            {children}
        </tr>
    );
}

interface TableBodyRowProps {
    number: number,
    children: ReactNode[] | ReactNode
}
