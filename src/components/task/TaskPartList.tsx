import type { Part } from "@dtypes/task/task";
import Alert from "react-bootstrap/esm/Alert";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ListGroup from "react-bootstrap/esm/ListGroup";
import TaskPartModal from "./TaskPartModal";
import { useRef } from "react";
import type { ModalRef } from "@hooks/useModal";
import NumberInputField from "@components/form/NumberInputField";

/**
 * 
 */
interface TaskPartListProps {
    parts?: Part[];
    disabled?: boolean;
    className?: string;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TaskPartList({ parts, disabled, className }: TaskPartListProps) {

    const modalRef = useRef<ModalRef<Part>>({ show: () => {}, hide: () => {} });

    const hasParts = parts !== undefined && parts.length > 0;

    const handleChange = () => {

    };

    const handleAdd = () => {

    };

    return (
        <div className={className}>
            <div className="fw-bold d-flex justify-content-between align-items-center mt-4 mb-2">
                <div className="d-flex gap-2 align-items-center">
                    Parts
                    <span className="link-button" onClick={handleAdd}>+</span>
                </div>
                <div className="d-flex justify-content-between align-items-center gap-2 pe-5">
                    <span className="label">Amount</span>
                    <span className="label">Unit price</span>
                    <span className="label">Discount</span>
                    <span className="label">Total price</span>
                </div>
            </div>

            {hasParts ? (
                <ListGroup>
                    {parts.map(part => (
                        <TaskPartListEntry key={part.id} part={part} disabled={disabled}/>
                    ))}
                </ListGroup>
            ) : (
                <Alert variant="light">No Works</Alert>
            )}

            {false && <TaskPartModal ref={modalRef}/>}
        </div>
    );
}

/**
 * 
 */
interface TaskPartListEntryProps {
    part: Part;
    disabled?: boolean;
}

/**
 * 
 * @param param0 
 * @returns 
 */
function TaskPartListEntry({ part, disabled }: TaskPartListEntryProps) {

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            {part.name}
            <div className="d-flex justify-content-between gap-2">
                <NumberInputField disabled={disabled} value={part.amount} min={0} max={100}/>
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
    );
}