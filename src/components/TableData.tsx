import type { TableCellData } from "@dtypes/table";
import { useTableContext } from "@hooks/useTableContext";

/**
 * 
 */
interface TableDataProps<T extends TableCellData> {
    cell: T;
    onChange: () => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TableData<T extends TableCellData>({ cell, onChange }: TableDataProps<T>) {

    const { columns } = useTableContext();

    const column = columns.find(col => col.id === cell.col)!;

    return (
        <td>
            {column.render(cell.value, onChange)}
        </td>
    );
}