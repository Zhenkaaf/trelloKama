import { KeyboardEventHandler, useRef, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
///////////////////////////////////////////////////////////
const AddItemForm = (props: AddItemFormPropsType) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<boolean>(false);
  const enterKeyHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    setError(false);
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };
  const addTaskHandler = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      props.addItem(inputRef.current.value.trim());
      inputRef.current.value = "";
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        onKeyDown={enterKeyHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTaskHandler}>Add</button>
      {error && <div className="error__message">Field is required</div>}
    </div>
  );
};
export default AddItemForm;
