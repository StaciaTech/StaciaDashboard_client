import React from "react";
import "../.././styles/Projectstyles.css";
import ReUsableForm from "../../components/ReUsableComponents/ReUsableForm";
import { useForm } from "react-hook-form";

function ProjectPage() {
  const nextHandler = () => {
    console.log(" fired");
  };
  const { register, handleSubmit } = useForm();

  return (
    <div className="project-container">
      <div style={{ cursor: "pointer" }}>Back</div>
      <div>
        <ReUsableForm
          firstLable="a"
          secondLable="b"
          thirdLable="c"
          fourthLable="Image"
          firstPlaceHolder="a"
          secondPlaceHolder="b"
          cancle="cancle"
          save="next"
          handleSubmit={nextHandler}
          register={register}
          setFirstValue=""
          setSecondValue=""
          setDesValue=""
          firstValue="a1"
          secondValue="b2"
          desValue="lorem"
          image="image"
          type="project"
        />
      </div>
    </div>
  );
}

export default ProjectPage;
