import React from "react";
import ReactQuill from "react-quill";

function PhoneQuestion({
  question,
  id,
  questionIndex,
  module,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const handleQuestionChange = (value) => {};
  return (
    <>
      <div className="singleQuestion_name_Container">
        {/* {questionIndex + 1}. */}
        <ReactQuill
          modules={module}
          theme="snow"
          className={`custom ${openQuestion === question.id ? "focus" : ""}`}
          onFocus={() => setOpenQuestion(question.id)}
          onBlur={() => setOpenQuestion(null)}
          value={question.question}
          onChange={(html) => {
            handleQuestionChange(question.id, html);
          }}
        />
      </div>
      <div className="nameAns_container">
        <div className="Name">{question.palceHolder}( International )</div>
      </div>
    </>
  );
}

export default PhoneQuestion;
