import { Button } from "@mui/material";
import { KeyboardEventHandler, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
///////////////////////////////////////////////////////////
const AddItemForm = (props: AddItemFormPropsType) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [myError, setMyError] = useState<boolean>(false);
  const enterKeyHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    setMyError(false);
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };
  const addTaskHandler = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      props.addItem(inputRef.current.value.trim());
      inputRef.current.value = "";
    } else {
      setMyError(true);
    }
  };

  return (
    <div className="itemForm">
      <div className="TextField">
        <TextField
          size="small"
          type="text"
          inputRef={inputRef}
          onKeyDown={enterKeyHandler}
          //className={myError ? "myError" : ""}
          label="Type value"
          helperText={myError && "Field is required"}
          error={myError}
        />
      </div>

      <div className="AddBoxIcon">
        <AddBoxIcon
          color="primary"
          onClick={addTaskHandler}
          sx={{ fontSize: 52, margin: "-7px", transition: "color 0.3s" }}
        />
      </div>

      {/*  {myError && <div className="error__message">Field is required</div>} */}
    </div>
  );
};
export default AddItemForm;
