import { useState } from "react";
import type { Work } from "@dtypes/task";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ListGroup from "react-bootstrap/esm/ListGroup";
import TaskWorkModal from "./TaskWorkModal";

/**
 * 
 */
interface ChangeEvent {
    value: Work;
}

/**
 * 
 */
interface TaskWorkListProps {
    works: Work[];
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

    const [isModalShown, setIsModalShown] = useState<boolean>(false);

    /**
     * 
     * @param target
     * @param action
     * @param value
     */
    const handleChange = (target: Work, action: "SET_DURATION" | "SET_HOURLY_RATE" | "SET_DISCOUNT" | "SET_TOTAL_PRICE", value: number) => {
        if (onChange === undefined) {
            return;
        }

        let clone: Work = { ...target };
        switch (action) {
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
                clone.discount = 1 - value / (target.expectedDuration * target.hourlyRate)
                break;
        }

        onChange({ value: clone });
    };

    return (
        <div className={className}>
            <div className="fw-bold d-flex justify-content-between mt-4 mb-2">
                Work
                <div className="d-flex justify-content-between gap-2 pe-5">
                    <span className="label">Time</span>
                    <span className="label">Hourly rate</span>
                    <span className="label">Discount</span>
                    <span className="label">Total price</span>
                </div>
            </div>
            <ListGroup>
                {works.map(work => (
                    <ListGroup.Item key={work.id} className="d-flex justify-content-between align-items-center">
                        {work.title}
                        <div className="d-flex justify-content-between gap-2">
                            <input type="number" disabled={disabled} value={work.expectedDuration} onChange={e => handleChange(work,"SET_DURATION", Number.parseFloat(e.target.value))} min={0}/>
                            <input type="number" disabled={disabled} value={work.hourlyRate} onChange={e => handleChange(work, "SET_HOURLY_RATE", Number.parseFloat(e.target.value))} min={0}/>
                            <input type="number" disabled={disabled} value={work.discount * 100} onChange={e => handleChange(work, "SET_DISCOUNT", Number.parseFloat(e.target.value) * 0.01)} min={0} max={100}/>
                            <input type="number" disabled={disabled} value={work.expectedDuration * work.hourlyRate * (1 - work.discount)} onChange={e => handleChange(work, "SET_TOTAL_PRICE", Number.parseFloat(e.target.value))} min={0}/>
                            <Dropdown>
                                <Dropdown.Toggle disabled={disabled}>...</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <DropdownItem onClick={() => setIsModalShown(true)}>Edit</DropdownItem>
                                    <DropdownItem>Delete</DropdownItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <TaskWorkModal 
                show={isModalShown} 
                onHide={() => setIsModalShown(false)} 
            />
        </div>
    );
}