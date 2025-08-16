import { useState, useReducer } from 'react';
import { Table as BaseTable } from '@components/table/table'
import { TableBodyInputItem, TableBodyLabelItem, TableBodySelectItem, TableHeaderItem } from '@components/table/table-item'
import { TableBodyRow, TableHeaderRow } from '@components/table/table-row';
import type { TableRow } from '../types/table-row';

import { NULL as NULL_DATE } from '@datatypes/date';
import { NULL as NULL_TIMESPAN } from '@datatypes/timespan';
import { of, toString } from '@utils/timespan-util';


const ALL_TABLE_HEADERS = ["type", "seller", "mechanic", "title", "i. time", "c, time", "amount", "unit price", "discount %", "total price", "collected", "amount in stock", "amount available"];
const ALL_SELLERS = ["P1", "P2", "P3"];


/**
 * 
 */
interface Props {

}

const TEST: TableRow[] = [
    { Type: "job", Seller: "P1", Mechanic: "", Text: "JOB 1: Oil Change", InstructionTime: NULL_TIMESPAN, ClockedTime: NULL_TIMESPAN, Amount: 0, UnitPrice: 0, Discount: 0, TotalPrice: 0, CollectDate: NULL_DATE, AmountInStock: 0, AmountAvailable: 0},
    { Type: "text", Seller: "P1", Mechanic: "", Text: "Price $500", InstructionTime: NULL_TIMESPAN, ClockedTime: NULL_TIMESPAN, Amount: 0, UnitPrice: 0, Discount: 0, TotalPrice: 0, CollectDate: NULL_DATE, AmountInStock: 0, AmountAvailable: 0},
    { Type: "job", Seller: "P1", Mechanic: "", Text: "Oil Change", InstructionTime: of(1, 20, 0), ClockedTime: NULL_TIMESPAN, Amount: 0, UnitPrice: 0, Discount: 0, TotalPrice: 0, CollectDate: NULL_DATE, AmountInStock: 0, AmountAvailable: 0},
    { Type: "part", Seller: "P1", Mechanic: "", Text: "OIL 1, BARREL, 5w30", InstructionTime: NULL_TIMESPAN, ClockedTime: NULL_TIMESPAN, Amount: 5.3, UnitPrice: 20, Discount: 0, TotalPrice: 20*5.3, CollectDate: NULL_DATE, AmountInStock: 200, AmountAvailable: 200},
    { Type: "part", Seller: "P1", Mechanic: "", Text: "1234567, SHELF 1, OIL FILTER", InstructionTime: NULL_TIMESPAN, ClockedTime: NULL_TIMESPAN, Amount: 1, UnitPrice: 25, Discount: 0, TotalPrice: 25, CollectDate: NULL_DATE, AmountInStock: 5, AmountAvailable: 5}
]


/**
 * 
 * @param props ...
 */
export default function Table({}: Props) {
    const [rows, setRows] = useState<TableRow[]>(TEST);

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
                {rows.map((row, index) => (
                    <TableBodyRow
                        key={index}
                        number={index + 1}
                    >
                        <TableBodyLabelItem value={row.Type}/>
                        <TableBodySelectItem allOptions={ALL_SELLERS} value={row.Seller} onChange={e => {}}/>
                        <TableBodyLabelItem value={row.Mechanic}/>
                        <TableBodyLabelItem value={row.Text}/>
                        <TableBodyLabelItem value={toString(row.InstructionTime)}/>
                        <TableBodyLabelItem value={toString(row.ClockedTime)}/>
                        <TableBodyInputItem type="number" value={row.Amount} onChange={e => {}}/>
                        <TableBodyInputItem type="number" value={row.UnitPrice} onChange={e => {}}/>
                        <TableBodyInputItem type="number" value={row.Discount} onChange={e => {}}/>
                        <TableBodyInputItem type="number" value={row.TotalPrice} onChange={e => {}}/>
                        <TableBodyLabelItem value={row.CollectDate.toString()}/>
                        <TableBodyInputItem type="number" value={row.AmountInStock} onChange={e => {}}/>
                        <TableBodyInputItem type="number" value={row.AmountAvailable} onChange={e => {}}/>
                    </TableBodyRow>
                ))}
            </BaseTable>
            <p>Total Price</p>
        </>
    )
}