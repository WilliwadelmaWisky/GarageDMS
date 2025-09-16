import { useImperativeHandle, useState } from 'react';
import { TableContext } from './table.hooks';
import type { TableCellData, TableColumnData, TableData, TableRef, TableRowData, Filter } from './table.types';
import TableHead from './TableHead';
import TableRow from './TableRow';
import '@assets/css/table/table.css';


/**
 * 
 */
interface State {
    selection: string[];
}

/**
 * 
 */
const INITIAL_STATE: State = {
    selection: [],
}


/**
 * 
 */
interface TableProps<T extends TableCellData> {
    columns: TableColumnData[];
    data: TableData<T>;
    onChange: () => void;
    filters?: Filter<TableRowData<T>>[];
    ref?: React.RefObject<TableRef>;
}

/**
 * @param props ...
 */
export default function Table<T extends TableCellData>({ columns, data, onChange, filters, ref }: TableProps<T>) {

    const [state, setState] = useState<State>(INITIAL_STATE);

    useImperativeHandle(ref, () => ({
        getSelection: () =>  state.selection,
        setSelection: (selection) => setState({ ...state, selection: selection })
    }));

    const filteredRows =  data.rows.filter(row => filters === undefined || filters.some(f => f.match(row)));

    return (
        <TableContext.Provider 
            value={{ 
                columns: columns,
                selection: state.selection, 
                setSelection: (selection) => setState({ ...state, selection: selection })
            }}
        >
            <table className='table table-bordered table-striped table-hover'>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <TableHead key={col.id} column={col}/>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.map(row => (
                        <TableRow key={row.id} row={row} onChange={onChange}/>
                    ))}
                </tbody>
            </table>
        </TableContext.Provider>
    )
}

