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
import ShortAnswerIcon from "../.././assets/short-text.svg";
import ParagraphIcon from "../.././assets/Long.svg";
import MultiChoiceIcon from "../.././assets/MultiChoice.svg";
import CheckBoxIcon from "../.././assets/CheckBox.svg";
import DropDownIcon from "../.././assets/DropDownForm.svg";
import MultiInputIcon from "../.././assets/MultiInput.svg";
import FileUploadIcon from "../.././assets/FileUpload.svg";
import PhoneIcon from "../.././assets/phoneIcon.svg";
import CountryIcon from "../.././assets/CountryIcon.svg";
import StateIcon from "../.././assets/StatesIcon.svg";
import CityIcon from "../.././assets/cityIcon.svg";
import SectionIcon from "../../assets/columns.svg";
import LocationIcon from "../../assets/location.svg";
import MailIcon from "../../assets/mail.svg";
import CalenderIcon from "../../assets/calendar.svg";
import TimeIcon from "../../assets/TimeForm.svg";
import DateTimeIcon from "../../assets/dateTimeForm.svg";
import RatingScaleIcon from "../../assets/ratingScale.svg";
import WebsiteIcon from "../../assets/websiteForm.svg";
import SignIcon from "../../assets/signForm.svg";
import PlayIcon from "../../assets/playForm.svg";
import AppointmentIcon from "../../assets/AppointmentIcon.svg";
import PaymentIcon from "../../assets/PaymentIconForm.svg";
import CaptchaIcon from "../../assets/captchaIconForm.svg";
import SpinnerIcon from "../../assets/spinnerIconForm.svg";
import TimerIcon from "../../assets/timer.svg";
import AddIcon from "../../assets/Add.svg";

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
    setActiveContainer,
    openSideItem,
    setOpenSideItems,
    containerDragItems,
    setContainerDragItems,
    cardDragItems,
    setCardDragItems
  } = useContext(FormContext);
  const dispatch = useDispatch();



  const form = useSelector((state) => state.form.form);
  const handleMouseEnter = (index) => {
    setHoveredComponent(index);
  };

  const handleMouseLeave = () => {
    setHoveredComponent(null);
  };

  {
    /** add logos */
  }

  const [textItems, setTextItems] = useState([
    {
      id: `text-${uuidv4()}`,
      icon: <img src={ShortAnswerIcon} alt="" />,
      text: "Short Answer",
      type: "Short Answer",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={ParagraphIcon} alt="" />,
      text: "Long Answer",
      type: "Long Answer",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={PhoneIcon} alt="" />,
      text: "Phone Number",
      type: "Phone Number",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={MultiChoiceIcon} alt="" />,
      text: "Multiple Choice",
      type: "Multiple Choice",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={CheckBoxIcon} alt="" />,
      text: "Check Box",
      type: "Check Box",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={DropDownIcon} alt="" />,
      text: "Dropdown",
      type: "Dropdown",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={MultiInputIcon} alt="" />,
      text: "Multiple Input",
      type: "Multiple Input",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={FileUploadIcon} alt="" />,
      text: "File Upload",
      type: "File Upload",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={CountryIcon} alt="" />,
      text: "Country",
      type: "Country",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={StateIcon} alt="" />,
      text: "State",
      type: "State",
    },
    {
      id: `text-${uuidv4()}`,
      icon: <img src={CityIcon} alt="" />,
      text: "City",
      type: "City",
    },
  ]);

  const findquestion = (type) => {
    console.log(type)
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
      case "Long Answer":
        newQuestion = {
          id: `item-${uuidv4()}`,
          question: "Un question Paragraph",
          answer: "",
          type: "Long Answer",
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
          question: "Tick Your Choice",
          options: [
            { id: `item-${uuidv4()}`, optionText: " Option1" },
            { id: `item-${uuidv4()}`, optionText: " Option2" },
          ],
          type: "Check Box",
          required: false,
          PredefinedOption: "none",
        };
        break;
      case "Multiple Choice":
        newQuestion = {
          id: `item-${uuidv4()}`,
          question: "Select a option",
          options: [
            { id: `item-${uuidv4()}`, optionText: " Option1" },
            { id: `item-${uuidv4()}`, optionText: " Option2" },
          ],
          type: "Multiple Choice",
          required: false,
          PredefinedOption: "none"
        };
        break;
      case "Dropdown":
        newQuestion = {
          id: `item-${uuidv4()}`,
          question: "Select a Dropdown option",
          type: "Dropdown",
          options: [
            { id: `item-${uuidv4()}`, optionText: "Option1" },
            { id: `item-${uuidv4()}`, optionText: "Option2" },
          ],
        }
        break;
      case "Phone Number":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Phone Number",
          question: "Phone Number",
          sublabel: "",
          placeHolder: "",
          answer: "",
          required: false,
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
      case "Multiple Input":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Multiple Input",
          question: "",
          sublable: "",
          required: false,
          options: [
            { id: `item-${uuidv4()}`, optionText: "Option1" },
            { id: `item-${uuidv4()}`, optionText: "Option2" },
          ],
        };
        break;
      case "Country":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "Country",
          question: "what is your country name",
          answer: "",
          require: false,
        };
        break;
      case "State":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "State",
          question: "What is Your State",
          answer: "",
          require: false,
        };
        break;
      case "City":
        newQuestion = {
          id: `item-${uuidv4()}`,
          type: "City",
          question: "what is Your City",
          answer: "",
          require: false,
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
    console.log("drag end!!");
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
    // console.log("jygjhgjhg");
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
        console.log(newItems);
        setActiveQuestion(newItems.id);
        setActiveContainer(false)
        setContainerDragItems(false)
        setCardDragItems(false)
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
        setActiveContainer(false)
        setActiveQuestion(newItems.id);
        setActiveContainerIndex(overContainerIndex);
        setDraggedOverItemId(null);
      }
    }
  }

  const colneQuestion = (type, containerIndex) => {
    const newItems = findquestion(type);
    // Find the index of the over container
    const overContainerIndex = form.findIndex(
      (container) => container.id === containerIndex
    );
    dispatch(createForm({ overContainerIndex, newItems }));
    setActiveQuestion(newItems.id);
  };

  return (
    <>
      <div>
        <div
          className="flex-container"
          style={{ display: "flex", width: "100%", columnGap: "1rem" }}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <div className="component" style={openSideItem ? { width: "80%" } : { width: "100%" }}>
              <SortableContext items={form.map((i) => i.id)}>
                {form.map((container, cindex) => (
                  <QuestionContainer
                    id={container.id}
                    title={container}
                    textItems={textItems}
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
                            textItems={textItems}
                            question={i}
                            id={i.id}
                            key={i.id}
                            questionIndex={index}
                            containerIndex={cindex}
                            colneQuestion={colneQuestion}
                          />
                        </div>
                      ))}
                    </SortableContext>
                  </QuestionContainer>
                ))}
              </SortableContext>
            </div>

            {openSideItem && (<div style={{ width: "20%" }}>

              <div className="side-item-container">
                <div className="text-container1">
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
      // className={`text-container ${moveRight ? "move-right" : "slide-in"}`}
      style={{
        padding: "1.8rem",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
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
    // case "Multiple Choice":
    //   return (
    //     <SingleChoicePro
    //       handleClick={handleClick}
    //       question={question}
    //       activeContainerIndex={activeContainerIndex}
    //       questionIndex={questionIndex}
    //     />
    //   );
    case "Multiple choice":
      return (
        <MultipleChoice
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    // case "Line Scale":
    //   return (
    //     <LineScalePro
    //       handleClick={handleClick}
    //       question={question}
    //       activeContainerIndex={activeContainerIndex}
    //       questionIndex={questionIndex}
    //     />
    //   );
    // case "Name":
    //   return (
    //     <NamePro
    //       handleClick={handleClick}
    //       question={question}
    //       activeContainerIndex={activeContainerIndex}
    //       questionIndex={questionIndex}
    //     />
    //   );
    case "Phone":
      return (
        <PhonePro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    // case "Email":
    //   return (
    //     <EmailPro
    //       handleClick={handleClick}
    //       question={question}
    //       activeContainerIndex={activeContainerIndex}
    //       questionIndex={questionIndex}
    //     />
    //   );
    // case "Website":
    //   return (
    //     <WebsitePro
    //       handleClick={handleClick}
    //       question={question}
    //       activeContainerIndex={activeContainerIndex}
    //       questionIndex={questionIndex}
    //     />
    //   );
    // case "Number":
    //   return (
    //     <NumberPro
    //       handleClick={handleClick}
    //       question={question}
    //       activeContainerIndex={activeContainerIndex}
    //       questionIndex={questionIndex}
    //     />
    //   );
    // case "Spinner":
    //   return (
    //     <SpinnerPro
    //       handleClick={handleClick}
    //       question={question}
    //       activeContainerIndex={activeContainerIndex}
    //       questionIndex={questionIndex}
    //     />
    //   );
    // case "Signature":
    //   return (
    //     <SignaturePro
    //       handleClick={handleClick}
    //       question={question}
    //       activeContainerIndex={activeContainerIndex}
    //       questionIndex={questionIndex}
    //     />
    //   );
    case "File Upload":
      return (
        <FileUploadPro
          handleClick={handleClick}
          question={question}
          activeContainerIndex={activeContainerIndex}
          questionIndex={questionIndex}
        />
      );
    // case "Audio/Video Upload":
    //   return (
    //     <AVFileUploadPro
    //       handleClick={handleClick}
    //       question={question}
    //       activeContainerIndex={activeContainerIndex}
    //       questionIndex={questionIndex}
    //     />
    //   );
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
