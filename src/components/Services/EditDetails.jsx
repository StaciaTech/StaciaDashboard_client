import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Backicon from "../../assets/Backicon.svg";
import Archive from "../Archive";
import Add from "../../assets/Add.svg";
import { ServiceContext } from "../../context/ServiceContext";
import { updateServiceFormData } from "../../redux/action";
import { useDispatch } from "react-redux"

const EditDetails = ({ onPrevious, onNext, id, formik,changeandupdate }) => {

  const history = useNavigate()
  const dispatch = useDispatch()
  const { btnStatus } = useContext(ServiceContext)
  const [nextId, setNextId] = useState(2);
  const handleAddForm = () => {
    formik.setFieldValue("form", [...formik.values.form, { id: nextId, heading: "", description: "" }]);
    setNextId(nextId + 1);
  };

  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    const updatedForms = formik.values.form.map((form) =>
      form.id === id ? { ...form, [name]: value } : form
    );
    formik.setFieldValue("form", updatedForms)
    dispatch(updateServiceFormData("form", updatedForms))
  };

  const renderForms = () => {
    return formik.values.form.map((form, index) => (
      <div key={form.id} className="form-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Lable>Heading {form.id}</Lable>
        </div>
        <div
          className="input"
          style={{
            width: "680px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <input
            type="text"
            name="heading"
            placeholder="Enter Heading"
            style={{
              fontSize: "16px",
              width: "630px",

              height: "48px",
              border: "none",
              "::placeholder": {
                color: "#787878",
              },
            }}
            value={form.heading}
            onChange={(e) => handleInputChange(form.id, e)}
          />
        </div>

        <span
          style={{
            position: "absolute",
            right: "10px",
            bottom: "16px",
            color: "#787878",
          }}
        ></span>

        <div
          style={{
            paddingTop: "25px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Lable>Description {form.id}</Lable>
          </div>
          <div
            className="textArea"
            style={{
              width: "680px",
              height: "19.5rem",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <textarea
              placeholder="Enter Description"
              name="description"
              value={form.description}
              onChange={(e) => handleInputChange(form.id, e)}
              style={{
                fontSize: "16px",
                width: "630px",
                height: "290px",
                border: "none",
                resize: "none",
                fontFamily: "EuclidRegular",
                "::placeholder": {
                  color: "#787878",
                },
              }}
            />
          </div>

          <span
            style={{
              position: "absolute",
              right: "10px",
              bottom: "16px",
              color: "#787878",
            }}
          ></span>
        </div>
      </div>
    ));
  };
  return (
    <>
      <AddNewserviceContainer>
        <Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                paddingTop: "17.5px",
                cursor: "pointer",
              }}
              onClick={onPrevious}
            >
              <img src={Backicon} alt="" />
              <div
                style={{
                  marginLeft: "5px",
                  color: "#787878",
                  fontSize: "16px",
                  fontFamily: "EuclidMedium",
                }}
              >
                Back / All Services / Detailed Description
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Archive
                btnStatus={btnStatus}
                changeandupdate={changeandupdate}
              />
            </div>
          </div>
          {/* horizontal line */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "#0000001A",
              marginTop: "34px",
            }}
          ></div>
          <div className="grid-container">
            {renderForms()}
            <div className="plus-container">
              <button
                onClick={handleAddForm}
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#0047FF",
                    fontSize: "20px",
                    fontFamily: "Euclid",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={Add}
                    alt=""
                    style={{ paddingRight: "7px", cursor: "pointer" }}
                  />
                  Add Content
                </div>
              </button>
            </div>

          </div>
          {/* horizontal line */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "#0000001A",
              marginTop: "34px",
            }}
          ></div>
          {/* save and Cancel button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              columnGap: "1rem",
              marginTop: "33px",
            }}
          >
            <div
              className="save_button"
              onClick={onPrevious}
            >
              Previous
            </div>
            {
              formik.values.form !== "" ? (
                <div
                  className="save_button"
                  style={{
                    background: "#0044FF",
                    color: "#FFFFFF",
                  }}
                  onClick={onNext}
                >
                  Next
                </div>
              ) : (
                <div
                  className="save_button"
                  style={{
                    background: "#0044FF",
                    color: "#FFFFFF",
                    opacity: 0.2,
                    cursor: "default",
                  }}
                >
                  Next
                </div>
              )}
          </div>
        </Container>
      </AddNewserviceContainer>
    </>
  );
};

export default EditDetails;

const AddNewserviceContainer = styled.div`
  min-width: calc(100vw - 356px);
  background-color: #ffffff;
  margin: 0 22px 0 18px;
  min-height: 100vh;
`;
const Container = styled.div`
  padding: 25px 59px 25px 60px;
  width: calc(1564px - 119px);
  min-height: 100vh;
`;
const Lable = styled.div`
  color: #787878;
  font-family: EuclidMedium;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
