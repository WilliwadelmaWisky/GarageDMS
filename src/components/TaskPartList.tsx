import type { Part } from "@dtypes/task";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ListGroup from "react-bootstrap/esm/ListGroup";

/**
 * 
 */
interface TaskPartListProps {
    parts: Part[];
    disabled?: boolean;
    className?: string;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TaskPartList({ parts, disabled, className }: TaskPartListProps) {
    return (
        <div className={className}>
            <div className="fw-bold d-flex justify-content-between mt-4 mb-2">
                Part
                <div className="d-flex justify-content-between gap-2 pe-5">
                    <span className="label">Amount</span>
                    <span className="label">Unit price</span>
                    <span className="label">Discount</span>
                    <span className="label">Total price</span>
                </div>
            </div>
            <ListGroup>
                {parts.map(part => (
                    <ListGroup.Item key={part.id} className="d-flex justify-content-between align-items-center">
                        {part.name}
                        <div className="d-flex justify-content-between gap-2">
                            <input type="number" disabled={disabled} value={part.amount}/>
                            <input type="number" disabled={disabled} value={part.unitPrice}/>
                            <input type="number" disabled={disabled} value={part.discount * 100}/>
                            <input type="number" disabled={disabled} value={part.amount * part.unitPrice * (1 - part.discount)}/>
                            <Dropdown>
                                <Dropdown.Toggle disabled={disabled}>...</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <DropdownItem>Edit</DropdownItem>
                                    <DropdownItem>Delete</DropdownItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}