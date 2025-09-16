import { useRef } from "react";
import type { Work } from "@dtypes/task/task";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ListGroup from "react-bootstrap/esm/ListGroup";
import TaskWorkModal from "./TaskWorkModal";
import { cost, discount, total } from "@utils/cost-util";
import { add, replace } from "@utils/array-util";
import { v4 as uuidv4 } from "uuid";
import type { ModalRef } from "@hooks/useModal";
import Alert from "react-bootstrap/esm/Alert";

/**
 * 
 */
interface ChangeEvent {
    value: Work[];
}

/**
 * 
 */
interface TaskWorkListProps {
    works?: Work[];
    onChange?: (e: ChangeEvent) => void;
    disabled?: boolean;
    className?: string;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TaskWorkList({ works, onChange, disabled, className }: TaskWorkListProps) {

    const modalRef = useRef<ModalRef<Work>>({ show: () => {}, hide: () => {} });

    const hasWorks = works !== undefined && works.length > 0;

    /**
     * 
     * @param work
     */
    const handleChange = (work: Work) => {
        if (onChange === undefined || !hasWorks) {
            return;
        }

        const index = works.findIndex(w => w.id === work.id);
        onChange({ value: replace(works, index, work) });
    };

    const handleAdd = () => {
        if (onChange === undefined) {
            return;
        }

        const newWork: Work = { id: uuidv4(), title: "", expectedDuration: 1, actualDuration: 0, hourlyRate: 100, discount: 0 };
        modalRef.current.show(newWork);
    };

    const handleAccept = (work: Work) => {
        if (onChange === undefined || !hasWorks) {
            return;
        }

        console.log(work);

        const index = works.findIndex(w => w.id === work.id);
        if (index !== -1) { // modify
            onChange({ value: replace(works, index, work) });
            return;
        }

        onChange({ value: add(works, work) });
    };

    return (
        <div className={className}>
            <div className="fw-bold d-flex justify-content-between align-items-center mt-4 mb-2">
                <div className="d-flex gap-2 align-items-center">
                    Work
                    <span className="link-button" onClick={handleAdd}>+</span>
                </div>
                <div className="d-flex justify-content-between gap-2 pe-5">
                    <span className="label">Time</span>
                    <span className="label">Hourly rate</span>
                    <span className="label">Discount</span>
                    <span className="label">Total price</span>
                </div>
            </div>

            {hasWorks ? (
                <ListGroup>
                    {works.map(work => (
                        <TaskWorkListEntry key={work.id} work={work} disabled={disabled} onChange={handleChange} onEdit={() => modalRef.current.show(work)}/>
                    ))}
                </ListGroup>
            ): (
                <Alert variant="light">No Works</Alert>
            )}
            
            <TaskWorkModal 
                ref={modalRef}
                onAccept={handleAccept}
            />
        </div>
    );
}

/**
 * 
 */
interface TaskWorkListEntryProps {
    work: Work;
    disabled?: boolean;
    onChange?: (work: Work) => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
function TaskWorkListEntry({ work, disabled, onChange, onEdit, onDelete }: TaskWorkListEntryProps) {

    const handleChange = (type: "SET_DURATION" | "SET_HOURLY_RATE" | "SET_DISCOUNT" | "SET_TOTAL_PRICE", value: number) => {
        if (onChange === undefined) {
            return;
        }
        
        let clone: Work = { ...work };
        switch (type) {
            case "SET_DURATION":
                clone.expectedDuration = value;
                break;
            case "SET_HOURLY_RATE":
                clone.hourlyRate = value;
                break;
            case "SET_DISCOUNT":
                clone.discount = value;
                break;
            case "SET_TOTAL_PRICE":
                const d = discount(clone.hourlyRate, value, clone.expectedDuration);
                if (d < 0) {
                    clone.discount = 0;
                    clone.hourlyRate = cost(value, clone.expectedDuration, 0);
                    break;
                }

                clone.discount = d;
                break;
        }

        onChange(clone);
    };

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            {work.title}
            <div className="d-flex justify-content-between gap-2">
                <input type="number" disabled={disabled} value={work.expectedDuration} onChange={e => handleChange("SET_DURATION", Number.parseFloat(e.target.value))} min={0}/>
                <input type="number" disabled={disabled} value={work.hourlyRate} onChange={e => handleChange("SET_HOURLY_RATE", Number.parseFloat(e.target.value))} min={0}/>
                <input type="number" disabled={disabled} value={work.discount * 100} onChange={e => handleChange("SET_DISCOUNT", Number.parseFloat(e.target.value) * 0.01)} min={0} max={100}/>
                <input type="number" disabled={disabled} value={total(work.hourlyRate, work.expectedDuration, work.discount)} onChange={e => handleChange("SET_TOTAL_PRICE", Number.parseFloat(e.target.value))} min={0}/>
                <Dropdown>
                    <Dropdown.Toggle disabled={disabled}>...</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <DropdownItem onClick={onEdit}>Edit</DropdownItem>
                        <DropdownItem onClick={onDelete}>Delete</DropdownItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </ListGroup.Item>
    );
}