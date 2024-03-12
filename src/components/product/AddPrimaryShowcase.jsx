import React, { useContext, useState } from "react";
import styled from "styled-components";
import Backicon from "../../assets/Backicon.svg";
import { useNavigate } from "react-router-dom";
import "../../styles/AddNewProduct.css";
import ProductImgIcon from "../../assets/ProductImgIcon.svg";
import DefaultProductIcon from "../../assets/DefaultProductIcon.svg";
import NotificationIcon from "../../assets/NotificationIcon.svg";
import Trash from "../../assets/Trash.svg";
import { useSelector } from "react-redux";
import Archive from "../Archive";
import { ProductContext } from "../../context/ProductContext";
import ReactModal from "react-modal";
import successful from "../../assets/successful.svg";

const AddPrimaryShowcase = () => {
  const history = useNavigate();
  const [productImg, setProductImg] = useState();
  const [heading, setHeading] = useState("");
  const [domainName, setDomainName] = useState("");
  const [des1, setDes1] = useState("");
  const [des2, setDes2] = useState("");
  const [altText, setAltText] = useState("");
  const { showModel, setShowModel } = useContext(ProductContext);

  const formData = useSelector((state) => state.products)

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
  const handleAddNewData = async () => {
    const data = {
      title: formData.heading,
      des: formData.des,
      image: formData.image,
      archive: false,
      primaryShowcase: false,
      waterMark: formData.heading,
      draft: false,
      altText: formData.altText,
      PHeading: heading,
      pImage: productImg,
      PDomainName: domainName,
      pDes1: des1,
      pDes2: des2,
      pAltText: altText,
    };
    const res = await fetch("http://localhost:8000/product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (resData.message === "Data upload successfully") {
      setShowModel(true);
    }
  };


  const [hover, setHover] = useState(true);
  const onHover = () => {
    setHover(false);
  };
  const onLeave = () => {
    setHover(true);
  };

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

  const [btnStatus, setBtnStatus] = useState("Save as");
  const [show, setShow] = useState(false);
  const changeandupdate = async (value) => {
    if (true) {
      setShow(true);
    }
    if (value === "Save as Archive") {
      setBtnStatus(value);
      setShow(false);
      const newData = {
        title: formData.heading,
        des: formData.des,
        image: formData.image,
        archive: true,
        primaryShowcase: false,
        waterMark: formData.heading,
        draft: false,
        position: 0,
        altText: formData.altText,
        PHeading: heading,
        pImage: productImg,
        PDomainName: domainName,
        pDes1: des1,
        pDes2: des2,
        pAltText: altText,
      };
      const res = await fetch("http://localhost:8000/product/draftAndArchive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      // const resData = await res.json();
      // history("/ProductPage/AllProduct");
    }
    if (value === "Save as Darft") {
      setBtnStatus(value);
      setShow(false);
      const newData = {
        title: formData.heading,
        des: formData.des,
        image: formData,
        archive: true,
        primaryShowcase: false,
        waterMark: formData.heading,
        position: 0,
        draft: true,
        altText: formData.altText,
        PHeading: heading,
        pImage: productImg,
        PDomainName: domainName,
        pDes1: des1,
        pDes2: des2,
        pAltText: altText,
      };
      const res = await fetch("http://localhost:8000/product/draftAndArchive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      // const resData = await res.json();
      // history("/ProductPage/AllProduct");
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
              onClick={() => history("/ProductPage/AllProduct")}
            >
              Done
            </button>
          </div>
        </ReactModal>
      </div>

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
              onClick={() => history(`/ProductPage/AddNew`)}
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
                Back / All Products / Detailed Description / Primary Showcase
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
          ></div>
          <div style={{ width: "100%", height: "679px", marginTop: "34px" }}>
            <form>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                      {heading.length > 25 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 25 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="input"
                      style={{
                        border:
                          heading.length <= 25
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <input
                        placeholder="Enter the water Mark"
                        style={{
                          fontSize: "16px",
                          width: "430px",
                          height: "48px",
                          color: heading.length <= 25 ? "#000000" : "#E52f2f",
                          border: "none",
                          "::placeholder": {
                            color: "#787878",
                          },
                        }}
                        onChange={(e) => setHeading(e.target.value)}
                        value={heading}
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
                      {heading.length}/ 25
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
                      <Lable>Domain Name</Lable>
                      {domainName.length > 25 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 25 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="input"
                      style={{
                        border:
                          domainName.length <= 25
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <input
                        placeholder="Enter Heading"
                        style={{
                          fontSize: "16px",
                          width: "430px",
                          height: "48px",
                          color:
                            domainName.length <= 25 ? "#000000" : "#E52f2f",
                          border: "none",
                          "::placeholder": {
                            color: "#787878",
                          },
                        }}
                        onChange={(e) => setDomainName(e.target.value)}
                        value={domainName}
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
                      {domainName.length}/ 25
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
                      <Lable>Description (1)</Lable>
                      {des1.length > 50 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 50 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="primaryShowcase_textArea"
                      style={{
                        border:
                          des1.length <= 50
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <textarea
                        placeholder="Enter Description"
                        onChange={(e) => setDes1(e.target.value)}
                        value={des1}
                        style={{
                          fontSize: "16px",
                          width: "430px",
                          height: "170px",
                          border: "none",
                          color: des1.length <= 50 ? "#000000" : "#E52f2f",
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
                      {des1.length}/ 50
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
                      <Lable>Description (2)</Lable>
                      {des2.length > 50 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 50 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="primaryShowcase_textArea"
                      style={{
                        border:
                          des2.length <= 50
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <textarea
                        placeholder="Enter Description"
                        onChange={(e) => setDes2(e.target.value)}
                        value={des2}
                        style={{
                          fontSize: "16px",
                          width: "430px",
                          height: "170px",
                          color: des2.length <= 50 ? "#000000" : "#E52f2f",
                          border: "none",
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
                      {des2.length}/ 50
                    </span>
                  </div>
                </div>
                <div style={{ width: "849px" }}>
                  <Lable>image</Lable>
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
                      <Lable>Alternative Text</Lable>
                      {altText.length > 25 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 25 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="right_input"
                      style={{
                        border:
                          altText.length <= 25
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <input
                        placeholder="Enter Heading"
                        style={{
                          fontSize: "16px",
                          width: "749px",
                          height: "48px",
                          color: altText.length <= 25 ? "#000000" : "#E52f2f",
                          border: "none",
                          "::placeholder": {
                            color: "#787878",
                          },
                        }}
                        onChange={(e) => setAltText(e.target.value)}
                        value={altText}
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
                      {altText.length}/ 250
                    </span>
                  </div>
                </div>
              </div>
            </form>
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
          <div style={{ marginTop: "33px", display: "flex", float: "right" }}>
            <div
              className="save_button"
              onClick={() => history(`/ProductPage/AddNew`)}
            >
              Previous
            </div>
            {heading !== "" &&
            domainName !== "" &&
            des1 !== "" &&
            des2 !== "" &&
            altText !== "" ? (
              <div
                className="save_button"
                style={{
                  background: "#0044FF",
                  color: "#FFFFFF",
                  marginLeft: "8px",
                }}
                onClick={() => handleAddNewData()}
              >
                Save & Post
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
                Save & Post
              </div>
            )}
          </div>
        </Container>
      </AddNewProductContainer>
    </>
  );
};

export default AddPrimaryShowcase;

const AddNewProductContainer = styled.div`
  min-width: calc(100vw - 356px);
  background-color: #ffffff;
  margin: 0 22px 0 18px;
`;
const Container = styled.div`
  margin: 25px 59px 25px 60px;
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
