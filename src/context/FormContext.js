import { React, createContext, useState } from "react";

const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeContainerIndex, setActiveContainerIndex] = useState(null);

  const [openQuestion, setOpenQuestion] = useState(false);
  const [openQuestionSetting, setOpenQuestionSetting] = useState(false);

  return (
    <FormContext.Provider
      value={
        (activeQuestion,
        setActiveQuestion,
        activeContainerIndex,
        setActiveContainerIndex,
        openQuestion,
        setOpenQuestion,
        openQuestionSetting,
        setOpenQuestionSetting)
      }
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormContextProvider };
