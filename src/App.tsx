import { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./components/todolist/Todolist";
import { v1 } from "uuid";
import AddItemForm from "./components/todolist/AddItemForm";

export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
function App() {
  console.log("rerender");

  /* const initTasks: Array<TaskType> = [
    { id: v1(), title: "audi", isDone: true },
    { id: v1(), title: "skoda", isDone: false },
    { id: v1(), title: "volkswagen", isDone: true },
  ];
  const [tasks, setTasks] = useState(<Array<TaskTypes>>); */

  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "cars", filter: "all" },
    { id: todoListId2, title: "title 2", filter: "all" },
  ]);

  const [tasks, setTasks] = useState({
    [todoListId1]: [
      { id: v1(), title: "audi", isDone: true },
      { id: v1(), title: "skoda", isDone: false },
      { id: v1(), title: "volkswagen", isDone: true },
    ],
    [todoListId2]: [
      { id: v1(), title: "tea", isDone: true },
      { id: v1(), title: "potatoes", isDone: false },
    ],
  });

  const removeTask = (taskId: string, todoListId: string) => {
    const filteredTasks = tasks[todoListId].filter(
      (item) => item.id !== taskId
    );
    tasks[todoListId] = filteredTasks;
    setTasks({ ...tasks });
  };

  const addTask = (title: string, todoListId: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    tasks[todoListId] = [newTask, ...tasks[todoListId]];
    setTasks({
      ...tasks,
      [newTask.id]: [],
    });
  };

  const changeStatusTask = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    const task = tasks[todoListId].find((item) => item.id === taskId);
    if (task) {
      task.isDone = !isDone;
      setTasks({ ...tasks });
    }
  };

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    const todolist = todoLists.find((item) => item.id === todoListId);
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todoLists]);
    }
    /*  const updatedTodoLists = todoLists.map((item) => {
      if (item.id === todoListId) {
        return {
          ...item,
          filter: value,
        };
      } else {
        return item;
      }
    });
    setTodoLists(updatedTodoLists); */
  };

  const removeList = (todoListId: string) => {
    const updatedTodoLists = todoLists.filter((item) => item.id !== todoListId);
    setTodoLists(updatedTodoLists);
    delete tasks[todoListId];
    setTasks({ ...tasks });
  };

  const addItemTodoList = (title: string) => {
    const newList: TodoListType = {
      id: v1(),
      title: title,
      filter: "all",
    };
    setTodoLists([newList, ...todoLists]);
    setTasks({
      ...tasks,
      [newList.id]: [],
    });
  };

  return (
    <div className="App">
      <AddItemForm addItem={addItemTodoList} />
      {todoLists.map((item) => {
        let filteredTasks = tasks[item.id];
        if (item.filter === "completed") {
          filteredTasks = filteredTasks.filter((item) => item.isDone === true);
        }
        if (item.filter === "active") {
          filteredTasks = filteredTasks.filter((item) => item.isDone === false);
        }
        return (
          <TodoList
            key={item.id}
            id={item.id}
            title={item.title}
            tasks={filteredTasks}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatusTask={changeStatusTask}
            filter={item.filter}
            removeList={removeList}
          />
        );
      })}
    </div>
  );
}

export default App;
