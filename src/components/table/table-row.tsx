import type { ReactNode } from "react";

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
export function TableBodyRow({ children }: TableBodyRowProps) {

    return (
        <tr
            onDoubleClick={e => {
                if ((e.target as HTMLElement).nodeName === "INPUT") {
                    return;
                }

                console.log("Double-Clicked a row");
            }}
        >
            <th></th>
            {children}
        </tr>
    );
}

interface TableBodyRowProps {
    children: ReactNode[] | ReactNode
}
