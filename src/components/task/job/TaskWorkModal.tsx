import type { Work } from "@dtypes/task/task";
import { useModal, type ModalRef } from "@hooks/useModal";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

/**
 * 
 */
interface JobModalProps {
    ref: React.RefObject<ModalRef<Work>>;
    onAccept?: (work: Work) => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function JobModal({ onAccept, ref }: JobModalProps) {

    const [state, dispatch] = useModal<Work>(ref, { visible: false });

    const handleClick = () => {
        if (state.data === undefined) {
            return;
        }

        if (onAccept !== undefined) {
            onAccept(state.data);
        }
        
        dispatch({ type: "HIDE" });
    };

    const handleChange = (type: "SET_TITLE" | "SET_HOURLY_RATE" | "SET_DURATION" | "SET_DISCOUNT", value: string | number) => {
        if (state.data === undefined) {
            return;
        }

        const work = { ...state.data };
        switch (type) {
            case "SET_TITLE":
                work.title = value as string;
                break;
            case "SET_HOURLY_RATE":
                work.hourlyRate = value as number;
                break;
            case "SET_DURATION":
                work.expectedDuration = value as number;
                break;
            case "SET_DISCOUNT":
                work.discount = value as number;
                break;
        }

        dispatch({ type: "MODIFY", payload: work });
    };

    if (state.visible && state.data === undefined) {
        return <>Error</>
    }

    return (
        <Modal
            show={state.visible}
            onHide={() => dispatch({ type: "HIDE" })}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit a Work</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.data !== undefined && (
                    <>
                        <input type="text" value={state.data.title} onChange={e => handleChange("SET_TITLE", e.target.value)}/>
                        <input type="number" value={state.data.hourlyRate} onChange={e => handleChange("SET_HOURLY_RATE", Number.parseFloat(e.target.value))} min={0}/>
                        <input type="number" value={state.data.expectedDuration} onChange={e => handleChange("SET_DURATION", Number.parseFloat(e.target.value))} min={0}/>
                        <input type="number" value={state.data.discount * 100} onChange={e => handleChange("SET_DISCOUNT", Number.parseFloat(e.target.value) * 0.01)} min={0} max={100}/>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClick}>Understood</Button>
            </Modal.Footer>
        </Modal>
    );
}