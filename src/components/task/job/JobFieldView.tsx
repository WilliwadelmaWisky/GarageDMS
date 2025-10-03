import { useRef } from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";
import JobModal from "./TaskWorkModal";
import { v4 as uuidv4 } from "uuid";
import Alert from "react-bootstrap/esm/Alert";
import type { Job } from "@dtypes/task/job/job";
import { labelDisplayName, type JobAddEvent, type JobChangeEvent, type JobDeleteEvent, type JobListChangeEvent, type Label } from "./Job.hooks";
import JobField from "./JobField";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Button from "react-bootstrap/esm/Button";

/**
 * 
 */
interface JobFieldViewProps {
    jobs: Job[];
    onChange?: (e: JobListChangeEvent) => void;
    labels?: Label[];
    disabled?: boolean;
    className?: string;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function JobFieldView({ 
    jobs, 
    onChange        = function() {}, 
    labels          = ["duration", "cost", "discount", "total"],
    disabled        = false, 
    className       = undefined, 
}: JobFieldViewProps) {

    const modalRef = useRef<ModalRef<Work>>({ show: () => {}, hide: () => {} });


    /**
     * 
     * @param e
     */
    const handleChange = (e: JobChangeEvent) => {
        if (onChange === undefined || !hasWorks) {
            return;
        }

        const index = works.findIndex(w => w.workID === work.workID);
        onChange({ value: replace(works, index, work) });
    }

    /**
     * 
     * @param e  
     */
    const handleAdd = (e: JobAddEvent) => {
        if (onChange === undefined) {
            return;
        }

        const newWork: Work = { workID: uuidv4(), title: "", expectedDuration: 1, actualDuration: 0, hourlyRate: 100, discount: 0 };
        modalRef.current.show(newWork);
    }

    /**
     * 
     * @param e 
     */
    const handleDelete = (e: JobDeleteEvent) => {

    }


    /**
     * 
     * @param jobID 
     */
    const handleRequestEdit = (jobID: string) => {

    }

    /**
     * 
     */
    const handleRequestAdd = () => {

    }

    /**
     * 
     * @param jobID 
     */
    const handleRequestDelete = (jobID: string) => {

    }


    return (
        <div className={className}>
            <Header 
                title="Parts" 
                labels={labels}
            />
            <Body 
                jobs={jobs}
                onChange={handleChange}
                onRequestEdit={handleRequestEdit}
                onRequestDelete={handleRequestDelete}
                labels={labels}
                disabled={disabled}
            />
            <Footer
                onRequestAdd={handleRequestAdd}
            />
            
            <JobModal ref={modalRef}/>
        </div>
    );
}

/**
 * 
 */
interface HeaderProps {
    title: string;
    labels?: Label[];
}

/**
 * 
 * @param param0 
 * @returns 
 */
function Header({
    title,
    labels = ["duration", "cost", "discount", "total"],
}: HeaderProps) {

    return (
        <div className="fw-bold d-flex justify-content-between align-items-center mt-4 mb-2">
            {title}
            <div className="d-flex justify-content-between gap-2 pe-5">
                {labels.includes("duration")    && <span className="label">{labelDisplayName("duration")}</span>}
                {labels.includes("cost")        && <span className="label">{labelDisplayName("cost")}</span>}
                {labels.includes("discount")    && <span className="label">{labelDisplayName("discount")}</span>}
                {labels.includes("total")       && <span className="label">{labelDisplayName("total")}</span>}
            </div>
        </div>
    );
}

/**
 * 
 */
interface BodyProps {
    jobs: Job[];
    onChange: (e: JobChangeEvent) => void;
    onRequestEdit?: (jobID: string) => void;
    onRequestDelete?: (jobID: string) => void;
    labels?: Label[];
    disabled?: boolean; 
}

/**
 * 
 * @param param0 
 * @returns 
 */
function Body({
    jobs,
    onChange            = function() {},
    onRequestEdit       = function() {},
    onRequestDelete     = function() {},
    labels              = ["duration", "cost", "discount", "total"],
    disabled            = false,
}: BodyProps) {

    if (jobs.length <= 0) {
        return <Alert variant="light">No jobs found! Click the plus button to add.</Alert>
    }

    return (
        <ListGroup>
            {jobs.map(job => (
                <JobField 
                    key={job.jobID} 
                    job={job} 
                    onChange={onChange} 
                    onRequestEdit={() => onRequestEdit(job.jobID)}
                    onRequestDelete={() => onRequestDelete(job.jobID)}
                    labels={labels}
                    disabled={disabled} 
                />
            ))}
        </ListGroup>
    );
}

/**
 * 
 */
interface FooterProps {
    onRequestAdd?: () => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
function Footer({
    onRequestAdd = function() {},
}: FooterProps) {

    return (
        <ButtonGroup>
            <Button variant="primary" onClick={onRequestAdd}>ADD</Button>
            <Button variant="primary">DELETE</Button>
            <Button variant="primary">CLEAR</Button>
        </ButtonGroup>
    );
}
