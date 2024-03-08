import React, { useContext, useState } from "react";
import styled from "styled-components";
import Backicon from "../../assets/Backicon.svg";
import Archive from "../Archive";
import { useNavigate } from "react-router-dom";
import DefaultserviceIcon from "../../assets/DefaultProductIcon.svg";
import serviceImgIcon from "../../assets/ProductImgIcon.svg";
import NotificationIcon from "../../assets/NotificationIcon.svg";
import Trash from "../../assets/Trash.svg";
import "../../styles/AddNewProduct.css";
import ReactModal from "react-modal";
import successful from "../../assets/successful.svg";
import { ProductContext } from "../../context/ProductContext";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateServiceFormData } from "../../redux/action";

const EditPrimaryShowcase = ({ onPrevious, formDatas, onSubmitValue, id }) => {
  const history = useNavigate();
  const [btnStatus, setBtnStatus] = useState("Save as");
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(true);
  const { showModel, setShowModel } = useContext(ProductContext)
  const dispatch = useDispatch()

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "15px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "621px",
      height: "458px",
    },
    overlay: {
      background: "rgba(0,0,0,0.25)",
    },
  };
  const onHover = () => {
    setHover(false);
  };
  const onLeave = () => {
    setHover(true);
  };
  const onChange = async (e) => {
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
    formik.setFieldValue("pServiceImage", imageUrl);
  };

  const formik = useFormik({
    initialValues: {
      serviceName: formDatas.serviceName ? formDatas.serviceName : "",
      pServiceImage: formDatas.pServiceImage ? formDatas.pServiceImage : "",
      pAlterNativeText: formDatas.pAlterNativeText
        ? formDatas.pAlterNativeText
        : "",
    },
    onSubmit: () => {
      setShowModel(true)
    },
  });
  const btn_handeler = () => {
    dispatch(updateServiceFormData("serviceName", formik.values.serviceName));
    dispatch(updateServiceFormData("pServiceImage", formik.values.pServiceImage));
    dispatch(
      updateServiceFormData("pAlterNativeText", formik.values.pAlterNativeText)
    );
    onSubmitValue();
    setShowModel(false);
    history("/ServicePage/AllService");
  };
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
        form: formDatas.form,
        pServiceName: formik.values.serviceName,
        pImage: formik.values.pServiceImage,
        pAltText: formik.values.pAlterNativeText,
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
      history("/ServicePage/AllService");
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
        form: formDatas.form,
        pServiceName: formik.values.serviceName,
        pImage: formik.values.pServiceImage,
        pAltText: formik.values.pAlterNativeText,
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
      history("/ServicePage/AllService");
    }
    if (value === "Save as") {
      setBtnStatus(value);
      setShow(false);
    }
  };
  return (
    <>
      <div>
        <ReactModal
          isOpen={showModel}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "71px",
              flexDirection: "column",
            }}
          >
            <img src={successful} alt="successfull" />
            <h1>Added Successfully!</h1>
            <p style={{ width: "32.375rem", textAlign: "center" }}>
              Your Product information has been successfully added to the
              Website. Thank you for updating your details!
            </p>
            <button
              style={{
                background: "#0047FF",
                width: "35.063rem",
                height: "3.125rem",
                marginTop: "10%",
                border: "none",
                borderRadius: "5px",
                color: "#ffff",
                fontSize: "1rem",
                fontFamily: "EuclidMedium",
                cursor: "pointer",
              }}
              onClick={() => btn_handeler()}
            >
              Done
            </button>
          </div>
        </ReactModal>
      </div>
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
                Back / All Services / Detailed Description / Primary Showcase
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Lable>Service Name </Lable>
            {/* {formik.values.heading.length > 25 && (
                      <span style={{ color: "#E52F2F" }}>
                        Max 25 Characters
                      </span>
                    )} */}
          </div>
          <div
            className="input"
            style={{
              width: "89.3rem",
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
                width: "86.5rem",

                color: "#000000",
                //     formik.values.heading.length <= 25
                //       ? "#000000"
                //       : "#E52f2f",
                height: "48px",
                border: "none",
                "::placeholder": {
                  color: "#787878",
                },
              }}
              onChange={formik.handleChange("serviceName")}
              value={formik.values.serviceName}
            // value={form.heading}
            // onChange={(e) => handleInputChange(form.id, e)}
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
          <div style={{ width: "90.3rem", marginTop: "10px" }}>
            <Lable>Image</Lable>
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
                {formik.values.pServiceImage ? (
                  <img
                    src={Trash}
                    alt="deletebutton"
                    onClick={() => formik.setFieldValue("pServiceImage", "")}
                  />
                ) : (
                  <>
                    <input
                      type="file"
                      className="file-upload"
                      onChange={(e) => onChange(e)}
                      onMouseEnter={onHover}
                      onMouseLeave={onLeave}
                    ></input>
                    <img
                      src={serviceImgIcon}
                      alt=""
                    // className="file-input-icon"
                    />
                  </>
                )}
              </div>
              {formik.values.pServiceImage ? (
                <div
                  style={{
                    width: "89.3rem",
                    height: "520px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={formik.values.pServiceImage}
                    alt="serviceImage"
                    style={{
                      width: "50.3rem",
                      height: "80%",
                      marginTop: "12px",
                      marginLeft: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: "89.3rem",
                    height: "94%",
                    marginTop: "12px",
                    marginLeft: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={DefaultserviceIcon} alt="DefaultserviceIcon" />
                </div>
              )}
            </div>
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
              {/* {formik.values.altText.length > 25 && (
                      <span style={{ color: "#E52F2F" }}>
                        Max 25 Characters
                      </span>
                    )} */}
            </div>
            <div
              className="right_input"
              style={{
                width: "89.3rem",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                //   formik.values.altText.length <= 25
                //     ? "1px solid rgba(0, 0, 0, 0.1)"
                //     : "2px solid #E52F2F",
              }}
            >
              <input
                placeholder="Enter Heading"
                style={{
                  fontSize: "16px",

                  width: "86.5rem",
                  color: "#000000",
                  // formik.values.altText.length <= 25
                  //   ? "#000000"
                  //   : "#E52f2f",
                  height: "48px",
                  border: "none",
                  "::placeholder": {
                    color: "#787878",
                  },
                }}
                onChange={formik.handleChange("pAlterNativeText")}
                value={formik.values.pAlterNativeText}
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
              {formik.values.pAlterNativeText.length}/ 25
            </span>
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
              Previous
            </div>
            {/* {formik.values.heading !== "" &&
          formik.values.des !== "" &&
          formik.values.altText !== "" ? (  */}
            <div
              className="save_button"
              style={{
                background: "#0044FF",
                color: "#FFFFFF",
                marginLeft: "8px",
              }}
              onClick={formik.handleSubmit}
            >
              Save & Post
            </div>
            {/* {/* ) : ( */}
            {/* <div
            className="save_button"
            style={{
              background: "#0044FF",
              color: "#FFFFFF",
              opacity: 0.2,
              marginLeft: "8px",
              cursor: "default",
            }}
          >
            Next
          </div> */}
            {/* )} */}
          </div>
        </Container>
      </AddNewserviceContainer>
    </>
  );
};

export default EditPrimaryShowcase;
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
