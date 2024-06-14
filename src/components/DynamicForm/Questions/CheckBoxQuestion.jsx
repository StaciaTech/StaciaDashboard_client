import React from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { addMultiChoice, deleteMultiChoice } from "../../../redux/FormSlice";

function CheckBoxQuestion({
  id,
  question,
  module,
  questionIndex,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const dispatch = useDispatch();
  const handelAdd = (text) => {
    dispatch(addMultiChoice({ text, containerIndex, id }));
  };

  const handelDel = (text, optionIndex) => {
    dispatch(deleteMultiChoice({ id, containerIndex, optionIndex, text }));
  };

  return (
    <>
      <div>
        {/* {questionIndex + 1} */}
        <ReactQuill
          modules={module}
          theme="snow"
          onFocus={() => setOpenQuestion(question.id)}
          onBlur={() => setOpenQuestion(null)}
          value={question.question}
        />
      </div>
      <div className="multiple-Choice-Conitaner">
        <div className="rowContainer">
          {question.row.map((r, i) => {
            return (
              <div className=" inside_container">
                <div className="indise_RowConrainer ">
                  <div>{i + 1}.</div>
                  <input value={r.rowText} />
                </div>
                {question.row.length > 1 ? (
                  <img
                    src={""}
                    alt="propertiesCloseIcon"
                    onClick={() => handelDel("row", r.id)}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
          <div className="column_add_button" onClick={() => handelAdd("row")}>
            <p>{question.row.length + 1}.</p>{" "}
            <p className="add-Option">Add Columns</p>
          </div>
        </div>
        <div className="rowContainer">
          {question.column.map((c, i) => {
            return (
              <div className="inside_container">
                <div className="indise_RowConrainer ">
                  <img src={""} alt="multiChoiceIcon" />
                  <input value={c.columnText} />
                </div>
                {question.column.length > 1 ? (
                  <img
                    src={""}
                    alt="propertiesCloseIcon"
                    onClick={() => handelDel("column", c.id)}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
          <div
            className="column_add_button"
            onClick={() => handelAdd("column")}
          >
            <p className="add-Option">Add Columns</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckBoxQuestion;
