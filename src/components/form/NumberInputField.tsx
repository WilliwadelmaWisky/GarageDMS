import { clamp } from "@utils/math-util";
import { useReducer } from "react";

/**
 * 
 */
interface InputFieldState {
    value: string;
    isFocused: boolean;
}

/**
 * 
 */
interface Action {
    type: "FOCUS" | "UNFOCUS" | "UPDATE";
    payload?: string;
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function reducer(state: InputFieldState, action: Action): InputFieldState {
    switch (action.type) {
        case "FOCUS":
            return { ...state, isFocused: true, value: action.payload! };
        case "UNFOCUS":
            return { ...state, isFocused: false, value: "" };
        case "UPDATE":
            return { ...state, value: action.payload! };
    }
}

/**
 * 
 */
interface NumberInputFieldProps {
    value: number;
    onChange?: (value: number) => void; 
    min?: number;
    max?: number;
    decimalCount?: number; 
    disabled?: boolean;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function NumberInputField({ 
    value, 
    onChange = function() {}, 
    min = Number.MIN_SAFE_INTEGER, 
    max = Number.MAX_SAFE_INTEGER, 
    decimalCount = 2,
    disabled
}: NumberInputFieldProps) {

    const [state, dispatch] = useReducer(reducer, { value: "", isFocused: false });

    const numberToString = (n: number) => n.toString();
    const allowNegatives = min < 0;

    /**
     * 
     * @param e 
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || (e.target.value === "-" && allowNegatives)) {
            dispatch({ type: "UPDATE", payload: e.target.value });
            onChange(0);
            return;
        }

        const pattern = new RegExp(`^[\-]?([0]{1}|[1-9]{1}[0-9]{0,8}){1}([\.]{1}[0-9]{0,${Math.floor(decimalCount)}})?$`);
        if (pattern.test(e.target.value)) {
            const valueNumber = Number.parseFloat(e.target.value);
            const clampedValueNumber = clamp(valueNumber, min, max);
            const payload = value > clampedValueNumber ? numberToString(clampedValueNumber) : e.target.value;
            dispatch({ type: "UPDATE", payload: payload });
            onChange(clampedValueNumber);
        }
    }

    return (
        <input 
            type="text" 
            value={state.isFocused ? state.value : value}
            disabled={disabled}
            onChange={handleChange}
            onFocus={() => dispatch({ type: "FOCUS", payload: numberToString(value) })} 
            onBlur={() => dispatch({ type: "UNFOCUS" })}
        />
    );
}