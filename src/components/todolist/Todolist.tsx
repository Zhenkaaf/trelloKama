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
  removeTask: (id: string) => void;
  setFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeStatusTask: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

const TodoList = (props: PropsType) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<boolean>(false);

  const addTaskHandler = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      props.addTask(inputRef.current.value.trim());
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
      <h3>{props.title}</h3>
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
                onChange={() => props.changeStatusTask(item.id, item.isDone)}
              />
              <span>{item.title}</span>
              <button onClick={() => props.removeTask(item.id)}>Del</button>
            </li>
          ))}
        </ul>
        <div>
          <button
            className={props.filter === "all" ? "active__filter" : ""}
            onClick={() => props.setFilter("all")}
          >
            All
          </button>
          <button
            className={props.filter === "active" ? "active__filter" : ""}
            onClick={() => props.setFilter("active")}
          >
            Active
          </button>
          <button
            className={props.filter === "completed" ? "active__filter" : ""}
            onClick={() => props.setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
