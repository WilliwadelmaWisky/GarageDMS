import type { Task } from "@dtypes/task"
import { Alert, Badge, ListGroup, Toast, ToastContainer } from "react-bootstrap";
import Accordion from "react-bootstrap/esm/Accordion";
import "@assets/css/task-card.css";
import { format } from "date-fns";

/**
 * 
 */
interface TaskCardProps {
    task: Task;
}

/**
 * 
 * @param param0 
 */
export default function TaskCard({ task }: TaskCardProps) {

    const isInvoiced = task.invoice !== undefined;
    const hasWorks = task.works.length > 0;
    const hasParts = task.parts !== undefined && task.parts.length > 0;
    const hasReports = task.reports !== undefined && task.reports.length > 0;

    return (
        <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{task.invoice ? <>{task.title} <Badge bg="success">Warranty</Badge><Badge>Invoiced</Badge></> : task.title}</Accordion.Header>
                <Accordion.Body>
                    <div className="body-container">
                        <div className="flex-fill">
                            {task.description}
                            {hasWorks && (
                                <>
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
                                        {task.works.map(w => (
                                            <ListGroup.Item key={w.id} className="d-flex justify-content-between">
                                                {w.title}
                                                <div className="d-flex justify-content-between gap-2">
                                                    <input type="number" disabled={isInvoiced} value={w.expectedDuration}/>
                                                    <input type="number" disabled={isInvoiced} value={w.hourlyRate}/>
                                                    <input type="number" disabled={isInvoiced} value={w.discount * 100}/>
                                                    <input type="number" disabled={isInvoiced} value={w.expectedDuration * w.hourlyRate * (1 - w.discount)}/>
                                                    <button>...</button>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </>
                            )}
                            
                            {hasParts && (
                                <>
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
                                        {task.parts!.map(part => (
                                            <ListGroup.Item className="d-flex justify-content-between">
                                                {part.name}
                                                <div className="d-flex justify-content-between gap-2">
                                                    <input type="number" disabled={isInvoiced} value={part.amount}/>
                                                    <input type="number" disabled={isInvoiced} value={part.unitPrice}/>
                                                    <input type="number" disabled={isInvoiced} value={part.discount * 100}/>
                                                    <input type="number" disabled={isInvoiced} value={part.amount * part.unitPrice * (1 - part.discount)}/>
                                                    <button>...</button>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </>
                            )}
                        </div>
                        
                        {hasReports && (
                            <div className="report-container">
                                Reports of Mechanics
                                <div className="d-flex flex-column gap-2">
                                    {task.reports!.map(report => (
                                        <Toast key={report.date.toString()} className="w-100">
                                            <Toast.Header closeButton={false}>
                                                <strong className="me-auto">{report.mechanic}</strong>
                                                <strong>{format(report.date, "d.M.yyyy")}</strong>
                                            </Toast.Header>
                                            <Toast.Body>
                                                {report.value}
                                            </Toast.Body>
                                        </Toast>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}