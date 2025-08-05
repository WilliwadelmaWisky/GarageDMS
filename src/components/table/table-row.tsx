import type { JSX } from "react";
import "./table-row.css";

/**
 * 
 * @returns 
 */
export function TableHeaderRow({ elements }: HeaderProps) {
    return (
        <tr>
            <th></th>
            {elements.map((element, index) => (
                <th 
                    key={index}
                    onMouseMove={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const offsetX = e.clientX - rect.left;
                        const EDGE_THRESHOLD = 10;
                        const isOnEdge = offsetX <= EDGE_THRESHOLD || offsetX >= rect.width - EDGE_THRESHOLD;

                        e.currentTarget.style.cursor = isOnEdge ? "col-resize": "text";
                    }}
                    onClick={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const offsetX = e.clientX - rect.left;
                        const EDGE_THRESHOLD = 10;
                        const isOnEdge = offsetX <= EDGE_THRESHOLD || offsetX >= rect.width - EDGE_THRESHOLD;

                        if (isOnEdge) {
                             console.log("valid click");
                        }
                    }}
                >
                    {element.toUpperCase()}
                </th>
            ))}
        </tr>
    );
}

/**
 * 
 * @returns 
 */
export function TableBodyRow({ number, elements }: Props) {

    function get(element: Element): JSX.Element {
        if (element.value === "") {
            return <></>;
        }

        if (!element.isEditable) {
            return <>{element.value}</>;
        }

        switch (element.type) {
            case "number":  return <input type="number" value={element.value}/>
            case "text":    return <input type="text" value={element.value}/>
        }

        return <>{element.value}</>
    }

    return (
        <tr>
            <th>{number}</th>
            {elements.map((element, index) => (
                <td key={index}>{
                    get(element)
                }</td>
            ))}
        </tr>
    );
}

export interface Element {
    value: string,
    type: ElementType,
    isEditable: boolean
}

export type ElementType = "text" | "number" | "date";

export type Type = "text" | "work" | "job"

export interface Props {
    number: number,
    elements: Element[]
}

export interface HeaderProps {
    elements: string[]
}