import type { Work } from "@dtypes/task";
import useModal from "@hooks/useModal";
import { useImperativeHandle } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

/**
 * 
 */
export interface ModalRef {
    show: (work: Work) => void;
    hide: () => void;
}

/**
 * 
 */
interface TaskWorkModalProps {
    ref?: React.RefObject<ModalRef>;
    onAccept?: (work: Work) => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TaskWorkModal({ onAccept, ref }: TaskWorkModalProps) {

    const [state, dispatch] = useModal<Work>({ visible: false });

    useImperativeHandle(ref, () => ({
        show(work: Work) { dispatch({ type: "SHOW", payload: work }); },
        hide() { dispatch({ type: "HIDE" }); },
    }));

    const handleClick = () => {
        if (onAccept !== undefined) {

        }
    };

    const handleChange = () => {

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
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.data !== undefined && (
                    <>
                        <input type="text" value={state.data.title}/>
                        <input type="number" value={state.data.hourlyRate}/>
                        <input type="number" value={state.data.expectedDuration}/>
                        <input type="number" value={state.data.discount * 100} min={0} max={100}/>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClick}>Understood</Button>
            </Modal.Footer>
        </Modal>
    );
}