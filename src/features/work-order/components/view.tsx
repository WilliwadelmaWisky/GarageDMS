import { useReducer } from "react";
import TaskTable from "./task-table";
import type { Content, Task } from "../types/task";
import MenuBar from "./menubar";
import ToolBar from "./toolbar";
import { NULL as Date_NULL} from "@datatypes/date";
import { of } from "@utils/timespan-util";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { normalizeIndex } from "@utils/array-util";

/**
 * 
 */
interface State {
    ID: number,
    Type: "offer" | "contract",
    Tasks: Task[]
};

const INITIAL_STATE: State = {
    ID: -1,
    Type: "offer",
    Tasks: [
        { Title: "5. Year Service", SellerID: "P1", IsInvoiced: false, Contents: [
            { Type: "text", SellerID: "P1", Text: "Price: $500" },
            { Type: "work", SellerID: "P1", MechanicID: "P2", Description: "Oil Change", InstructionTime: of(1, 0, 0), ClockedTime: of(0, 0, 0), Discount: 0, UnitPrice: 100 },
            { Type: "part", SellerID: "P1", PartID: "5w30", Amount: 5.3, Discount: 0, UnitPrice: 20, CollectDate: Date_NULL },
            { Type: "part", SellerID: "P1", PartID: "1234567", Amount: 1, Discount: 0, UnitPrice: 25, CollectDate: Date_NULL }
        ]},
        { Title: "6. Year Service", SellerID: "P1", IsInvoiced: false, Contents: [
            { Type: "text", SellerID: "P1", Text: "Price: $500" },
            { Type: "work", SellerID: "P1", MechanicID: "P2", Description: "Oil Change", InstructionTime: of(1, 0, 0), ClockedTime: of(0, 0, 0), Discount: 0, UnitPrice: 100 },
            { Type: "part", SellerID: "P1", PartID: "5w30", Amount: 5.3, Discount: 0, UnitPrice: 20, CollectDate: Date_NULL },
            { Type: "part", SellerID: "P1", PartID: "1234567", Amount: 1, Discount: 0, UnitPrice: 25, CollectDate: Date_NULL }
        ]},
        { Title: "7. Year Service", SellerID: "P1", IsInvoiced: false, Contents: [
            { Type: "text", SellerID: "P1", Text: "Price: $500" },
        ]},
        { Title: "8. Year Service", SellerID: "P1", IsInvoiced: false, Contents: [
            { Type: "text", SellerID: "P1", Text: "Price: $500" },
        ]}
    ]
};

/**
 * 
 */
interface Action {
    type: "ADD_TASK" | "DELETE_TASK" | "MOVE_UP_TASK" | "MOVE_DOWN_TASK"
        | "ADD_CONTENT" | "DELETE_CONTENT" | "MOVE_UP_CONTENT" | "MOVE_DOWN_CONTENT"
        | "SET" | "SET_SELLER",
    taskIndex?: number,
    contentIndex?: number,
    payload?: Task | Content
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function reducer(state: State, action: Action): State {

    console.log("dispatch called");

    // Normalize taskIndex to be between 0 and array.len - 1
    const taskIndex: number = normalizeIndex(action.taskIndex !== undefined ? action.taskIndex : -1, state.Tasks);
    const contentIndex: number = normalizeIndex(action.contentIndex !== undefined ? action.contentIndex : -1, state.Tasks[taskIndex].Contents);

    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                Tasks: [
                    ...state.Tasks.slice(0, taskIndex + 1),
                    { Title: "New Task", SellerID: "P2", IsInvoiced: false, Contents: [] },
                    ...state.Tasks.slice(taskIndex + 1)
                ]
            }
        case "DELETE_TASK":
            if (state.Tasks.length <= 1) {
                return state;
            }

            return {
                ...state,
                Tasks: [ 
                    ...state.Tasks.slice(0, taskIndex),
                    ...state.Tasks.slice(taskIndex + 1)
                ]
            }
        case "MOVE_UP_TASK":
            if (taskIndex === 0) {
                return state;
            }

            return {
                ...state,
                Tasks: [
                    ...state.Tasks.slice(0, taskIndex - 1),
                    state.Tasks[taskIndex],
                    state.Tasks[taskIndex - 1],
                    ...state.Tasks.slice(taskIndex + 1)
                ]
            }
        case "MOVE_DOWN_TASK":
            if (taskIndex === state.Tasks.length - 1) {
                return state;
            }

            return {
                ...state,
                Tasks: [
                    ...state.Tasks.slice(0, taskIndex),
                    state.Tasks[taskIndex + 1],
                    state.Tasks[taskIndex],
                    ...state.Tasks.slice(taskIndex + 2)
                ]
            }
        case "SET_SELLER":
            break;
        case "ADD_CONTENT":
            return {
                ...state,
                Tasks: [
                    ...state.Tasks.slice(0, taskIndex),
                    {
                        ...state.Tasks[taskIndex],
                        Contents: [
                            ...state.Tasks[taskIndex].Contents.slice(0, contentIndex + 1),
                            { Type: "text", SellerID: "P2", Text: "New Content" },
                            ...state.Tasks[taskIndex].Contents.slice(contentIndex + 1),
                        ]
                    },
                    ...state.Tasks.slice(taskIndex + 1),
                ]
            }
    }
    
    return state;
}

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

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    
    console.log("render view");

    return (
        <>
            <MenuBar/>
            <ToolBar/>
             <InputGroup className='m-1'>
                <Form.Control placeholder="Search..."/>
                <Button variant="outline-secondary">Search</Button>
            </InputGroup>
            <TaskTable 
                tasks={state.Tasks}
                onChange={e => console.log(`changed: ${e.target} to ${e.value}, taskIndex: ${e.taskIndex}, contentIndex: ${e.contentIndex}`)}
            />

            <Button variant="primary" onClick={e => dispatch({ type: "ADD_TASK", taskIndex: 0 })}>Add Task</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "DELETE_TASK", taskIndex: 0 })}>Delete Task</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "MOVE_UP_TASK", taskIndex: 2 })}>Moveup Task</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "MOVE_DOWN_TASK", taskIndex: 2 })}>Movedown Task</Button>

            <Button variant="primary" onClick={e => dispatch({ type: "ADD_CONTENT", taskIndex: 0 })}>Add Content</Button>
        </>
    );
}