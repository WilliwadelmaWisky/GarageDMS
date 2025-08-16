
/**
 * 
 * @param param0 
 * @returns 
 */
export function TableHeaderItem({ element }: TableHeaderItemProps) {

    return (
        <th 
            onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const EDGE_THRESHOLD = 10;
                const isOnEdge = offsetX <= EDGE_THRESHOLD || offsetX >= rect.width - EDGE_THRESHOLD;

                e.currentTarget.style.cursor = isOnEdge ? "col-resize": "text";
            }}
            onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const EDGE_THRESHOLD = 10;
                const isOnEdge = offsetX <= EDGE_THRESHOLD || offsetX >= rect.width - EDGE_THRESHOLD;

                if (isOnEdge) {
                    console.log("valid click");
                }
            }}
        >
            {element.toUpperCase()}
        </th>
    );
}

interface TableHeaderItemProps {
    element: string,

}

export function TableBodyEmptyItem() {
    return null;
}

export function TableBodyLabelItem({ value }: TableBodyLabelItemProps) {

    return (
        <td>
            {value}
        </td>
    );
}

interface TableBodyLabelItemProps {
    value: string
}

export function TableBodyInputItem({ type, value, onChange }: TableBodyInputItemProps) {
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

interface TableBodyInputItemProps {
    type: React.HTMLInputTypeAttribute,
    value: string | number | Readonly<string[]>,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export function TableBodySelectItem({ allOptions, value, onChange }: TableBodySelectItemProps) {
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

interface TableBodySelectItemProps {
    allOptions: Readonly<string[]>,
    value: string,
    onChange: React.ChangeEventHandler<HTMLSelectElement>
}