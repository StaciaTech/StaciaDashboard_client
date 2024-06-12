import React from "react";
import ReactQuill from "react-quill";

function FileUploadQuestion({
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
      <div className="singleQuestion-Container">
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
      <div class="fileUpload_container">
        <img src={""} alt="formFileUploadIcon" />
        <div className="fileUpload_text_container">
          <p className="text">Select a file or drag and drop here</p>
          <p className="sndtext">{}</p>
        </div>
        <div className="file_select">Select File</div>
      </div>
    </>
  );
}

export default FileUploadQuestion;
