import type { Task } from "@dtypes/task/task";
import TaskDetailPanel from "./TaskDetailPanel";

/**
 * 
 */
interface TaskDetailPanelView {
    tasks: Task[];
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TaskDetailPanelView({ 
    tasks,
}: TaskDetailPanelView) {


    return (
        <>
            {tasks.map(task => (
                <TaskDetailPanel key={task.taskID} task={task}/>
            ))}
        </>
    );
}