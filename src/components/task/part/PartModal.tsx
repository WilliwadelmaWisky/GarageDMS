import NumberInputField from "@components/form/NumberInputField";
import TextInputField from "@components/form/TextInputField";
import { calcTotal } from "@dtypes/task/part/part";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useModal, type ModalRef } from "./Part.hooks";

/**
 * 
 */
interface PartModalProps {
    ref: React.RefObject<ModalRef>;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function PartModal({ ref }: PartModalProps) {

    const { state, dispatch, callbackRef } = useModal(ref);


    /**
     * 
     * @param amount 
     */
    const handleChangeAmount = (amount: number) => {
        dispatch({
            ACTION_TYPE: "TARGET_UPDATE",
            amount:      amount,
            cost:        state.cost,
            discount:    state.discount,
        });
    } 

    /**
     * 
     * @param cost 
     */
    const handleChangeCost = (cost: number) => {
        dispatch({
            ACTION_TYPE: "TARGET_UPDATE",
            amount:      state.amount,
            cost:        cost,
            discount:    state.discount,
        });
    }

    /**
     * 
     * @param discount 
     */
    const handleChangeDiscount = (discount: number) => {
        dispatch({
            ACTION_TYPE: "TARGET_UPDATE",
            amount:      state.amount,
            cost:        state.cost,
            discount:    discount,
        });
    } 

    /**
     * 
     * @param total 
     */
    const handleChangeTotal = (total: number) => {
        // Calculate the required discount for the change of total to happen.
        const discount = 1 - total / (state.amount * state.cost);

        // Total was raised above the calculated maximum, raise the base cost to compensate (discount < 0).
        // Total can be successfully changed with the change of the discount (0 <= discount <= 1).
        dispatch({
            ACTION_TYPE: "TARGET_UPDATE",
            amount:      state.amount,
            cost:        discount < 0 ?  total / state.amount : state.cost,
            discount:    discount < 0 ?  0                    : discount,
        });
    }

    /**
     * 
     * @param itemCode 
     */
    const handleItemCodeChange = (itemCode: string) => {
        dispatch({
            ACTION_TYPE: "TARGET_CHANGE",
            itemCode:    itemCode,
        });
    };

    
    /**
     * 
     */
    const handleClick = () => {
        callbackRef.current({
            partID:     state.partID,
            itemID:     state.itemID,
            amount:     state.amount,
            cost:       state.cost,
            discount:   state.discount,
        });
    };


    return (
        <Modal
            show={state.visible}
            onHide={() => dispatch({ ACTION_TYPE: "HIDE" })}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>{state.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextInputField value={state.itemCode} onReturn={handleItemCodeChange}/>
                <span>{state.itemName}</span>
                <span>{state.itemSupplier}</span>
                <NumberInputField value={state.amount} onChange={handleChangeAmount} min={0} max={999}/>
                <NumberInputField value={state.cost} onChange={handleChangeCost} min={0}/>
                <NumberInputField value={state.discount * 100} onChange={value => handleChangeDiscount(value * 0.01)} min={0} max={100}/>
                <NumberInputField value={calcTotal(state.cost, state.amount, state.discount)} onChange={handleChangeTotal} min={0}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClick}>Understood</Button>
            </Modal.Footer>
        </Modal>
    );

}