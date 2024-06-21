import React from "react";
import ReactQuill from "react-quill";
import { updateItemQuestion } from "../../../redux/FormSlice";
import { useDispatch } from "react-redux";
import "../../../styles/DynamicForm.css";

function StateQuestion({
  id,
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const dispatch = useDispatch();
  const handleQuestionChange = (newQuestion) => {
    dispatch(updateItemQuestion({ containerIndex, questionIndex, newQuestion }));
  };
  return (
    <>
      <div>
        <div>
          <ReactQuill
            modules={module}
            theme="snow"
            className={`custom ${openQuestion === question.id ? "focus" : ""}`}
            onFocus={() => setOpenQuestion(question.id)}
            onBlur={() => setOpenQuestion(null)}
            value={question.question}
            onChange={handleQuestionChange}
          />
        </div>
        <div className="answer-container">{question.placeHolder}</div>
      </div>
    </>
  );
}

export default StateQuestion;
