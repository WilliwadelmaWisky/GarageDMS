import type { Task } from "@dtypes/task";
import TaskCard from "./TaskCard";
import Button from "react-bootstrap/esm/Button";
import { replace } from "@utils/array-util";

/**
 * 
 */
interface ChangeEvent {
    value: Task[];
}

/**
 * 
 */
interface TaskListProps {
    tasks: Task[];
    onChange?: (e: ChangeEvent) => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TaskList({ tasks, onChange }: TaskListProps) {

    /**
     * 
     * @param task 
     */
    const handleChange = (task: Task) => {
        if (onChange === undefined) {
            return;
        }

        const index = tasks.findIndex(t => t.id === task.id);
        if (index === -1) {
            return;
        }

        onChange({ value: replace(tasks, index, task) });
    }

    return (
        <>
            <Button>Add</Button>
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} onChange={e => handleChange(e.value)}/>
            ))}
        </>
    );
}