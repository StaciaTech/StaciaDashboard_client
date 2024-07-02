import { React, useState } from "react";
import "../../styles/settings.css";
import Modal from "react-modal";

const mails = [
  {
    id: 0,
    item: "Mail1",
  },
  {
    id: 1,
    item: "Mail2",
  },
  {
    id: 2,
    item: "Mail3",
  },
  {
    id: 3,
    item: "Mail4",
  },
];

function MailTemplate({ setShowTempLayout, handleTabClick, setMailId }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const modalStyle = {
    overlay: {
      backgroundColor: "#0002",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "38rem",
      height: "auto",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "1.5rem",
      font: "Euclid Circular A",
    },
  };

  return (
    <>
      <div>
        <div>
          <div onClick={() => setShowTempLayout(false)}>
            <span style={{ cursor: "pointer" }}>{"<"} Back </span>
          </div>
          <div className="template-nav">
            <div
              className="template-nav-item"
              onClick={() => handleTabClick("job")}
            >
              Job Post Templates
            </div>
            <div
              className="template-nav-item active"
              onClick={() => handleTabClick("mail")}
            >
              Mail Templates
            </div>
            <div
              className="template-nav-item"
              onClick={() => handleTabClick("status")}
            >
              Status Templates
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div
            className="template-cards"
            style={{ color: "#0047ff" }}
            onClick={openModal}
          >
            + Add Template
          </div>
          {mails.map((eachMail, index) => (
            <div
              key={index}
              className="template-cards"
              onClick={() => {
                handleTabClick("mail-form");
                setMailId(eachMail.id);
              }}
            >
              {eachMail.item}
            </div>
          ))}
        </div>
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>Add Template</div>
              <div onClick={closeModal}>X</div>
            </div>
            <input
              type="text"
              name=""
              id=""
              className="profile-input-fields"
              placeholder="Enter Template Name"
              style={{ padding: "0rem 1rem" }}
            />
            <button
              style={{
                padding: "0.75rem",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#0047ff",
                color: "#fff",
              }}
              onClick={closeModal}
            >
              Continue
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default MailTemplate;
