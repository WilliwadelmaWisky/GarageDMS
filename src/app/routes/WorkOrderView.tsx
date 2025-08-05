import { BiSave, BiPrinter, BiSearch, BiInfoCircle } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { Table } from "../../components/table/table";
import { useState } from "react";
import { Job, Row, WorkOrder } from "../../types/work-order";
import { TimeSpan } from "../../types/timespan";
import { TableBodyRow, TableHeaderRow } from "../../components/table/table-row";

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
        <Table>
            <TableHeaderRow 
                elements={["type", "seller", "title", "i. time", "c, time", "amount", "unit price", "discount %", "total price", "collected"]}
            />
            {workOrder?.jobs.map((job, index) => (
                <>
                    <TableBodyRow 
                        number={index + 1} 
                        elements={[
                            { value: "", isEditable: false, type: "number"},
                            { value: job.seller, isEditable: false, type: "number"},
                            { value: `JOB ${index + 1}: ${job.title}`, isEditable: false, type: "text"},
                            { value: "", isEditable: false, type: "number"},
                            { value: "", isEditable: false, type: "number"},
                            { value: "", isEditable: true, type: "number"},
                            { value: "", isEditable: true, type: "number"},
                            { value: "", isEditable: true, type: "number"},
                            { value: "", isEditable: false, type: "date"},
                            { value: "", isEditable: false, type: "date"}
                        ]}
                    />
                    {job.rows.map((row, index) => (
                        <TableBodyRow
                            number={index + 1}
                            elements={[
                                { value: row.type, isEditable: false, type: "number"},
                                { value: row.seller, isEditable: false, type: "number"},
                                { value: row.text, isEditable: false, type: "text"},
                                { value: `${row.instructionTime}`, isEditable: false, type: "number"},
                                { value: `${row.clockedTime}`, isEditable: false, type: "number"},
                                { value: `${row.amount}`, isEditable: true, type: "number"},
                                { value: `${row.unitPrice}`, isEditable: true, type: "number"},
                                { value: `${row.discount}`, isEditable: true, type: "number"},
                                { value: `${row.totalPrice}`, isEditable: true, type: "number"},
                                { value: `${row.collectDate}`, isEditable: false, type: "date"}
                            ]}
                        />
                    ))}
                </>
            ))}
        </Table>
    )
}