import { usePartWrapperState } from "./Part.hooks";
import PartFieldView from "./PartFieldView";

interface PartFieldViewWrapperProps {
    taskID: string;
    onChange: () => void;
}

export default function PartFieldViewWrapper({
    taskID,
    onChange,
}: PartFieldViewWrapperProps) {

    const { parts } = usePartWrapperState(taskID);

    return (
        <PartFieldView parts={parts} onChange={onChange}/>
    );
}