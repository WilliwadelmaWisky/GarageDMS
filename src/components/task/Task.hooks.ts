import { calcTaskTotal, isTaskInvoiced, type Task } from "@dtypes/task/task";
import { useState } from "react";

interface State {
    isInvoiced: boolean;
    total: number;
}

export function useTaskState(task: Task) {

    const [state, setState] = useState<State>(() => ({ 
        isInvoiced: isTaskInvoiced(task.taskID),
        total: calcTaskTotal(task.taskID)
    }));

    return { isInvoiced: state.isInvoiced, total: state.total, dispatch: setState };
}
