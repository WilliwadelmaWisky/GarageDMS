import TaskCard from "@components/TaskCard"

/**
 * 
 * @returns 
 */
function App() {

  return (
    <>
      <TaskCard task={{id: "hello", description: "description", title: "Oil change", invoice: "he", work: [ {id: "1", title: "Service", expectedDuration: 1.2, actualDuration: 0, hourlyRate: 100, discount: 0.05}], parts: []}}/>
      <TaskCard task={{id: "hello", description: "description", title: "Oil change", work: [], parts: []}}/>
    </>
  )
}

export default App
