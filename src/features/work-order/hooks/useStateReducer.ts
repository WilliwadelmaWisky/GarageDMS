import { useReducer } from "react";
import { insertRange, last, deleteBy, moveupBy, movedownBy, replaceBy } from "@utils/array-util";
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
    type: "ADD" | "DELETE" | "MOVE_UP" | "MOVE_DOWN" | "SET";
    targetID: string | string[];
    payload?: Row | Row[];
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
            const insertRows = Array.isArray(action.payload) ? action.payload : [ action.payload ];
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
            
            const moveupTargetIDs = Array.isArray(action.targetID) ? action.targetID : [ action.targetID ];
            const isFirstTaskMoveUpError = moveupTargetIDs.includes(state.rows[0].rowID);

            if (isFirstTaskMoveUpError) {
                return state;
            }

            const isInvalidMoveUpError = state.rows.length > 1 && moveupTargetIDs.includes(state.rows[1].rowID) && state.rows[1].type !== "task";

            if (isInvalidMoveUpError) {
                return state;
            }

            return { ...state, rows: moveupBy(state.rows, row => moveupTargetIDs.includes(row.rowID)) }
            
        case "MOVE_DOWN":
            
            const movedownTargetIDs = Array.isArray(action.targetID) ? action.targetID : [ action.targetID ];
            const isLastTaskMoveDownError = movedownTargetIDs.includes(state.rows[state.rows.length - 1].rowID);

            if (isLastTaskMoveDownError) {
                return state;
            }

            return { ...state, rows: movedownBy(state.rows, row => movedownTargetIDs.includes(row.rowID)) }

        case "SET":

            if (action.payload === undefined) {
                return state;
            }

            const modifiedRows = Array.isArray(action.payload) ? action.payload : [ action.payload ];
            const mapper = (row: Row) => modifiedRows.find(modifiedRow => modifiedRow.rowID === row.rowID);
            return { ...state, rows: replaceBy(state.rows, mapper) }
    }
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