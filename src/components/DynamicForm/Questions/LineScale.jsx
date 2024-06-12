import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import { updateItemQuestion } from "../../../redux/FormSlice";

function LineScale({
  question,
  id,
  questionIndex,
  module,
  openQuestion,
  setOpenQuestion,
  containerIndex,
}) {
  const dispatch = useDispatch();

  const handleQuestionChange = (value) => {};
  return (
    <>
      <div className="singleQuestion_name_Container">
        {questionIndex + 1}.
        <ReactQuill
          modules={module}
          theme="snow"
          className={`custom ${openQuestion === question.id ? "focus" : ""}`}
          onFocus={() => setOpenQuestion(question.id)}
          onBlur={() => setOpenQuestion(null)}
          value={question.question}
          onChange={(html) => handleQuestionChange(html)}
        />
      </div>
      <div
        style={{
          marginTop: "2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1.875rem",
        }}
      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
          <Select
            value={question.minRange.value}
            // onChange={(e) => handleMinRangeChange(e, question.id)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
          </Select>
        </FormControl>
        <p>to</p>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
          <Select
            value={question.maxRange.value}
            // onChange={(e) => handleMaxRangeChange(e, question.id)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="MuiSelect-select"
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="lineScale_text">
        <div
          style={{
            display: "flex",
            height: "1.8rem",
            width: "100%",
            alignItems: "center",
          }}
        >
          {question.minRange.value}.
          <input
            className="Name"
            style={{ fontSize: "1rem" }}
            value={question.placeholderMin}
          />
        </div>
        <div
          style={{
            display: "flex",
            height: "1.8rem",
            width: "100%",
            alignItems: "center",
          }}
        >
          {question.maxRange.value}.
          <input
            className="Name"
            style={{ fontSize: "1rem" }}
            value={question.placeholderMax}
          />
        </div>
      </div>
    </>
  );
}

export default LineScale;
