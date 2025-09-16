import { useImperativeHandle, useReducer } from "react";

/**
 * 
 */
export interface ModalRef<T> {
    show: (data: T) => void;
    hide: () => void;
}

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
    type: "HIDE" | "SHOW" | "MODIFY";
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
        case "MODIFY":
            if (action.payload === undefined) {
                return state;
            }

            return { visible: true, data: action.payload };
    }
}

/**
 * 
 * @param initial 
 */
export function useModal<T>(ref: React.RefObject<ModalRef<T>>, initial: ModalState<T>): [ModalState<T>, React.ActionDispatch<[action: Action<T>]>] {

    const [state, dispatch] = useReducer(reducer, initial);

    useImperativeHandle(ref, () => ({
        show(data: T) { dispatch({ type: "SHOW", payload: data }); },
        hide() { dispatch({ type: "HIDE" }); },
    }));

    return [state, dispatch];
}