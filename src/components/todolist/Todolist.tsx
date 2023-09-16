import { IconButton } from "@mui/material";
import { FilterValuesType } from "../../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatusTask: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  filter: FilterValuesType;
  listId: string;
  removeList: (todoListId: string) => void;
  editTask: (newTitle: string, listId: string, taskId: string) => void;
  editListTitle: (newTitle: string, listId: string) => void;
};
///////////////////////////////////////////////
const TodoList = (props: PropsType) => {
  const addTaskWrapper = (title: string) => {
    props.addTask(title, props.listId);
  };

  return (
    <div>
      <h3>
        <EditableSpan
          title={props.title}
          editTaskHandler={(newTitle) => {
            props.editListTitle(newTitle, props.listId);
          }}
        />
        <IconButton
          onClick={() => props.removeList(props.listId)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </h3>

      <div>
        <AddItemForm addItem={addTaskWrapper} />
        <div>
          <Stack
            direction="row"
            spacing={2}
          >
            <Button
              variant={props.filter === "all" ? "outlined" : "text"}
              onClick={() => props.changeFilter("all", props.listId)}
            >
              All
            </Button>
            <Button
              variant={props.filter === "active" ? "outlined" : "text"}
              onClick={() => props.changeFilter("active", props.listId)}
            >
              Active
            </Button>
            <Button
              variant={props.filter === "completed" ? "outlined" : "text"}
              onClick={() => props.changeFilter("completed", props.listId)}
            >
              Completed
            </Button>
          </Stack>
        </div>
        <ul>
          {props.tasks.map((item) => (
            <li
              key={item.id}
              className={item.isDone ? "is__done" : ""}
            >
              <Checkbox
                color="success"
                checked={item.isDone}
                onChange={() =>
                  props.changeStatusTask(item.id, item.isDone, props.listId)
                }
              />

              <EditableSpan
                title={item.title}
                editTaskHandler={(newTitle) =>
                  props.editTask(newTitle, props.listId, item.id)
                }
              />

              <IconButton
                onClick={() => props.removeTask(item.id, props.listId)}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
