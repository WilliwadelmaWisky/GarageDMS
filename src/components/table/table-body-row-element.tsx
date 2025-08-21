/**
 * 
 */
interface Props {
    children: React.ReactNode[] | React.ReactNode,
    isSelected: boolean,
    onSelect: () => void,
    onEdit?: () => void
}

/**
 * 
 * @param props
 * @returns 
 */
export default function TableBodyRowElement({ children, isSelected, onSelect, onEdit }: Props) {

    return (
        <tr
            onDoubleClick={e => {
                if (onEdit !== undefined)
                    onEdit();
            }}
            onClick={e => {
                if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) { return; }
                onSelect();
            }} 
            className={isSelected ? "selected" : ""}
        >
            <th 
                style={{ minWidth: "4em", width: "4em", textAlign: "center"}}
            ></th>
            {children}
        </tr>
    );
}
