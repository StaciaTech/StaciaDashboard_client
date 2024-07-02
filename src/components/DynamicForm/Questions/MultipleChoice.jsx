import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../../../styles/DynamicForm.css"
import { useDispatch } from "react-redux";
import {
  addOptionSingleChoiceop,
  deleteSingleChoiseOption,
  updateItemQuestion,
  updateSingleChoiceOp,
} from "../../../redux/FormSlice";
import { useSelector } from "react-redux";
import MultipleIcon from "../../../assets/multipleChoiceIcon.svg"
import PlusIcon from "../../../assets/PlusForm.svg"
import DndIcon from "../../../assets/DragandDropicon.svg"
import TrashIcon from "../../../assets/binForm.svg"


function MultipleChoice({
  id,
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const [multiOtionFocused, setMultiOptionfocused] = useState(null);
  const dispatch = useDispatch();
  const handleQuestionChange = (newQuestion) => {
    dispatch(
      updateItemQuestion({ newQuestion, questionIndex, containerIndex })
    );
  };
  const handleOptionTextChange = (optionIndex, option) => {
    dispatch(
      updateSingleChoiceOp({
        optionIndex,
        questionIndex,
        containerIndex,
        option,
      })
    );
  };

  const deleteSingleChoiceOp = (optionIndex) => {
    dispatch(
      deleteSingleChoiseOption({ optionIndex, questionIndex, containerIndex })
    );
  };

  const addNewOption = () => {
    dispatch(addOptionSingleChoiceop({ questionIndex, containerIndex }));
  };
  return (
    <>
      <div className="singleQuestion-Container">
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
      <div>
        {question.options.map((data, index) => (
          <div
            className="choice-box"
            key={index}
            onClick={() => setMultiOptionfocused(data.id)}
          >
            <img src={MultipleIcon} alt="singleChoiceIcon" />
            <input
              type="text"
              placeholder={`Add choice ${data.optionText}`}
              value={data.optionText}
              className="choice-input"
              onFocus={() => {
                setMultiOptionfocused(data.id); // Set focused question ID
              }}
              onChange={(e) => handleOptionTextChange(index, e.target.value)}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "4rem" }}>
              <img
                src={DndIcon}
                alt="optionDND"
                style={{
                  display: multiOtionFocused === data.id ? "block" : "none",
                }}
              />
              <img
                src={TrashIcon}
                alt="trash"
                style={{
                  display: multiOtionFocused === data.id ? "block" : "none",
                }}
                className="optionTrash"
                onClick={() => deleteSingleChoiceOp(index)}
              />
            </div>
          </div>
        ))}
        <div
          className="column_add_button"
          onClick={() => addNewOption()}
        >
          <img src={PlusIcon} alt="addSingleOptionButton" />
          <p className="add-Option">Add Option</p>
        </div>
      </div>
    </>
  );
}

export default MultipleChoice;
