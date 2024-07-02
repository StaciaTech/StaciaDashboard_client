import React, { useContext, useEffect, useState } from "react";
import EditNewCard from "./EditNewCard";
import EditDetails from "./EditDetails";
import EditPrimaryShowcase from "./EditPrimaryShowcase";
import { useDispatch, useSelector } from "react-redux";
import { updateServiceFormData } from "../../redux/action";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ProductContext } from "../../context/ProductContext";
import { ServiceContext } from "../../context/ServiceContext";

const EditService = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [step, setStep] = useState(1);
  const id = useParams();
  const history = useNavigate();
  const [formDatas, setformDatas] = useState({});
  const dispatch = useDispatch();

  const { setSuccessfullModel } = useContext(ServiceContext);
  const savedData = useSelector((state) => state.services);
  useEffect(() => {
    setformDatas(savedData);
  }, [savedData]);

  const formik = useFormik({
    initialValues: {
      des: savedData.des ? savedData.des : "",
      altText: savedData.altText ? savedData.altText : "",
      image: savedData.image ? savedData.image : "",
      form: savedData.form
        ? savedData.form
        : [{ id: 1, heading: "", description: "" }],
      pImage: savedData.pImage ? savedData.pImage : "",
      pAlterNativeText: savedData.pAlterNativeText
        ? savedData.pAlterNativeText
        : "",
      heading: savedData.heading ? savedData.heading : "",
      domainName: savedData.domainName ? savedData.domainName : "",
      hashTag: savedData.hashTag ? savedData.hashTag : [],
    },
  });
  const handleNextStep1 = () => {
    setStep(2);
  };
  const handleNextStep2 = () => {
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
    dispatch(updateServiceFormData("hashTag", ""));
  };

  const handleSubmit = async () => {
    // Submit the form data
    console.log(formik.values);
    const res = await fetch(`${apiUrl}/service/selectedService/${id.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDatas),
    });
    if (res.status === 200) {
      setSuccessfullModel(true);
      remove();
    }
  };
  const changeandupdate = async () => {
    const res = await fetch(`${apiUrl}/service/ArchiveandUnArchive/${id.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formik.values),
    });
    history("/admin/Service/AllService");
    remove();
  };
  return (
    <div>
      {step === 1 && (
        <EditNewCard
          onNext={handleNextStep1}
          formDatas={savedData}
          formik={formik}
          removeRedux={remove}
          changeandupdate={changeandupdate}
        />
      )}
      {step === 2 && (
        <EditDetails
          onNext={handleNextStep2}
          formDatas={savedData}
          onPrevious={handlePrevious}
          formik={formik}
          changeandupdate={changeandupdate}
        />
      )}
      {step === 3 && (
        <EditPrimaryShowcase
          formDatas={savedData}
          onPrevious={handlePrevious}
          onSubmitValue={handleSubmit}
          formik={formik}
          changeandupdate={changeandupdate}
        />
      )}
    </div>
  );
};

export default EditService;
