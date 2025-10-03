import NumberInputField from "@components/form/NumberInputField";
import { calcPartTotal, type Part } from "@dtypes/task/part/part";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ListGroup from "react-bootstrap/esm/ListGroup";
import type { Label, PartChangeEvent } from "./Part.hooks";
import { useMemo } from "react";

/**
 * 
 */
interface PartFieldProps {
    part: Part;
    onChange?: (e: PartChangeEvent) => void;
    onRequestEdit?: () => void;
    onRequestDelete?: () => void;
    labels?: Label[];
    disabled?: boolean;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function PartField({ 
    part,
    onChange            = function() {},
    onRequestEdit       = function() {},
    onRequestDelete     = function() {},
    labels              = ["amount", "cost", "discount", "total"],
    disabled            = false,
}: PartFieldProps) {

    const name = useMemo(() => {
        console.log("PartView - Update part.name");
        return part.itemID;
    }, [part]);

    /**
     * 
     * @param amount 
     */
    const handleChangeAmount = (amount: number) => {
        onChange({
            EVENT_TYPE: "CHANGE",
            partID:     part.partID,
            amount:     amount,
            cost:       part.cost,
            discount:   part.discount,
        });
    }

    /**
     * 
     * @param cost 
     */
    const handleChangeCost = (cost: number) => {
        onChange({
            EVENT_TYPE: "CHANGE",
            partID:     part.partID,
            amount:     part.amount,
            cost:       cost,
            discount:   part.discount,
        });
    }

    /**
     * 
     * @param discount 
     */
    const handleChangeDiscount = (discount: number) => {
        onChange({
            EVENT_TYPE: "CHANGE",
            partID:     part.partID,
            amount:     part.amount,
            cost:       part.cost,
            discount:   discount,
        });
    }

    /**
     * 
     * @param total 
     */
    const handleChangeTotal = (total: number) => {
        // Calculate the required discount for the change of total to happen.
        const discount = 1 - total / (part.amount * part.cost);

        // Total was raised above the calculated maximum, raise the base cost to compensate (discount < 0).
        // Total can be successfully changed with the change of the discount (0 <= discount <= 1).
        onChange({
            EVENT_TYPE: "CHANGE",
            partID:     part.partID,
            amount:     part.amount,
            cost:       discount < 0 ?  total / part.amount : part.cost,
            discount:   discount < 0 ?  0                   : discount,
        });
    }

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            {name}
            <div className="d-flex justify-content-between gap-2">
                {labels.includes("amount")   && <NumberInputField disabled={disabled} value={part.amount} onChange={handleChangeAmount} min={0} max={999}/>}
                {labels.includes("cost")     && <NumberInputField disabled={disabled} value={part.cost} onChange={handleChangeCost} min={0}/>}
                {labels.includes("discount") && <NumberInputField disabled={disabled} value={part.discount * 100} onChange={value => handleChangeDiscount(value * 0.01)} min={0} max={100}/>}
                {labels.includes("total")    && <NumberInputField disabled={disabled} value={calcPartTotal(part)} onChange={handleChangeTotal} min={0}/>}
                <Dropdown>
                    <Dropdown.Toggle disabled={disabled}>...</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <DropdownItem onClick={onRequestEdit}>Edit</DropdownItem>
                        <DropdownItem onClick={onRequestDelete}>Delete</DropdownItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </ListGroup.Item>
    );
}
