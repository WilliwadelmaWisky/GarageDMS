import Table, { type TableRef } from '@components/table/table'
import type { Task } from '../types/task';
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
    tasks: Task[];
    onChange: (e: ChangeEvent) => void;
    ref?: React.RefObject<TableRef>;
}

/**
 * 
 * @param props ...
 */
export default function TaskTable({ tasks, onChange, ref }: Props) {

    console.log("render table");
    
    return (
        <>
            <Table 
                ref={ref}
                headers={ALL_TABLE_HEADERS}
            >
                {tasks.map((task, taskIndex) => (
                    <React.Fragment key={taskIndex}>
                        <Table.Row 
                            key={task.TaskID}
                            id={task.TaskID}
                            onEdit={() => {
                                console.log("edit task " + taskIndex);
                            }}
                        >
                            <Table.Label value="task"/>
                            <Table.Select allOptions={ALL_SELLERS} value={task.SellerID} onChange={e => onChange({ target: "SELLER", value: e.target.value, taskIndex: taskIndex })}/>
                            <td/>
                            <Table.Label value={`JOB ${taskIndex + 1}: ${task.Title}`} className='highlight'/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                        </Table.Row>
                        {task.Contents.map((content, contentIndex) => (
                            <TaskTableRow 
                                key={content.ID} 
                                content={content}
                                allSellerIDs={ALL_SELLERS}
                                allMechanicIDs={ALL_SELLERS}
                                onChange={e => onChange({ target: e.target, value: e.value, taskIndex: taskIndex, contentIndex: contentIndex })}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </Table>
            <p>Total Price</p>
        </>
    )
}