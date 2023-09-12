import { FilterValuesType } from "../../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
        <button onClick={() => props.removeList(props.listId)}>DelList</button>
      </h3>

      <div>
        <AddItemForm addItem={addTaskWrapper} />
        <ul>
          {props.tasks.map((item) => (
            <li
              key={item.id}
              className={item.isDone ? "is__done" : ""}
            >
              <input
                type="checkbox"
                //checked={item.isDone}
                defaultChecked={item.isDone}
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
              <button onClick={() => props.removeTask(item.id, props.listId)}>
                Del
              </button>
            </li>
          ))}
        </ul>
        <div>
          <button
            className={props.filter === "all" ? "active__filter" : ""}
            onClick={() => props.changeFilter("all", props.listId)}
          >
            All
          </button>
          <button
            className={props.filter === "active" ? "active__filter" : ""}
            onClick={() => props.changeFilter("active", props.listId)}
          >
            Active
          </button>
          <button
            className={props.filter === "completed" ? "active__filter" : ""}
            onClick={() => props.changeFilter("completed", props.listId)}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
