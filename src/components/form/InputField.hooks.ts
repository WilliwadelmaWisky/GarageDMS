import { useReducer } from "react";

/**
 * 
 */
interface State {
    value: string;
    isFocused: boolean;
}

/**
 * 
 */
interface FocusAction {
    ACTION_TYPE: "FOCUS";
    value: string;
}

/**
 * 
 */
interface UnfocusAction {
    ACTION_TYPE: "UNFOCUS";
}

/**
 * 
 */
interface UpdateAction {
    ACTION_TYPE: "UPDATE";
    value: string;
}

/**
 * 
 */
type Action = FocusAction | UnfocusAction | UpdateAction;

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function reducer(state: State, action: Action): State {
    switch (action.ACTION_TYPE) {
        case "FOCUS":
            return { 
                ...state, 
                isFocused:  true, 
                value:      action.value,
            };
        case "UNFOCUS":
            return { 
                ...state, 
                isFocused:  false, 
                value:      "",
            };
        case "UPDATE":
            return { 
                ...state, 
                value:      action.value ,
            };
    }
}

/**
 * 
 * @returns 
 */
export function useInputField() {
    const [state, dispatch] = useReducer(reducer, { value: "", isFocused: false });

    return { state, dispatch };
}