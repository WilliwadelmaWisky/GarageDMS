/**
 * 
 */
interface Props {
    type: React.HTMLInputTypeAttribute,
    value: string | number | Readonly<string[]>,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

/**
 * 
 * @param props 
 * @returns 
 */
export default function TableInputCellElement({ type, value, onChange }: Props) {
    return (
        <td>
            <input 
                type={type} 
                value={value}
                onChange={onChange}
            />
        </td>
    );
}
