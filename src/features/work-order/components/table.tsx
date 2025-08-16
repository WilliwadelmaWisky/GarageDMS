import { Table as BaseTable } from '@components/table/table'
import { TableBodyEmptyItem, TableHeaderItem } from '@components/table/table-item'
import { TableBodyRow, TableHeaderRow } from '@components/table/table-row';
import Text from "@components/table/text";
import Input from "@components/table/input";
import Select from "@components/table/select";
import type { Content, Task } from '../types/task';

import { toString as TimeSpan_toString } from '@utils/timespan-util';
import { toString as Date_toString } from '@utils/date-util';


const ALL_TABLE_HEADERS = ["type", "seller", "mechanic", "title", "i. time", "c, time", "amount", "unit price", "discount %", "total price", "collected", "amount in stock", "amount available"];
const ALL_SELLERS = ["P1", "P2", "P3"];


/**
 * 
 */
interface Props {
    tasks: Task[]
}

interface RowProps {
    content: Content
}


function Row({ content }: RowProps) {
    switch (content.Type) {
        case 'text': return (
            <TableBodyRow>
                <Text value={content.Type}/>
                <Select allOptions={ALL_SELLERS} value={content.SellerID} onChange={e => {}}/>
                <TableBodyEmptyItem/>
                <Text value={content.Text}/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
            </TableBodyRow>
        );
        case 'work': return (
             <TableBodyRow>
                <Text value={content.Type}/>
                <Select allOptions={ALL_SELLERS} value={content.SellerID} onChange={e => {}}/>
                <Select allOptions={ALL_SELLERS} value={content.MechanicID} onChange={e => {}}/>
                <Text value={content.Description}/>
                <Text value={TimeSpan_toString(content.InstructionTime)}/>
                <Text value={TimeSpan_toString(content.ClockedTime)}/>
                <TableBodyEmptyItem/>
                <Text value={content.UnitPrice.toString()}/>
                <Text value={(content.Discount * 100).toString()}/>
                <Text value={(content.UnitPrice * (1 - content.Discount)).toString()}/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
            </TableBodyRow>
        );
        case 'part': return (
             <TableBodyRow>
                <Text value={content.Type}/>
                <Select allOptions={ALL_SELLERS} value={content.SellerID} onChange={e => {}}/>
                <TableBodyEmptyItem/>
                <Text value={content.PartID}/>
                <TableBodyEmptyItem/>
                <TableBodyEmptyItem/>
                <Text value={content.Amount.toString()}/>
                <Text value={content.UnitPrice.toString()}/>
                <Text value={(content.Discount * 100).toString()}/>
                <Text value={(content.UnitPrice * (1 - content.Discount)).toString()}/>
                <Text value={Date_toString(content.CollectDate)}/>
                <Text value='0'/>
                <Text value='0'/>
            </TableBodyRow>
        );
    }
}


/**
 * 
 * @param props ...
 */
export default function Table({ tasks }: Props) {
    
    return (
        <>
            <BaseTable>
                <TableHeaderRow>
                    {ALL_TABLE_HEADERS.map((header, index) => (
                        <TableHeaderItem 
                            key={index}
                            element={header} 
                        />
                    ))}
                </TableHeaderRow>
                {tasks.map((task, index) => (
                    <>
                        <TableBodyRow key={index}>
                            <Text value="task"/>
                            <Select allOptions={ALL_SELLERS} value={task.SellerID} onChange={e => {}}/>
                            <TableBodyEmptyItem/>
                            <Text value={`JOB ${index + 1}: ${task.Title}`}/>
                            <TableBodyEmptyItem/>
                            <TableBodyEmptyItem/>
                            <TableBodyEmptyItem/>
                            <TableBodyEmptyItem/>
                            <TableBodyEmptyItem/>
                            <TableBodyEmptyItem/>
                            <TableBodyEmptyItem/>
                            <TableBodyEmptyItem/>
                            <TableBodyEmptyItem/>
                        </TableBodyRow>
                        {task.Contents.map((content, index) => (
                            <Row key={index} content={content}/>
                        ))}
                    </>
                ))}
            </BaseTable>
            <p>Total Price</p>
        </>
    )
}