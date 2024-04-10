import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Backicon from "../../assets/Backicon.svg";
import Archive from "../Archive";
import Add from "../../assets/Add.svg";

const EditDetails = ({ formDatas, onPrevious, onNext, id }) => {

  const history = useNavigate();
  const [forms, setForms] = useState(() => {
    return formDatas.form
      ? formDatas.form
      : [{ id: 1, heading: "", description: "" }];
  });
  const [nextId, setNextId] = useState(2);
  const handleAddForm = () => {
    setForms([...forms, { id: nextId, heading: "", description: "" }]);
    setNextId(nextId + 1);
  };
  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    const updatedForms = forms.map((form) =>
      form.id === id ? { ...form, [name]: value } : form
    );
    setForms(updatedForms);
  };
  const handelSubmit = () => {
    onNext(forms);
  };
  console.log()
  //archive and draft function
  const [btnStatus, setBtnStatus] = useState("Save as");
  const [show, setShow] = useState(false);
  const changeandupdate = async (value) => {
    if (true) {
      setShow(true);
    }
    if (value === "Save as Darft") {
      setBtnStatus(value);
      setShow(false);
      const data = {
        id: id,
        heading: formDatas.heading,
        des: formDatas.des,
        image: formDatas.serviceImg,
        altText: formDatas.altText,
        form: forms,
        position: 0,
        draft: true,
        archive: true,
        primaryShowcase: false,
      };
      await fetch("http://localhost:8000/service/draftAndArchive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // history("/ServicePage/AllService");
    }
    if (value === "Save as Archive") {
      setBtnStatus(value);
      setShow(false);
      const data = {
        id: id,
        heading: formDatas.heading,
        des: formDatas.des,
        image: formDatas.serviceImg,
        altText: formDatas.altText,
        form: forms,
        position: 0,
        draft: false,
        archive: true,
        primaryShowcase: false,
      };
      await fetch("http://localhost:8000/service/draftAndArchive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // history("/ServicePage/AllService");
    }
    if (value === "Save as") {
      setBtnStatus(value);
      setShow(false);
    }
  };
  const renderForms = () => {
    return forms.map((form, index) => (
      <div key={form.id} className="form-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Lable>Heading {form.id}</Lable>
          {/* {formik.values.heading.length > 25 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 25 Characters
                        </span>
                      )} */}
        </div>
        <div
          className="input"
          style={{
            width: "680px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            //   formik.values.heading.length <= 25
            //     ? "1px solid rgba(0, 0, 0, 0.1)"
            //     : "2px solid #E52F2F",
          }}
        >
          <input
            type="text"
            name="heading"
            placeholder="Enter Heading"
            style={{
              fontSize: "16px",
              width: "630px",

              //   color:
              //     formik.values.heading.length <= 25
              //       ? "#000000"
              //       : "#E52f2f",
              height: "48px",
              border: "none",
              "::placeholder": {
                color: "#787878",
              },
            }}
            // onChange={formik.handleChange("heading")}
            // value={formik.values.heading}
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
        >
          {/* {formik.values.heading.length}/ 25 */}
        </span>

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
            {/* {formik.values.des.length > 250 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 250 Characters
                        </span>
                      )} */}
          </div>
          <div
            className="textArea"
            style={{
              width: "680px",
              height: "19.5rem",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              //   formik.values.des.length <= 250
              //     ? "1px solid rgba(0, 0, 0, 0.1)"
              //     : "2px solid #E52F2F",
            }}
          >
            <textarea
              placeholder="Enter Description"
              name="description"
              // onChange={formik.handleChange("des")}
              // value={formik.values.des}
              value={form.description}
              onChange={(e) => handleInputChange(form.id, e)}
              style={{
                fontSize: "16px",
                width: "630px",
                height: "290px",
                border: "none",
                //   color:
                //     formik.values.des.length <= 250
                //       ? "#000000"
                //       : "#E52f2f",
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
          >
            {/* {formik.values.des.length}/ 250 */}
          </span>
        </div>
      </div>
    ));
  };
  return (
    <>
      <AddNewProductContainer>
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
            // onClick={() => history(-1)}
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
                changeandupdate={changeandupdate}
                btnStatus={btnStatus}
                show={show}
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

            {/* save and Cancel button */}
          </div>
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "#0000001A",
              marginTop: "34px",
            }}
          ></div>
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
            <div className="save_button" onClick={onPrevious}>
              Privious
            </div>
            <div
              onClick={() => handelSubmit()}
              className="save_button"
              style={{
                backgroundColor: "#0044FF",
                color: "#ffff",
              }}
            >
              Next
            </div>
          </div>
        </Container>
      </AddNewProductContainer>
    </>
  );
};

export default EditDetails;

const AddNewProductContainer = styled.div`
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
