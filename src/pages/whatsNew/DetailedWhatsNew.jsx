import React from "react";
import ReUsableForm from "../../components/ReUsableComponents/ReUsableForm";
import "../../styles/WhatsNew.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function DetailedWhatsNew() {
  const navigateTo = useNavigate();
  const { register, handleSubmit } = useForm();
  const nextHandler = () => {
    navigateTo("/admin/whatsmew/form");
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
            secondLable="Location"
            thirdLable="Description"
            fourthLable="image"
            firstPlaceHolder="a"
            secondPlaceHolder="Location"
            cancle="Cancle"
            save="Next"
            handleSubmit={nextHandler}
            register={register}
            setFirstValue=""
            setSecondValue=""
            setDesValue=""
            firstValue=""
            secondValue=""
            desValue=""
            image="image"
            type="whatsNewForm2"
            DateLable="Date"
            TimingLable="Timing"
          />
        </div>
      </div>
    </>
  );
}

export default DetailedWhatsNew;
