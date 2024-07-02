import React from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { updateItemQuestion } from "../../../redux/FormSlice";

function Paragraph({
  question,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  module,
  containerIndex,
  id,
}) {
  const dispatch = useDispatch();
  const handleQuestionChange = (newQuestion) => {
    dispatch(updateItemQuestion({ containerIndex, questionIndex, newQuestion }));
  };
  return (
    <>
      <div className="singleQuestion-Container">
        {/* {questionIndex + 1}. */}
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
    </>
  );
}

export default Paragraph;
