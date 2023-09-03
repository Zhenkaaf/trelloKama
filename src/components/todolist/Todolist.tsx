import { FilterValuesType } from "../../App";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  setFilter: (value: FilterValuesType) => void;
};

const TodoList = (props: PropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input type="text" />
        <button>+</button>
        <ul>
          {props.tasks.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                //checked={item.isDone}
                defaultChecked={item.isDone}
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
