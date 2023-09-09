import { KeyboardEventHandler, useRef, useState } from "react";
import { FilterValuesType } from "../../App";

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

const TodoList = (props: PropsType) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<boolean>(false);

  const addTaskHandler = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      props.addTask(inputRef.current.value.trim(), props.id);
      inputRef.current.value = "";
    } else {
      setError(true);
    }
  };

  const enterKeyHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    setError(false);
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };

  return (
    <div>
      <h3>
        {props.title}{" "}
        <button onClick={() => props.removeList(props.id)}>DelList</button>
      </h3>
      <div>
        <input
          type="text"
          ref={inputRef}
          onKeyDown={enterKeyHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTaskHandler}>Add</button>
        {error && <div className="error__message">Field is required</div>}
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
