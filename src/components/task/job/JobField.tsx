import { calcJobTotal, type Job } from "@dtypes/task/job/job";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ListGroup from "react-bootstrap/esm/ListGroup";
import type { JobChangeEvent, Label } from "./Job.hooks";
import NumberInputField from "@components/form/NumberInputField";

/**
 * 
 */
interface JobFieldProps {
    job: Job;
    onChange?: (e: JobChangeEvent) => void;
    onRequestEdit?: () => void;
    onRequestDelete?: () => void;
    labels?: Label[];
    disabled?: boolean;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function JobField({
    job,
    onChange            = function() {},
    onRequestEdit       = function() {},
    onRequestDelete     = function() {},
    labels              = ["duration", "cost", "discount", "total"],
    disabled            = false,
}: JobFieldProps) {

    /**
     * 
     * @param duration 
     */
    const handleChangeDuration = (duration: number) => {
        onChange({
            EVENT_TYPE: "CHANGE",
            jobID:      job.jobID,
            duration:   duration,
            cost:       job.cost,
            discount:   job.discount,
        });
    }

    /**
     * 
     * @param cost 
     */
    const handleChangeCost = (cost: number) => {
        onChange({
            EVENT_TYPE: "CHANGE",
            jobID:      job.jobID,
            duration:   job.duration,
            cost:       cost,
            discount:   job.discount,
        });
    }

    /**
     * 
     * @param discount 
     */
    const handleChangeDiscount = (discount: number) => {
        onChange({
            EVENT_TYPE: "CHANGE",
            jobID:      job.jobID,
            duration:   job.duration,
            cost:       job.cost,
            discount:   discount,
        });
    }

    /**
     * 
     * @param total 
     */
    const handleChangeTotal = (total: number) => {
        // Calculate the required discount for the change of total to happen.
        const discount = 1 - total / (job.duration * job.cost);

        // Total was raised above the calculated maximum, raise the base cost to compensate (discount < 0).
        // Total can be successfully changed with the change of the discount (0 <= discount <= 1).
        onChange({
            EVENT_TYPE: "CHANGE",
            jobID:      job.jobID,
            duration:   job.duration,
            cost:       discount < 0 ?  total / job.duration : job.cost,
            discount:   discount < 0 ?  0                    : discount,
        });
    }


    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            {job.title}
            <div className="d-flex justify-content-between gap-2">
                {labels.includes("duration")    && <NumberInputField disabled={disabled} value={job.duration} onChange={handleChangeDuration} min={0} max={999}/>}
                {labels.includes("cost")        && <NumberInputField disabled={disabled} value={job.cost} onChange={handleChangeCost} min={0}/>}
                {labels.includes("discount")    && <NumberInputField disabled={disabled} value={job.discount * 100} onChange={value => handleChangeDiscount(value * 0.01)} min={0} max={100}/>}
                {labels.includes("total")       && <NumberInputField disabled={disabled} value={calcJobTotal(job)} onChange={handleChangeTotal} min={0}/>}
                <Dropdown>
                    <Dropdown.Toggle disabled={disabled}>...</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <DropdownItem onClick={onRequestEdit}>Edit</DropdownItem>
                        <DropdownItem onClick={onRequestDelete}>Delete</DropdownItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </ListGroup.Item>
    );
}