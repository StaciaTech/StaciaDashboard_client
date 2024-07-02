import React from "react";
import ReactQuill from "react-quill";
import Flag from "../../../assets/IndiaFlag.svg"
import DownArrow from "../../../assets/DropDown.svg"


function PhoneQuestion({
  question,
  id,
  questionIndex,
  module,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const handleQuestionChange = (value) => { };
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
        <div>
          <div className="title-paddings">Answer</div>
          <div className="number-container">
            <div>
              <img src={Flag} alt="" />
            </div>
            <div className="number-seperator" />
            <div>Enter Your Number</div>
          </div>
        </div>
      </div>

    </>
  );
}

export default PhoneQuestion;
