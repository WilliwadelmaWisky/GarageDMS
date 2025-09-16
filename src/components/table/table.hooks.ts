import { createContext, useContext } from "react";
import type { TableColumnData } from "./table.types";

/**
 * 
 */
interface TableContext {
    columns: TableColumnData[];
    selection: string[];
    setSelection: (selection: string[]) => void;
}

/**
 * 
 */
export const TableContext = createContext<TableContext | undefined>(undefined);

/**
 * 
 * @returns 
 */
export const useTableContext = () => {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error("useTableContext should be used in-scope of the Table component");
    }

    return context;
};