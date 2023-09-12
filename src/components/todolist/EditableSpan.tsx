import { useRef, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  editTaskHandler: (value: string) => void;
};
//////////////////////////////////////////////////////////////
const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const newTitle = useRef<HTMLInputElement | null>(null);
  const activateEditMode = () => {
    setEditMode(true);
  };
  const deActivateEditMode = () => {
    setEditMode(false);
    if (newTitle.current) {
      props.editTaskHandler(newTitle.current.value.trim());
    }
  };

  return editMode ? (
    <input
      type="text"
      defaultValue={props.title}
      onBlur={deActivateEditMode}
      autoFocus
      ref={newTitle}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
export default EditableSpan;
