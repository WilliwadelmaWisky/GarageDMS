import React from 'react';
import Table, { type TableRef } from '@components/table/table'
import { toString as TimeSpan_toString } from '@utils/timespan-util';
import { toString as Date_toString } from '@utils/date-util';
import type { Row } from '../types/table-row';


const ALL_TABLE_HEADERS = ["type", "seller", "mechanic", "title", "i. time", "c, time", "amount", "unit price", "discount %", "total price", "collected", "amount in stock", "amount available"];
const ALL_SELLERS = ["P1", "P2", "P3"];

/**
 * 
 */
interface ChangeEvent {
    target: "SELLER" | "INSTRUCTION_TIME" | "AMOUNT" | "DISCOUNT" | "UNIT_PRICE" | "TOTAL_PRICE";
    value: string | number;
    id: string;
}


/**
 * 
 */
interface TaskTableProps {
    rows: Row[];
    onChange: (e: ChangeEvent) => void;
    ref?: React.RefObject<TableRef>;
}

/**
 * 
 * @param props ...
 */
export default function TaskTable({ rows, onChange, ref }: TaskTableProps) {

    console.log("render table");
    const tasks = rows.filter(row => row.type === "task")
    
    return (
        <>
            <Table 
                ref={ref}
                headers={ALL_TABLE_HEADERS}
            >
                {rows.map(row => (
                    <TaskRow 
                        key={row.rowID}
                        row={row} 
                        order={tasks.findIndex(task => task.rowID === row.rowID) + 1} 
                        sellers={ALL_SELLERS} 
                        onChange={onChange}
                    />
                ))}
            </Table>
            <p>Total Price</p>
        </>
    )
}


/**
 * 
 */
interface TaskRowProps {
    row: Row;
    order: number;
    sellers: string[];
    onChange: (e: ChangeEvent) => void;
}

/**
 * 
 * @param props 
 * @returns 
 */
function TaskRow({ row, order, sellers, onChange }: TaskRowProps) {
    return (
        <Table.Row 
            key={row.rowID}
            id={row.rowID}
            onEdit={() => {
                console.log("edit task");
            }}
        >
            {row.type === "task" ? <td/> : <Table.Label value={row.type.slice(0, 1).toLowerCase()}/>}
            <Table.Select allOptions={sellers} value={row.staffID} onChange={e => onChange({ target: "SELLER", value: e.target.value, id: row.rowID })}/>
            {row.type === "task" ? <Table.Label value={`JOB ${order}: ${row.title}`} className='highlight'/> : <Table.Label value={row.title}/>}
            {row.type === "work" ? <Table.Input type='number' value={TimeSpan_toString(row.instructionTime)} onChange={e => onChange({ target: "INSTRUCTION_TIME", value: e.target.value, id: row.rowID })}/> : <td/>}
            {row.type === "work" ? <Table.Label value={TimeSpan_toString(row.clockedTime)}/> : <td/>}
            {row.type === "part" ? <Table.Input type='number' value={row.amount} onChange={e => onChange({ target: "AMOUNT", value: e.target.value, id: row.rowID })}/> : <td/>}
            {row.type === "part" || row.type === "work" ? <Table.Input type='number' value={row.unitPrice} onChange={e => onChange({ target: "UNIT_PRICE", value: e.target.value, id: row.rowID })}/> : <td/>}
            {row.type === "part" || row.type === "work" ? <Table.Input type='number' value={row.discount * 100} onChange={e => onChange({ target: "DISCOUNT", value: e.target.value, id: row.rowID })}/> : <td/>}
            {row.type === "part" || row.type === "work" ? <Table.Input type='number' value={row.totalPrice} onChange={e => onChange({ target: "TOTAL_PRICE", value: e.target.value, id: row.rowID })}/> : <td/>}
            {row.type === "part" ? <Table.Label value={Date_toString(row.collectDate)}/> : <td/>}
            {row.type === "part" ? <Table.Label value='0'/> : <td/>}
            {row.type === "part" ? <Table.Label value='0'/> : <td/>}
        </Table.Row>
    );
}
