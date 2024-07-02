import React from "react";

function MailSettingForm({ id, handleTabClick }) {
  return (
    <>
      <div>
        <div
          style={{ color: "#787878", resize: "vertical" }}
          onClick={() => handleTabClick("mail")}
        >
          {"<"} Back
        </div>
        <div
          style={{
            margin: "1rem 0rem",
            height: "auto",
            // resize: "vertical",
          }}
        >
          <textarea
            name=""
            id=""
            placeholder="Enter Your Mail Format"
            style={{
              width: "100%",
              height: "auto",
              minHeight: "33rem",
              resize: "vertical",
              borderRadius: "1rem",
              padding: "2rem 1.5rem",
              fontSize: "1rem",
              fontFamily: "EuclidMedium",
              overflow: "hidden",
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default MailSettingForm;
