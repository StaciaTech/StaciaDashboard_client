import { React, useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../../styles/DynamicForm.css";
import { FormContext } from "../../context/FormContext";
import { useDraggable } from "@dnd-kit/core";

function TextComponent({ id, text, icon }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { openQuestion } = useContext(FormContext);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: id,
      data: {
        type: "text",
        text,
      },
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleDragOver = () => {
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {icon}
        {text}
        {isDraggingOver && <div>Drop here</div>}
      </div>
    </>
  );
}

export default TextComponent;
