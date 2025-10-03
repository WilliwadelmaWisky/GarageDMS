import { useModal, type ModalRef } from "@hooks/useModal";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

interface ConfirmModalProps {
    ref: React.RefObject<ModalRef<StateData>>;

}

export interface StateData {
    title: string;
    callback: () => void;
}


export default function ConfirmModal({
    ref,
}: ConfirmModalProps) {

    const [state, dispatch] = useModal<StateData>(ref, { visible: false });


    if (!state.visible || state.data === undefined) {
        return <></>;
    }

    return (
        <Modal
            show={state.visible}
            onHide={() => dispatch({ type: "HIDE" })}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>{state.data.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Helllo
            </Modal.Body>
            <Modal.Footer>
                <Button>Cancel</Button>
                <Button>OK</Button>
            </Modal.Footer>
        </Modal>
    );
} 