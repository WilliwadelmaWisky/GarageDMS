import "@assets/css/task/task-card.css";
import { type Task } from "@dtypes/task/task"
import Accordion from "react-bootstrap/esm/Accordion";
import Badge from "react-bootstrap/esm/Badge";
import { useTaskState } from "./Task.hooks";
import PartFieldViewWrapper from "./part/PartFieldViewWrapper";
import ReportToastViewWrapper from "./report/ReportToastViewWrapper";
import JobFieldViewWrapper from "./job/JobFieldViewWrapper";

/**
 * 
 */
interface TaskDetailPanelProps {
    task: Task;
    onChange?: () => void;
}

/**
 * 
 * @param param0 
 */
export default function TaskDetailPanel({ 
    task, 
    onChange 
}: TaskDetailPanelProps) {

    const { isInvoiced, total, dispatch } = useTaskState(task);


    return (
        <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    {task.title}
                    {task.isWarranty && <Badge bg="success">Warranty</Badge>}
                    {isInvoiced      && <Badge bg="primary">Invoiced</Badge>}
                </Accordion.Header>
                <Accordion.Body>
                    <div className="body-container">
                        <div className="flex-fill">
                            {task.description}
                            <JobFieldViewWrapper key={`works:${task.taskID}`} taskID={task.taskID} onChange={() => {}}/>
                            <PartFieldViewWrapper key={`parts:${task.taskID}`} taskID={task.taskID} onChange={() => {}}/>
                            <strong className="d-block mt-4">{`Total price: ${total}`}</strong>
                        </div>
                        <ReportToastViewWrapper key={`reports:${task.taskID}`} taskID={task.taskID} className="report-container"/>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}