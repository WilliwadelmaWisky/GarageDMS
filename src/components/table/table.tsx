import { createContext, useContext, useImperativeHandle, useState } from 'react';
import './table.css';

/**
 * 
 */
interface TableContext {
    active: string,
    setActive: (s: string) => void;
}

/**
 * 
 */
const TableContext = createContext<TableContext | undefined>(undefined);

/**
 * 
 * @returns 
 */
const useTableContext = () => {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error("useTableContext should be used in-scope of the Table component");
    }

    return context;
};


/**
 * 
 */
export interface TableRef {
    getSelected: () => string;
}


/**
 * 
 */
interface TableProps {
    headers: string[];
    children: React.ReactNode | React.ReactNode[];
    ref?: React.RefObject<TableRef>
}

/**
 * @param props ...
 */
export default function Table({ headers, ref, children }: TableProps) {

    const [active, setActive] = useState<string>("");

    useImperativeHandle(ref, () => ({
        getSelected: () => {
            return active;
        }
    }));

    return (
        <TableContext.Provider value={{ active, setActive }}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {headers.map((title, index) => (
                            <th 
                                key={index}
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
                                {title.toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </TableContext.Provider>
    )
}


/**
 * 
 */
interface RowProps {
    id: string;
    onEdit?: () => void;
    className?: string;
    children: React.ReactNode[] | React.ReactNode;
}

/**
 * 
 * @param props
 * @returns 
 */
function Row({ id, onEdit, className, children }: RowProps) {

    const { active, setActive } = useTableContext();

    const isActive = active === id;

    return (
        <tr
            onDoubleClick={e => {
                if (onEdit !== undefined)
                    onEdit();
            }}
            onClick={e => {
                if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) { return; }
                setActive(id);
            }} 
            className={isActive ? "selected" : ""}
        >
            <th 
                style={{ minWidth: "4em", width: "4em", textAlign: "center"}}
            ></th>
            {children}
        </tr>
    );
}


/**
 * 
 */
interface LabelProps {
    value: string,
    className?: string
}

/**
 * 
 * @param props 
 * @returns 
 */
function Label({ value, className }: LabelProps) {

    return (
        <td className={className}>
            <p>{value}</p>
        </td>
    );
}


/**
 * 
 */
interface InputProps {
    type: React.HTMLInputTypeAttribute;
    value: string | number | Readonly<string[]>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

/**
 * 
 * @param props 
 * @returns 
 */
function Input({ type, value, onChange, className }: InputProps) {

    const {} = useTableContext();

    return (
        <td>
            <input 
                type={type} 
                value={value}
                onChange={onChange}
                className={className}
            />
        </td>
    );
}


/**
 * 
 */
interface SelectProps {
    allOptions: Readonly<string[]>;
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    className?: string;
}

/**
 * 
 * @param props 
 * @returns 
 */
function Select({ allOptions, value, onChange, className }: SelectProps) {
    return (
        <td>
            <select 
                value={value}
                onChange={onChange}
                className={className}
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

Table.Row = Row;
Table.Label = Label;
Table.Input = Input;
Table.Select = Select;
