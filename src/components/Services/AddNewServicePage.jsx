import React, { useState, useEffect } from "react";
import FormContainer from "./AddServiceDetailPage";
import AddServicePrimaryShowcase from "./AddServicePrimaryShowcase";
import AddNewServiceData from "./AddNewCrad";
import { useDispatch, useSelector } from "react-redux";
import { updateServiceFormData } from "../../redux/action";

// Parent component
const ServiceAddForm = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [formDatas, setformDatas] = useState({});
  const savedData = useSelector((state) => state.services);
  useEffect(() => {
    setformDatas(savedData);
  }, [savedData]);
  const handleNextStep1 = (values) => {
    dispatch(updateServiceFormData("heading", values.heading));
    dispatch(updateServiceFormData("des", values.des));
    dispatch(updateServiceFormData("altText", values.altText));
    dispatch(updateServiceFormData("image", values.image));
    setformDatas(values);
    setStep(2);
  };

  const handleNextStep2 = (serviceDetails) => {
    dispatch(updateServiceFormData("form", serviceDetails));
    setStep(3);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (data) => {
    //   dispatch(updateServiceFormData("serviceName", data.serviceName));
    //   dispatch(updateServiceFormData("pAlterNativeText", data.pAlterNativeText));
    //   dispatch(updateServiceFormData("pServiceImage", data.pServiceImage));
    // Submit the form data
    const res = await fetch("http://localhost:8000/service/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDatas),
    });
    const resData = await res.json();
    // if (resData.message === "Successfully Created") {
    //   dispatch(updateServiceFormData("heading", ""));
    //   dispatch(updateServiceFormData("des", ""));
    //   dispatch(updateServiceFormData("image", ""));
    //   dispatch(updateServiceFormData("altText", ""));
    //   dispatch(updateServiceFormData("form", ""));
    //   dispatch(updateServiceFormData("serviceName", ""));
    //   dispatch(updateServiceFormData("pServiceImage", ""));
    //   dispatch(updateServiceFormData("pAlterNativeText", ""));
    // }
  };

  return (
    <div>
      {step === 1 && (
        <AddNewServiceData onNext={handleNextStep1} savedData={savedData} />
      )}
      {step === 2 && (
        <FormContainer
          onNext={handleNextStep2}
          savedData={savedData}
          onPrevious={handlePrevious}
        />
      )}
      {step === 3 && (
        <AddServicePrimaryShowcase
          savedData={savedData}
          onPrevious={handlePrevious}
          onSubmitValue={handleSubmit}
        />
      )}
    </div>
  );
};

export default ServiceAddForm;
