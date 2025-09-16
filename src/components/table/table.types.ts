/**
 * 
 */
export interface TableRef {
    getSelection: () => string[];
    setSelection: (selection: string[]) => void;
}

/**
 * 
 */
export interface TableData<T extends TableCellData> {
    rows: TableRowData<T>[];
}

/**
 * 
 */
export interface TableColumnData {
    id: string;
    title: string;
    enableEditing?: boolean;
    enableSorting?: boolean;
    enableExpanding?: boolean;
    render: (value: string | number, onChange?: () => void) => React.ReactNode;
}

/**
 * 
 */
export interface TableRowData<T extends TableCellData> {
    id: string;
    cells: T[];
}

/**
 * 
 */
export interface TableCellData {
    col: string;
    value: string | number;
}

/**
 * 
 */
export interface Filter<T> {
    match: (target: T) => boolean;
}