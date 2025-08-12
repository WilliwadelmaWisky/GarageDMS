
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

export function TableBodyInputItem({ value, type }: TableBodyInputItemProps) {
    return (
        <td>
            <input type={type} value={value}/>
        </td>
    );
}

interface TableBodyInputItemProps {
    value: string | number | Readonly<string[]>,
    type: React.HTMLInputTypeAttribute
}

export function TableBodySelectItem({ values, selectedValue }: TableBodySelectItemProps) {
    return (
        <td>
            <select value={selectedValue}>
                {values.map((value, index) => (
                    <option 
                        key={index}
                        value={value}
                    >
                        {value.toUpperCase()}
                    </option>
                ))}
            </select>
        </td>
    );
}

interface TableBodySelectItemProps {
    values: readonly string[],
    selectedValue: string
}