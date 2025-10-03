import TaskDetailPanelView from "@components/task/TaskDetailPanelView"
import type { Task } from "@dtypes/task/task";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TASKS: Task[] = [
  {
    taskID: uuidv4(), 
    description: "The service including all the checks as well as the oil change. The service including all the checks as well as the oil change. The service including all the checks as well as the oil change. The service including all the checks as well as the oil change.", 
    title: "2. Year Service",  
    isWarranty: true
  },
  // {
  //   taskID: uuidv4(), 
  //   description: "description", 
  //   title: "Oil change", 
  //   isWarranty: false,
  // }
]

/**
 * 
 * @returns 
 */
function App() {

  const [tasks, setTasks] = useState<Task[]>(TASKS);

  return (
    <>
      <TaskDetailPanelView tasks={tasks}/>
    </>
  )
}

export default App
