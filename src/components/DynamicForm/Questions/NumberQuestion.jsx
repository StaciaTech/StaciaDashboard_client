import React from "react";
import ReactQuill from "react-quill";

function NumberQuestion({
  id,
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  return (
    <>
      <div className="singleQuestion_name_Container">
        {questionIndex + 1}.
        <ReactQuill
          modules={module}
          theme="snow"
          className={`custom ${openQuestion === question.id ? "focus" : ""}`}
          onFocus={() => setOpenQuestion(question.id)}
          onBlur={() => setOpenQuestion(null)}
          value={question.question}
        />
      </div>
      <div className="nameAns_container">
        <div className="Name" style={{ display: "flex", gap: "0.5rem" }}>
          {question.placeHolder}( Integer )
        </div>
      </div>
    </>
  );
}

export default NumberQuestion;
