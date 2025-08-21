import TableElement from '@components/table/table-element'
import TableBodyRowElement from '@components/table/table-body-row-element';
import TableLabelCellElement from "@components/table/table-label-cell-element";
import TableSelectCellElement from "@components/table/table-select-cell-element";
import type { Task } from '../types/task';

import TableHeaderRowElement from '@components/table/table-header-row-element';
import TableHeaderCellElement from '@components/table/table-header-cell-element';
import TaskTableRow from './task-table-row';
import React, { useState } from 'react';


const ALL_TABLE_HEADERS = ["type", "seller", "mechanic", "title", "i. time", "c, time", "amount", "unit price", "discount %", "total price", "collected", "amount in stock", "amount available"];
const ALL_SELLERS = ["P1", "P2", "P3"];

interface ChangeEvent {
    target: "SELLER" | "INSTRUCTION_TIME" | "AMOUNT" | "DISCOUNT" | "UNIT_PRICE" | "TOTAL_PRICE",
    value: string | number,
    taskIndex: number,
    contentIndex?: number
}


/**
 * 
 */
interface Props {
    tasks: Task[],
    onChange: (e: ChangeEvent) => void,
    onSelect: (id: string) => void
}

interface State {
    selected: string[]
}

/**
 * 
 * @param props ...
 */
export default function TaskTable({ tasks, onChange, onSelect }: Props) {

    const [state, setState] = useState<State>({ selected: []});

    console.log("render table");
    
    return (
        <>
            <TableElement>
                <TableHeaderRowElement key='header'>
                    {ALL_TABLE_HEADERS.map((header, index) => (
                        <TableHeaderCellElement 
                            key={index}
                            title={header}
                            className={header === "title" ? "wide" : ""}
                        />
                    ))}
                </TableHeaderRowElement>
                {tasks.map((task, taskIndex) => (
                    <React.Fragment key={taskIndex}>
                        <TableBodyRowElement 
                            key={task.TaskID}
                            isSelected={state.selected.findIndex(id => task.TaskID === id) !== -1}
                            onSelect={() => {
                                onSelect(task.TaskID);
                                setState({ ...state, selected: [task.TaskID] });
                            }}
                            onEdit={() => {
                                console.log("edit task " + taskIndex);
                            }}
                        >
                            <TableLabelCellElement value="task"/>
                            <TableSelectCellElement allOptions={ALL_SELLERS} value={task.SellerID} onChange={e => onChange({ target: "SELLER", value: e.target.value, taskIndex: taskIndex })}/>
                            <td/>
                            <TableLabelCellElement value={`JOB ${taskIndex + 1}: ${task.Title}`} className='highlight'/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                        </TableBodyRowElement>
                        {task.Contents.map((content, contentIndex) => (
                            <TaskTableRow 
                                key={content.ID} 
                                content={content}
                                allSellerIDs={ALL_SELLERS}
                                allMechanicIDs={ALL_SELLERS}
                                isSelected={state.selected.findIndex(id => content.ID === id) !== -1}
                                onSelect={() => {
                                    onSelect(content.ID);
                                    setState({ ...state, selected: [content.ID] });
                                }}
                                onChange={e => onChange({ target: e.target, value: e.value, taskIndex: taskIndex, contentIndex: contentIndex })}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </TableElement>
            <p>Total Price</p>
        </>
    )
}