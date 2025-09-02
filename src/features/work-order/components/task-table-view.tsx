import { useRef } from "react";
import TaskTable from "./task-table";
import MenuBar from "./menubar";
import ToolBar from "./toolbar";
import Button from "react-bootstrap/Button";
import PartModal from "./modal";
import { v4 as uuidv4 } from "uuid";
import type { TableRef } from "@components/table/table";
import { useStateReducer, type State } from "../hooks/useStateReducer";
import { NULL as TimeSpan_NULL } from "@datatypes/timespan";
import { of as TimeSpan_of } from "@utils/timespan-util";
import { NULL as Date_NULL } from "@datatypes/date";
import { last } from "@utils/array-util";
import type { Row } from "../types/table-row";



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
export default function TaskTableView({}: Props) {

    const [state, dispatch] = useStateReducer(INITIAL_STATE);
    const ref = useRef<TableRef>({ getSelection: () => [], setSelection: () => {} });
    
    console.log("render view: " + ref.current);

    const add = (row: Row) => {
        const selectedID =  last(ref.current.getSelection());
        dispatch({ type: "ADD", targetID: selectedID, payload: row });
        ref.current.setSelection([ row.rowID ]);
    };

    return (
        <>
            <MenuBar/>
            <ToolBar/>
            
            <TaskTable 
                ref={ref}
                rows={state.rows}
                onElementChange={e => console.log(`changed: ${e.target} to ${e.value}, id: ${e.id}`)}
                onElementDoubleClick={() => console.log("double click")}
            />

            <PartModal/>
            <br></br>
            <Button 
                variant="primary" 
                onClick={() => { 
                    add({ type: "task", rowID: uuidv4(), title: "New Task", staffID: "P2", instructionTime: TimeSpan_NULL, clockedTime: TimeSpan_NULL, amount: -1, unitPrice: -1, discount: -1, totalPrice: -1, collectDate: Date_NULL, amountInStock: -1, amountAvailable: -1 });
                }}
            >Add Task</Button>
            <Button variant="primary" onClick={() => dispatch({ type: "ADD", targetID: last(ref.current.getSelection()), payload: { type: "part", rowID: uuidv4(), title: "New Part", staffID: "P2", instructionTime: TimeSpan_NULL, clockedTime: TimeSpan_NULL, amount: 1, unitPrice: 10, discount: 0, totalPrice: 10, collectDate: Date_NULL, amountInStock: 0, amountAvailable: 0 }})}>Add Part</Button>
            <Button variant="primary" onClick={() => dispatch({ type: "ADD", targetID: last(ref.current.getSelection()), payload: { type: "work", rowID: uuidv4(), title: "New Part", staffID: "P2", instructionTime: TimeSpan_of(1, 0, 0), clockedTime: TimeSpan_NULL, amount: -1, unitPrice: 100, discount: 0, totalPrice: 100, collectDate: Date_NULL, amountInStock: -1, amountAvailable: -1 } })}>Add Work</Button>
            <Button variant="primary" onClick={() => dispatch({ type: "ADD", targetID: last(ref.current.getSelection()), payload: { type: "comment", rowID: uuidv4(), title: "New Comment", staffID: "P2", instructionTime: TimeSpan_NULL, clockedTime: TimeSpan_NULL, amount: -1, unitPrice: -1, discount: -1, totalPrice: -1, collectDate: Date_NULL, amountInStock: -1, amountAvailable: -1 }})}>Add Text</Button>
            <br></br>
            <Button 
                variant="primary" 
                onClick={() => dispatch({ type: "DELETE", targetID: ref.current.getSelection() })}
            >Delete</Button>
            <br></br>
            <Button 
                variant="primary" 
                onClick={() =>  dispatch({ type: "MOVE_UP", targetID: ref.current.getSelection() })}
            >Move Up</Button>
            <Button 
                variant="primary" 
                onClick={() => dispatch({ type: "MOVE_DOWN", targetID: ref.current.getSelection() })}
            >Move Down</Button>
        </>
    );
}