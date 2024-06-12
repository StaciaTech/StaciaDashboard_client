import { React, useState } from "react";
import "../../styles/settings.css";
import Modal from "react-modal";
import TemplateLayout from "./TemplateLayout";

const cardData = [
  {
    id: 0,
    item: "UI / UX",
  },
  {
    id: 1,
    item: "FrontEnd Developer",
  },
  {
    id: 2,
    item: "BackEnd Developer",
  },
  {
    id: 3,
    item: "HR Exicutive",
  },
  {
    id: 4,
    item: "Mechanical Design",
  },
];

function TemplateSettings() {
  const [showTempLayout, setShowTempLayout] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
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
      {!showTempLayout ? (
        <div>
          <div className="page-heading">Templates</div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              margin: "2rem 0rem",
              gap: "1rem",
            }}
          >
            <div
              className="template-cards"
              style={{ color: "#0047ff" }}
              onClick={openModal}
            >
              + Add Job
            </div>
            {cardData.map((eachItem, index) => (
              <div
                key={index}
                className="template-cards"
                onClick={() => {
                  setShowTempLayout(true);
                  setTitle(eachItem.item);
                  setId(eachItem.id);
                }}
              >
                {eachItem.item}
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
      ) : (
        <div>
          <TemplateLayout
            setShowTempLayout={setShowTempLayout}
            title={title}
            id={id}
          />
        </div>
      )}
    </>
  );
}

export default TemplateSettings;
