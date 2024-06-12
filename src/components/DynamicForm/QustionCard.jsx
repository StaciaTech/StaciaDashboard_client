import { React, useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Name from "./Name";
import AVFileUploadQuestion from "./Questions/AVFileUploadQuestion";
import DateAndTime from "./Questions/DateAndTime";
import DateQuestion from "./Questions/DateQuestion";
import EmailQuestion from "./Questions/EmailQuestion";
import FileUploadQuestion from "./Questions/FileUploadQuestion";
import LineScale from "./Questions/LineScale";
import MultipleChoice from "./Questions/MultipleChoice";
import MultipleChoicegridQuestion from "./Questions/MultipleChoicegridQuestion";
import NumberQuestion from "./Questions/NumberQuestion";
import ShortAnswer from "./Questions/ShortAnswer";
import PhoneQuestion from "./Questions/PhoneQuestion";
import Paragraph from "./Questions/Paragraph";
import SignatureQuestion from "./Questions/SignatureQuestion";
import SingleChoice from "./Questions/SingleChoice";
import SpinnerQuestion from "./Questions/SpinnerQuestion";
import Website from "./Questions/Website";
import CheckBoxQuestion from "./Questions/CheckBoxQuestion";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../redux/FormSlice";
import { FormContext } from "../../context/FormContext";

function QustionCard({ id, question, questionIndex, containerIndex }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });
  const toolbarOptions = [
    ["bold", "italic", "underline"],
    ["link", "image"],
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  const handleRequiredChange = (id, value) => {
    console.log(id, value);
  };
  const {
    openQuestion,
    setOpenQuestion,
    activeQuestion,
    setActiveQuestion,
    setOpenQuestionSetting,
  } = useContext(FormContext);

  const openSetting = (question) => {
    setOpenQuestionSetting(question);
  };

  const dispatch = useDispatch();
  const handleDeleteQuestion = (id, containerIndex) => {
    dispatch(deleteQuestion(id, containerIndex));
  };

  return (
    <div style={{ display: "flex", gap: "0.8rem" }}>
      <div
        key={question.id}
        className="QuestionContainer"
        ref={setNodeRef}
        {...attributes}
        style={{
          borderBottom: activeQuestion === question.id && "6px solid #1B51BB",
          //   boxShadow: "0px -5px 5px rgba(0, 0, 0, 0.3)"
          boxShadow: activeQuestion === question.id && "3px 3px 32px 0 #bcb9b9",
        }}
        onClick={() => setActiveQuestion(question.id)}
      >
        <div className="dndIcon">
          <img src={""} alt="dndIcon" {...listeners} />
        </div>
        {renderItemComponent(
          question,
          module,
          questionIndex,
          openQuestion,
          setOpenQuestion,
          containerIndex
        )}
        <div className="required-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={question.required}
              onChange={(e) =>
                handleRequiredChange(question.id, e.target.checked)
              }
            />
            <span className="slider"></span>
          </label>
          <p className="required-text">Required</p>
        </div>
      </div>
      {activeQuestion === question.id && (
        <div className="container-right">
          <img src={""} alt="" onClick={() => console.log("hello")} />
          <img src={""} alt="" onClick={() => openSetting(question.id)} />
          <img src={""} alt="" onClick={() => console.log("hello")} />
          <img src={""} alt="" onClick={() => console.log("hello")} />
          <img
            src={""}
            alt=""
            onClick={() => handleDeleteQuestion(question.id, containerIndex)}
          />
        </div>
      )}
    </div>
  );
}

const renderItemComponent = (
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex
) => {
  switch (question.type) {
    case "Short Answer":
      return (
        <ShortAnswer
          question={question}
          module={module}
          questionIndex={questionIndex}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          containerIndex={containerIndex}
          id={question.id}
        />
      );
    case "Paragraph":
      return (
        <Paragraph
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          containerIndex={containerIndex}
          id={question.id}
        />
      );
    case "Check Box":
      return (
        <MultipleChoice
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Multiple Choice":
      return (
        <SingleChoice
          question={question}
          module={module}
          questionIndex={questionIndex}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          containerIndex={containerIndex}
          id={question.id}
        />
      );
    case "Name":
      return (
        <Name
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Line Scale":
      return (
        <LineScale
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Phone":
      return (
        <PhoneQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Email":
      return (
        <EmailQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Website":
      return (
        <Website
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Number":
      return (
        <NumberQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Spinner":
      return (
        <SpinnerQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Signature":
      return (
        <SignatureQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "File Upload":
      return (
        <FileUploadQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Audio/Video Upload":
      return (
        <AVFileUploadQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Date":
      return (
        <DateQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Date - Time":
      return (
        <DateAndTime
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Multiple Choice grid":
      return (
        <MultipleChoicegridQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Check box grid":
      return (
        <CheckBoxQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    default:
      return null;
  }
};

export default QustionCard;
