
interface TextInputFieldProps {
    value: string;
}

export default function TextInputField({ value }: TextInputFieldProps) {




    return <input type="text" value={value}/>;
}