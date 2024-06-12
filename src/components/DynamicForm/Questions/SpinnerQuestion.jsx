import React from "react";
import ReactQuill from "react-quill";

function SpinnerQuestion({
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
        <div
          className="Name"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "0.6rem",
          }}
        >
          <img src={""} alt="minusIcon_spinner" />
          <p sty>{question.answer}</p>
          <img src={""} alt="plusIcon_spinner" />
        </div>
      </div>
    </>
  );
}

export default SpinnerQuestion;
