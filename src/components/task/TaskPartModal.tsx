import type { Part } from "@dtypes/task/task";
import { useModal, type ModalRef } from "@hooks/useModal";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

/**
 * 
 */
interface TaskPartModalProps {
    ref: React.RefObject<ModalRef<Part>>;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TaskPartModal({ ref }: TaskPartModalProps) {

    const [state, dispatch] = useModal<Part>(ref, { visible: false });

    return (
        <Modal
            show={state.visible}
            onHide={() => dispatch({ type: "HIDE" })}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit a Part</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.data !== undefined && (
                    <>
                        <input type="text" value={state.data.name} onChange={e => handleChange("SET_TITLE", e.target.value)}/>
                        <input type="number" value={state.data.unitPrice} onChange={e => handleChange("SET_HOURLY_RATE", Number.parseFloat(e.target.value))} min={0}/>
                        <input type="number" value={state.data.amount} onChange={e => handleChange("SET_DURATION", Number.parseFloat(e.target.value))} min={0}/>
                        <input type="number" value={state.data.discount * 100} onChange={e => handleChange("SET_DISCOUNT", Number.parseFloat(e.target.value) * 0.01)} min={0} max={100}/>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClick}>Understood</Button>
            </Modal.Footer>
        </Modal>
    )

}