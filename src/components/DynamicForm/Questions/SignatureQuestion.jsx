import React from "react";
import ReactQuill from "react-quill";

function SignatureQuestion({
  id,
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const hello = question.boxWidth <= "100" ? question.boxWidth : "45%";
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

      <div
        class="container"
        style={{
          width: `${question.boxWidth}px`,
          height: `${question.boxHeight}px`,
          minWidth: "45%",
          minHeight: "12.2rem",
          maxWidth: "90%",
          maxHeight: "22rem",
        }}
      >
        <div class="content">
          <img src={""} alt="Signature" />
          <p>Signature</p>
        </div>
      </div>
    </>
  );
}

export default SignatureQuestion;
