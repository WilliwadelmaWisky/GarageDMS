import Table from "@components/table/table"

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
            <Table.Row 
                id={content.ID}
                onEdit={() => {}}
            >
                <Table.Label value={content.Type}/>
                <Table.Select allOptions={allSellerIDs} value={content.SellerID} onChange={e => onChange({ target: "SELLER", value: e.target.value })}/>
                <td/>
                <Table.Label value={content.Text}/>
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
        );
        case 'work': return (
            <Table.Row 
                id={content.ID}
                onEdit={() => {}}
            >
                <Table.Label value={content.Type}/>
                <Table.Select allOptions={allSellerIDs} value={content.SellerID} onChange={e => onChange({ target: "SELLER", value: e.target.value })}/>
                <Table.Select allOptions={allMechanicIDs} value={content.MechanicID} onChange={e => {}}/>
                <Table.Label value={content.Description}/>
                <Table.Input type='number' value={TimeSpan_toString(content.InstructionTime)} onChange={e => onChange({ target: "INSTRUCTION_TIME", value: e.target.value })}/>
                <Table.Label value={TimeSpan_toString(content.ClockedTime)}/>
                <td/>
                <Table.Input type='number' value={content.UnitPrice} onChange={e => onChange({ target: "UNIT_PRICE", value: e.target.value })}/>
                <Table.Input type='number' value={content.Discount * 100} onChange={e => onChange({ target: "DISCOUNT", value: e.target.value })}/>
                <Table.Input type='number' value={content.UnitPrice * (1 - content.Discount)} onChange={e => onChange({ target: "TOTAL_PRICE", value: e.target.value })}/>
                <td/>
                <td/>
                <td/>
            </Table.Row>
        );
        case 'part': return (
            <Table.Row 
                id={content.ID}
                onEdit={() => {}}
             >
                <Table.Label value={content.Type}/>
                <Table.Select allOptions={allSellerIDs} value={content.SellerID} onChange={e => onChange({ target: "SELLER", value: e.target.value })}/>
                <td/>
                <Table.Label value={content.PartID}/>
                <td/>
                <td/>
                <Table.Input type='number' value={content.Amount} onChange={e => onChange({ target: "AMOUNT", value: e.target.value })}/>
                <Table.Input type='number' value={content.UnitPrice} onChange={e => onChange({ target: "UNIT_PRICE", value: e.target.value })}/>
                <Table.Input type='number' value={content.Discount * 100} onChange={e => onChange({ target: "DISCOUNT", value: e.target.value })}/>
                <Table.Input type='number' value={content.UnitPrice * (1 - content.Discount)} onChange={e => onChange({ target: "TOTAL_PRICE", value: e.target.value })}/>
                <Table.Label value={Date_toString(content.CollectDate)}/>
                <Table.Label value='0'/>
                <Table.Label value='0'/>
            </Table.Row>
        );
    }
}