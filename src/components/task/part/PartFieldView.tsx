import PartModal from "./PartModal";
import { useRef } from "react";
import { calcPartTotal, calcTotal, type Part } from "@dtypes/task/part/part";
import Alert from "react-bootstrap/esm/Alert";
import ListGroup from "react-bootstrap/esm/ListGroup";
import PartField from "./PartField";
import { labelDisplayName, type Label, type ModalRef, type PartAddEvent, type PartChangeEvent, type PartDeleteEvent, type PartListChangeEvent } from "./Part.hooks";
import { Button, ButtonGroup } from "react-bootstrap";
import { useAppContext } from "@hooks/useAppContext";

/**
 * 
 */
interface PartFieldViewProps {
    parts: Part[];
    labels?: Label[];
    onChange?: (e: PartListChangeEvent) => void;
    className?: string;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function PartFieldView({ 
    parts,
    labels = ["amount", "cost", "discount", "total"],
    onChange = () => {},
    className, 
}: PartFieldViewProps) {

    const { showConfirmDialog } = useAppContext();
    const modalRef = useRef<ModalRef>({ show: () => {}, hide: () => {}, reset: () => {} });


    /**
     * 
     * @param e 
     */
    const handleChange = (e: PartChangeEvent) => {
        const part = parts.find(p => p.partID === e.partID);
        if (part === undefined) { return; }

        onChange({
            targets:    [e],
            deltaTotal: calcTotal(e.cost, e.amount, e.discount) - calcPartTotal(part),
        });
    }

    /**
     * 
     * @param e 
     */
    const handleAdd = (e: PartAddEvent) => {
        onChange({ 
            targets:    [e], 
            deltaTotal: calcTotal(e.cost, e.amount, e.discount),
        });
    }

    /**
     * 
     * @param e 
     */
    const handleDelete = (e: PartDeleteEvent) => {
        const part = parts.find(p => p.partID === e.partID);
        if (part === undefined) { return; }

        onChange({
            targets:    [e],
            deltaTotal: -calcPartTotal(part),
        })
    }


    /**
     * 
     * @param partID 
     */
    const handleRequestEdit = (partID: string) => {
        const part = parts.find(p => p.partID === partID);
        if (part === undefined) { return; }

        modalRef.current.show(part, "Edit an existing part", e => { 
            handleChange({
                EVENT_TYPE: "CHANGE",
                partID:     e.partID,
                amount:     e.amount,
                cost:       e.cost,
                discount:   e.discount,
            });
            modalRef.current.hide();
        });
    }

    /**
     * 
     */
    const handleRequestAdd = () => {
        modalRef.current.show(null, "Add a new Part", e => {
            handleAdd({
                EVENT_TYPE: "ADD",
                partID:     e.partID,
                itemID:     e.itemID,
                amount:     e.amount,
                cost:       e.cost,
                discount:   e.discount,
            });
            modalRef.current.reset();
        });
    }

    /**
     * 
     * @param partID 
     */
    const handleRequestDelete = (partID: string) => {
        if (!parts.some(p => p.partID === partID)) { return; }
        handleDelete({
            EVENT_TYPE:     "DELETE",
            partID:         partID,
        });
        
        // showConfirmDialog("Are you sure to delete a part?", () => {
        //     handleDelete({ 
        //         EVENT_TYPE: "DELETE", 
        //         partID:     partID,
        //     });
        // });
    }

    
    return (
        <div className={className}>
            <Header 
                title="Parts" 
                labels={labels}
            />
            <Body 
                parts={parts} 
                onChange={handleChange} 
                onRequestEdit={handleRequestEdit} 
                onRequestDelete={handleRequestDelete}
            />
            <Footer 
                onRequestAdd={handleRequestAdd}
            />
            <PartModal 
                ref={modalRef}
            />
        </div>
    );
}

interface HeaderProps {
    title: string;
    labels?: Label[];
}

function Header({
    title,
    labels = ["amount", "cost", "discount", "total"],
}: HeaderProps) {

    return (
        <div className="fw-bold d-flex justify-content-between align-items-center mt-4 mb-2">
            {title} 
            <div className="d-flex justify-content-between align-items-center gap-2 pe-5">
                {labels.includes("amount")   && <span key={"amount"} className="label">{labelDisplayName("amount")}</span>}
                {labels.includes("cost")     && <span key={"cost"} className="label">{labelDisplayName("cost")}</span>}
                {labels.includes("discount") && <span key={"discount"} className="label">{labelDisplayName("discount")}</span>}
                {labels.includes("total")    && <span key={"total"} className="label">{labelDisplayName("total")}</span>}
            </div>
        </div>
    );
}


interface BodyProps {
    parts: Part[];
    onChange?: (e: PartChangeEvent) => void;
    onRequestEdit?: (partID: string) => void;
    onRequestDelete?: (partID: string) => void;
    labels?: Label[];
    disabled?: boolean;
}

function Body({
    parts,
    onChange            = function() {},
    onRequestEdit       = function() {},
    onRequestDelete     = function() {},
    labels              = ["amount", "cost", "discount", "total"],
    disabled            = false,
}: BodyProps) {

    if (parts.length <= 0) {
        return <Alert variant="light">No parts found! Click the plus button to add.</Alert>;
    }

    return (
        <ListGroup>
            {parts.map(part => (
                <PartField 
                    key={part.partID} 
                    part={part} 
                    onChange={onChange}
                    onRequestEdit={() => onRequestEdit(part.partID)}
                    onRequestDelete={() => onRequestDelete(part.partID)}
                    labels={labels}
                    disabled={disabled}
                />
            ))}
        </ListGroup>
    )
}


interface FooterProps {
    onRequestAdd?: () => void;
}


function Footer({
    onRequestAdd = function() {},
}: FooterProps) {
    return (
        <ButtonGroup>
            <Button variant="primary" onClick={onRequestAdd}>ADD</Button>
            <Button variant="primary">DELETE</Button>
            <Button variant="primary">CLEAR</Button>
        </ButtonGroup>
    );
}
