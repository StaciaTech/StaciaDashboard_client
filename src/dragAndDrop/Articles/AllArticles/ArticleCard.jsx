import { React, useRef } from "react";
import Backicon from "../../../assets/Backicon.svg";
import "../../../styles/Articles.css";
import DefaultProductionIcon from "../../../assets/DefaultProductIcon.svg";
import { useNavigate } from "react-router-dom";

function ArticleCard() {
  const navigateTo = useNavigate();
  const fileInputRef = useRef(null);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          paddingTop: "17.5px",
          cursor: "pointer",
        }}
      >
        <img src={Backicon} alt="" />
        <div
          className="Articles-text-style"
          onClick={() => {
            navigateTo("/admin/Resources/Articles");
          }}
        >
          Back / All Articles Page
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
              width: "100%",
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
                  <label className="Articles-text-style">Author Name</label>
                  {/* {formik.values.waterMark.length > 25 && (
                    <span style={{ color: "#E52F2F" }}>Max 25 Characters</span>
                  )} */}
                </div>
                <div
                  className="watermark-input"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <input
                    placeholder="Enter the Author Name"
                    name="Author"
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      width: "430px",
                      height: "48px",
                      border: "none",
                      "::placeholder": {
                        color: "#787878",
                      },
                    }}
                  />
                </div>

                {/**Domine */}
                <div style={{ marginTop: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <label className="Articles-text-style">Domine</label>
                    {/* {formik.values.waterMark.length > 25 && (
                    <span style={{ color: "#E52F2F" }}>Max 25 Characters</span>
                  )} */}
                  </div>
                  <div
                    className="watermark-input"
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <input
                      placeholder="Enter the Domine Name"
                      name="Domine"
                      style={{
                        fontSize: "16px",
                        color: "#000000",
                        width: "430px",
                        height: "48px",
                        border: "none",
                        "::placeholder": {
                          color: "#787878",
                        },
                      }}
                    />
                  </div>
                </div>
                {/* <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    bottom: "16px",
                    color: "#787878",
                  }}
                >
                  {formik.values.waterMark.length}/ 25
                </span> */}
              </div>
              <div style={{ marginTop: "1rem", position: "relative" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <lable className="Articles-text-style">HashTags</lable>
                  {/* {formik.values.des.length > 50 && (
                    <span style={{ color: "#E52F2F" }}>Max 50 Characters</span>
                  )} */}
                </div>
                <div
                  className="description-textArea"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <textarea
                    placeholder="Enter Maximun 4 Tags"
                    name="HashTags"
                    style={{
                      fontSize: "16px",
                      width: "430px",
                      // height: "180px",
                      border: "none",
                      resize: "none",
                      color: "#000000",
                      fontFamily: "EuclidRegular",
                      "::placeholder": {
                        color: "#787878",
                      },
                    }}
                  />
                </div>

                {/**Hashtags */}
                <div>
                  <p style={{ margin: "1rem" }} className="Articles-text-style">
                    Suggested Tags
                  </p>
                  <div
                    style={{
                      marginLeft: "1rem",
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "1rem",
                    }}
                  >
                    <span
                      style={{
                        padding: "0.5rem",
                        backgroundColor: "#F7F9FB",
                        borderRadius: "0.5rem",
                        fontWeight: 500,
                        fontSize: "1rem",
                      }}
                    >
                      Agrochemicals
                    </span>
                    <span
                      style={{
                        padding: "0.5rem",
                        backgroundColor: "#F7F9FB",
                        borderRadius: "0.5rem",
                        fontWeight: 500,
                        fontSize: "1rem",
                      }}
                    >
                      Agrochemicals
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ width: "849px" }}>
                <lable className="Articles-text-style">Image</lable>
                <div
                  style={{
                    width: "53.5rem",
                    height: "531px",
                    border: "1px dashed #0047FF ",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontFamily: "Euclid",
                    marginTop: "15px",
                    color: "#787878",
                    display: "flex",
                    // filter: imageOverlayShow && "blur(0.8px)",
                    justifyContent: "center",
                    position: "relative",
                    backgroundColor: "#fff",
                    // backgroundColor:"red"
                  }}
                  // onDragOver={handleDragOver}
                  // onDrop={handleDrop}
                >
                  {/* {imageOverlayShow && (
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
                )} */}
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
                    {/* {formik.values.image && (
                    <img
                      src={Trash}
                      alt="deletebutton"
                      onClick={() => formik.setFieldValue("image", "")}
                    />
                  )} */}
                  </div>
                  {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // onClick={() => {
                  //   fileInputRef.current.click();
                  // }}
                >
                  
                    {/*image uypload area */}
                  {/* <div
                      style={{
                        maxWidth: "650px",
                        height: "420px",
                      }}
                    >
                      <img
                        src={signedUrl}
                        alt="ProductImage"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                */}
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
                        src={DefaultProductionIcon}
                        alt="DefaultProductIcon"
                      />
                      <input
                        type="file"
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                        }}
                        placeholder=""
                        ref={fileInputRef}
                        // onChange={(e) => onChange(e)}
                      />
                      <p
                        style={{
                          maxWidth: "299px",
                          lineHeight: "200%",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontFamily: "EuclidSemiBold" }}>
                          Click or drag
                          <span style={{ color: "blue", cursor: "pointer" }}>
                            file
                          </span>
                          to this area to upload
                        </div>
                        <div>upload image “1920 x 1080” size</div>
                      </p>
                    </div>
                  </div>
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
                  <lable className="Articles-text-style">
                    Alternative Text
                  </lable>
                  {/* {formik.values.altText.length > 25 && (
                    <span style={{ color: "#E52F2F" }}>Max 25 Characters</span>
                  )} */}
                </div>
                <div
                  className="Alt-text_input"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <input
                    placeholder="Enter Heading"
                    name="altText"
                    style={{
                      fontSize: "16px",
                      width: "749px",
                      color: "#000000",

                      height: "48px",
                      border: "none",
                      "::placeholder": {
                        color: "#787878",
                      },
                    }}
                    // onChange={handleChange}
                    // value={formik.values.altText}
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
                  25
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div style={{ width: "100%", height: "679px", marginTop: "34px" }}></div>

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
          // onClick={() => handelBack()}
        >
          Cancel
        </div>
        {/* next */}
        <div
          className="save_button"
          style={{
            background: "#0044FF",
            color: "#FFFFFF",
          }}
          // onClick={onNext}
        >
          Next
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
