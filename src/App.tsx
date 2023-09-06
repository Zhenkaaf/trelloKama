import { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./components/todolist/Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  console.log("rerender");
  const initTasks: Array<TaskType> = [
    { id: v1(), title: "audi", isDone: true },
    { id: v1(), title: "skoda", isDone: false },
    { id: v1(), title: "volkswagen", isDone: true },
  ];
  const [tasks, setTasks] = useState(initTasks);
  //const [tasks, setTasks] = useState(<Array<TaskTypes>>);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  const removeTask = (taskId: string) => {
    const resultTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(resultTasks);
  };

  const addTask = (title: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter((item) => item.isDone === true);
  }
  if (filter === "active") {
    filteredTasks = tasks.filter((item) => item.isDone === false);
  }

  const changeStatusTask = (taskId: string, isDone: boolean) => {
    const task = tasks.find((item) => item.id === taskId);
    if (task) {
      task.isDone = !isDone;
    }

    setTasks([...tasks]);
  };

  return (
    <div className="App">
      <TodoList
        title="Cars"
        tasks={filteredTasks}
        removeTask={removeTask}
        setFilter={setFilter}
        addTask={addTask}
        changeStatusTask={changeStatusTask}
      />
    </div>
  );
}

export default App;
