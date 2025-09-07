// import { useImperativeHandle, useRef } from "react";
// import TaskTable, { type ChangeEvent } from "./TaskTable";
// import MenuBar from "./menubar";
// import ToolBar from "./toolbar";
// import Button from "react-bootstrap/Button";
// import PartModal from "./modal";
// import { v4 as uuidv4 } from "uuid";
// import type { TableRef } from "@components/Table";
// import { useStateReducer, type State } from "../hooks/useStateReducer";
// import { last } from "@utils/array-util";
// import type { Row } from "../types/table-row";
// import { useKeyboard } from "@hooks/useKeyboard";



// const INITIAL_STATE: State = {
//     id: -1,
//     type: "offer",
//     rows: [
//         { type: "task", rowID: uuidv4(), title: "New Task", staffID: "P2", instructionTime: new Date(), clockedTime: new Date(), amount: -1, unitPrice: -1, discount: -1, totalPrice: -1, collectDate: new Date(), amountInStock: -1, amountAvailable: -1 },
//     ]
// };

// export interface TaskTableViewRef {
//     addRow: (row: Row) => void;
// }

// /**
//  * 
//  */
// interface Props {
//     ref?: React.RefObject<TaskTableViewRef>
// }

// /**
//  * 
//  * @param props 
//  * @returns 
//  */
// export default function TaskTableView({ ref }: Props) {

//     const [state, dispatch] = useStateReducer(INITIAL_STATE);
//     const tableRef = useRef<TableRef>({ getSelection: () => [], setSelection: () => {} });

//     useKeyboard(e => {
//         if (e.shiftKey && e.key.toLowerCase() === "y") {
//             dispatch({ type: "MOVE_UP", targetID: tableRef.current.getSelection() });
//             return;
//         }

//         if (e.shiftKey && e.key.toLowerCase() === "a") {
//             dispatch({ type: "MOVE_DOWN", targetID: tableRef.current.getSelection() });
//             return;
//         }
//     });

//     useImperativeHandle(ref, () => ({
//         addRow: add,
//     }));
    
//     console.log("render view: " + tableRef.current);
    
//     const add = (row: Row) => {
//         const selectedID =  last(tableRef.current.getSelection());
//         dispatch({ type: "ADD", targetID: selectedID, payload: row });
//         tableRef.current.setSelection([ row.rowID ]);
//     };

//     const onElementChange = (e: ChangeEvent) => {
//         console.log(`changed: ${e.target} to ${e.value}, id: ${e.id}`);

//         const rowIndex = state.rows.findIndex(r => r.rowID === e.id);
//         if (rowIndex === -1) {
//             return;
//         }

//         const copy = { ...state.rows[rowIndex] };

//         switch (e.target) {
//             case "SELLER": 
//                 copy.staffID = e.value as string;
//                 break;
//             case "INSTRUCTION_TIME":
//                 copy.instructionTime = new Date();
//                 break;
//             case "AMOUNT":
//                 copy.amount = e.value as number;
//                 copy.totalPrice = copy.amount * copy.unitPrice * (1 - copy.discount);
//                 break;
//             case "DISCOUNT":
//                 copy.discount = e.value as number;
//                 copy.totalPrice = copy.amount * copy.unitPrice * (1 - copy.discount);
//                 break;
//             case "UNIT_PRICE":
//                 copy.unitPrice = e.value as number;
//                 copy.totalPrice = copy.amount * copy.unitPrice * (1 - copy.discount);
//                 break;
//             case "TOTAL_PRICE":
//                 copy.totalPrice = e.value as number;
//                 copy.discount = 1 - copy.totalPrice / (copy.amount * copy.unitPrice);
//                 break;
//         }

//         dispatch({ type: "SET", targetID: e.id, payload: copy });
//     };

//     return (
//         <>
//             <MenuBar/>
//             <ToolBar/>
            
//             <TaskTable 
//                 ref={tableRef}
//                 rows={state.rows}
//                 onElementChange={onElementChange}
//                 onElementDoubleClick={() => console.log("double click")}
//             />

//             <PartModal/>
//             <br></br>
//             <Button 
//                 variant="primary" 
//                 onClick={() => { 
//                     add({ type: "task", rowID: uuidv4(), title: "New Task", staffID: "P2", instructionTime: new Date(), clockedTime: new Date(), amount: -1, unitPrice: -1, discount: -1, totalPrice: -1, collectDate: new Date(), amountInStock: -1, amountAvailable: -1 });
//                 }}
//             >Add Task</Button>
//             <Button variant="primary" onClick={() => dispatch({ type: "ADD", targetID: last(tableRef.current.getSelection()), payload: { type: "part", rowID: uuidv4(), title: "New Part", staffID: "P2", instructionTime: new Date(), clockedTime: new Date(), amount: 1, unitPrice: 10, discount: 0, totalPrice: 10, collectDate: new Date(), amountInStock: 0, amountAvailable: 0 }})}>Add Part</Button>
//             <Button variant="primary" onClick={() => dispatch({ type: "ADD", targetID: last(tableRef.current.getSelection()), payload: { type: "work", rowID: uuidv4(), title: "New Part", staffID: "P2", instructionTime: new Date(), clockedTime: new Date(), amount: -1, unitPrice: 100, discount: 0, totalPrice: 100, collectDate: new Date(), amountInStock: -1, amountAvailable: -1 } })}>Add Work</Button>
//             <Button variant="primary" onClick={() => dispatch({ type: "ADD", targetID: last(tableRef.current.getSelection()), payload: { type: "comment", rowID: uuidv4(), title: "New Comment", staffID: "P2", instructionTime: new Date(), clockedTime: new Date(), amount: -1, unitPrice: -1, discount: -1, totalPrice: -1, collectDate: new Date(), amountInStock: -1, amountAvailable: -1 }})}>Add Text</Button>
//             <br></br>
//             <Button 
//                 variant="primary" 
//                 onClick={() => dispatch({ type: "DELETE", targetID: tableRef.current.getSelection() })}
//             >Delete</Button>
//         </>
//     );
// }