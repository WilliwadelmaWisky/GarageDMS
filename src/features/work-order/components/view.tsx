import { useReducer, useRef, useState } from "react";
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
import PartModal from "./part-modal";

import { v4 as uuidv4 } from "uuid";
import type { TableRef } from "@components/table/table";

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
        { TaskID: uuidv4(), Title: "5. Year Service", SellerID: "P1", IsInvoiced: false, Contents: [
            { ID: uuidv4(), Type: "text", SellerID: "P1", Text: "Price: $500" },
            { ID: uuidv4(), Type: "work", SellerID: "P1", MechanicID: "P2", Description: "Oil Change", InstructionTime: of(1, 0, 0), ClockedTime: of(0, 0, 0), Discount: 0, UnitPrice: 100 },
            { ID: uuidv4(), Type: "part", SellerID: "P1", PartID: "5w30", Amount: 5.3, Discount: 0, UnitPrice: 20, CollectDate: Date_NULL },
            { ID: uuidv4(), Type: "part", SellerID: "P1", PartID: "1234567", Amount: 1, Discount: 0, UnitPrice: 25, CollectDate: Date_NULL }
        ]},
        { TaskID: uuidv4(), Title: "6. Year Service", SellerID: "P1", IsInvoiced: false, Contents: [
            { ID: uuidv4(), Type: "text", SellerID: "P1", Text: "Price: $500" },
            { ID: uuidv4(), Type: "work", SellerID: "P1", MechanicID: "P2", Description: "Oil Change", InstructionTime: of(1, 0, 0), ClockedTime: of(0, 0, 0), Discount: 0, UnitPrice: 100 },
            { ID: uuidv4(), Type: "part", SellerID: "P1", PartID: "5w30", Amount: 5.3, Discount: 0, UnitPrice: 20, CollectDate: Date_NULL },
            { ID: uuidv4(), Type: "part", SellerID: "P1", PartID: "1234567", Amount: 1, Discount: 0, UnitPrice: 25, CollectDate: Date_NULL }
        ]},
        { TaskID: uuidv4(), Title: "7. Year Service", SellerID: "P1", IsInvoiced: false, Contents: [
            { ID: uuidv4(), Type: "text", SellerID: "P1", Text: "Price: $500" },
        ]},
        { TaskID: uuidv4(), Title: "8. Year Service", SellerID: "P1", IsInvoiced: false, Contents: [
            { ID: uuidv4(), Type: "text", SellerID: "P1", Text: "Price: $500" },
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
    id: string,
    payload?: Task | Content
}

/**
 * 
 * @param id 
 * @param tasks 
 * @returns 
 */
function findIndecessByID(id: string, tasks: Task[]): [number, number] {
    const taskIndex = tasks.findIndex(task => task.TaskID === id);
    if (taskIndex !== -1) {
        return [taskIndex, -1];
    }

    for (const [index, task] of tasks.entries()) {
        const contentIndex = task.Contents.findIndex(content => content.ID === id);
        if (contentIndex !== -1) {
            return [index, contentIndex];
        }
    }

    return [-1, -1];
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function reducer(state: State, action: Action): State {

    const [taskIndex, contentIndex] = findIndecessByID(action.id, state.Tasks);
    console.log("dispatch called, taskIndex=" + taskIndex + " and contentIndex=" + contentIndex);

    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                Tasks: [
                    ...state.Tasks.slice(0, taskIndex + 1),
                    { TaskID: uuidv4(), Title: "New Task", SellerID: "P2", IsInvoiced: false, Contents: [] },
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
                            { ID: uuidv4(), Type: "text", SellerID: "P2", Text: "New Content" },
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
                tasks={state.Tasks}
                onChange={e => console.log(`changed: ${e.target} to ${e.value}, taskIndex: ${e.taskIndex}, contentIndex: ${e.contentIndex}`)}
                //onSelect={id => ref.current = id}
            />

            <PartModal/>

            <Button variant="primary" onClick={e => dispatch({ type: "ADD_TASK", id: ref.current.getSelected() })}>Add Task</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "DELETE_TASK", id: ref.current.getSelected() })}>Delete Task</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "MOVE_UP_TASK", id: ref.current.getSelected() })}>Moveup Task</Button>
            <Button variant="primary" onClick={e => dispatch({ type: "MOVE_DOWN_TASK", id: ref.current.getSelected() })}>Movedown Task</Button>

            <Button variant="primary" onClick={e => dispatch({ type: "ADD_CONTENT", id: ref.current.getSelected() })}>Add Content</Button>
        </>
    );
}