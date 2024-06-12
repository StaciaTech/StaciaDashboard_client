import React from "react";
import ReactQuill from "react-quill";

function AVFileUploadQuestion({
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
      <div>
        {questionIndex + 1}{" "}
        <ReactQuill
          modules={module}
          theme="snow"
          onFocus={() => setOpenQuestion(question.id)}
          onBlur={() => setOpenQuestion(null)}
          value={question.question}
        />
      </div>
      <div>
        <img src="" alt="formFileUploadIcon" />
        <div>
          <p>Select a file or drag and drop here</p>
          <p>JPG,PNG or PDf file size not more than 10MB</p>
        </div>
        <div>Select File</div>
      </div>
    </>
  );
}

export default AVFileUploadQuestion;
