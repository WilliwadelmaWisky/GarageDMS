import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

/**
 * 
 * @returns 
 */
export default function PartModal() {

    const [show, setShow] = useState(false);

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
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