import TableBodyRowElement from '@components/table/table-body-row-element';
import TableLabelCellElement from "@components/table/table-label-cell-element";
import TableSelectCellElement from "@components/table/table-select-cell-element";
import TableInputCellElement from "@components/table/table-input-cell-element";

import type { Content } from "../types/task";

import { toString as TimeSpan_toString } from '@utils/timespan-util';
import { toString as Date_toString } from '@utils/date-util';

/**
 * 
 */
interface Props {
    content: Content,
    allSellerIDs: string[],
    allMechanicIDs: string[]
}

/**
 * 
 * @param props 
 * @returns 
 */
export default function TaskTableRow({ content, allSellerIDs, allMechanicIDs }: Props) {
    switch (content.Type) {
        case 'text': return (
            <TableBodyRowElement onEdit={() => {}}>
                <TableLabelCellElement value={content.Type}/>
                <TableSelectCellElement allOptions={allSellerIDs} value={content.SellerID} onChange={e => {}}/>
                <td/>
                <TableLabelCellElement value={content.Text}/>
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
        );
        case 'work': return (
             <TableBodyRowElement onEdit={() => {}}>
                <TableLabelCellElement value={content.Type}/>
                <TableSelectCellElement allOptions={allSellerIDs} value={content.SellerID} onChange={e => {}}/>
                <TableSelectCellElement allOptions={allMechanicIDs} value={content.MechanicID} onChange={e => {}}/>
                <TableLabelCellElement value={content.Description}/>
                <TableLabelCellElement value={TimeSpan_toString(content.InstructionTime)}/>
                <TableLabelCellElement value={TimeSpan_toString(content.ClockedTime)}/>
                <td/>
                <TableInputCellElement type='number' value={content.UnitPrice} onChange={e => {}}/>
                <TableInputCellElement type='number' value={content.Discount * 100} onChange={e => {}}/>
                <TableInputCellElement type='number' value={content.UnitPrice * (1 - content.Discount)} onChange={e => {}}/>
                <td/>
                <td/>
                <td/>
            </TableBodyRowElement>
        );
        case 'part': return (
             <TableBodyRowElement onEdit={() => {}}>
                <TableLabelCellElement value={content.Type}/>
                <TableSelectCellElement allOptions={allSellerIDs} value={content.SellerID} onChange={e => {}}/>
                <td/>
                <TableLabelCellElement value={content.PartID}/>
                <td/>
                <td/>
                <TableInputCellElement type='number' value={content.Amount} onChange={e => {}}/>
                <TableInputCellElement type='number' value={content.UnitPrice} onChange={e => {}}/>
                <TableInputCellElement type='number' value={content.Discount * 100} onChange={e => {}}/>
                <TableInputCellElement type='number' value={content.UnitPrice * (1 - content.Discount)} onChange={e => {}}/>
                <TableLabelCellElement value={Date_toString(content.CollectDate)}/>
                <TableLabelCellElement value='0'/>
                <TableLabelCellElement value='0'/>
            </TableBodyRowElement>
        );
    }
}