import type { JSX } from "react";
import "./body.css";

/**
 * 
 * @returns 
 */
export function Body({ number, type, seller, elements }: Props) {

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
            <td>{type}</td>
            <td><select><option>{seller}</option></select></td>
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
    type: Type,
    seller: string,
    elements: Element[]
}