import { React, useContext, useState } from "react";
import "../.././styles/DynamicForm.css";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import QuestionContainer from "./QuestionContainer";
import QustionCard from "./QustionCard";
import TextComponent from "./TextComponent";
import "react-quill/dist/quill.snow.css";
import { FormContext } from "../../context/FormContext";
import { useSelector, useDispatch } from "react-redux";
import {
  createForm,
  updateFormOverQuestion,
  updatevalueFrom,
} from "../../redux/FormSlice";
import ReactQuill from "react-quill";

function FormCreate() {
  const [activeId, setActiveId] = useState(null);
  const [draggedOverItemId, setDraggedOverItemId] = useState(null);
  const [currentContainerId, setCurrentContainerId] = useState();
  const [hoveredComponent, setHoveredComponent] = useState(null);

  const {
    openQuestionSetting,
    setOpenQuestionSetting,
    setActiveQuestion,
    setActiveContainerIndex,
    activeContainerIndex,
  } = useContext(FormContext);
  const dispatch = useDispatch();

  const form = useSelector((state) => state.form.form);
  const handleMouseEnter = (index) => {
    setHoveredComponent(index);
  };

  const handleMouseLeave = () => {
    setHoveredComponent(null);
  };

  const [textItems, setTextItems] = useState([
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="shortAnswer" />,
      text: "Short Answer",
      type: "Short Answer",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="name" />,
      text: "Name",
      type: "Name",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="paragraph" />,
      text: "Paragraph",
      type: "Paragraph",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="section" />,
      text: "Section",
      type: "Section",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="phone" />,
      text: "Phone",
      type: "Phone",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="MultipleChoiceIcon" />,
      text: "Multiple Choice",
      type: "Multiple Choice",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="CheckBoxIcon" />,
      text: "Check Box",
      type: "Check Box",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="location" />,
      text: "Location",
      type: "Location",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="email" />,
      text: "Email",
      type: "Email",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="dropDown" />,
      text: "Dropdown",
      type: "Dropdown",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="number" />,
      text: "Number",
      type: "Number",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="linescale" />,
      text: "Line Scale",
      type: "Line Scale",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="date" />,
      text: "Date",
      type: "Date",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="multipleChoice" />,
      text: "Multiple Choice grid",
      type: "Multiple Choice grid",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="time" />,
      text: "Time",
      type: "Time",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="tickboxGrid" />,
      text: "Check box grid",
      type: "Check box grid",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="dateAndTime" />,
      text: "Date - Time",
      type: "Date - Time",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="RatingScale" />,
      text: "Rating Scale",
      type: "Rating Scale",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="website" />,
      text: "Website",
      type: "Website",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="description" />,
      text: "Description",
      type: "Description",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="signature" />,
      text: "Signature",
      type: "Signature",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="audiovideo" />,
      text: "Audio/Video Upload",
      type: "Audio/Video Upload",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="fileUpload" />,
      text: "File Upload",
      type: "File Upload",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="timer" />,
      text: "Timer",
      type: "Timer",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="AddProduct" />,
      text: "AddProduct",
      type: "AddProduct",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="payament" />,
      text: "payament",
      type: "payament",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="captcha" />,
      text: "Captcha",
      type: "Captcha",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="spinner" />,
      text: "Spinner",
      type: "Spinner",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={""} alt="Appointment" />,
      text: "Appointment",
      type: "Appointment",
    },
  ]);

  const findquestion = (type) => {
    let newQuestion;
    switch (type) {
      case "Short Answer":
        newQuestion = {
          id: `item-${uuidv4()}`,
          question: "What is you name",
          answer: "",
          type: "Short Answer",
          required: false,
          minWords: 25,
          maxWords: 50,
          sublabel: "",
          character: "Any character",
          placeHolder: "",
        };
        break;
      case "Paragraph":
        newQuestion = {
          id: `item-${uuidv4()}`,
          question: "Un question Paragraph",
          answer: "",
          type: "Paragraph",
          required: false,
          minWords: 25,
          maxWords: 50,
          sublabel: "",
          character: "",
          placeHolder: "",
        };
        break;
      case "Check Box":
        newQuestion = {
          id: `item-${uuidv4()}`,
          sublabel: "",
          question: "Which is capital of TamilNadu",
          options: [
            { id: `item-${uuidv4()}`, optionText: " Chennai" },
            { id: `item-${uuidv4()}`, optionText: " Erode" },
            { id: `item-${uuidv4()}`, optionText: " Coimbatore" },
            { id: `item-${uuidv4()}`, optionText: " Madurai" },
          ],
          type: "Check Box",
          required: false,
          PredefinedOption: "none",
        };
        break;
      case "Multiple Choice":
        newQuestion = {
          id: `item-${uuidv4()}`,
          question: "Which is capital of TamilNadu",
          options: [
            { id: `item-${uuidv4()}`, optionText: " Chennai" },
            { id: `item-${uuidv4()}`, optionText: " Erode" },
            { id: `item-${uuidv4()}`, optionText: " Coimbatore" },
            { id: `item-${uuidv4()}`, optionText: " Madurai" },
          ],
          type: "Multiple Choice",
          sublabel: "",
          required: false,
        };
        break;
      case "Name":
        newQuestion = {
          id: `item-${uuidv4()}`,
          question: "Name",
          firstName: "First Name",
          lastName: "Last Name",
          sublabel: "",
          type: "Name",
          answer: "",
          required: false,
        };
        break;
      case "Line Scale":
        newQuestion = {
          id: `item-${uuidv4()}`,
          question: "Who is best PM of India in history",
          type: "Line Scale",
          sublabel: "",
          placeholderMin: "Enter left label",
          placeholderMax: "Enter right label",
          minRange: { value: 0, labelName: "" },
          maxRange: { value: 5, labelName: "" },
          required: false,
        };
        break;
      case "Phone":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Phone",
          question: "Phone Number",
          sublabel: "",
          placeHolder: "",
          answer: "",
          required: false,
        };
        break;
      case "Website":
        newQuestion = {
          id: `item-${uuidv4()}`,
          question: "Website",
          answer: "",
          type: "Website",
          required: false,
          placeHolder: "",
        };
        break;
      case "Email":
        newQuestion = {
          id: `item-${uuidv4()}`,
          question: "Email",
          answer: "",
          type: "Email",
          required: false,
          sublabel: "",
          placeHolder: "",
          domainValidation: "",
          characterlimit: "",
        };
        break;
      case "Number":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Number",
          question: "Farmer ID number",
          answer: "",
          required: false,
          placeHolder: "",
          sublabel: "",
        };
        break;
      case "Spinner":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Spinner",
          question: "Spinner",
          answer: 0,
          sublabel: "",
          maxValue: 0,
          minValue: 0,
          intervelAmount: 0,
          required: false,
        };
        break;
      case "Signature":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Signature",
          question: "Signature",
          answer: "",
          required: false,
          sublabel: "",
          boxWidth: "",
          boxHeight: "",
        };
        break;
      case "File Upload":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "File Upload",
          question: "File Upload",
          answer: "",
          required: false,
          sublabel: "",
          fileSizeMin: 0,
          fileSizeMax: 0,
          NoOfNumFile: 0,
          fileTypes: "",
        };
        break;
      case "Audio/Video Upload":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Audio/Video Upload",
          question: "Audio&Video FileUpload",
          answer: "",
          required: false,
          sublabel: "",
          mediaType: "",
          uploadMinLimt: "",
          uploadMaxLimt: "",
          fileSizeMax: "",
          fileSizeMin: "",
          fileTypes: [],
        };
        break;
      case "Date":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Date",
          question: "",
          answer: "",
          sublable: "",
          required: false,
        };
        break;
      case "Date - Time":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Date - Time",
          question: "",
          answer: "",
          sublable: "",
          required: false,
        };
        break;
      case "Multiple Choice grid":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Multiple Choice grid",
          question: "",
          row: [{ id: uuidv4(), rowText: "Row 1" }],
          column: [{ id: uuidv4(), columnText: "Column 1" }],
          sublable: "",
          required: false,
        };
        break;
      case "Check box grid":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Check box grid",
          question: "",
          row: [{ id: uuidv4(), rowText: "Row 1" }],
          column: [{ id: uuidv4(), columnText: "Column 1" }],
        };
        break;
      default:
        break;
    }
    return newQuestion;
  };

  // Find item title
  const findItemTitle = (id) => {
    const container = findValueOfItems(id, "item");
    if (!container) return "";
    const item = container.items.find((item) => item.id === id);
    if (!item) return "";
    return item;
  };

  // Find container title
  const findContainerTitle = (id) => {
    const container = findValueOfItems(id, "container");
    if (!container) return "";
    return container.title;
  };

  // Find container items
  const findContainerItems = (id) => {
    const container = findValueOfItems(id, "container");
    if (!container) return [];
    return container.items;
  };

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //FIND THE VALUE OF THE ITEMS
  function findValueOfItems(id, type) {
    if (type === "container") {
      return form.find((item) => item.id === id);
    }
    if (type === "item") {
      return form.find((container) =>
        container.items.find((item) => item.id === id)
      );
    }
  }
  //HANDLE DRAG START
  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  //HANDLE DRAG MOVE
  const handleDragMove = (event) => {
    const { active, over } = event;
    // Handle Items Sorting
    if (
      active.id.toString().includes("item") &&
      over &&
      over.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = form.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = form.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...form];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );

        dispatch(createForm(newItems));
      } else {
        // In different form
        let newItems = [...form];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );

        dispatch(createForm(newItems));
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes("item") &&
      over &&
      over.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = form.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = form.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      let newItems = [...form];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);

      dispatch(createForm(newItems));
    }
    // Check if the dragged item is a text item and it's being dragged over another item
    if (
      active.id.toString().includes("text") &&
      over &&
      over.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Set the ID of the item being dragged over
      setDraggedOverItemId(over.id);
    } else {
      // Reset the draggedOverItemId if not dragging over an item
      setDraggedOverItemId(null);
    }
  };

  //HANDLE DRAG END
  function handleDragEnd(event) {
    const { active, over } = event;
    // Handling Container Sorting
    if (
      active.id.toString().includes("container") &&
      over &&
      over.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = form.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = form.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...form];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      //
      dispatch(createForm(newItems));
      dispatch(createForm(newItems));
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over &&
      over.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = form.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = form.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...form];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        dispatch(createForm(newItems));
      } else {
        // In different form
        let newItems = [...form];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        dispatch(createForm(newItems));
      }
    }

    // Handling item dropping into Container
    if (
      active.id.toString().includes("item") &&
      over &&
      over.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = form.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = form.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...form];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);

      dispatch(createForm(newItems));
    }
    // Handling text item dropping into Container
    if (
      active.id.toString().includes("text") &&
      over &&
      active &&
      over &&
      active.id !== over.id
    ) {
      if (over.id.toString().includes("container")) {
        // Find the over container
        const overContainer = findValueOfItems(over.id, "container");

        // If the over container is not found, return
        if (!overContainer) return;

        // Find the index of the over container
        const overContainerIndex = form.findIndex(
          (container) => container.id === overContainer.id
        );

        // Find the text item
        const textItem = textItems.find((text) => text.id === active.id);

        if (!textItem) return;

        // Add the text item to the over container
        let newItems = findquestion(active.data.current.text);
        dispatch(createForm({ overContainerIndex, newItems }));
        setActiveQuestion(newItems.id);

        setActiveContainerIndex(overContainerIndex);
      } else if (over.id.toString().includes("item")) {
        // Find the over container
        const overContainer = findValueOfItems(over.id, "item");
        // If the over container is not found, return
        if (!overContainer) return;

        // Find the index of the over container
        const overContainerIndex = form.findIndex(
          (container) => container.id === overContainer.id
        );

        // Find the index where the text item was dropped within the container
        const overItemIndex = overContainer.items.findIndex(
          (item) => item.id === over.id
        );

        // Find the text item
        const textItem = textItems.find((text) => text.id === active.id);

        if (!textItem) return;

        //   Add the text item to the over container at the determined position
        let newItems = findquestion(active.data.current.text);
        // newItems[overContainerIndex].items.splice(
        //   overItemIndex,
        //   0,
        // findquestion(active.data.current.text);
        // );

        dispatch(
          updateFormOverQuestion({
            overContainerIndex,
            overItemIndex,
            newItems,
          })
        );

        setActiveQuestion(newItems.id);
        setActiveContainerIndex(overContainerIndex);
        setDraggedOverItemId(null);
      }
    }
  }

  return (
    <>
      <div>
        <div className="flex-container">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <div className="component">
              <SortableContext items={form.map((i) => i.id)}>
                {form.map((container, cindex) => (
                  <QuestionContainer
                    id={container.id}
                    title={container}
                    key={container.id}
                    onAddItem={() => {
                      setCurrentContainerId(container.id);
                    }}
                    activeContainerIndex={cindex}
                  >
                    <SortableContext items={container.items.map((i) => i.id)}>
                      {container.items.map((i, index) => (
                        <div key={index}>
                          <QustionCard
                            question={i}
                            id={i.id}
                            key={i.id}
                            questionIndex={index}
                            containerIndex={container.id}
                          />
                        </div>
                      ))}
                    </SortableContext>
                  </QuestionContainer>
                ))}
              </SortableContext>
            </div>

            {openQuestionSetting ? (
              <NewComponent setOpenQuestionSetting={setOpenQuestionSetting} />
            ) : (
              // <div></div>
              <div className="text-container">
                <div className="text-container1">
                  <SortableContext items={textItems.map((i) => i.id)}>
                    {textItems.map((i) => (
                      <TextComponent
                        key={i.id}
                        id={i.id}
                        text={i.text}
                        icon={i.icon}
                      />
                    ))}
                  </SortableContext>
                </div>
              </div>
            )}
            <DragOverlay adjustScale={false}>
              {/* Drag Overlay For item Item */}
              {activeId && activeId.toString().includes("item") && (
                <QustionCard id={activeId} question={findItemTitle(activeId)} />
              )}
              {/* Drag Overlay For Container */}
              {activeId && activeId.toString().includes("container") && (
                <QuestionContainer
                  id={activeId}
                  title={findContainerTitle(activeId)}
                >
                  {findContainerItems(activeId).map((i) => (
                    <QustionCard key={i.id} title={i} id={i.id} />
                  ))}
                </QuestionContainer>
              )}
              {/* Drag Overlay For Text Items */}
              {activeId && activeId.toString().includes("text") && (
                <TextComponent
                  id={activeId}
                  text={textItems.find((t) => t.id === activeId)?.text}
                  icon={textItems.find((t) => t.id === activeId)?.icon}
                />
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </>
  );
}

export default FormCreate;

function NewComponent({ setOpenQuestionSetting }) {
  const [moveRight, setMoveRight] = useState(false);
  const { activeQuestion, activeContainerIndex } = useContext(FormContext);

  const form = useSelector((state) => state.form.form);
  const [question] = form[activeContainerIndex].items.filter(
    (question) => question.id === activeQuestion
  );
  const questionIndex = form[activeContainerIndex].items.findIndex(
    (question) => question.id === activeQuestion
  );
  const handleClick = () => {
    setMoveRight(true);
    setOpenQuestionSetting(false);
  };
  return (
    <div
      className={` text-container ${moveRight ? "move-right" : "slide-in"}`}
      style={{ padding: "1.8rem" }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        {renderQuestionProperties(
          question,
          handleClick,
          activeContainerIndex,
          questionIndex
        )}
      </div>
    </div>
  );
}

const renderQuestionProperties = (
  question,
  handleClick,
  activeContainerIndex,
  questionIndex
) => {
  switch (question.type) {
    case "Short Answer":
      return (
        <ShortTextProperties
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Paragraph":
      return (
        <ParagraphQuestionProperties
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Multiple Choice":
      return (
        <SingleChoicePro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Check Box":
      return (
        <MultipleChoice
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Line Scale":
      return (
        <LineScalePro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Name":
      return (
        <NamePro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Phone":
      return (
        <PhonePro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Email":
      return (
        <EmailPro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Website":
      return (
        <WebsitePro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Number":
      return (
        <NumberPro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Spinner":
      return (
        <SpinnerPro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Signature":
      return (
        <SignaturePro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "File Upload":
      return (
        <FileUploadPro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Audio/Video Upload":
      return (
        <AVFileUploadPro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    case "Multiple Choice grid":
      return (
        <MultipleChoicegridPro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    default:
      return null;
  }
};

const ShortTextProperties = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();

  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };

  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Short text properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          placeholder="Answer"
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Place holder text</p>
        <input
          className="propertiesInput"
          value={question.placeHolder}
          name="placeHolder"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Character limit</p>
        <div className="Characterlimit">
          <input
            className="propertiesInput"
            value={question.minWords}
            name="minWords"
            onChange={(e) => handleChangeProp(e, activeContainerIndex)}
          />
          <input
            className="propertiesInput"
            value="50 Words"
            name="maxWords"
            onChange={(e) => handleChangeProp(e, activeContainerIndex)}
          />
        </div>
      </div>
    </div>
  );
};

const ParagraphQuestionProperties = ({
  question,
  handleClick,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();
  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
    console.log(value, name);
  };

  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Long text properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Place holder text</p>
        <input
          className="propertiesInput"
          value={question.placeHolder}
          name="placeHolder"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Character limit</p>
        <div className="Characterlimit">
          <input
            className="propertiesInput"
            value={`${question.minWords} Words ( min )`}
            name="minWords"
            onChange={(e) => handleChangeProp(e, activeContainerIndex)}
          />
          <input
            className="propertiesInput"
            value={`${question.maxWords} Words ( max )`}
            name="maxWords"
            onChange={(e) => handleChangeProp(e, activeContainerIndex)}
          />
        </div>
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Input Character</p>
        <select
          className="propertiesSelect"
          name="character"
          value={question.character}
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        >
          <option className="propertiesOption" value="Any character">
            Any character
          </option>
          <option className="propertiesOption" value="Letters only">
            Letters only
          </option>
          <option className="propertiesOption" value="Letters number">
            Letters number
          </option>
          <option
            className="propertiesOption"
            value="Letters, number and spaces"
          >
            Letters, number and spaces
          </option>
        </select>
      </div>
    </div>
  );
};

const MultipleChoicegridPro = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();

  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">File upload properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          placeholder="Answer"
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
    </div>
  );
};

const FileUploadPro = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();

  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };

  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">File upload properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          placeholder="Answer"
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Limit file size</p>
        <div className="fileUploadContainer">
          <div className="inputContainer">
            <input
              className="filePropertiesInput"
              name="fileSizeMin"
              type="number"
              value={question.fileSizeMin}
              onChange={(e) => handleChangeProp(e, activeContainerIndex)}
            />
            |<p>KB</p>
          </div>
          <div className="inputContainer">
            <input
              className="filePropertiesInput"
              name="fileSizeMax"
              type="number"
              value={question.fileSizeMax}
              onChange={(e) => handleChangeProp(e, activeContainerIndex)}
            />
            |<p>KB</p>
          </div>
        </div>
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Limit number of files</p>
        <input
          className="propertiesInputN"
          value={question.NoOfNumFile}
          name="NoOfNumFile"
          type="number"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">File types</p>
        <textarea
          className="propertiesTextArea"
          value={question.fileTypes}
          name="fileTypes"
          placeholder="pdf, doc, docx, xls, xlsx, csv, txt, rtf, html, zip, mp3, wma, mpg, flv, avi, jpg, jpeg, png, gif"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
    </div>
  );
};

const AVFileUploadPro = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();

  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  const [fileFormats, setFileFormats] = useState([
    { id: uuidv4(), name: "mp3", selected: false },
    { id: uuidv4(), name: "m4a", selected: false },
    { id: uuidv4(), name: "flac", selected: false },
    { id: uuidv4(), name: "wav", selected: false },
    { id: uuidv4(), name: "wma", selected: false },
    { id: uuidv4(), name: "aiff", selected: false },
  ]);

  const [show, setShow] = useState(false);

  const handelSingleCheckBox = (id) => {
    const checkedFileFormat = fileFormats.map((file) =>
      file.id === id ? { ...file, selected: !file.selected } : file
    );
    setFileFormats(checkedFileFormat);
  };

  const handelAllSelected = (e) => {
    const checked = e.target.checked;
    const allSelected = fileFormats.map((file) => ({
      ...file,
      selected: checked,
    }));
    setFileFormats(allSelected);
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">File upload properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          placeholder="Answer"
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Media Type</p>
        <select
          className="propertiesSelect"
          name="mediaType"
          value={question.mediaType}
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        >
          <option className="propertiesOption" value="Audio">
            Audio
          </option>
          <option className="propertiesOption" value="Video">
            Video
          </option>
        </select>
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Upload limit</p>
        <div className="fileUploadContainer">
          <div className="upload_container">
            <select
              className="propertiesSelect"
              name="uploadMaxLimt"
              value={question.uploadMaxLimt}
              onChange={(e) => handleChangeProp(e, activeContainerIndex)}
            >
              <option className="propertiesOption" value="0">
                N/A
              </option>
              <option className="propertiesOption" value="1">
                1
              </option>
              <option className="propertiesOption" value="2">
                2
              </option>
              <option className="propertiesOption" value="3">
                3
              </option>
              <option className="propertiesOption" value="4">
                4
              </option>
            </select>
          </div>
          <div className="upload_container">
            <select
              className="propertiesSelect"
              name="uploadMaxLimt"
              value={question.uploadMaxLimt}
              onChange={(e) => handleChangeProp(e, activeContainerIndex)}
            >
              <option className="propertiesOption" value="1">
                1
              </option>
              <option className="propertiesOption" value="2">
                2
              </option>
              <option className="propertiesOption" value="3">
                3
              </option>
              <option className="propertiesOption" value="4">
                4
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Limit file size</p>
        <div className="fileUploadContainer">
          <div className="inputContainer">
            <input
              className="filePropertiesInput"
              name="fileSizeMin"
              type="number"
              value={question.fileSizeMin}
              onChange={(e) => handleChangeProp(e, activeContainerIndex)}
            />
            |
            <select>
              <option>KB</option>
              <option>MB</option>
            </select>
          </div>
          <div className="inputContainer">
            <input
              className="filePropertiesInput"
              name="fileSizeMax"
              type="number"
              value={question.fileSizeMax}
              onChange={(e) => handleChangeProp(e, activeContainerIndex)}
            />
            |
            <select>
              <option>KB</option>
              <option>MB</option>
            </select>
          </div>
        </div>
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Input Character</p>
        <div className="Custom-audio-container" onClick={() => setShow(!show)}>
          Custom audio type
        </div>
        {show && (
          <div className="custom-select-below">
            <div className="custom-box-abu">
              <input type="checkbox" onChange={(e) => handelAllSelected(e)} />
              Select all
            </div>
            {fileFormats.map((item, id) => {
              return (
                <div className="custom-box-abu">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => {
                      handelSingleCheckBox(item.id);
                    }}
                  />
                  {item.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const SingleChoicePro = ({
  activeContainerIndex,
  questionIndex,
  question,
  handleClick,
}) => {
  const dispatch = useDispatch();
  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Single choice properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Choices</p>
        {question.options.map((option) => {
          return (
            <div key={option.id} className="singleChoiceproOp">
              <img src={""} alt="dndicon" />
              <input className="propertiesInput" value={option.optionText} />
              <img src={""} alt="deleteIcon" />
              <img src={""} alt="addIcon" />
            </div>
          );
        })}
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Predefined option</p>
        <input
          className="propertiesInput"
          value={question.PredefinedOption}
          name="question"
        />
      </div>
    </div>
  );
};

const MultipleChoice = ({
  question,
  questionIndex,
  activeContainerIndex,
  handleClick,
}) => {
  const dispatch = useDispatch();
  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Short text properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Choices</p>
        {question.options.map((option) => {
          return (
            <div key={option.id} className="singleChoiceproOp">
              <img src={""} alt="dndicon" />
              <input className="propertiesInput" value={option.optionText} />
              <img src={""} alt="deleteIcon" />
              <img src={""} alt="addIcon" />
            </div>
          );
        })}
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Predefined option</p>
        <input
          className="propertiesInput"
          value={question.PredefinedOption}
          name="question"
        />
      </div>
    </div>
  );
};

const LineScalePro = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();
  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Line scale properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
    </div>
  );
};

const NamePro = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();
  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Short text properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="namePlaceHolder">
        <div className="nameInputContainer">
          <p className="name-value">First Name</p>
          <input
            value={question.firstName}
            name="firstName"
            onChange={(e) => handleChangeProp(e, activeContainerIndex)}
          />
        </div>
        <div className="nameInputContainer">
          <p className="name-value">Last Name</p>
          <input
            value={question.lastName}
            name="lastName"
            onChange={(e) => handleChangeProp(e, activeContainerIndex)}
          />
        </div>
      </div>
    </div>
  );
};

const NumberPro = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();
  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Number properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          placeholder="Answer"
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Place holder text</p>
        <input
          className="propertiesInput"
          value={question.placeHolder}
          name="placeHolder"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
    </div>
  );
};

const PhonePro = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();

  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Phone properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          placeholder="Answer"
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Place holder text</p>
        <input
          className="propertiesInput"
          value={question.placeHolder}
          name="placeHolder"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
    </div>
  );
};

const WebsitePro = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();

  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Website properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          placeholder="Answer"
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Place holder text</p>
        <input
          className="propertiesInput"
          value={question.placeHolder}
          name="placeHolder"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
    </div>
  );
};

const EmailPro = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();
  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Short text properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          placeholder="Answer"
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Place holder text</p>
        <input
          className="propertiesInput"
          value={question.placeHolder}
          name="placeHolder"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Input Character</p>
        <select
          className="propertiesSelect"
          name="character"
          value={question.character}
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        >
          <option className="propertiesOption" value="Allow every domain">
            Allow every domain
          </option>
          <option className="propertiesOption" value="Allow particular domains">
            Allow particular domains
          </option>
          <option className="propertiesOption" value="Restricted domains">
            Restricted domains
          </option>
        </select>
      </div>
      <div className="CharacterlimitEmail">
        <p className="propertiesText">Sub label</p>
        <input
          className="propertiesInput"
          value={question.minWords}
          placeholder="Max"
          type="number"
          name="minWords"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
    </div>
  );
};

const SpinnerPro = ({
  handleClick,
  question,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();
  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Short text properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          placeholder="Answer"
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Entry limit</p>
        <div className="Characterlimit">
          <input
            className="propertiesInput"
            value={question.minValue}
            name="minValue"
            onChange={(e) => handleChangeProp(e, activeContainerIndex)}
          />
          <input
            className="propertiesInput"
            value={question.maxValue}
            name="maxValue"
            onChange={(e) => handleChangeProp(e, activeContainerIndex)}
          />
        </div>
      </div>

      <div className="textInputContainer">
        <p className="propertiesText">Interval Amount</p>
        <input
          className="propertiesInputN"
          value={question.intervelAmount}
          placeholder="00"
          name="intervelAmount"
          type="number"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
    </div>
  );
};

const SignaturePro = ({
  question,
  handleClick,
  activeContainerIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();
  const handleChangeProp = (e, activeContainerIndex) => {
    const { name, value } = e.target;
    dispatch(
      updatevalueFrom({ name, value, activeContainerIndex, questionIndex })
    );
  };
  return (
    <div className="questionContainer">
      <div className="propertiesTop">
        <p className="propertiesTitle">Long text properties</p>
        <img
          src={""}
          alt="propertiesCloseIcon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Field label</p>
        <input
          className="propertiesInput"
          value={question.question}
          name="question"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Sub label</p>
        <textarea
          className="propertiesTextArea"
          value={question.sublabel}
          name="sublabel"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Box Width</p>
        <input
          className="propertiesInputN"
          value={question.intervelAmount}
          placeholder="00"
          name="boxWidth"
          type="number"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
      <div className="textInputContainer">
        <p className="propertiesText">Box height</p>
        <input
          className="propertiesInputN"
          value={question.intervelAmount}
          placeholder="00"
          name="boxHeight"
          type="number"
          onChange={(e) => handleChangeProp(e, activeContainerIndex)}
        />
      </div>
    </div>
  );
};
