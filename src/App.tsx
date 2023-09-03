import { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./components/todolist/Todolist";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  const initTasks: Array<TaskType> = [
    { id: 1, title: "audi", isDone: true },
    { id: 2, title: "skoda", isDone: false },
    { id: 3, title: "volkswagen", isDone: true },
  ];
  const [tasks, setTasks] = useState(initTasks);
  //const [tasks, setTasks] = useState(<Array<TaskTypes>>);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  const removeTask = (id: number) => {
    const resultTasks = tasks.filter((item) => item.id !== id);
    setTasks(resultTasks);
  };

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter((item) => item.isDone === true);
  }
  if (filter === "active") {
    filteredTasks = tasks.filter((item) => item.isDone === false);
  }

  return (
    <div className="App">
      <TodoList
        title="Cars"
        tasks={filteredTasks}
        removeTask={removeTask}
        setFilter={setFilter}
      />
    </div>
  );
}

export default App;
