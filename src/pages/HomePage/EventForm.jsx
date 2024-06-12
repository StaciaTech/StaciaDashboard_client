import React from "react";
import FormCreate from "../../components/DynamicForm/FormCreate";
import "../../styles/WhatsNew.css";

function EventForm() {
  return (
    <>
      <div className="whatsNew-container">
        <div>Back</div>
        <div style={{ margin: "1rem 0rem" }}>
          <FormCreate />
        </div>
      </div>
    </>
  );
}

export default EventForm;
