import React from "react";
import ReactQuill from "react-quill";

function DateAndTime({
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
          className="calander"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{
              width: "35%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div>/</div>
            <div>/</div>
          </div>
          <img src={""} alt="calendarIcon" className="calanderIcon" />
        </div>
        <div
          className="time"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{
              width: "28%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div>/</div>
            <div>/</div>
          </div>
          <img src={""} alt="calendarIcon" className="calanderIcon" />
        </div>
      </div>
    </>
  );
}

export default DateAndTime;
