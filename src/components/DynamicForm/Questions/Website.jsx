import React from "react";
import ReactQuill from "react-quill";

function Website({
  id,
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const handleQuestionChange = () => {};
  console.log(question);
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
          onChange={handleQuestionChange}
        />
      </div>
      <div className="nameAns_container">
        <div className="Name" style={{ display: "flex", gap: "0.5rem" }}>
          <img src={""} alt="Website_Link" />
          {question.palceHolder}
        </div>
      </div>
    </>
  );
}

export default Website;
