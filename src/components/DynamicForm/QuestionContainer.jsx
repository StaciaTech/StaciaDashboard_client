import { React, useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../../styles/DynamicForm.css";
import ReactQuill from "react-quill";
import { updateFormDescription, updateFormTitile } from "../../redux/FormSlice";
import { useDispatch } from "react-redux";

function QuestionContainer({ id, children, title, activeContainerIndex }) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });

  const toolbarOptions = [
    ["bold", "italic", "underline"],
    ["link", "image"],
  ];
  const module = {
    toolbar: toolbarOptions,
  };

  const dispatch = useDispatch();
  const [isFocusedTitle, setIsFocusedTitle] = useState(false);
  const [isFocusedDescription, setIsFocusedDescription] = useState(false);

  const handleContainerTitleChange = (value) => {
    dispatch(updateFormTitile({ value, activeContainerIndex }));
  };

  return (
    <>
      <div
        {...attributes}
        ref={setNodeRef}
        style={{
          transition,
          transform: CSS.Translate.toString(transform),
        }}
      >
        <div>
          <div>
            <div>
              {/* <ReactQuill
                modules={module}
                theme="snow"
                value={title.title}
                onFocus={() => setIsFocusedTitle(true)}
                onBlur={() => setIsFocusedTitle(false)}
                onChange={handleContainerTitleChange}
                style={{ backgroundColor: "#0047ff" }}
              /> */}
            </div>
            <div>
              {/* <ReactQuill
                modules={module}
                theme="snow"
                value={title.formDescription}
                onFocus={() => setIsFocusedDescription(true)}
                onBlur={() => setIsFocusedDescription(false)}
                style={{ backgroundColor: "#0047ff" }}
              /> */}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export default QuestionContainer;
