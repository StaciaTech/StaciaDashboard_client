import { React, useState } from "react";
import "../../styles/ReUsableForm.css";
import { useForm } from "react-hook-form";

function ReUsableForm({
  firstLable,
  secondLable,
  thirdLable,
  fourthLable,
  firstPlaceHolder,
  secondPlaceHolder,
  cancle,
  save,
  handleSubmit,
  register,
  setFirstValue,
  setSecondValue,
  setDesValue,
  firstValue,
  secondValue,
  desValue,
  image,
  TimingLable,
  DateLable,
  type,
}) {
  const [updateFirstValue, setUpdateFirstValue] = useState(firstValue);
  const [updateSecondValue, setUpdateSecondValue] = useState();
  const [updateThirdValue, setUpdateThirdValue] = useState();
  //   const [updateFourthValue, setUpdateFourthValue] = useState();
  const { errors, getValues } = useForm();

  console.log(updateFirstValue);
  console.log(type);
  return (
    <div style={{ padding: "10px" }}>
      <div
        className="field-container"
        style={{
          display: "flex",
          width: "100%",
          columnGap: "3rem",
        }}
      >
        <div
          style={{
            width: "45%",
          }}
        >
          {type === "whatsNewForm2" && (
            <div style={{ display: "flex", gap: "2rem", width: "100%" }}>
              <div style={{ width: "50%" }}>
                <div className="field-titles">{DateLable}</div>
                <input
                  type="date"
                  name=""
                  id=""
                  placeholder="DD-MM-YYYY"
                  className="input-fields"
                />
              </div>
              <div style={{ width: "50%" }}>
                <div className="field-titles">{TimingLable}</div>
                <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                  <div style={{ width: "25%" }}>
                    <input type="text" name="" id="" className="input-fields" />
                  </div>
                  <div style={{ width: "25%" }}>
                    <select name="" id="" className="input-fields">
                      <option value="Am">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <div style={{ width: "25%" }}>
                    <input type="text" name="" id="" className="input-fields" />
                  </div>
                  <di style={{ width: "25%" }}>
                    <select name="" id="" className="input-fields">
                      <option value="Am">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </di>
                </div>
              </div>
            </div>
          )}
          {(type === "addTestimonial" ||
            type === "EditFounder" ||
            type === "editTestimonial") && (
            <div>
              <div className="field-titles">{firstLable}</div>
              <div>
                <input
                  type="text"
                  onChange={(e) => {
                    setUpdateFirstValue(e.target.value);
                  }}
                  {...register(firstLable)}
                  placeholder={firstValue}
                  className="input-fields"
                />
              </div>
            </div>
          )}
          {(type === "addTestimonial" ||
            type === "EditFounder" ||
            type === "whatsNewForm2" ||
            type === "editTestimonial") && (
            <div>
              <div className="field-titles">{secondLable}</div>
              <div>
                <input
                  type="text"
                  name={secondLable}
                  value={updateSecondValue}
                  onChange={(e) => setUpdateSecondValue(e.target.value)}
                  {...register(secondLable)}
                  placeholder={secondValue}
                  className="input-fields"
                />
              </div>
            </div>
          )}
          {(type === "addTestimonial" ||
            type === "EditFounder" ||
            type === "whatsNewForm1" ||
            type === "whatsNewForm2" ||
            type === "editTestimonial") && (
            <div>
              <div className="field-titles">{thirdLable}</div>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <textarea
                  name={thirdLable}
                  onChange={(e) => setUpdateThirdValue(e.target.value)}
                  value={updateThirdValue}
                  {...register(thirdLable)}
                  id=""
                  className="desc-field"
                  placeholder={desValue}
                  style={
                    type === "whatsNewForm1"
                      ? { height: "40rem" }
                      : { height: "25rem" }
                  }
                />
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          {(type === "addTestimonial" ||
            type === "whatsNewForm1" ||
            type === "whatsNewForm2" ||
            type === "EditFounder" ||
            type === "editTestimonial") && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
                height: "100%",
              }}
            >
              <div className="field-titles">{fourthLable}</div>
              <div className="image-container">
                <input
                  type="file"
                  //   name={fourthLable}
                  //   ref={register()}
                  {...register(fourthLable)}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: 5,
                    borderRadius: "2rem",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {(type === "project" || type === "whatsNewForm2") && (
            <div className="alt-text-box">
              <div>Alternate Text</div>
              <input type="text" name="" id="" className="input-fields" />
            </div>
          )}
        </div>
      </div>
      <div style={{ margin: "2rem 0rem" }}>
        <hr />
      </div>
      <div style={{ display: "flex", justifyContent: "end", gap: "1rem" }}>
        <button className="style-button">{cancle}</button>
        <button className="style-button" onClick={handleSubmit}>
          {save}
        </button>
      </div>
    </div>
  );
}

export default ReUsableForm;
