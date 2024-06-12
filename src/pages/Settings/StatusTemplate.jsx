import { React, useState } from "react";
import "../../styles/settings.css";
import Modal from "react-modal";

const stastus = [
  {
    id: 0,
    item: "Status1",
    color: "#FFE1E1",
  },
  {
    id: 1,
    item: "Status2",
    color: " #FFE1E1",
  },
  {
    id: 2,
    item: "Status3",
    color: "#FFF6D7",
  },
  {
    id: 3,
    item: "Status4",
    color: "#F4E5FF",
  },
];

function StatusTemplate({ setStatusId, setShowTempLayout, handleTabClick }) {
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
              className={`template-nav-item 
              `}
              onClick={() => handleTabClick("job")}
            >
              Job Post Templates
            </div>
            <div
              className={`template-nav-item
              `}
              onClick={() => handleTabClick("mail")}
            >
              Mail Templates
            </div>
            <div
              className="template-nav-item active"
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
          {stastus.map((eachStatus, index) => (
            <div
              key={index}
              className="template-cards"
              style={{ backgroundColor: eachStatus.color }}
              onClick={() => {
                handleTabClick("status-form");
                setStatusId(eachStatus.id);
              }}
            >
              {eachStatus.item}
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
            <div>Choose Color</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div
                className="color-ball"
                style={{ backgroundColor: "red" }}
              ></div>
              <div
                className="color-ball"
                style={{ backgroundColor: "red" }}
              ></div>
              <div
                className="color-ball"
                style={{ backgroundColor: "red" }}
              ></div>
              <div
                className="color-ball"
                style={{ backgroundColor: "red" }}
              ></div>
              <div
                className="color-ball"
                style={{ backgroundColor: "red" }}
              ></div>
              <div
                className="color-ball"
                style={{ backgroundColor: "red" }}
              ></div>
              <div
                className="color-ball"
                style={{ backgroundColor: "red" }}
              ></div>
              <input
                type="color"
                value="linear-gradient(to right, #9B59B6, #FF69B4)"
                name=""
                id=""
                className="color-ball"
                style={{ overflow: "hidden", border: "none", padding: "none" }}
                readOnly
              />
            </div>
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

export default StatusTemplate;
