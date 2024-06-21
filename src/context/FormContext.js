import { React, createContext, useState } from "react";

const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeContainer, setActiveContainer] = useState(true)
  const [openSideItem, setOpenSideItems] = useState(false)
  const [containerDragItems, setContainerDragItems] = useState(false)
  const [cardDragItems, setCardDragItems] = useState(false)

  const [activeContainerIndex, setActiveContainerIndex] = useState(null);

  const [openQuestion, setOpenQuestion] = useState(false);
  const [openQuestionSetting, setOpenQuestionSetting] = useState(false);

  return (
    <FormContext.Provider
      value={{
        activeQuestion,
        setActiveQuestion,
        activeContainerIndex,
        setActiveContainerIndex,
        openQuestion,
        setOpenQuestion,
        openQuestionSetting,
        setOpenQuestionSetting,
        activeContainer,
        setActiveContainer,
        openSideItem,
        setOpenSideItems,
        containerDragItems,
        setContainerDragItems,
        cardDragItems,
        setCardDragItems
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormContextProvider };
