import { useState, useReducer } from 'react';
import { Table as BaseTable } from '@components/table/table'
import { TableBodyInputItem, TableBodyLabelItem, TableBodySelectItem, TableHeaderItem } from '@components/table/table-item'
import { TableBodyRow, TableHeaderRow } from '@components/table/table-row';
import type { TableRow } from '../types/table-row';

import { Date } from '@datatypes/date';
import { GET_TIMESPAN_ZERO, of, toString } from '@utils/timespan-util';


const ALL_TABLE_HEADERS = ["type", "seller", "title", "i. time", "c, time", "amount", "unit price", "discount %", "total price", "collected"];
const ALL_SELLERS = ["P1", "P2", "P3"];


/**
 * 
 */
interface Props {

}

const TEST: TableRow[] = [
    { Type: "job", Seller: "P1", Text: "JOB 1: Oil Change", InstructionTime: GET_TIMESPAN_ZERO(), ClockedTime: GET_TIMESPAN_ZERO(), Amount: 0, UnitPrice: 0, Discount: 0, TotalPrice: 0, CollectDate: Date.NULL},
    { Type: "text", Seller: "P1", Text: "Price $500", InstructionTime: GET_TIMESPAN_ZERO(), ClockedTime: GET_TIMESPAN_ZERO(), Amount: 0, UnitPrice: 0, Discount: 0, TotalPrice: 0, CollectDate: Date.NULL},
    { Type: "job", Seller: "P1", Text: "Oil Change", InstructionTime: of(1, 20, 0), ClockedTime: GET_TIMESPAN_ZERO(), Amount: 0, UnitPrice: 0, Discount: 0, TotalPrice: 0, CollectDate: Date.NULL},
    { Type: "part", Seller: "P1", Text: "OIL 1, BARREL, 5w30", InstructionTime: GET_TIMESPAN_ZERO(), ClockedTime: GET_TIMESPAN_ZERO(), Amount: 5.3, UnitPrice: 20, Discount: 0, TotalPrice: 20*5.3, CollectDate: Date.NULL},
    { Type: "part", Seller: "P1", Text: "1234567, SHELF 1, OIL FILTER", InstructionTime: GET_TIMESPAN_ZERO(), ClockedTime: GET_TIMESPAN_ZERO(), Amount: 1, UnitPrice: 25, Discount: 0, TotalPrice: 25, CollectDate: Date.NULL}
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
                        <TableBodySelectItem allOptions={ALL_SELLERS} value="P1" onChange={e => {}}/>
                        <TableBodyLabelItem value={row.Text}/>
                        <TableBodyLabelItem value={toString(row.InstructionTime)}/>
                        <TableBodyLabelItem value={toString(row.ClockedTime)}/>
                        <TableBodyInputItem type="number" value={row.Amount} onChange={e => {}}/>
                        <TableBodyInputItem type="number" value={row.UnitPrice} onChange={e => {}}/>
                        <TableBodyInputItem type="number" value={row.Discount} onChange={e => {}}/>
                        <TableBodyInputItem type="number" value={row.TotalPrice} onChange={e => {}}/>
                        <TableBodyLabelItem value={row.CollectDate.toString()}/>
                    </TableBodyRow>
                ))}
            </BaseTable>
            <p>Total Price</p>
        </>
    )
}