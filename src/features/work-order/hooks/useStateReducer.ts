import { useReducer } from "react";
import { deleteRange, previousIndex, insert, movedown, moveup, nextIndex, insertRange, last, deleteBy } from "@utils/array-util";
import type { Row } from "../types/table-row";

/**
 * 
 */
export interface State {
    id: number,
    type: string,
    rows: Row[]
}

/**
 * 
 */
interface Action {
    type: "ADD" | "DELETE" | "MOVE_UP" | "MOVE_DOWN"
        | "SET_ALL" | "SET_SELLER",
    targetID: string | string[],
    payload?: Row | Row[]
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function reducer(state: State, action: Action): State {

    switch (action.type) {
        case "ADD":

            if (action.payload === undefined) {
                return state;
            }

            const targetID = Array.isArray(action.targetID) ? last(action.targetID) : action.targetID;
            const insertRows: Row[] = Array.isArray(action.payload) ? action.payload : [ action.payload ];
            const targetIndex = state.rows.findIndex(row => row.rowID === targetID);
            const insertIndex = targetIndex !== -1 ? targetIndex + 1 : state.rows.length;
            return { ...state, rows: insertRange(state.rows, insertIndex, insertRows) };

        case "DELETE":

            const deleteTargetIDs = Array.isArray(action.targetID) ? action.targetID : [ action.targetID ];
            const allTasksIDs = state.rows.filter(row => row.type === "task").map(task => task.rowID);
            const isAllTasksDeleteError = deleteBy(allTasksIDs, taskID => deleteTargetIDs.includes(taskID)).length === 0;
            
            if (isAllTasksDeleteError) {
                return state;
            }

            return { ...state, rows: deleteBy(state.rows, row => deleteTargetIDs.includes(row.rowID)) }
            
        case "MOVE_UP":
            // if (state.rows[insertIndex].type === "task") { 
            //     if (insertIndex === 0) {
            //         return state;
            //     }

            //     const by = insertIndex - previousIndex(insertIndex - 1, state.rows, row => row.type === "task");
            //     const nextTaskIndex = nextIndex(insertIndex + 1, state.rows, row => row.type === "task");
            //     const moveCount = nextTaskIndex === -1 ? state.rows.length - insertIndex : nextTaskIndex - insertIndex;

            //     return {
            //         ...state,
            //         rows: moveup(state.rows, insertIndex, moveCount, by)
            //     };
            // }

            // if (insertIndex <= 1) {
            //     return state;
            // }
            
            // return {
            //     ...state,
            //     rows: moveup(state.rows, insertIndex)
            // }
            return state;
            
        case "MOVE_DOWN":
            // if (state.rows[insertIndex].type === "task") {
            //     const tasks = state.rows.filter(row => row.type === "task");
            //     const tIndex = tasks.findIndex(task => state.rows[insertIndex].rowID === task.rowID);
            //     const isLastTask = tIndex === tasks.length - 1;
            //     if (isLastTask) {
            //         return state;
            //     }

            //     const nextTaskIndex = state.rows.findIndex(row => row.rowID === tasks[tIndex + 1].rowID);
            //     const count = nextTaskIndex - insertIndex;
            //     const by = (tIndex + 2 >= tasks.length) ? state.rows.length - nextTaskIndex : state.rows.findIndex(row => row.rowID === tasks[tIndex + 2].rowID) - nextTaskIndex;

            //     return {
            //         ...state,
            //         rows: movedown(state.rows, insertIndex, count, by)
            //     }
            // }

            // if (insertIndex === state.rows.length - 1) {
            //     return state;
            // }

            // return {
            //     ...state,
            //     rows: movedown(state.rows, insertIndex)
            // }
            return state;

        case "SET_SELLER":
            break;
    }
    
    return state;
}

/**
 * 
 * @param initialState 
 * @returns
 */
export function useStateReducer(initialState: State): [State, React.ActionDispatch<[action: Action]>] {

    const [state, dispatch] = useReducer(reducer, initialState);

    return [state, dispatch];
}