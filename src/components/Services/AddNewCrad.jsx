import React, { useState } from "react";
import styled from "styled-components";
import Backicon from "../../assets/Backicon.svg";
import { useNavigate } from "react-router-dom";
import "../../styles/AddNewProduct.css";
import serviceImgIcon from "../../assets/ProductImgIcon.svg";
import DefaultserviceIcon from "../../assets/DefaultProductIcon.svg";
import NotificationIcon from "../../assets/NotificationIcon.svg";
import Trash from "../../assets/Trash.svg";
import { useFormik } from "formik";
import Archive from "../Archive";

const AddNewServiceData = ({ onNext, savedData }) => {
  const history = useNavigate();

  const onChangeImage = async (e) => {
    const { url } = await fetch("http://localhost:8000/upload").then((res) =>
      res.json()
    );

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: e.target.files[0],
    });

    const imageUrl = url.split("?")[0];
    formik.setFieldValue("image", imageUrl);
  };

  const [hover, setHover] = useState(true);
  const onHover = () => {
    setHover(false);
  };
  const onLeave = () => {
    setHover(true);
  };

  const formik = useFormik({
    initialValues: {
      heading: savedData.heading ? savedData.heading : "",
      des: savedData.des ? savedData.des : "",
      altText: savedData.altText ? savedData.altText : "",
      image: savedData.image ? savedData.image : "",
    },
    onSubmit: (values) => {
      onNext(values);
    },
  });

  const [btnStatus, setBtnStatus] = useState("Save as");
  const [show, setShow] = useState(false);
  const changeandupdate = async (value) => {
    if (true) {
      setShow(true);
    }
    if (value === "Save as Darft") {
      setBtnStatus(value);
      setShow(false);
      const { heading, des, altText, image } = formik.values;
      const data = {
        heading: heading,
        des: des,
        image: image,
        altText: altText,
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
      const { heading, des, altText, image } = formik.values;
      const data = {
        heading: heading,
        des: des,
        image: image,
        altText: altText,
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
              onClick={() => history("/ServicePage/AllService")}
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
                Back / All service Page
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
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "#0000001A",
              marginTop: "34px",
            }}
          >
            <form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "30px",
                }}
              >
                <div>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Lable>Heading</Lable>
                      {formik.values.heading.length > 25 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 25 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="input"
                      style={{
                        border:
                          formik.values.heading.length <= 25
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <input
                        placeholder="Enter Heading"
                        style={{
                          fontSize: "16px",
                          width: "430px",
                          color:
                            formik.values.heading.length <= 25
                              ? "#000000"
                              : "#E52f2f",
                          height: "48px",
                          border: "none",
                          "::placeholder": {
                            color: "#787878",
                          },
                        }}
                        onChange={formik.handleChange("heading")}
                        value={formik.values.heading}
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
                      {formik.values.heading.length}/ 25
                    </span>
                  </div>
                  <div style={{ paddingTop: "25px", position: "relative" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Lable>Description</Lable>
                      {formik.values.des.length > 250 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 250 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="textArea"
                      style={{
                        height: "32.5rem",
                        border:
                          formik.values.des.length <= 250
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <textarea
                        placeholder="Enter Description"
                        onChange={formik.handleChange("des")}
                        value={formik.values.des}
                        style={{
                          fontSize: "16px",
                          width: "430px",
                          height: "490px",
                          border: "none",
                          color:
                            formik.values.des.length <= 250
                              ? "#000000"
                              : "#E52f2f",
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
                      {formik.values.des.length}/ 250
                    </span>
                  </div>
                </div>
                <div style={{ width: "849px" }}>
                  <Lable>Heading</Lable>
                  <div className="right_container">
                    {hover ? (
                      <div></div>
                    ) : (
                      <div
                        style={{
                          width: "151px",
                          height: "62px",
                          display: "flex",
                          position: "absolute",
                          right: "84px",
                        }}
                      >
                        <img src={NotificationIcon} alt="" />
                      </div>
                    )}

                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        position: "absolute",
                        right: "84px",
                        marginTop: "77px",
                        marginRight: "36px",
                      }}
                    >
                      {formik.values.image ? (
                        <img
                          src={Trash}
                          alt="deletebutton"
                          onClick={() => formik.setFieldValue("image", "")}
                        />
                      ) : (
                        <>
                          <input
                            type="file"
                            name="image"
                            className="file-upload"
                            onChange={(e) => onChangeImage(e)}
                            onMouseEnter={onHover}
                            onMouseLeave={onLeave}
                          ></input>
                          <img
                            src={serviceImgIcon}
                            alt=""
                            className="file-input-icon"
                          />
                        </>
                      )}
                    </div>
                    {formik.values.image ? (
                      <div
                        style={{
                          width: "608px",
                          height: "420px",
                          margin: "90px 140px",
                        }}
                      >
                        <img
                          src={formik.values.image}
                          alt="serviceImage"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "830px",
                          height: "94%",
                          marginTop: "12px",
                          marginLeft: "12px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={DefaultserviceIcon}
                          alt="DefaultserviceIcon"
                        />
                      </div>
                    )}
                  </div>
                  <div style={{ paddingTop: "22px", position: "relative" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Lable>Alternative Text</Lable>
                      {formik.values.altText.length > 25 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 25 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="right_input"
                      style={{
                        border:
                          formik.values.altText.length <= 25
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <input
                        placeholder="Enter Heading"
                        style={{
                          fontSize: "16px",
                          width: "749px",
                          color:
                            formik.values.altText.length <= 25
                              ? "#000000"
                              : "#E52f2f",
                          height: "48px",
                          border: "none",
                          "::placeholder": {
                            color: "#787878",
                          },
                        }}
                        onChange={formik.handleChange("altText")}
                        value={formik.values.altText}
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
                      {formik.values.altText.length}/ 25
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div
            style={{ width: "100%", height: "679px", marginTop: "34px" }}
          ></div>

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
              onClick={() => history(`/servicePage/Allservice`)}
            >
              Cancel
            </div>
            {formik.values.heading !== "" &&
            formik.values.image !== "" &&
            formik.values.des !== "" &&
            formik.values.altText !== "" ? (
              <div
                className="save_button"
                style={{
                  backgroundColor: "#0044FF",
                  color: "#ffff",
                }}
                onClick={formik.handleSubmit}
              >
                Next
              </div>
            ) : (
              <div
                className="save_button"
                style={{
                  // width: "141px",
                  background: "#0044FF",
                  color: "#FFFFFF",
                  opacity: 0.2,
                  cursor: "default",
                  // height: "3.5rem",
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

export default AddNewServiceData;

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
