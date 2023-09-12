import { useState } from "react";

type EditableSpanPropsType = {
  title: string;
};

const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const activateEditMode = () => {
    setEditMode(true);
  };
  const deActivateEditMode = () => {
    setEditMode(false);
  };

  return editMode ? (
    <input
      type="text"
      defaultValue={props.title}
      onBlur={deActivateEditMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
export default EditableSpan;
