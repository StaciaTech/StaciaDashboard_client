import { React, useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../../styles/DynamicForm.css";
import ReactQuill from "react-quill";
import { updateFormDescription, updateFormTitile } from "../../redux/FormSlice";
import { useDispatch } from "react-redux";
import PlusIcon from "../../assets/PlusForm.svg";
import SettingsIcon from "../../assets/SettingForm.svg";
import Section from "../../assets/secitonSplitForm.svg";
import RepeatIcon from "../../assets/repeatForm.svg";
import BinIcon from "../../assets/binForm.svg";
import { FormContext } from "../../context/FormContext";
import { SortableContext } from "@dnd-kit/sortable";
import TextComponent from "./TextComponent";
import Cancle from "../../assets/close-circle.svg"
import SectionDragIcon from "../../assets/SectionDragIcon.svg"

function QuestionContainer({
  id,
  children,
  title,
  activeContainerIndex,
  textItems,
}) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });

  const [showToolBar, setShowToolBar] = useState(false);
  const [showDragItems, setShowDragItems] = useState(false);

  const toolbarOptions = [
    ["bold", "italic", "underline"],
    ["link", "image"],
  ];
  const module = {
    toolbar: toolbarOptions,
  };

  const dispatch = useDispatch();
  const [isFocusedTitle, setIsFocusedTitle] = useState(false);
  const [isFocusedDescription, setIsFocusedDescription] = useState(false);

  const handleContainerTitleChange = (value) => {
    dispatch(updateFormTitile({ value, activeContainerIndex }));
  };

  const {
    activeContainer,
    setActiveContainer,
    openSideItem,
    setOpenSideItems, containerDragItems, setContainerDragItems
  } = useContext(FormContext);
  console.log(activeContainer);
  return (
    <>
      <div
        {...attributes}
        ref={setNodeRef}
        style={{
          transition,
          transform: CSS.Translate.toString(transform),
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "10%", display: "flex", gap: "1rem" }}>
            <div>
              {activeContainer && (
                <div
                  className="container-right"
                  style={{
                    display: "flex ",
                    flexDirection: "column",
                    rowGap: "1rem",
                    padding: "1.5rem 1rem",
                    zIndex: "5",
                    backgroundColor: "#fff",
                    border: "2px solid #0001",
                    borderRadius: "10px",
                    position: "",
                    width: "60px",
                  }}
                >
                  {/* <div>Sidebar</div> */}
                  <img
                    src={!containerDragItems ? PlusIcon : Cancle}
                    alt="Plus"
                    onClick={() => {
                      console.log("hello");
                      setContainerDragItems(!containerDragItems);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={SettingsIcon}
                    alt="settings"
                    onClick={() => setOpenSideItems(!openSideItem)}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={Section}
                    alt="section"
                    onClick={() => console.log("hello")}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={RepeatIcon}
                    alt="replace"
                    onClick={() => console.log("hello")}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={BinIcon}
                    alt="Bin"
                    onClick={() => {
                      // handleDeleteQuestion(question.id, containerIndex);
                      // console.log("delete triggered", question.id, containerIndex);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
            </div>
            {containerDragItems && (
              <div
                style={{
                  position: "absolute",
                  marginLeft: "5rem",
                  backgroundColor: "#fff",
                  padding: "1rem",
                  border: "1px solid #0001",
                  zIndex: 3,
                }}
              >
                {/* <div>
                  <div>side Item</div>
                  <div onClick={() => setShowDragItems(false)}>X</div>
                </div> */}
                <SortableContext items={textItems.map((i) => i.id)}>
                  {textItems.map((i) => (
                    <div className="side-item" key={i.id}>
                      <TextComponent
                        key={i.id}
                        id={i.id}
                        text={i.text}
                        icon={i.icon}
                      />
                    </div>
                  ))}
                </SortableContext>
              </div>
            )}
          </div>
          <div
            style={{ width: "90%", padding: "1rem", border: "1px solid #0001" }}
            onClick={() => setActiveContainer(!activeContainer)}
          >
            <div>
              <div style={{ padding: "1rem 0rem" }}>Enter Form Title</div>
              <ReactQuill
                value={""}
                modules={module}
                theme="snow"
                className={showToolBar ? "custom focus" : "custom"}
                onFocus={() => {
                  setShowToolBar(true);
                }}
                onBlur={() => {
                  setShowToolBar(false);
                }}
              />
              <div>
                <div style={{ padding: "1rem 0rem" }}>Description</div>
                <textarea
                  type="text"
                  name=""
                  id=""
                  style={{
                    width: "100%",
                    height: "8rem",
                    border: "1px solid #0001",
                    borderRadius: "10px",
                    padding: "1rem",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#E8499F",
                padding: "1rem",
                width: "100%",
                textAlign: "center",
                color: "#fff",
                margin: "2rem 0rem",
              }}
            >
              Section 1
            </div>
            <div>
              <div style={{ padding: "1rem 0rem", display: "flex", justifyContent: "space-between" }}><div>Enter Section Title</div><img src={SectionDragIcon} alt="" /></div>
              <ReactQuill
                modules={module}
                theme="snow"
                value={""}
                // className={`custom ${openQuestion === question.id ? "focus" : ""}`}
                className={isFocusedTitle ? "custom focus" : "custom"}
                onFocus={() => {
                  setIsFocusedTitle(true);
                }}
                onBlur={() => {
                  setIsFocusedTitle(false);
                }}
              // onChange={handleContainerTitleChange}
              // style={{ backgroundColor: "#0047ff" }}
              />
            </div>
            <div style={{ padding: "1rem 0rem" }}>Desctiption</div>
            <textarea
              type="text"
              style={{
                width: "100%",
                height: "8rem",
                border: "2px solid #0001",
                borderRadius: "10px",
                padding: "1rem"
              }}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export default QuestionContainer;
