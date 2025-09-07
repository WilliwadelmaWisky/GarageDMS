// import React, { useState } from 'react';
// import Table, { type TableRef } from '@components/Table'
// import type { Row } from '../types/table-row';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { nextIndex } from '@utils/array-util';
// import type { TableCellData, TableColumnData, TableData, TableRowData } from '@dtypes/table';


// const ALL_TABLE_HEADERS = ["type", "staff", "title", "i. time", "c, time", "amount", "unit price", "discount %", "total price", "collect date", "amount in stock", "amount available"];
// const ALL_SELLERS = ["P1", "P2", "P3"];

// const COLUMNS: TableColumnData[] = [
//     {
//         id: "type",
//         title: "TYPE",
//         render(value: string | number) {
//             return <>{value}</>
//         },
//     },
//     {
//         id: "staff",
//         title: "STAFF",
//         render(value: string | number, onChange: () => void) {
//             return <input type='text' value={value} onChange={onChange}/>
//         },
//     },
//     {
//         id: "title",
//         title: "TITLE",
//         render(value: string | number) {
//             return <>{value}</>
//         },
//     }
// ];

// interface Cell extends TableCellData {

// }

// const DATA: TableData<Cell> = {
//     rows: [
//         { 
//             id: "1", 
//             cells: [
//                 {
//                     col: "type",
//                     value: 0
//                 }
//             ]
//         }
//     ]
// }

// /**
//  * 
//  */
// export interface ChangeEvent {
//     target: "SELLER" | "INSTRUCTION_TIME" | "AMOUNT" | "DISCOUNT" | "UNIT_PRICE" | "TOTAL_PRICE";
//     value: string | number;
//     id: string;
// }


// /**
//  * 
//  */
// interface TaskTableProps {
//     rows: Row[];
//     onElementChange: (e: ChangeEvent) => void;
//     onElementDoubleClick: (e: React.MouseEvent) => void;
//     ref: React.RefObject<TableRef>;
// }

// /**
//  * 
//  * @param props ...
//  */
// export default function TaskTable({ rows, onElementChange, onElementDoubleClick, ref }: TaskTableProps) {

//     const [filter, setFilter] = useState<string>("");

//     const totalPrice = rows.map(row => row.totalPrice).reduce((previousValue, currentValue) => previousValue + currentValue);
//     const tasks = rows.filter(row => row.type === "task");
    
//     console.log("render table");
    
//     return (
//         <>
//             <InputGroup className='m-1'>
//                 <Form.Control placeholder="Search..." value={filter} onChange={e => setFilter(e.target.value)}/>
//                 <Button variant="outline-secondary">Search</Button>
//             </InputGroup>
//             <Table 
//                 ref={ref}
//                 columns={ALL_TABLE_HEADERS}
//                 data={}
//                 onChange={}
//                 filters={[
//                     { 
//                         match(target: TableRowData<Cell>) {
//                             return filter === "" || (target.cells.find(cell => cell.col === "title")?.value as string).toLowerCase().includes(filter.toLowerCase())
//                         },
//                     }
//                 ]}
//             >
//                 {filteredRows.map(row => (
//                     <TaskRow 
//                         key={row.rowID}
//                         row={row} 
//                         order={tasks.findIndex(task => task.rowID === row.rowID) + 1} 
//                         sellers={ALL_SELLERS} 
//                         connectedRows={getConnectedRows(row)}
//                         onChange={onElementChange}
//                         onDoubleClick={onElementDoubleClick}
//                     />
//                 ))}
//             </Table>
//             <p>Total Price: ${totalPrice}</p>
//         </>
//     )
// }


// /**
//  * 
//  */
// interface TaskRowProps {
//     row: Row;
//     order: number;
//     sellers: string[];
//     connectedRows: Row[];
//     onChange: (e: ChangeEvent) => void;
//     onDoubleClick: (e: React.MouseEvent) => void;
// }

// /**
//  * 
//  * @param props 
//  * @returns 
//  */
// function TaskRow({ row, order, sellers, connectedRows, onChange, onDoubleClick }: TaskRowProps) {
//     return (
//         <Table.Row 
//             key={row.rowID}
//             id={row.rowID}
//             connectedIDs={connectedRows.map(r => r.rowID)}
//             onDoubleClick={e => {
//                 console.log("edit task");
//                 onDoubleClick(e);
//             }}
//         >
//             {row.type === "task" ? <td/> : <Table.Label value={row.type.slice(0, 1).toLowerCase()}/>}
//             <Table.Select allOptions={sellers} value={row.staffID} onChange={e => onChange({ target: "SELLER", value: e.target.value, id: row.rowID })}/>
//             {row.type === "task" ? <Table.Label value={`JOB ${order}: ${row.title}`} className='highlight'/> : <Table.Label value={row.title}/>}
//             {row.type === "work" ? <Table.Input type='number' stepSize={0.1} min={0.01} max={999} value={row.instructionTime.toString()} onChange={e => onChange({ target: "INSTRUCTION_TIME", value: Number.parseFloat(e.target.value), id: row.rowID })}/> : <td/>}
//             {row.type === "work" ? <Table.Label value={row.clockedTime.toString()}/> : <td/>}
//             {row.type === "part" ? <Table.Input type='number' min={0} max={999} value={row.amount} onChange={e => onChange({ target: "AMOUNT", value: Number.parseFloat(e.target.value), id: row.rowID })}/> : <td/>}
//             {row.type === "part" || row.type === "work" ? <Table.Input type='number' min={0} value={row.unitPrice} onChange={e => onChange({ target: "UNIT_PRICE", value: Number.parseFloat(e.target.value), id: row.rowID })}/> : <td/>}
//             {row.type === "part" || row.type === "work" ? <Table.Input type='number' min={0} max={100} value={row.discount * 100} onChange={e => onChange({ target: "DISCOUNT", value: Number.parseFloat(e.target.value) / 100.0, id: row.rowID })}/> : <td/>}
//             {row.type === "part" || row.type === "work" ? <Table.Input type='number' min={0} value={row.totalPrice} onChange={e => onChange({ target: "TOTAL_PRICE", value: Number.parseFloat(e.target.value), id: row.rowID })}/> : <td/>}
//             {row.type === "part" ? <Table.Label value={row.collectDate.toString()}/> : <td/>}
//             {row.type === "part" ? <Table.Label value='0'/> : <td/>}
//             {row.type === "part" ? <Table.Label value='0'/> : <td/>}
//         </Table.Row>
//     );
// }
