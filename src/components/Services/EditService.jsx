import React, { useEffect, useState } from "react";
import EditNewCard from "./EditNewCard";
import EditDetails from "./EditDetails";
import EditPrimaryShowcase from "./EditPrimaryShowcase";
import { useDispatch, useSelector } from "react-redux";
import { updateServiceFormData } from "../../redux/action";
import { useParams } from "react-router-dom";

const EditService = () => {
  const [step, setStep] = useState(1);
  const id = useParams();
  const [formDatas, setformDatas] = useState({});
  const dispatch = useDispatch();
  const savedData = useSelector((state) => state.services);
  useEffect(() => {
    setformDatas(savedData);
  }, [savedData]);
  const handleNextStep1 = (values) => {
    dispatch(updateServiceFormData("heading", values.heading));
    dispatch(updateServiceFormData("des", values.des));
    dispatch(updateServiceFormData("altText", values.altText));
    dispatch(updateServiceFormData("image", values.image));
    setStep(2);
  };
  const handleNextStep2 = (values) => {
    dispatch(updateServiceFormData("form", values));
    setStep(3);
  };
  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (data) => {
    // Submit the form data
    const res = await fetch(
      `http://localhost:8000/service/selectedProduct/${id.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDatas),
      }
    );
    const resData = await res.json();
    if (resData.message === "Resource updated successfully") {
      dispatch(updateServiceFormData("heading", ""));
      dispatch(updateServiceFormData("des", ""));
      dispatch(updateServiceFormData("image", ""));
      dispatch(updateServiceFormData("altText", ""));
      dispatch(updateServiceFormData("form", ""));
      dispatch(updateServiceFormData("serviceName", ""));
      dispatch(updateServiceFormData("pServiceImage", ""));
      dispatch(updateServiceFormData("pAlterNativeText", ""));
    }
  };
  return (
    <div>
      {step === 1 && (
        <EditNewCard onNext={handleNextStep1} formDatas={savedData} id={id.id} />
      )}
      {step === 2 && (
        <EditDetails
          id={id.id}
          onNext={handleNextStep2}
          formDatas={savedData}
          onPrevious={handlePrevious}
        />
      )}
      {step === 3 && (
        <EditPrimaryShowcase
          id={id.id}
          formDatas={savedData}
          onPrevious={handlePrevious}
          onSubmitValue={handleSubmit}
        />
      )}
    </div>
  );
};

export default EditService;
