import { useReducer } from "react";
import { del, nextIndex, insert, movedown, moveup } from "@utils/array-util";
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
    id: string,
    payload?: Row
}


/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function reducer(state: State, action: Action): State {

    const index = state.rows.findIndex(row => row.rowID === action.id);
    if (index === -1) {
        return state;
    }

    switch (action.type) {
        case "ADD":
            if (action.payload === undefined) {
                return state;
            } 

            return { 
                ...state, 
                rows: insert(index + 1,  action.payload, state.rows)
            }

        case "DELETE":
            if (state.rows[index].type === "task") {
                const nextTaskIndex = nextIndex(index, state.rows, row => row.type === "task");
                const deleteCount = nextTaskIndex === -1 ? state.rows.length - index : nextTaskIndex - index;

                return {
                    ...state,
                    rows: del(index, deleteCount, state.rows)
                }
            }

            return {
                ...state,
                rows: del(index, 1, state.rows)
            }
            
        case "MOVE_UP":
            if (index === 0) {
                return state;
            }
            
            return {
                ...state,
                rows: moveup(index, state.rows)
            }
            
        case "MOVE_DOWN":
            if (index === state.rows.length - 1) {
                return state;
            }

            return {
                ...state,
                rows: movedown(index, state.rows)
            }

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