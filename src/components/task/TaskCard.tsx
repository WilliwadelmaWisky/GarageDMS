import "@assets/css/task/task-card.css";
import type { Part, Task, Work } from "@dtypes/task/task"
import Accordion from "react-bootstrap/esm/Accordion";
import Badge from "react-bootstrap/esm/Badge";
import TaskPartList from "./TaskPartList";
import TaskWorkList from "./TaskWorkList";
import TaskReportFeed from "./TaskReportFeed";

/**
 * 
 */
interface ChangeEvent {
    value: Task;
}

/**
 * 
 */
interface TaskCardProps {
    task: Task;
    onChange?: (e: ChangeEvent) => void;
}

/**
 * 
 * @param param0 
 */
export default function TaskCard({ task, onChange }: TaskCardProps) {

    const isInvoiced = task.invoice !== undefined;
    const isWarranty = task.isWarranty !== undefined && task.isWarranty;
    const hasWorks = task.works !== undefined && task.works.length > 0;
    const hasParts = task.parts !== undefined && task.parts.length > 0;
    const hasReports = task.reports !== undefined && task.reports.length > 0;

    const totalWorkPrice = hasWorks ? task.works!.map(w => w.expectedDuration * w.hourlyRate * (1 - w.discount)).reduce((prev, current) => prev + current) : 0;
    const totalPartPrice = hasParts ? task.parts!.map(p => p.amount * p.unitPrice * (1 - p.discount)).reduce((prev, current) => prev + current) : 0;
    const totalPrice = totalWorkPrice + totalPartPrice;


    /**
     * 
     * @param e 
     */
    const handleChange = (action: "SET_WORK" | "SET_PART", value: Work[] | Part[]) => {
        if (onChange === undefined) {
            return;
        }

        let clone: Task = { ...task };
        switch (action) {
            case "SET_WORK":
                clone.works = value as Work[];
                break;
            case "SET_PART":
                clone.parts = value as Part[];
                break;
        }

        onChange({ value: clone });
    }


    return (
        <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    {task.title}
                    {isWarranty && <Badge bg="success">Warranty</Badge>}
                    {isInvoiced && <Badge bg="primary">Invoiced</Badge>}
                </Accordion.Header>
                <Accordion.Body>
                    <div className="body-container">
                        <div className="flex-fill">
                            {task.description}
                            <TaskWorkList works={task.works} disabled={isInvoiced} onChange={e => handleChange("SET_WORK", e.value)}/>
                            <TaskPartList parts={task.parts} disabled={isInvoiced}/>
                            <strong className="d-block mt-4">{`Total price: ${totalPrice}`}</strong>
                        </div>
                        {hasReports && <TaskReportFeed reports={task.reports!} className="report-container"/>}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}