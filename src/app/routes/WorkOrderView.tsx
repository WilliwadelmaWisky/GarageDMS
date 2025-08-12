import { BiSave, BiPrinter, BiSearch, BiInfoCircle } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { Table } from "../../components/table/table";
import { useState } from "react";
import { Job, Row, WorkOrder } from "../../types/work-order";
import { TableBodyRow, TableHeaderRow } from "../../components/table/table-row";
import { TableBodyInputItem, TableBodyLabelItem, TableBodySelectItem, TableHeaderItem } from "../../components/table/table-item";

/**
 * 
 * @returns 
 */
export function WorkOrderView() {
    
    return (
        <>
            <WorkOrderToolbar/>
            <WorkOrderTable/>
        </>
    )
}

function WorkOrderToolbar() {

    return (
        <div>
            <button><BiSave/></button>
            <button><BiPrinter/></button>
            <button><BiSearch/></button>
            <button><BiInfoCircle /></button>
            <button><GiMoneyStack /></button>
        </div>
    )
}

const ALL_TABLE_HEADERS = ["type", "seller", "title", "i. time", "c, time", "amount", "unit price", "discount %", "total price", "collected"];
const ALL_SELLERS = ["P1", "P2", "P3"];

/**
 * 
 * @returns 
 */
function WorkOrderTable() {

    const [workOrder, setWorkOrder] = useState<WorkOrder | null>(() => {
        const workOrder =  new WorkOrder();
        const job1 = new Job("Oil Change", "P1");
        job1.add(new Row("labour", "P1", "Oil Change", 1, 100, 0, 100));
        job1.add(new Row("part", "P1", "OIL 1, BARREL, 5w30", 4, 20, 0, 80));
        job1.add(new Row("part", "P1", "1234567, SHELF 1, OIL FILTER", 1, 100, 0, 100));
        workOrder.add(job1);
        return workOrder;
    });

    return (
        <>
            <Table>
                <TableHeaderRow>
                    {ALL_TABLE_HEADERS.map((header, index) => (
                        <TableHeaderItem 
                            key={index}
                            element={header} 
                        />
                    ))}
                </TableHeaderRow>
                {workOrder?.rows.map((row, index) => (
                    <TableBodyRow
                        key={index}
                        number={index + 1}
                    >
                        <TableBodyLabelItem value={row.type}/>
                        <TableBodySelectItem values={ALL_SELLERS} selectedValue="P1"/>
                        <TableBodyLabelItem value={row.text}/>
                        <TableBodyLabelItem value={row.instructionTime.toString()}/>
                        <TableBodyLabelItem value={row.clockedTime.toString()}/>
                        <TableBodyInputItem value={row.amount} type="number"/>
                        <TableBodyInputItem value={row.unitPrice} type="number"/>
                        <TableBodyInputItem value={row.discount} type="number"/>
                        <TableBodyInputItem value={row.totalPrice} type="number"/>
                        <TableBodyLabelItem value={row.collectDate.toString()}/>
                    </TableBodyRow>
                ))}
            </Table>
            <p>Total Price</p>
        </>
    )
}