import React from "react";
import dived from "../assets/dived.svg";
import whiteDived from "../assets/whiteDived.svg";
import DropDown from "../assets/DropDown.svg";
import WhiteDD from "../assets/whiteDD.svg";
import "../App.css";

const Archive = ({ changeandupdate, btnStatus, show }) => {
  return (
    <div>
      <div
        style={{
          background: btnStatus === "Save as" ? "#ffffff" : "#0047FF",

          color: btnStatus === "Save as" ? "#0047FF" : "#ffffff",
        }}
        className="saveasbtn bor"
      >
        <div
          onClick={() => changeandupdate("Save as")}
          style={{
            width: "130px",
            height: "59px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {btnStatus}
        </div>
        {btnStatus === "Save as" ? (
          <img
            src={dived}
            alt=""
            style={{
              paddingLeft: "14px",
            }}
          />
        ) : (
          <img
            src={whiteDived}
            alt=""
            style={{
              paddingLeft: "14px",
            }}
          />
        )}

        {btnStatus === "Save as" ? (
          <img
            src={DropDown}
            alt=""
            onClick={() => changeandupdate(!show)}
            style={{
              paddingLeft: "14px",
              cursor: "pointer",
            }}
          />
        ) : (
          <img
            src={WhiteDD}
            alt=""
            onClick={() => changeandupdate(!show)}
            style={{
              paddingLeft: "14px",
              cursor: "pointer",
            }}
          />
        )}
      </div>

      {show ? (
        <div className="BtnHead">
          <Btn
            btnText={"Archive"}
            fn={() => changeandupdate("Save as Archive")}
            stylese={"saveasbtn archive-Draft"}
          ></Btn>
          {/* <button
            className="saveasbtn archive-Draft"
            onClick={() => changeandupdate()}
          >
            Archive
          </button> */}

          <div className="border"></div>
          {/* <button className="saveasbtn archive-Draft" onClick={changeandupdate}>
            Draft
          </button> */}
          <Btn
            btnText={"Draft"}
            fn={() => changeandupdate("Save as Darft")}
            stylese={"saveasbtn archive-Draft"}
          ></Btn>
        </div>
      ) : null}
    </div>
  );
};

const Btn = ({ fn, btnText, stylese }) => {
  return (
    <button className={stylese} onClick={fn}>
      {btnText}
    </button>
  );
};

export default Archive;
