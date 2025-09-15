import { useReducer } from "react";

/**
 * 
 */
interface ModalState<T> {
    visible: boolean;
    data?: T;
}

/**
 * 
 */
interface Action<T> {
    type: "HIDE" | "SHOW";
    payload?: T;
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function reducer<T>(state: ModalState<T>, action: Action<T>): ModalState<T> {
    switch (action.type) {
        case "HIDE":
            return { visible: false, data: undefined };
        case "SHOW":
            if (action.payload === undefined) {
                return state;
            }

            const payloadClone = { ...action.payload };
            return { visible: true, data: payloadClone };
    }
}

/**
 * 
 * @param initial 
 */
export default function useModal<T>(initial: ModalState<T>): [ModalState<T>, React.ActionDispatch<[action: Action<T>]>] {

    const [state, dispatch] = useReducer(reducer, initial);

    return [state, dispatch];
}