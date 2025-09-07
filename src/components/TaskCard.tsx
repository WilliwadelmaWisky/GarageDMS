import type { Task } from "@dtypes/task"
import { Badge, ListGroup } from "react-bootstrap";
import Accordion from "react-bootstrap/esm/Accordion";
import "@assets/css/task-card.css";

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

    return (
        <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{task.invoice ? <>{task.title} <Badge bg="success">Warranty</Badge><Badge>Invoiced</Badge></> : task.title}</Accordion.Header>
                <Accordion.Body>
                    {task.description}

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
                        {task.work.map(w => (
                            <ListGroup.Item key={w.id} className="d-flex justify-content-between">
                                {w.title}
                                <div className="d-flex justify-content-between gap-2">
                                    <input type="number" value={w.expectedDuration}/>
                                    <input type="number" value={w.hourlyRate}/>
                                    <input type="number" value={w.discount}/>
                                    <input type="number" value={w.expectedDuration * w.hourlyRate * (1 - w.discount)}/>
                                    <button>...</button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <div className="fw-bold d-flex justify-content-between mt-4 mb-2">
                        Part
                        <div>
                            Amount
                            Unit price
                            Discount
                            Total price
                        </div>
                    </div>
                    <ListGroup>
                        <ListGroup.Item className="d-flex justify-content-between">
                            Cras justo odio
                            <div>
                                <input type="number" value={1.50}/>
                                <input type="number" value={1.50}/>
                                <input type="number" value={1.50}/>
                                <input type="number" value={1.50}/>
                                <button>...</button>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}