/**
 * 
 */
interface Props {
    allOptions: Readonly<string[]>,
    value: string,
    onChange: React.ChangeEventHandler<HTMLSelectElement>
}

/**
 * 
 * @param props 
 * @returns 
 */
export default function TableSelectCellElement({ allOptions, value, onChange }: Props) {
    return (
        <td>
            <select 
                value={value}
                onChange={onChange}
            >
                {allOptions.map((option, index) => (
                    <option 
                        key={index}
                        value={option}
                    >
                        {option.toUpperCase()}
                    </option>
                ))}
            </select>
        </td>
    );
}