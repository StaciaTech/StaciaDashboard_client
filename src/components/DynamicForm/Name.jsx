import React from "react";
import ReactQuill from "react-quill";
import "../../styles/DynamicForm.css";
import { useDispatch } from "react-redux";
import { updateItemQuestion } from "../../redux/FormSlice";

function Name({
  id,
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const dispatch = useDispatch();
  const handleQuestionChange = (value) => {
    dispatch(updateItemQuestion({ value, id, containerIndex }));
  };

  return (
    <>
      <div>
        {questionIndex + 1}
        <ReactQuill
          modules={module}
          theme="snow"
          onFocus={() => setOpenQuestion(question.id)}
          onBlur={() => setOpenQuestion(null)}
          value={question.question}
          onChange={handleQuestionChange}
        />
      </div>
      <div>
        <div>{question.firstName}</div>
        <div>{question.lastName}</div>
      </div>
    </>
  );
}

export default Name;
