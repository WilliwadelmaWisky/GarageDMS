import TaskList from "@components/TaskList"
import type { Task } from "@dtypes/task";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TASKS = [
  {
    id: uuidv4(), 
    description: "The service including all the checks as well as the oil change. The service including all the checks as well as the oil change. The service including all the checks as well as the oil change. The service including all the checks as well as the oil change.", 
    title: "2. Year Service", 
    //invoice: "he", 
    reports: [
      { id: uuidv4(), mechanic: "Yes", value: "Replaced the evaporator, no leaks found, the air conditioning is working as expected.", date: new Date() },
      { id: uuidv4(), mechanic: "Yes", value: "The air-conditioner piping checked, no leaks.\nThe leak is coming from the evaporator.", date: new Date() },
      { id: uuidv4(), mechanic: "Yes", value: "No leaks found after an hour of searching. Tried sniffing tools and color dye.", date: new Date() },
    ], 
    works: [ 
      {id: uuidv4(), title: "Diagnostics", expectedDuration: 1.2, actualDuration: 0, hourlyRate: 100, discount: 0.05},
      {id: uuidv4(), title: "Repair", expectedDuration: 1.2, actualDuration: 0, hourlyRate: 100, discount: 0.05}
    ], 
    parts: [
      {id: uuidv4(), name: "5w30 C3", amount: 5.2, unitPrice: 25, discount: 0},
      {id: uuidv4(), name: "Oil Filter", amount: 1, unitPrice: 25, discount: 0}
    ],
    isWarranty: true
  },
  {
    id: uuidv4(), 
    description: "description", 
    title: "Oil change", 
    reports: [],  
    works: [], 
    parts: [
      {id: uuidv4(), name: "5w30 C3", amount: 5.2, unitPrice: 25, discount: 0}
    ]
  }
]

/**
 * 
 * @returns 
 */
function App() {

  const [tasks, setTasks] = useState<Task[]>(TASKS);

  return (
    <>
      <TaskList tasks={tasks} onChange={e => {console.log("UpdateState", e.value); setTasks(e.value);}}/>
    </>
  )
}

export default App
