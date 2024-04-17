import React, { useState, useEffect, useContext } from "react";
import FormContainer from "./AddServiceDetailPage";
import AddServicePrimaryShowcase from "./AddServicePrimaryShowcase";
import AddNewServiceData from "./AddNewCrad";
import { useDispatch, useSelector } from "react-redux";
import { updateServiceFormData } from "../../redux/action";
import { useFormik } from "formik";
import { ServiceContext } from "../../context/ServiceContext";

// Parent component
const ServiceAddForm = () => {
  const dispatch = useDispatch();
  const [formDatas, setformDatas] = useState()
  const [step, setStep] = useState(1);
  const savedData = useSelector((state) => state.services);
  const { setSuccessfullModel,} = useContext(ServiceContext)

  useEffect(() => {
    setformDatas(savedData);
  }, [savedData]);

  const formik = useFormik({
    initialValues: {
      heading: savedData.heading ? savedData.heading : "",
      des: savedData.des ? savedData.des : "",
      altText: savedData.altText ? savedData.altText : "",
      image: savedData.image ? savedData.image : "",
      form: savedData.form ? savedData.form : [{ id: 1, heading: "", description: "" }],
      pImage: savedData.pImage ? savedData.pImage : "",
      pAlterNativeText: savedData.pAlterNativeText ? savedData.pAlterNativeText : "",
      heading: savedData.heading ? savedData.heading : "",
      domainName: savedData.domainName ? savedData.domainName : '',
      hashTag: savedData.hashTag ? savedData.hashTag : [],
    },
  });
  const handleNextStep1 = (values) => {
    setStep(2);
  };

  const handleNextStep2 = (serviceDetails) => {
    setStep(3);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };


  const remove = () => {
    dispatch(updateServiceFormData("des", ""));
    dispatch(updateServiceFormData("image", ""));
    dispatch(updateServiceFormData("altText", ""));
    dispatch(updateServiceFormData("form", ""));
    dispatch(updateServiceFormData("pServiceImage", ""));
    dispatch(updateServiceFormData("pAlterNativeText", ""));
    dispatch(updateServiceFormData("heading", ""));
    dispatch(updateServiceFormData("domainName", ""));
    dispatch(updateServiceFormData("hashTag", ""))
  }
  const handleSubmit = async () => {
    console.log(formDatas)
    const res = await fetch("http://localhost:8000/service/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDatas),
    });
    const resData = await res.json();
    if (resData.message === "Data upload successfully") {
     remove()
    setSuccessfullModel(true)
    }
  };

  return (
    <div>
      {step === 1 && (
        <AddNewServiceData
          onNext={handleNextStep1}
          savedData={savedData}
          formik={formik}
          removeRedux={remove}
        />
      )}
      {step === 2 && (
        <FormContainer
          onNext={handleNextStep2}
          savedData={savedData}
          onPrevious={handlePrevious}
          formik={formik}
        />
      )}
      {step === 3 && (
        <AddServicePrimaryShowcase
          savedData={savedData}
          onPrevious={handlePrevious}
          onSubmitValue={handleSubmit}
          formik={formik}
        />
      )}
    </div>
  );
};

export default ServiceAddForm;
