import { React, useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FileUploadQuestion from "./Questions/FileUploadQuestion";
import MultipleChoice from "./Questions/MultipleChoice";
import ShortAnswer from "./Questions/ShortAnswer";
import PhoneQuestion from "./Questions/PhoneQuestion";
import Paragraph from "./Questions/Paragraph";
import CountryQuestion from "./Questions/CountryQuestion";
import StateQuestion from "./Questions/StateQuestion";
import CityQuestion from "./Questions/CityQuestion";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../redux/FormSlice";
import { FormContext } from "../../context/FormContext";
import "../.././styles/DynamicForm.css";
import DndIcon from "../../assets/DragandDropicon.svg";
import PlusIcon from "../../assets/PlusForm.svg";
import Cancle from "../../assets/close-circle.svg"
import SettingsIcon from "../../assets/SettingForm.svg";
import Section from "../../assets/secitonSplitForm.svg";
import RepeatIcon from "../../assets/repeatForm.svg";
import BinIcon from "../../assets/binForm.svg";
import { SortableContext } from "@dnd-kit/sortable";
import TextComponent from "./TextComponent";
import MultipleInput from "./Questions/MultipleInput";
import DropDown from "./Questions/DropDown";
import CheckBox from "./Questions/CheckBox";

function QustionCard({ id, question, questionIndex, containerIndex, textItems, colneQuestion }) {
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
    setOpenQuestionSetting, openSideItem,
    cardDragItems,
    setCardDragItems,
    setOpenSideItems
  } = useContext(FormContext);

  const openSetting = (question) => {
    setOpenQuestionSetting(question);
  };

  const dispatch = useDispatch();
  const handleDeleteQuestion = (id, containerIndex) => {
    dispatch(deleteQuestion({ id, containerIndex }));
  };

  const [openPopItems, setOpenPopItems] = useState(false)

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <div style={{ width: "10%", display: "flex" }}>
        {/* <div>heloooo</div>   */}
        {activeQuestion === question.id && (
          <div
            className="container-right"
            style={{
              display: "flex ",
              flexDirection: "column",
              rowGap: "1rem",
              padding: "1.5rem 1rem",
              zIndex: "5",
              backgroundColor: "#fff",
              border: "2px solid #0001",
              borderRadius: "10px",
              position: "",
              width: "60px",
            }}
          >
            {/* <div>Sidebar</div> */}
            <img
              src={!openPopItems ? PlusIcon : Cancle}
              alt="Plus"
              onClick={() => setOpenPopItems(!openPopItems)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={SettingsIcon}
              alt="settings"
              onClick={() => setOpenSideItems(!openSideItem)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={Section}
              alt="section"
              onClick={() => console.log("hello")}
              style={{ cursor: "pointer" }}
            />
            <img
              src={RepeatIcon}
              alt="replace"
              onClick={() => colneQuestion(question.type, containerIndex)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={BinIcon}
              alt="Bin"
              onClick={() => {
                handleDeleteQuestion(question.id, containerIndex);
                // console.log("delete triggered", question.id, containerIndex);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        {activeQuestion === question.id && openPopItems && (
          <div
            style={{
              position: "absolute",
              marginLeft: "5rem",
              backgroundColor: "#fff",
              padding: "1rem",
              border: "1px solid #0001",
              zIndex: 3,
            }}
          >
            {/* <div>
                  <div>side Item</div>
                  <div onClick={() => setShowDragItems(false)}>X</div>
                </div> */}
            <SortableContext items={textItems.map((i) => i.id)}>
              {textItems.map((i) => (
                <div className="side-item" key={i.id}>
                  <TextComponent
                    key={i.id}
                    id={i.id}
                    text={i.text}
                    icon={i.icon}
                  />
                </div>
              ))}
            </SortableContext>
          </div>
        )}
      </div>
      <div
        key={question.id}
        className="question-container"
        ref={setNodeRef}
        {...attributes}
        style={{
          // borderBottom: activeQuestion === question.id && "6px solid #1B51BB",
          //   boxShadow: "0px -5px 5px rgba(0, 0, 0, 0.3)"
          // boxShadow: activeQuestion === question.id && "3px 3px 32px 0 #bcb9b9",
          padding: "1rem",
          border: "1px solid #0001",
          width: "90%",
        }}
        onClick={() => setActiveQuestion(question.id)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
          }}
        >
          <div>Question</div>
          <div
            style={{ display: "flex", alignItems: "center", columnGap: "1rem" }}
          >
            <div
              className="required-container"
              style={{ display: "flex", columnGap: "0.5rem" }}
            >
              <p className="required-text">Required</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) =>
                    handleRequiredChange(question.id, e.target.checked)
                  }
                />
                {/* <span className="slider"></span> */}
              </label>
            </div>
            <div>
              <img src={DndIcon} alt="" {...listeners} />
            </div>
          </div>
        </div>


        {renderItemComponent(
          question,
          module,
          questionIndex,
          openQuestion,
          setOpenQuestion,
          containerIndex
        )}
      </div>
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
  console.log(question)
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
    case "Long Answer":
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
    case "Multiple Choice":
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
    case "Multiple Input":
      return (
        <MultipleInput
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Dropdown":
      return (
        <DropDown
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Check Box":
      return (
        <CheckBox
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "Phone Number":
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
    case "Country":
      return (
        <CountryQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "State":
      return (
        <StateQuestion
          question={question}
          questionIndex={questionIndex}
          module={module}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
          id={question.id}
          containerIndex={containerIndex}
        />
      );
    case "City":
      return (
        <CityQuestion
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
