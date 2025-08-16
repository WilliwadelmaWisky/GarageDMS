import { useReducer } from "react";
import Table from "./table";
import type { Task } from "../types/task";
import MenuBar from "./menubar";
import ToolBar from "./toolbar";
import { NULL as Date_NULL} from "@datatypes/date";
import { of } from "@utils/timespan-util";

interface State {
    ID: number,
    Type: "offer" | "contract",
    Tasks: Task[]
};

const INITIAL_STATE: State = {
    ID: -1,
    Type: "offer",
    Tasks: [
        { Title: "5. Year Service", SellerID: "P1", IsInvoiced: false, Contents: [
            { Type: "text", SellerID: "P1", Text: "Price: $500" },
            { Type: "work", SellerID: "P1", MechanicID: "P2", Description: "Oil Change", InstructionTime: of(1, 0, 0), ClockedTime: of(0, 0, 0), Discount: 0, UnitPrice: 100 },
            { Type: "part", SellerID: "P1", PartID: "5w30", Amount: 5.3, Discount: 0, UnitPrice: 20, CollectDate: Date_NULL },
            { Type: "part", SellerID: "P1", PartID: "1234567", Amount: 1, Discount: 0, UnitPrice: 25, CollectDate: Date_NULL }
        ]}
    ]
};

interface Action {

}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function reducer(state: State, action: Action): State {
    return INITIAL_STATE;
}

/**
 * 
 */
interface Props {

}

/**
 * 
 * @param props 
 * @returns 
 */
export default function View({}: Props) {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <>
            <MenuBar/>
            <ToolBar/>
            <Table tasks={state.Tasks}/>
        </>
    );
}