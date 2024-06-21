import { React, useState } from "react";
import ReactQuill from "react-quill";
import "../../../styles/DynamicForm.css";
import { useDispatch } from "react-redux";
import DndIcon from "../../../assets/DragandDropicon.svg";
import TrashIcon from "../../../assets/binForm.svg";
import PlusIcon from "../../../assets/PlusForm.svg";
import {
  addOptionSingleChoiceop,
  deleteSingleChoiseOption,
  updateItemQuestion,
  updateSingleChoiceOp,
} from "../../../redux/FormSlice";

function DropDown({
  id,
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const [inputFocused, setInputFocused] = useState(null);
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
  const deleteOption = (optionIndex) => {
    dispatch(
      deleteSingleChoiseOption({ optionIndex, questionIndex, containerIndex })
    );
  };
  const addNewOption = () => {
    dispatch(addOptionSingleChoiceop({ questionIndex, containerIndex }));
  };
  return (
    <>
      <div>
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
            key={index}
            onClick={() => setInputFocused(data.id)}
            className="choice-box"
          >
            <div style={{ width: "1rem" }} >{index + 1}.</div>
            <input
              type="text"
              name=""
              id=""
              className="choice-input"
              value={data.optionText}
              onFocus={() => setInputFocused(data.id)}
              onChange={(e) => handleOptionTextChange(index, e.target.value)}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "4rem" }}>
              <img
                src={DndIcon}
                alt=""
                style={{
                  display: inputFocused === data.id ? "block" : "none",
                }}
              />
              <img
                src={TrashIcon}
                alt=""
                style={{
                  display: inputFocused === data.id ? "block" : "none",
                }}
                className="optionTrash"
                onClick={deleteOption}
              />
            </div>
          </div>
        ))}
        <div className="column_add_button" onClick={() => addNewOption()}>
          <img src={PlusIcon} alt="addSingleOptionButton" />
          <p className="add-Option">Add Option</p>
        </div>
      </div>
    </>
  );
}

export default DropDown;
