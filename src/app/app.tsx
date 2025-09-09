import TaskCard from "@components/TaskCard"

/**
 * 
 * @returns 
 */
function App() {

  return (
    <>
      <TaskCard task={{
        id: "hello", 
        description: "The service including all the checks as well as the oil change. The service including all the checks as well as the oil change. The service including all the checks as well as the oil change. The service including all the checks as well as the oil change.", 
        title: "2. Year Service", 
        //invoice: "he", 
        reports: [
          { mechanic: "Yes", value: "Replaced the evaporator, no leaks found, the air conditioning is working as expected.", date: new Date() },
          { mechanic: "Yes", value: "The air-conditioner piping checked, no leaks.\nThe leak is coming from the evaporator.", date: new Date() },
          { mechanic: "Yes", value: "No leaks found after an hour of searching. Tried sniffing tools and color dye.", date: new Date() },
        ], 
        works: [ 
          {id: "1", title: "Diagnostics", expectedDuration: 1.2, actualDuration: 0, hourlyRate: 100, discount: 0.05},
          {id: "2", title: "Repair", expectedDuration: 1.2, actualDuration: 0, hourlyRate: 100, discount: 0.05}
        ], 
        parts: [
          {id: "1", name: "5w30 C3", amount: 5.2, unitPrice: 25, discount: 0},
          {id: "1", name: "Oil Filter", amount: 1, unitPrice: 25, discount: 0}
        ],
        isWarranty: true
        }}
      />
      <TaskCard task={{
        id: "hello", 
        description: "description", 
        title: "Oil change", 
        reports: [],  
        works: [], 
        parts: [
          {id: "1", name: "5w30 C3", amount: 5.2, unitPrice: 25, discount: 0}
        ]
        }}
      />
    </>
  )
}

export default App
