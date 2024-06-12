import React from "react";
import "../../styles/WhatsNew.css";
import ReUsableForm from "../../components/ReUsableComponents/ReUsableForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddWhatsNew() {
  const navigateTo = useNavigate();
  const { register, handleSubmit } = useForm();
  const nextHandler = () => {
    navigateTo("/admin/WhatsNew/detailedWhatsNew");
  };

  return (
    <>
      <div className="whatsNew-container">
        <div style={{ cursor: "pointer" }} onClick={() => navigateTo(-1)}>
          Back
        </div>
        <div>
          <ReUsableForm
            firstLable="a"
            secondLable="b"
            thirdLable="Description"
            fourthLable="image"
            firstPlaceHolder="a"
            secondPlaceHolder="b"
            cancle="Cancle"
            save="Next"
            handleSubmit={nextHandler}
            register={register}
            setFirstValue=""
            setSecondValue=""
            setDesValue=""
            firstValue="a"
            secondValue="b"
            desValue=""
            image="image"
            type="whatsNewForm1"
          />
        </div>
      </div>
    </>
  );
}

export default AddWhatsNew;
