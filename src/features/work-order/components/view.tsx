import { useRef } from "react";
import TaskTable from "./task-table";
import MenuBar from "./menubar";
import ToolBar from "./toolbar";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PartModal from "./part-modal";
import { v4 as uuidv4 } from "uuid";
import type { TableRef } from "@components/table/table";
import { useStateReducer, type State } from "../hooks/useStateReducer";
import { NULL as TimeSpan_NULL } from "@datatypes/timespan";
import { NULL as Date_NULL } from "@datatypes/date";



const INITIAL_STATE: State = {
    id: -1,
    type: "offer",
    rows: [
        { type: "task", rowID: uuidv4(), title: "New Task", staffID: "P2", instructionTime: TimeSpan_NULL, clockedTime: TimeSpan_NULL, amount: -1, unitPrice: -1, discount: -1, totalPrice: -1, collectDate: Date_NULL, amountInStock: -1, amountAvailable: -1 },
    ]
};

/**
 * 
 */
interface Props {

}

/**
 * 
 * @param props 
 * @returns 
 */
export default function View({}: Props) {

    const [state, dispatch] = useStateReducer(INITIAL_STATE);
    const ref = useRef<TableRef>({ getSelected: () => "" });
    
    console.log("render view: " + ref.current);

    return (
        <>
            <MenuBar/>
            <ToolBar/>
            
             <InputGroup className='m-1'>
                <Form.Control placeholder="Search..."/>
                <Button variant="outline-secondary">Search</Button>
            </InputGroup>
            <TaskTable 
                ref={ref}
                rows={state.rows}
                onChange={e => console.log(`changed: ${e.target} to ${e.value}, id: ${e.id}`)}
                //onSelect={id => ref.current = id}
            />

            <PartModal/>
            <br></br>
            <Button variant="primary" onClick={e => dispatch({ type: "ADD", id: ref.current.getSelected(), payload: { type: "task", rowID: uuidv4(), title: "New Task", staffID: "P2", instructionTime: TimeSpan_NULL, clockedTime: TimeSpan_NULL, amount: -1, unitPrice: -1, discount: -1, totalPrice: -1, collectDate: Date_NULL, amountInStock: -1, amountAvailable: -1 }})}>Add Task</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "ADD", id: ref.current.getSelected() })}>Add Part</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "ADD", id: ref.current.getSelected() })}>Add Work</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "ADD", id: ref.current.getSelected(), payload: { type: "comment", rowID: uuidv4(), title: "New Task", staffID: "P2", instructionTime: TimeSpan_NULL, clockedTime: TimeSpan_NULL, amount: -1, unitPrice: -1, discount: -1, totalPrice: -1, collectDate: Date_NULL, amountInStock: -1, amountAvailable: -1 }})}>Add Text</Button>
            <br></br>
            <Button variant="primary" onClick={e => dispatch({ type: "DELETE", id: ref.current.getSelected() })}>Delete</Button>
            <br></br>
            <Button variant="primary" onClick={e => dispatch({ type: "MOVE_UP", id: ref.current.getSelected() })}>Move Up</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "MOVE_DOWN", id: ref.current.getSelected() })}>Move Down</Button>
        </>
    );
}