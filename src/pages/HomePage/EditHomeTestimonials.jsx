import React from "react";
import ReUsableForm from "../../components/ReUsableComponents/ReUsableForm";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function EditHomeTestimonials() {
  const navigateTo = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="home-testimonial-container">
        <div onClick={() => navigateTo(-1)} style={{ cursor: "pointer" }}>
          Back
        </div>
        <div>
          <ReUsableForm
            firstLable="Name"
            secondLable="Designation"
            thirdLable="Testimonial"
            fourthLable="image"
            firstPlaceHolder="a"
            secondPlaceHolder="b"
            cancle="Cancle"
            save="Save"
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            setFirstValue=""
            setSecondValue=""
            setDesValue=""
            firstValue=""
            secondValue=""
            desValue=""
            image=""
            type="editTestimonial"
          />
        </div>
      </div>
    </>
  );
}

export default EditHomeTestimonials;
