import React from "react";
import ReUsableForm from "../../components/ReUsableComponents/ReUsableForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddHomeTestimonial() {
  const navigateTo = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // setFounderFormData(data);
    console.log(data);
  };

  return (
    <div className="home-testimonial-container">
      <div style={{ cursor: "pointer" }} onClick={() => navigateTo(-1)}>
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
          type="addTestimonial"
        />
      </div>
    </div>
  );
}

export default AddHomeTestimonial;
