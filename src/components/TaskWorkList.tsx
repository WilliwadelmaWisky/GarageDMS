import { useReducer, useRef, useState } from "react";
import type { Work } from "@dtypes/task";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ListGroup from "react-bootstrap/esm/ListGroup";
import TaskWorkModal, { type ModalRef } from "./TaskWorkModal";
import { discount, total } from "@utils/cost-util";
import { add, replace } from "@utils/array-util";
import { v4 as uuidv4 } from "uuid";
import useModal from "@hooks/useModal";

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

    const modalRef = useRef<ModalRef>({ show: () => {}, hide: () => {} });

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
                clone.discount = discount(target.hourlyRate, value, target.expectedDuration);
                break;
        }

        const index = works.findIndex(w => w.id === target.id);
        onChange({ value: replace(works, index, clone) });
    };

    const handleAdd = () => {
        if (onChange === undefined) {
            return;
        }

        const newWork: Work = { id: uuidv4(), title: "", expectedDuration: 1, actualDuration: 0, hourlyRate: 100, discount: 0 };
        modalRef.current.show(newWork);
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
            <ListGroup>
                {works.map(work => (
                    <ListGroup.Item key={work.id} className="d-flex justify-content-between align-items-center">
                        {work.title}
                        <div className="d-flex justify-content-between gap-2">
                            <input type="number" disabled={disabled} value={work.expectedDuration} onChange={e => handleChange(work,"SET_DURATION", Number.parseFloat(e.target.value))} min={0}/>
                            <input type="number" disabled={disabled} value={work.hourlyRate} onChange={e => handleChange(work, "SET_HOURLY_RATE", Number.parseFloat(e.target.value))} min={0}/>
                            <input type="number" disabled={disabled} value={work.discount * 100} onChange={e => handleChange(work, "SET_DISCOUNT", Number.parseFloat(e.target.value) * 0.01)} min={0} max={100}/>
                            <input type="number" disabled={disabled} value={total(work.hourlyRate, work.expectedDuration, work.discount)} onChange={e => handleChange(work, "SET_TOTAL_PRICE", Number.parseFloat(e.target.value))} min={0}/>
                            <Dropdown>
                                <Dropdown.Toggle disabled={disabled}>...</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <DropdownItem onClick={() => modalRef.current.show(work)}>Edit</DropdownItem>
                                    <DropdownItem>Delete</DropdownItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <TaskWorkModal 
                ref={modalRef}
                //onAccept={}
            />
        </div>
    );
}