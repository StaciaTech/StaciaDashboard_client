import React, { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Backicon from "../../assets/Backicon.svg";
import { useNavigate } from "react-router-dom";
import "../../styles/AddNewProduct.css";
import serviceImgIcon from "../../assets/ProductImgIcon.svg";
import DefaultserviceIcon from "../../assets/DefaultProductIcon.svg";
import NotificationIcon from "../../assets/NotificationIcon.svg";
import DefaultProductIcon from "../../assets/DefaultProductIcon.svg";
import successful from "../../assets/successful.svg";
import Trash from "../../assets/Trash.svg";
import { useFormik } from "formik";
import Archive from "../Archive";
import { updateServiceFormData } from "../../redux/action";
import { ServiceContext } from "../../context/ServiceContext";
import ReactModal from "react-modal";
import close from "../../assets/close.svg";
import axios from "axios";

const AddNewServiceData = ({ onNext, savedData, formik, removeRedux }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useNavigate();
  const [signedUrl, SetSignedUrl] = useState("");

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const {
    showModel,
    setShowModel,
    showCardSuccessfull,
    setShowCardSuccessfull,
    imageOverlayShow,
    setImageOverlayShow,
  } = useContext(ServiceContext);

  //drag and drop image
  const handleDragOver = (e) => {
    e.preventDefault();
    setImageOverlayShow(true);
  };

  const handleDrop = async (e) => {
    setImageOverlayShow(false);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.dataTransfer.files[0]);
    const res = await fetch(`${apiUrl}/product/uploadfile`, {
      method: "POST",
      body: formData,
    });
    const resData = await res.json();
    console.log(resData);
    formik.setFieldValue("image", resData.image);
    formik.setFieldValue("imageType", resData.imageType);

    axios
      .post(`${apiUrl}/product/getimageurl`, {
        image: resData.image,
        imageType: resData.imageType,
      })
      .then(function (response) {
        console.log("signedurl :", response.data.url);
        SetSignedUrl(response.data.url);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(resData.signedUrl)
    dispatch(updateServiceFormData("image", resData.image));
  };
  //onchange image
  const onChange = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    // formData.append("image", "")
    const res = await fetch(`${apiUrl}/product/uploadfile`, {
      method: "POST",
      body: formData,
    });
    const resData = await res.json();
    console.log(resData);
    formik.setFieldValue("image", resData.image);
    formik.setFieldValue("imageType", resData.imageType);

    axios
      .post(`${apiUrl}/product/getimageurl`, {
        image: resData.image,
        imageType: resData.imageType,
      })
      .then(function (response) {
        console.log("signedurl :", response.data.url);
        SetSignedUrl(response.data.url);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(resData.signedUrl)
    dispatch(updateServiceFormData("image", resData.image));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    dispatch(updateServiceFormData(name, value));
  };

  //Notification Model Style
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "15px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "28.625rem",
      height: "9.85rem",
    },
    overlay: {
      background: "rgba(0,0,0,0.25)",
    },
  };

  //Draft Model Style
  const draftStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "15px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "38.813rem",
      height: "28.625rem",
    },
    overlay: {
      background: "rgba(0,0,0,0.25)",
    },
  };

  //final back button
  const handelBack = () => {
    // Check if any value is non-empty
    if (formik.dirty) {
      // non-empty values
      // console.log("hello")
      setShowModel(true);
    } else {
      // all values being empty
      history(-1);
      removeRedux();
    }
  };

  //Filled Value save As Draft
  const saveAsDraftbtn = async () => {
    const res = await fetch(`${apiUrl}/service/addDraft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(savedData),
    });
    setShowCardSuccessfull(true);
    setShowModel(false);
  };
  //UnSaved Back
  const backbtn = () => {
    history("/admin/Service/AllService");
    setShowModel(false);
    removeRedux();
  };

  //Successfull Draft Button
  const createDraft = () => {
    history("/admin/Service/AllService");
    setShowCardSuccessfull(false);
    removeRedux();
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
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
            className="cursor"
            onClick={() => setShowModel(!showModel)}
          >
            <img src={close} alt="closebtn" />
          </div>
          <div>
            <p
              style={{
                width: "100%",
                textAlign: "left",
                fontFamily: "EuclidMedium",
                fontSize: "18px",
              }}
            >
              You have unsaved changes. Leaving this page will discard them
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                columnGap: "1rem",
              }}
              className="popupbtns"
            >
              <button
                className="popupbtn colour cursor"
                onClick={() => backbtn()}
              >
                Okay
              </button>
              <button
                className="popupbtn cursor"
                onClick={() => saveAsDraftbtn()}
              >
                Save as Draft
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
      <div>
        <ReactModal
          isOpen={showCardSuccessfull}
          style={draftStyle}
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
            <h1>Saved as Draft</h1>
            <p style={{ width: "25.075rem", textAlign: "center" }}>
              Your edits have been successfully saved as a draft. Take your time
              to review and refine your work.
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
              onClick={() => createDraft()}
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
              onClick={() => handelBack()}
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
                        height: "630px",
                        border:
                          formik.values.des.length <= 250
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <textarea
                        placeholder="Enter Description"
                        name="des"
                        onChange={handleChange}
                        value={formik.values.des}
                        style={{
                          fontSize: "16px",
                          width: "430px",
                          height: "600px",
                          resize: "none",
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
                  <Lable>Image</Lable>
                  <div
                    style={{
                      width: "849px",
                      height: "531px",
                      border: "1px solid rgba(0, 0, 0, 0.1) ",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontFamily: "Euclid",
                      marginTop: "15px",
                      color: "#787878",
                      display: "flex",
                      filter: imageOverlayShow && "blur(0.8px)",
                      justifyContent: "center",
                      position: "relative",
                      // backgroundColor:"red"
                    }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {imageOverlayShow && (
                      <>
                        <div
                          style={{
                            position: "absolute",
                            width: "98%",
                            height: "98%",
                            backgroundColor: "rgba(0, 0, 0, 0.56)",
                            border: "2px dashed #fff",
                            borderRadius: "5px",
                            zIndex: 9999,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onDragLeave={() => setImageOverlayShow(false)}
                        ></div>
                      </>
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
                      {formik.values.image && (
                        <img
                          src={Trash}
                          alt="deletebutton"
                          onClick={() => formik.setFieldValue("image", "")}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        fileInputRef.current.click();
                      }}
                    >
                      {formik.values.image ? (
                        <div
                          style={{
                            maxWidth: "650px",
                            height: "420px",
                          }}
                        >
                          <img
                            src={formik.values.image}
                            alt="ProductImage"
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
                            // height: "94%",
                            marginTop: "12px",
                            marginLeft: "12px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              width: "608px",
                              height: "420px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <img
                              src={DefaultProductIcon}
                              alt="DefaultProductIcon"
                            />
                            <input
                              type="file"
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "none",
                              }}
                              ref={fileInputRef}
                              onChange={(e) => onChange(e)}
                            />
                            <p
                              style={{
                                maxWidth: "299px",
                                lineHeight: "200%",
                                textAlign: "center",
                              }}
                            >
                              <div style={{ fontFamily: "EuclidSemiBold" }}>
                                Click or drag{" "}
                                <span
                                  style={{ color: "blue", cursor: "pointer" }}
                                >
                                  file
                                </span>{" "}
                                to this area to upload
                              </div>
                              <div>upload image “1920 x 1080” size</div>
                            </p>
                          </div>
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
                      <Lable>Alt Text</Lable>
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
                        name="altText"
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
                        onChange={handleChange}
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
              onClick={() => history(`/admin/service/Allservice`)}
            >
              Cancel
            </div>
            {formik.values.image !== "" &&
            formik.values.des !== "" &&
            formik.values.altText !== "" ? (
              <div
                className="save_button"
                style={{
                  backgroundColor: "#0044FF",
                  color: "#ffff",
                }}
                onClick={onNext}
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
