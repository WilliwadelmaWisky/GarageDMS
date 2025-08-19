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
interface ChangeEvent {
    target: "SELLER" | "INSTRUCTION_TIME" | "AMOUNT" | "DISCOUNT" | "UNIT_PRICE" | "TOTAL_PRICE",
    value: string | number
}

/**
 * 
 */
interface Props {
    content: Content,
    allSellerIDs: string[],
    allMechanicIDs: string[],
    onChange: (e: ChangeEvent) => void
}

/**
 * 
 * @param props 
 * @returns 
 */
export default function TaskTableRow({ content, allSellerIDs, allMechanicIDs, onChange }: Props) {
    switch (content.Type) {
        case 'text': return (
            <TableBodyRowElement onEdit={() => {}}>
                <TableLabelCellElement value={content.Type}/>
                <TableSelectCellElement allOptions={allSellerIDs} value={content.SellerID} onChange={e => onChange({ target: "SELLER", value: e.target.value })}/>
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
                <TableSelectCellElement allOptions={allSellerIDs} value={content.SellerID} onChange={e => onChange({ target: "SELLER", value: e.target.value })}/>
                <TableSelectCellElement allOptions={allMechanicIDs} value={content.MechanicID} onChange={e => {}}/>
                <TableLabelCellElement value={content.Description}/>
                <TableInputCellElement type='number' value={TimeSpan_toString(content.InstructionTime)} onChange={e => onChange({ target: "INSTRUCTION_TIME", value: e.target.value })}/>
                <TableLabelCellElement value={TimeSpan_toString(content.ClockedTime)}/>
                <td/>
                <TableInputCellElement type='number' value={content.UnitPrice} onChange={e => onChange({ target: "UNIT_PRICE", value: e.target.value })}/>
                <TableInputCellElement type='number' value={content.Discount * 100} onChange={e => onChange({ target: "DISCOUNT", value: e.target.value })}/>
                <TableInputCellElement type='number' value={content.UnitPrice * (1 - content.Discount)} onChange={e => onChange({ target: "TOTAL_PRICE", value: e.target.value })}/>
                <td/>
                <td/>
                <td/>
            </TableBodyRowElement>
        );
        case 'part': return (
             <TableBodyRowElement onEdit={() => {}}>
                <TableLabelCellElement value={content.Type}/>
                <TableSelectCellElement allOptions={allSellerIDs} value={content.SellerID} onChange={e => onChange({ target: "SELLER", value: e.target.value })}/>
                <td/>
                <TableLabelCellElement value={content.PartID}/>
                <td/>
                <td/>
                <TableInputCellElement type='number' value={content.Amount} onChange={e => onChange({ target: "AMOUNT", value: e.target.value })}/>
                <TableInputCellElement type='number' value={content.UnitPrice} onChange={e => onChange({ target: "UNIT_PRICE", value: e.target.value })}/>
                <TableInputCellElement type='number' value={content.Discount * 100} onChange={e => onChange({ target: "DISCOUNT", value: e.target.value })}/>
                <TableInputCellElement type='number' value={content.UnitPrice * (1 - content.Discount)} onChange={e => onChange({ target: "TOTAL_PRICE", value: e.target.value })}/>
                <TableLabelCellElement value={Date_toString(content.CollectDate)}/>
                <TableLabelCellElement value='0'/>
                <TableLabelCellElement value='0'/>
            </TableBodyRowElement>
        );
    }
}