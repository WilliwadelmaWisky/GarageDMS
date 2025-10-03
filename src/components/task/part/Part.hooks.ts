import { findPartsByTask, generatePartID, type Part } from "@dtypes/task/part/part";
import { useImperativeHandle, useReducer, useRef, useState } from "react";

/**
 * 
 */
export type Label = "amount" | "cost" | "discount" | "total";

/**
 * 
 * @param label 
 * @returns 
 */
export function labelDisplayName(label: Label): string {
    switch (label) {
        case "amount":   return "AMOUNT";
        case "cost":     return "COST ($)";
        case "discount": return "DISCOUNT (%)";
        case "total":    return "TOTAL ($)";
    }
}


/**
 * 
 */
export interface PartChangeEvent {
    EVENT_TYPE: "CHANGE";
    partID: string;
    amount: number;
    cost: number;
    discount: number;
}

/**
 * 
 */
export interface PartDeleteEvent {
    EVENT_TYPE: "DELETE";
    partID: string;
}

/**
 * 
 */
export interface PartAddEvent {
    EVENT_TYPE: "ADD";
    partID: string;
    itemID: string;
    amount: number;
    cost: number;
    discount: number;
}

/**
 * 
 */
type PartEvent = PartChangeEvent | PartDeleteEvent | PartAddEvent;

/**
 * 
 */
export interface PartListChangeEvent {
    targets: PartEvent[];
    deltaTotal: number;
}


/**
 * 
 */
interface WrapperState {
    parts: Part[];
}

/**
 * 
 * @param taskID 
 * @returns
 */
export function usePartWrapperState(taskID: string) {

    const [state, setState] = useState<WrapperState>(() => ({
        parts: findPartsByTask(taskID),
    }));


    return { parts: state.parts, setState };
}



/**
 * 
 */
export interface ModalRef {
    show: (part: Part | null, title: string, callback: (e: ModalEvent) => void) => void;
    hide: () => void;
    reset: () => void;
}

/**
 * 
 */
export interface ModalEvent {
    partID: string;
    itemID: string;
    amount: number;
    cost: number;
    discount: number;
}

interface ModalState {
    visible: boolean;
    title: string;
    partID: string;
    itemID: string;
    amount: number;
    cost: number;
    discount: number;
    itemCode: string;
    itemName: string;
    itemSupplier: string;
}

interface ModalShowAction {
    ACTION_TYPE: "SHOW";
    title: string;
    partID: string;
    itemID: string;
    amount: number;
    cost: number;
    discount: number;
}

interface ModalHideAction {
    ACTION_TYPE: "HIDE";
}

interface ModalResetAction {
    ACTION_TYPE: "RESET";
}

interface ModalTargetUpdateAction {
    ACTION_TYPE: "TARGET_UPDATE";
    amount: number;
    cost: number;
    discount: number;
}

interface ModalTargetChangeAction {
    ACTION_TYPE: "TARGET_CHANGE";
    itemCode: string;
}

type ModalAction = ModalShowAction | ModalHideAction | ModalResetAction | ModalTargetUpdateAction | ModalTargetChangeAction;

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function reducer(state: ModalState, action: ModalAction): ModalState {
    switch (action.ACTION_TYPE) {
        case "SHOW":
            return {
                visible:        true,
                title:          action.title,
                partID:         action.partID,
                itemID:         action.itemID,
                amount:         action.amount,
                cost:           action.cost,
                discount:       action.discount,
                itemCode:       "",
                itemName:       "",
                itemSupplier:   "",
            };
        case "HIDE":
            return {
                ...state,
                visible:        false,
            };
        case "RESET":
            return {
                ...state,
                partID:         generatePartID(),
                itemID:         "",
                amount:         1,
                cost:           0,
                discount:       0,
                itemCode:       "",
                itemName:       "",
                itemSupplier:   "",
            }
        case "TARGET_UPDATE":
            return {
                ...state,
                amount:         action.amount,
                cost:           action.cost,
                discount:       action.discount,
            };
        case "TARGET_CHANGE":
            return {
                ...state,
                itemCode:       action.itemCode,
            };
    }
}

/**
 * 
 * @param ref 
 * @param initialState 
 * @returns
 */
export function useModal(ref: React.RefObject<ModalRef>) {

    const callbackRef = useRef<(e: ModalEvent) => void>(() => {});
    const [state, dispatch] = useReducer(reducer, { 
        visible:        false, 
        title:          "",
        partID:         "",
        itemID:         "",
        amount:         0,
        cost:           0,
        discount:       0,
        itemCode:       "",
        itemName:       "",
        itemSupplier:   "",
    });

    useImperativeHandle(ref, () => ({
        show(part, title, callback) { 
            callbackRef.current = callback;
            dispatch({
                ACTION_TYPE:    "SHOW",
                title:          title,
                partID:         part !== null ? part.partID     : generatePartID(),
                itemID:         part !== null ? part.itemID     : "",
                amount:         part !== null ? part.amount     : 1,
                cost:           part !== null ? part.cost       : 0,
                discount:       part !== null ? part.discount   : 0,
            }); 
        },
        hide() { 
            dispatch({ ACTION_TYPE: "HIDE" }); 
        },
        reset() {
            dispatch({ ACTION_TYPE: "RESET" });
        },
    }));

    return { state, dispatch, callbackRef };
}