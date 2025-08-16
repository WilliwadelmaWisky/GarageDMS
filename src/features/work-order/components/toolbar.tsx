import { BiSave, BiPrinter, BiSearch, BiInfoCircle } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";

/**
 * 
 */
export default function ToolBar() {

    return (
        <div>
            <button><BiSave/></button>
            <button><BiPrinter/></button>
            <button><BiSearch/></button>
            <button><BiInfoCircle /></button>
            <button><GiMoneyStack /></button>
        </div>
    )
}