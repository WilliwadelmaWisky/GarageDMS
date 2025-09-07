import { useTableContext } from "@hooks/useTableContext";
import TableData from "./TableData";
import type { TableCellData, TableRowData } from "@dtypes/table";

/**
 * 
 */
interface TableRowProps<T extends TableCellData> {
    row: TableRowData<T>;
    onChange: () => void;
    className?: string;
}

/**
 * 
 * @param props
 * @returns 
 */
export default function TableRow<T extends TableCellData>({ row, onChange, className }: TableRowProps<T>) {

    const { columns, selection, setSelection } = useTableContext();

    const isActive = selection.findIndex(selectedID => selectedID === row.id) !== -1;

    const handleDoubleClick = (e: React.MouseEvent) => {
        console.log(e);
    }

    const handleClick = (e: React.MouseEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) { return; }

        if (e.ctrlKey) { console.log("control was hold down, not impl"); }
        else if (e.shiftKey) { console.log("shift was hold down, not impl"); }
        else { setSelection([ row.id ]); }
    }

    return (
        <tr
            onDoubleClick={handleDoubleClick}
            onClick={handleClick} 
            className={isActive ?  `table-primary ${className}` : className}
        >
            {columns.map(col => (
                <TableData cell={row.cells.find(cell => cell.col === col.id)!} onChange={onChange}/>
            ))}
        </tr>
    );
}