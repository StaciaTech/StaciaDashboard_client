import { React, useState } from "react";
import ReactQuill from "react-quill";

function SingleChoice({
  id,
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const [singleOptionFocused, setSingleOptionfocused] = useState(null);
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
          //   onChange={(html) => {
          //     handleQuestionChange(question.id, html);
          //   }}
        />
      </div>
      <div>
        {question.options.map((data, index) => (
          <div className="choice-box" key={index}>
            <img src={""} alt="singleChoiceIcon" />
            <input
              type="text"
              placeholder={`Add choice ${data.optionText}`}
              // {...register(`input${data.count}`)}
              value={data.optionText}
              className="choice-input"
              onFocus={() => {
                setSingleOptionfocused(data.id); // Set focused question ID
              }}
              onBlur={() => {
                setSingleOptionfocused(null); // Clear focused question ID
              }}
              // onChange={(e) =>
              //   handleOptionTextChange(question.id, index, e.target.value)
              // }
            />
            <img
              src={""}
              alt="optionDND"
              style={{
                display: singleOptionFocused === data.id ? "block" : "none",
              }}
              className="optionTrash"
            />
            <img
              src={""}
              alt="trash"
              style={{
                display: singleOptionFocused === data.id ? "block" : "none",
              }}
              className="optionTrash"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default SingleChoice;
