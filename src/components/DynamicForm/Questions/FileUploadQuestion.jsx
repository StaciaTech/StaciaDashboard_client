import React from "react";
import ReactQuill from "react-quill";
import FileUploadIcon from "../../../assets/FormFileUploadIcon.svg"
import "../../../styles/DynamicForm.css"

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
        {/* {questionIndex + 1}. */}
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
        <img src={FileUploadIcon} alt="formFileUploadIcon" />
        <div className="fileUpload_text_container">
          <p className="text">Select a file or drag and drop here</p>
          <p className="sub-text">JPG, PNG or PDF, file size no more than 10MB</p>
        </div>
        <div className="file-select">Select File</div>
      </div>
    </>
  );
}

export default FileUploadQuestion;
