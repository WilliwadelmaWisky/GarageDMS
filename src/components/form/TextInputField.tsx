import { useInputField } from "./InputField.hooks";

/**
 * 
 */
interface TextInputFieldProps {
    value: string;
    onChange?: (value: string) => void;
    onReturn?: (value: string) => void;
    disabled?: boolean;
    maxLen?: number;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TextInputField({ 
    value,
    onChange = function() {},
    onReturn = function() {},
    disabled = false,
    maxLen = 100,
}: TextInputFieldProps) {

    const { state, dispatch } = useInputField();


    /**
     * 
     * @param e 
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ ACTION_TYPE: "UPDATE", value: e.target.value });
        onChange(e.target.value);
    } 

    /**
     * 
     * @param e 
     */
    const handleKeyUp = (e: React.KeyboardEvent) => {
        console.log("onReturn: ", e.key);
        if (e.key !== "Enter") { return; }

        onReturn(state.value);
    }


    return (
        <input 
            type="text" 
            value={value}
            disabled={disabled}
            maxLength={maxLen}
            onChange={handleChange}
            onFocus={() => dispatch({ ACTION_TYPE: "FOCUS", value: value })}
            onBlur={() => dispatch({ ACTION_TYPE: "UNFOCUS" })}
            onKeyUp={handleKeyUp}
        />
    );
}