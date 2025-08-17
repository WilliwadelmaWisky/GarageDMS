import { useReducer } from "react";
import TaskTable from "./task-table";
import type { Task } from "../types/task";
import MenuBar from "./menubar";
import ToolBar from "./toolbar";
import { NULL as Date_NULL} from "@datatypes/date";
import { of } from "@utils/timespan-util";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

interface Action {
    type: "ADD_TASK" | "DELETE_TASK" | "ADD_CONTENT" | "DELETE_CONTENT" | "SET_SELLER",
    taskIndex?: number
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function reducer(state: State, action: Action): State {
    console.log("dispatch called");

    function getIndex<T>(index: number, arr: Array<T>): number { return index < 0 ? arr.length + index : index; }

    const taskIndex: number = action.taskIndex 
        ? action.taskIndex 
        : getIndex(-1, state.Tasks);

    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                Tasks: [
                    ...state.Tasks.slice(0, taskIndex),
                    { Title: "New Task", SellerID: "P2", IsInvoiced: false, Contents: [] },
                    ...state.Tasks.slice(taskIndex)
                ]
            }
        case "DELETE_TASK":
            return {
                ...state,
                Tasks: [ 
                    ...state.Tasks.slice(0, taskIndex),
                    ...state.Tasks.slice(taskIndex + 1)
                ]
            }
        case "ADD_CONTENT":
            return {
                ...state,
                Tasks: [
                    ...state.Tasks.slice(0, taskIndex),
                    {
                        ...state.Tasks[taskIndex],
                        Contents: [
                            ...state.Tasks[taskIndex].Contents,
                            { Type: "text", SellerID: "P2", Text: "New Content" }
                        ]
                    },
                    ...state.Tasks.slice(taskIndex + 1),
                ]
            }
        case "SET_SELLER":
            break;
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
            />

            <Button variant="primary" onClick={e => dispatch({ type: "ADD_TASK", taskIndex: 0 })}>Add Task</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "DELETE_TASK", taskIndex: 0 })}>Delete Task</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "ADD_CONTENT" })}>Add Content</Button>
        </>
    );
}