import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";

/**
 * 
 */
interface TaskWorkModalProps {
    show: boolean;
    onHide: () => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TaskWorkModal({ show, onHide }: TaskWorkModalProps) {

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control placeholder='part code'/>
                <Form.Control disabled={true}/>
                <Form.Control type='number' value={1}/>
                <Form.Control type='number'/>
                <Form.Control type='number'/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
    );
}