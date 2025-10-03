import { clamp } from "@utils/math-util";
import { useInputField } from "./InputField.hooks";

/**
 * 
 */
interface NumberInputFieldProps {
    value: number;
    onChange?: (value: number) => void;
    onReturn?: (value: number) => void;
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
    onReturn = function() {},
    min = Number.MIN_SAFE_INTEGER, 
    max = Number.MAX_SAFE_INTEGER, 
    decimalCount = 2,
    disabled = false,
}: NumberInputFieldProps) {

    const { state, dispatch } = useInputField();
    const allowNegatives = min < 0;

    /**
     * 
     * @param e 
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || (e.target.value === "-" && allowNegatives)) {
            dispatch({ ACTION_TYPE: "UPDATE", value: e.target.value });
            onChange(0);
            return;
        }

        const pattern = new RegExp(`^[\-]?([0]{1}|[1-9]{1}[0-9]{0,8}){1}([\.]{1}[0-9]{0,${Math.floor(decimalCount)}})?$`);
        if (pattern.test(e.target.value)) {
            const valueNumber = Number.parseFloat(e.target.value);
            const clampedValueNumber = clamp(valueNumber, min, max);
            const payload = value > clampedValueNumber ? numberToString(clampedValueNumber) : e.target.value;
            dispatch({ ACTION_TYPE: "UPDATE", value: payload });
            onChange(clampedValueNumber);
        }
    }

    /**
     * 
     * @param e 
     */
    const handleKeyUp = (e: React.KeyboardEvent) => {
        console.log("onReturn: ", e.key);
        if (e.key !== "Enter") { return; }

        const valueNumber = Number.parseFloat(state.value);
        onReturn(valueNumber);
    }

    return (
        <input 
            type="text" 
            value={state.isFocused ? state.value : value}
            disabled={disabled}
            onChange={handleChange}
            onFocus={() => dispatch({ ACTION_TYPE: "FOCUS", value: numberToString(value) })} 
            onBlur={() => dispatch({ ACTION_TYPE: "UNFOCUS" })}
            onKeyUp={handleKeyUp}
        />
    );
}

/**
 * 
 * @param n 
 * @returns 
 */
function numberToString(n: number) {
    return n.toString();
} 
