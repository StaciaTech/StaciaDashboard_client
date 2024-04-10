import React from "react";
import dived from "../assets/dived.svg";
import whiteDived from "../assets/whiteDived.svg";
import DropDown from "../assets/DropDown.svg";
import WhiteDD from "../assets/whiteDD.svg";
import "../App.css";

const Archive = ({ btnStatus, changeandupdate }) => {
  return (
    <div className="">
      {btnStatus ?
        <Btn
          btnText={"Archive"}
          fn={() => changeandupdate("unActivebtn")}
          stylese={"activeBtn"}
        />
        :
        <Btn
          btnText={"Archive"}
          fn={() => changeandupdate("activeBtn")}
          stylese={"unActivebtn"}
        />}
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
