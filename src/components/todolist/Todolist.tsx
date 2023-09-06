import { KeyboardEventHandler, useRef } from "react";
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
};

const TodoList = (props: PropsType) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTaskHandler = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      props.addTask(inputRef.current.value);
      inputRef.current.value = "";
    } else {
      alert("enter title please");
    }
  };

  const enterKeyHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
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
        />
        <button onClick={addTaskHandler}>+</button>
        <ul>
          {props.tasks.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                //checked={item.isDone}
                defaultChecked={item.isDone}
                onChange={() => props.changeStatusTask(item.id, item.isDone)}
              />
              <span>{item.title}</span>
              <button onClick={() => props.removeTask(item.id)}>del</button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => props.setFilter("all")}>All</button>
          <button onClick={() => props.setFilter("active")}>Active</button>
          <button onClick={() => props.setFilter("completed")}>
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
