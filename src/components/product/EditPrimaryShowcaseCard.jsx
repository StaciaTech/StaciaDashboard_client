import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Backicon from "../../assets/Backicon.svg";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/AddNewProduct.css";
import DefaultProductIcon from "../../assets/DefaultProductIcon.svg";
import Trash from "../../assets/Trash.svg";
import { ProductContext } from "../../context/ProductContext";
import ReactModal from "react-modal";
import dived from "../../assets/dived.svg"
import dropdown from "../../assets/DropDown.svg"
import successful from "../../assets/successful.svg";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateFormData } from "../../redux/action";
import close from "../../assets/close.svg"
import Archive from "../Archive";

const AddPrimaryShowcase = ({ onPrevious, onSubmitValue, formik }) => {
  const history = useNavigate();
  const dispatch = useDispatch()
  const id = useParams();
  const fileInputRef = useRef(null);
  const { hashTagModel, setHashModel, successfullModel, setSuccessfullModel, imageOverlayShow, setImageOverlayShow } = useContext(ProductContext)

  const [dropdownShow, setDropdownShow] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState(["Add New", 'Agriculture', 'Technology', "Electronics"]);

  //drag and drop image
  const handleDragOver = (e) => {
    e.preventDefault()
    setImageOverlayShow(true)
  }
  const handleDrop = async (e) => {
    e.preventDefault();
    setImageOverlayShow(false)
    console.log(e.dataTransfer.files[0])
    const formData = new FormData();
    formData.append('image', e.dataTransfer.files[0]);
    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData
    })
    const resData = await res.json();
    formik.setFieldValue("pImage", resData.signedUrl);
    dispatch(updateFormData("image", resData.signedUrl));
  }

  //image onchange
  const onChange = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData
    })
    const resData = await res.json();
    formik.setFieldValue("pImage", resData.signedUrl)
    dispatch(updateFormData("image", resData.signedUrl));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    dispatch(updateFormData(name, value));
  };
  // const formik = useFormik({
  //   initialValues: {
  //     heading: savedData.heading ? savedData.heading : "",
  //     domainName: savedData.domainName ? savedData.domainName : '',
  //     pDes1: savedData.pDes1 ? savedData.pDes1 : '',
  //     pDes2: savedData.pDes2 ? savedData.pDes2 : "",
  //     pImage: savedData.pImage ? savedData.pImage : "",
  //     pAltText: savedData.pAltText ? savedData.pAltText : "",
  //     hashTag: savedData.hashTag ? savedData.hashTag : null
  //   },
  //   onSubmit: (values) => {
  //     // console.log(values.pDomainName, hashTageValues)
  //   }
  // });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "15px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "34.25rem",
      height: "44.375rem",
    },
    overlay: {
      background: "rgba(0,0,0,0.25)",
    },
  };

  const successfulcustomStyles = {
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
  }
  const Done = () => {
    setSuccessfullModel(false);
    history("/ProductPage/AllProduct")
  }

  const continues = () => {
    setHashModel(true)
    // dispatch(updateFormData("pDes2", formik.values.pDes2));
    // dispatch(updateFormData("pDes1", formik.values.pDes1));
    // dispatch(updateFormData("pImage", formik.values.pImage));
    // dispatch(updateFormData("pAltText", formik.values.pAltText));
  }



  const handleInputChange = (value) => {
    if (value === "Add New") {
      formik.setFieldValue("domainName", "")
      setDropdownShow(false)
    } else {
      formik.setFieldValue("domainName", value)
      setDropdownShow(false)
      dispatch(updateFormData("domainName", value))
    }
  };

  const handleDropdownChange = (event) => {
    setDropdownShow(!dropdownShow)
    // const selectedOption = event.target.value;
    // if (selectedOption === 'add_new') {
    //   formik.setFieldValue("domainName", "") // Clear input value
    //   setDropdownValue('');
    // } else {
    //   setDropdownValue(selectedOption);
    //   formik.setFieldValue("domainName", selectedOption)
    // }
  };

  //hashTag

  const [hashInputValue, sethashInputValue] = useState();
  const [filteredWords, setFilteredWords] = useState([]);

  const handleHashInputChange = (event) => {
    const value = event.target.value;
    sethashInputValue(value);
  };
  useEffect(() => {
    if (hashInputValue) {
      fetchWords(hashInputValue);
    } else {
      setFilteredWords([]);
    }
  }, [hashInputValue])

  const fetchWords = async (input) => {
    try {
      const response = await fetch(`https://api.datamuse.com/sug?s=${input}`);
      if (!response.ok) {
        throw new Error('Failed to fetch words');
      }
      const data = await response.json();
      // Extract titles from fetched data
      const words = data.map(item => item.word);
      setFilteredWords(words.slice(0, 6));
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };
  const enterInputValue = (value) => {
    formik.setFieldValue("hashTag", [...formik.values.hashTag, value])
    sethashInputValue("")
    dispatch(updateFormData("hashTag", [...formik.values.hashTag, value]))
  }

  const handelRemove = (tag) => {
    const newArray = formik.values.hashTag.filter((value) => value !== tag)
    formik.setFieldValue("hashTag", newArray)
    dispatch(updateFormData("hashTag", newArray))
  }

  const savePost = () => {
    // dispatch(updateFormData("heading", formik.values.heading));
    // dispatch(updateFormData("domainName", formik.values.domainName));
    // dispatch(updateFormData("hashTag",))
    onSubmitValue()
    setHashModel(false)
  }

  const { btnStatus, setBtnStatus } = useContext(ProductContext)
  const changeandupdate = async (status) => {
    const data = {
      waterMark: formik.values.waterMark,
      des: formik.values.des,
      image: formik.values.image,
      altText: formik.values.altText,
      pDes1: formik.values.pDes1,
      pDes2: formik.values.pDes2,
      pImage: formik.values.pImage,
      pAltText: formik.values.pAltText,
      heading: formik.values.heading,
      domainName: formik.values.domainName,
      id: id.id,
    }
    if (status === "activeBtn") {
      const res = await fetch("http://localhost:8000/product/draftAndArchive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      history("/ProductPage/AllProduct")
    } else {
      const res = await fetch("http://localhost:8000/product/draftAndArchive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      history("/ProductPage/AllProduct")
    }
  };

  return (
    <>
      <div>
        <ReactModal
          isOpen={hashTagModel}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
          >
            <form style={{ width: "100%", height: "100%", }}>
              <div style={{ width: "100%", marginBottom: "8px" }}>
                <Lable> Heading</Lable>
                <div
                  className="modelBox"
                  style={{
                    border: "1px solid #000000"
                  }}
                >
                  <input
                    placeholder="Enter Heading"
                    name="heading"
                    style={{
                      fontSize: "16px",
                      width: "430px",
                      height: "48px",
                      color:
                        "#000000",
                      border: "none",
                      "::placeholder": {
                        color: "#787878",
                      },
                    }}
                    onChange={handleChange}
                    value={formik.values.heading}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <Lable> Domain</Lable>

                <div
                  className="modelBox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <input
                    placeholder="Enter the water Mark"
                    name="domainName"
                    style={{
                      fontSize: "16px",
                      width: "90%",
                      height: "48px",
                      color: "#000000",
                      border: "none",
                      "::placeholder": {
                        color: "#787878",
                      },
                    }}
                    value={formik.values.domainName}
                    onChange={handleChange}
                  />
                  <img src={dived} alt="" />
                  <img src={dropdown} alt="" style={{ margin: "18px" }} onClick={handleDropdownChange} />
                </div>
                <div
                  className=""
                  style={{
                    position: "absolute",
                    width: "93%",
                    background: "#FFFFFF",
                    zIndex: 1
                  }}
                >
                  {dropdownShow &&
                    <div
                      style={{
                        width: "100%",
                        marginTop: "8px",
                        boxShadow: "0px 4px 4px 2px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        position: "relative"
                      }}>
                      {dropdownOptions.map((item, id) => (
                        <div key={id} style={{
                          // width: "100%",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                          padding: "10px",
                          cursor: "pointer"
                        }}
                          onClick={() => handleInputChange(item)}>

                          <span>{item}</span>
                        </div>
                      ))}
                    </div>}
                </div>
              </div>


              <div>
                <Lable>Hashtag</Lable>
                <div
                  className="modelBox"
                  style={{
                    height: "10.12rem",
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "flex-start",
                    border: "1px solid rgba(0, 0, 0, 0.1)"
                  }}>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      columnGap: "1rem",
                      rowGap: "1rem",

                    }}
                  >
                    {formik.values.hashTag.map((tag, index) => (
                      <div key={index}
                        style={{
                          backgroundColor: "#F7F9FB",
                          // color: "#000000",
                          fontSize: "16px",
                          height: "40px",
                          display: 'flex',
                          alignItems: "center",
                          borderRadius: "8px",
                          fontFamily: "EuclidMedium",
                          justifyContent: "space-between",

                        }}
                      >
                        <p
                          style={{ padding: "0px 10px" }}
                        >{tag}</p>
                        <img src={close} alt="hello" style={{ padding: "0px 10px", cursor: "pointer", }} onClick={() => handelRemove(tag)} />
                      </div>
                    ))}
                  </div>
                  <input
                    placeholder="Minimum 4 hashtag "
                    style={{
                      fontSize: "16px",
                      width: "150px",
                      height: "48px",
                      color: "#000000",
                      border: "none",
                      "::placeholder": {
                        color: "#787878",
                      },
                    }}
                    type="text"
                    value={hashInputValue}
                    onChange={handleHashInputChange}
                  />
                </div>
                <Lable
                  style={{
                    marginTop: "10px"
                  }}>Suggested Tags</Lable>
                <div
                  className="modelBox"
                  style={{
                    height: "9.013rem",
                    display: "flex",
                    columnGap: "1rem",
                    rowGap: "1rem",
                    flexWrap: "wrap",
                    marginTop: "8px",
                  }}>
                  {filteredWords.map((tag, index) => (
                    <div key={index}
                      style={{
                        backgroundColor: "#F7F9FB",
                        color: "#000000",
                        fontSize: "16px",
                        height: "40px",
                        display: 'flex',
                        alignItems: "center",
                        borderRadius: "8px",
                        fontFamily: "EuclidMedium",
                        cursor: "pointer"
                      }}
                      onClick={() => enterInputValue(tag)}>
                      <span style={{ padding: "20px 20px" }}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* save and Cancel button */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                columnGap: "1rem",
                marginTop: "83px",
              }}>
                <div
                  className="save_button"
                  onClick={() => setHashModel()}
                >
                  Previous
                </div>

                <div
                  className="save_button"
                  style={{
                    backgroundColor: "#0044FF",
                    color: "#ffff",
                  }}
                  onClick={() => savePost()}
                >
                  Save & Post
                </div>
              </div>
            </form>
          </div>
        </ReactModal>
      </div>
      <div>
        <ReactModal
          isOpen={successfullModel}
          style={successfulcustomStyles}
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
            <h1>Updated Successfully!</h1>
            <p style={{ width: "32.375rem", textAlign: "center" }}>
              Your Product information has been successfully added to the Website. Thank you for updating your details!
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
              onClick={() => Done()}
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
              onClick={() => onPrevious()}
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
                btnStatus={btnStatus}
                changeandupdate={changeandupdate}
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
          <div style={{ width: "100%", marginTop: "34px" }}>
            <form>
              <div style={{ display: "flex", justifyContent: "space-between", height: "100%" }}>
                <div>
                  {/* <div style={{ position: "relative" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Lable>Heading</Lable>
                      {formik.values.pHeading.length > 25 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 25 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="input"
                      style={{
                        border:
                          formik.values.pHeading.length <= 25
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
                          color: formik.values.pHeading.length <= 25 ? "#000000" : "#E52f2f",
                          border: "none",
                          "::placeholder": {
                            color: "#787878",
                          },
                        }}
                        onChange={formik.handleChange("pHeading")}
                        value={formik.values.pHeading}
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
                      {formik.values.pHeading.length}/ 25
                    </span>
                  </div> */}
                  {/* <div style={{ position: "relative" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Lable>Domain Name</Lable>
                      {formik.values.pDomainName.length > 25 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 25 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="input"
                      style={{
                        border:
                          formik.values.pDomainName.length <= 25
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
                            formik.values.pDomainName.length <= 25 ? "#000000" : "#E52f2f",
                          border: "none",
                          "::placeholder": {
                            color: "#787878",
                          },
                        }}
                        onChange={formik.handleChange("pDomainName")}
                        value={formik.values.pDomainName}
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
                      {formik.values.pDomainName.length}/ 25
                    </span>
                  </div> */}
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Lable>Description (1)</Lable>
                      {formik.values.pDes1.length > 50 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 50 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="primaryShowcase_textArea"
                      style={{
                        border:
                          formik.values.pDes1.length <= 50
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <textarea
                        placeholder="Enter Description"
                        name="pDes1"
                        onChange={handleChange}
                        value={formik.values.pDes1}
                        style={{
                          fontSize: "16px",
                          width: "430px",
                          height: "170px",
                          border: "none",
                          resize: "none",
                          color: formik.values.pDes1.length <= 50 ? "#000000" : "#E52f2f",
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
                      {formik.values.pDes1.length}/ 50
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
                      {formik.values.pDes2.length > 50 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 50 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="primaryShowcase_textArea"
                      style={{
                        border:
                          formik.values.pDes2.length <= 50
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <textarea
                        placeholder="Enter Description"
                        name="pDes2"
                        onChange={handleChange}
                        value={formik.values.pDes2}
                        style={{
                          resize: "none",
                          fontSize: "16px",
                          width: "430px",
                          height: "170px",
                          color: formik.values.pDes2.length <= 50 ? "#000000" : "#E52f2f",
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
                      {formik.values.pDes2.length}/ 50
                    </span>
                  </div>
                </div>
                <div style={{ width: "849px" }}>
                  <Lable>Image</Lable>
                  <div
                    style={{
                      width: "849px",
                      height: "549px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontFamily: "Euclid",
                      marginTop: "15px",
                      color: "#787878",
                      display: "flex",
                      justifyContent: 'center',
                      position: 'relative',
                      filter: imageOverlayShow && 'blur(0.8px)',
                    }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {imageOverlayShow &&
                      <>
                        <div
                          style={{
                            position: 'absolute',
                            width: '98%',
                            height: '98%',
                            backgroundColor: 'rgba(0, 0, 0, 0.56)',
                            border: '2px dashed #fff',
                            borderRadius: '5px',
                            zIndex: 9999,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                          onDragLeave={() => setImageOverlayShow(false)}
                        >
                        </div>
                      </>
                    }
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
                      {formik.values.pImage &&
                        <img
                          src={Trash}
                          alt="deletebutton"
                          onClick={() => formik.setFieldValue("pImage", "")}
                        />}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                      {formik.values.pImage ? (
                        <div
                          style={{
                            width: "608px",
                            height: "420px",
                          }}
                        >
                          <img
                            src={formik.values.pImage}
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
                            flexDirection: "column",
                          }}
                        >
                          <div style={{
                            width: "608px",
                            height: "420px",
                            margin: "90px 140px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                            onClick={() => { fileInputRef.current.click(); }}>
                            <img
                              src={DefaultProductIcon}
                              alt="DefaultProductIcon"
                            />
                            <input type="file" style={{ width: "100%", height: "100%", display: "none" }} ref={fileInputRef} onChange={(e) => onChange(e)} />
                            <p
                              style={{
                                maxWidth: "299px",
                                lineHeight: "200%",
                                textAlign: "center"
                              }}>
                              <div style={{ fontFamily: "EuclidSemiBold" }}>Click or drag <span style={{ color: "blue", cursor: "pointer" }}>file</span> to this area to upload</div>
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
                      <Lable>Alternative Text</Lable>
                      {formik.values.pAltText.length > 25 && (
                        <span style={{ color: "#E52F2F" }}>
                          Max 25 Characters
                        </span>
                      )}
                    </div>
                    <div
                      className="right_input"
                      style={{
                        border:
                          formik.values.pAltText.length <= 25
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "2px solid #E52F2F",
                      }}
                    >
                      <input
                        placeholder="Enter Heading"
                        name="pAltText"
                        style={{
                          fontSize: "16px",
                          width: "749px",
                          height: "48px",
                          color: formik.values.pAltText.length <= 25 ? "#000000" : "#E52f2f",
                          border: "none",
                          "::placeholder": {
                            color: "#787878",
                          },
                        }}
                        onChange={handleChange}
                        value={formik.values.pAltText}
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
                      {formik.values.pAltText.length}/ 25
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
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            columnGap: "1rem",
            marginTop: "33px",
          }}>
            <div
              className="save_button"
              onClick={() => onPrevious()}
            >
              Previous
            </div>
            {
              formik.values.pDes1 !== "" &&
                formik.values.pDes2 !== "" &&
                formik.values.pAltText !== "" &&
                formik.values.pImage !== "" ? (
                <div
                  className="save_button"
                  style={{
                    backgroundColor: "#0044FF",
                    color: "#ffff",
                  }}
                  onClick={() => continues()}
                >
                  Continue
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
                  Continue
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
