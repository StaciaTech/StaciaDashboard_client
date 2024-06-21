import { React, useState } from "react";
import ReactQuill from "react-quill";
import PlusIcon from "../../../assets/PlusForm.svg";
import DndIcon from "../../../assets/DragandDropicon.svg";
import TrashIcon from "../../../assets/binForm.svg";
import { useDispatch } from "react-redux";
import {
    addOptionSingleChoiceop,
    deleteSingleChoiseOption,
    updateItemQuestion,
    updateSingleChoiceOp,
} from "../../../redux/FormSlice";

function MultipleInput({
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
                <div style={{ margin: "1rem 0rem" }}>Answer</div>
                <div className="multipule-input-box"></div>
                <div className="add-duplicate-container">
                    <div>no of Duplicates</div>
                    <div className="add-duplicate-input">
                        <input type="number" className="add-input" />
                        <div className="plus-button">+</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MultipleInput;
