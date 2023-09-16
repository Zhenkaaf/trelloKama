import { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./components/todolist/Todolist";
import { v1 } from "uuid";
import AddItemForm from "./components/todolist/AddItemForm";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Grid, Paper } from "@mui/material";

export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
type TaskStateType = {
  [key: string]: Array<TaskType>;
};
/////////////////////////////////////////////////////
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

  const [tasks, setTasks] = useState<TaskStateType>({
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
    const todoList = todoLists.find((item) => item.id === todoListId);
    if (todoList) {
      todoList.filter = value;
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

  const editTask = (newTitle: string, listId: string, taskId: string) => {
    const task = tasks[listId].find((item) => item.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasks });
    }
  };

  const editListTitle = (newTitle: string, listId: string) => {
    const todoList = todoLists.find((item) => item.id === listId);
    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid
          container
          style={{ padding: "20px" }}
        >
          <AddItemForm addItem={addItemTodoList} />
        </Grid>
        <Grid
          container
          spacing={5}
        >
          {todoLists.map((item) => {
            let filteredTasks = tasks[item.id];
            if (item.filter === "completed") {
              filteredTasks = filteredTasks.filter(
                (item) => item.isDone === true
              );
            }
            if (item.filter === "active") {
              filteredTasks = filteredTasks.filter(
                (item) => item.isDone === false
              );
            }
            return (
              <Grid item>
                <Paper
                  elevation={3}
                  style={{ padding: "10px" }}
                >
                  <TodoList
                    key={item.id}
                    listId={item.id}
                    title={item.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatusTask={changeStatusTask}
                    filter={item.filter}
                    removeList={removeList}
                    editTask={editTask}
                    editListTitle={editListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
