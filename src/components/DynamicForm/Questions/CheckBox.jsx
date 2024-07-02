import { React, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import CheckBoxIcon from "../../../assets/CheckBox.svg";
import PlusIcon from "../../../assets/PlusForm.svg";
import DndIcon from "../../../assets/DragandDropicon.svg";
import TrashIcon from "../../../assets/binForm.svg";
import {
    addOptionSingleChoiceop,
    deleteSingleChoiseOption,
    updateItemQuestion,
    updateSingleChoiceOp,
} from "../../../redux/FormSlice";

function CheckBox({
  id,
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const [whenFocused, setWhenFocused] = useState(null);
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
        dispatch(addOptionSingleChoiceop({ questionIndex, containerIndex }))
    }

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
              className="check-box-choice-box"
              onClick={() => setWhenFocused(data.id)}
            >
              <img src={CheckBoxIcon} alt="" />
              <input
                type="text"
                value={data.optionText}
                name=""
                id=""
                className="choice-input"
                onFocus={() => setWhenFocused(data.id)}
                onChange={(e)=>handleOptionTextChange(index,e.target)}
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "4rem" }}
              >
                <img
                  src={DndIcon}
                  alt=""
                  style={{
                    display: whenFocused === data.id ? "block" : "none",
                  }}
                />
                <img
                  src={TrashIcon}
                  alt=""
                  className="optionTrash"
                  style={{
                    display: whenFocused === data.id ? "block" : "none",
                  }}
                  onClick={()=>deleteOption}
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

export default CheckBox;
