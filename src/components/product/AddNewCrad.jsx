import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Backicon from "../../assets/Backicon.svg";
import { useNavigate } from "react-router-dom";
import "../../styles/AddNewProduct.css";
import ProductImgIcon from "../../assets/ProductImgIcon.svg";
import DefaultProductIcon from "../../assets/DefaultProductIcon.svg";
import NotificationIcon from "../../assets/NotificationIcon.svg";
import Trash from "../../assets/Trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateFormData } from "../../redux/action";
import Archive from "../Archive";
import S3 from "react-aws-s3";

const AddNewData = () => {
  const formData = useSelector((state) => state.products);
  const history = useNavigate();
  const [productImg, setProductImg] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setProductImg(formData.image);
  }, [setProductImg, formData.image]);
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
    setProductImg(imageUrl);
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
      waterMark: formData.waterMark ? formData.waterMark : "",
      des: formData.des ? formData.des : "",
      heading: formData.heading ? formData.heading : "",
      altText: formData.altText ? formData.altText : "",
      image: formData.image ? formData.image : "",
    },
    validationSchema: Yup.object().shape({
      waterMark: Yup.string().required(),
      des: Yup.string().required(),
      heading: Yup.string().required(),
      altText: Yup.string().required(),
      // image: Yup.
    }),
    onSubmit: (values) => {
      dispatch(updateFormData("waterMark", values.waterMark));
      dispatch(updateFormData("heading", values.heading));
      dispatch(updateFormData("des", values.des));
      dispatch(updateFormData("altText", values.altText));
      dispatch(updateFormData("image", productImg));
      history("/ProductPage/AddPrimaryShowcase");
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
      const { waterMark, heading, des, altText } = formik.values;

      const data = {
        title: heading,
        image: productImg,
        des: des,
        waterMark: waterMark,
        altText: altText,
        position: 0,
        draft: true,
        archive: true,
      };
      const res = await fetch("http://localhost:8000/product/draftAndArchive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // const resData = await res.json();
      history("/ProductPage/AllProduct");
    }
    if (value === "Save as Archive") {
      setBtnStatus(value);
      setShow(false);
      const { waterMark, heading, des, altText } = formik.values;
      const data = {
        title: heading,
        des: des,
        waterMark: waterMark,
        image: productImg,
        altText: altText,
        position: 0,
        draft: false,
        archive: true,
      };
      const res = await fetch("http://localhost:8000/product/draftAndArchive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // const resData = await res.json();
      history("/ProductPage/AllProduct");
    }
    if (value === "Save as") {
      setBtnStatus(value);
      setShow(false);
    }
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
              onClick={() => history(`/ProductPage/AllProduct`)}
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
                Back / All Product Page
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
                      <Lable>Water Mark</Lable>
                      {formik.values.waterMark.length > 25 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 25 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="input"
                      style={{
                        border:
                          formik.values.waterMark.length <= 25
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <input
                        placeholder="Enter the water Mark"
                        style={{
                          fontSize: "16px",
                          color:
                            formik.values.waterMark.length <= 25
                              ? "#000000"
                              : "#E52f2f",
                          width: "430px",
                          height: "48px",
                          border: "none",
                          "::placeholder": {
                            color: "#787878",
                          },
                        }}
                        onChange={formik.handleChange("waterMark")}
                        value={formik.values.waterMark}
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
                      {formik.values.waterMark.length}/ 25
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
                      {formik.values.des.length > 50 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 50 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="textArea"
                      style={{
                        border:
                          formik.values.des.length <= 50
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
                          height: "380px",
                          border: "none",
                          color:
                            formik.values.des.length <= 50
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
                      {formik.values.des.length}/ 50
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
                      {productImg ? (
                        <img
                          src={Trash}
                          alt="deletebutton"
                          onClick={() => setProductImg("")}
                        />
                      ) : (
                        <>
                          <input
                            type="file"
                            className="file-upload"
                            onChange={onChange}
                            onMouseEnter={onHover}
                            onMouseLeave={onLeave}
                          ></input>
                          <img
                            src={ProductImgIcon}
                            alt=""
                            className="file-input-icon"
                          />
                        </>
                      )}
                    </div>
                    {productImg ? (
                      <div
                        style={{
                          width: "608px",
                          height: "420px",
                          margin: "90px 140px",
                        }}
                      >
                        <img
                          src={productImg}
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
                          height: "94%",
                          marginTop: "12px",
                          marginLeft: "12px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={DefaultProductIcon}
                          alt="DefaultProductIcon"
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
          <div style={{ marginTop: "33px", display: "flex", float: "right" }}>
            <div
              className="save_button"
              onClick={() => history(`/ProductPage/AllProduct`)}
            >
              Cancel
            </div>
            {formik.values.waterMark !== "" &&
            formik.values.heading !== "" &&
            formik.values.des !== "" &&
            formik.values.altText !== "" ? (
              <div
                className="save_button"
                style={{
                  background: "#0044FF",
                  color: "#FFFFFF",
                  marginLeft: "8px",
                }}
                onClick={formik.handleSubmit}
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
                  marginLeft: "8px",
                  cursor: "default",
                }}
              >
                Next
              </div>
            )}
          </div>
        </Container>
      </AddNewProductContainer>
    </>
  );
};

export default AddNewData;

const AddNewProductContainer = styled.div`
  min-width: calc(100vw - 356px);
  background-color: #ffffff;
  margin: 0 22px 0 18px;
`;
const Container = styled.div`
  padding: 25px 59px 25px 60px;
  width: calc(1564px - 119px);
  height: 100vh;
`;
const Lable = styled.div`
  color: #787878;
  font-family: EuclidMedium;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
