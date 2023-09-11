import { FilterValuesType } from "../../App";
import AddItemForm from "./AddItemForm";

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
  id: string;
  removeList: (todoListId: string) => void;
};
///////////////////////////////////////////////
const TodoList = (props: PropsType) => {
  const addTaskWrapper = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        {props.title}{" "}
        <button onClick={() => props.removeList(props.id)}>DelList</button>
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
                  props.changeStatusTask(item.id, item.isDone, props.id)
                }
              />
              <span>{item.title}</span>
              <button onClick={() => props.removeTask(item.id, props.id)}>
                Del
              </button>
            </li>
          ))}
        </ul>
        <div>
          <button
            className={props.filter === "all" ? "active__filter" : ""}
            onClick={() => props.changeFilter("all", props.id)}
          >
            All
          </button>
          <button
            className={props.filter === "active" ? "active__filter" : ""}
            onClick={() => props.changeFilter("active", props.id)}
          >
            Active
          </button>
          <button
            className={props.filter === "completed" ? "active__filter" : ""}
            onClick={() => props.changeFilter("completed", props.id)}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
