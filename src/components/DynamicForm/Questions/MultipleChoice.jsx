import { React, useState } from "react";
import ReactQuill from "react-quill";
import { useSortable } from "@dnd-kit/sortable";

function MultipleChoice({ id, question, questionIndex, module }) {
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

  const [multiOptionFocused, setMultiOptionfocused] = useState(null);
  return (
    <>
      <div className="singleQuestion-Container">
        {/* {questionIndex + 1}. */}
        {/* {isFocusedQuestion ? (
      <ReactQuill
        modules={module}
        theme="snow"
        value={question.question}
        onChange={(html) => {
          handleQuestionChange(question.id, html);
        }}
      />
    ) : ( */}
        <ReactQuill
          modules={module}
          theme="snow"
          className={`custom `}
          // onFocus={() => {
          //   setFocusedQuestionId(question.id); // Set focused question ID
          // }}
          // onBlur={() => {
          //   setFocusedQuestionId(null); // Clear focused question ID
          // }}
          value={question.question}
          // onChange={(html) => {
          //   handleQuestionChange(question.id, html);
          // }}
        />
        {/* )} */}
      </div>
      <div>
        {question.options.map((data, index) => (
          <div className="choice-box" key={index}>
            <img src={""} alt="multiChoiceIcon" />
            <input
              type="text"
              placeholder={`Add choice ${data.optionText}`}
              // {...register(`input${data.count}`)}
              value={data.optionText}
              className="choice-input"
              onFocus={() => {
                setMultiOptionfocused(data.id); // Set focused question ID
              }}
              onBlur={() => {
                setMultiOptionfocused(null); // Clear focused question ID
              }}
              // onChange={(e) =>
              //   handleOptionTextChange(question.id, index, e.target.value)
              // }
            />
            <img src={""} alt="optionDND" className="optionTrash" />
            <img src={""} alt="trash" className="optionTrash" />
          </div>
        ))}
      </div>
    </>
  );
}

export default MultipleChoice;
