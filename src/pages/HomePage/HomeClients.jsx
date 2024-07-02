import { React, useState, useEffect, useRef } from "react";
import HomePage from "./HomePage.jsx";
import "../../styles/HomeClients.css";
// import ClientLogo from "../../assets/p 1.png";
import DragDropIcon from "../../assets/DragandDropicon.svg";
import Timer from "../../assets/timer.svg";
import Edit from "../../assets/Edit.svg";
import Clock from "../../assets/Frame 29038.svg";
import Close from "../../assets/close.svg";
import Success from "../../assets/successTick.svg";
import RedBin from "../../assets/Trash.svg";
import ImagePlacHolder from "../../assets/Group 748.svg";
import axios from "axios";
import Switch from "react-switch";
import Modal from "react-modal";

const HomeClientCard = ({ eachClient }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "39rem",
      height: "29rem",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "1rem",
      font: "Euclid Circular A",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.25)",
      // display: "flex",
      // alignItems: "center",
    },
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  const [openModal, setOpenModal] = useState(false);
  const [updatedDesc, setUpdatedDesc] = useState();

  const desUpdateHandler = () => {
    // console.log(eachClient._id);
    axios
      .post(`${apiUrl}/client/selectedDesc/${eachClient._id}`, {
        desc: updatedDesc,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });

    setOpenModal(false);
    setDesUpdateModaal(true);
  };
  const handleUpdate = () => {
    console.log("update clicked");
    setUpdatedDesc(eachClient.desc);
    setOpenModal(true);
  };

  const [desUpdateModal, setDesUpdateModaal] = useState(false);

  return (
    <>
      <div className="mapped-client-card">
        <div>
          <img src={DragDropIcon} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 0rem",
          }}
        >
          <div
            style={{
              width: "15rem",
              height: "4rem",
              overflow: "hidden",
            }}
          >
            {eachClient.desc}
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <div>
              <img src={Edit} alt="" onClick={() => handleUpdate()} />
            </div>
            <div>
              <img src={Clock} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={openModal} style={customStyles}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              margin: "10px 0px",
              // fontFamily: "EuclidSemiBold",
              fontSize: "18px",
            }}
          >
            Edit Description
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setOpenModal(false)}
          >
            <img src={Close} alt="" />
          </div>
        </div>

        <div className="client-logo-input">
          <textarea
            name=""
            value={updatedDesc}
            id=""
            style={{
              width: "100%",
              height: "17rem",
              border: "none",
              borderRadius: "10px",
              fontFamily: "EuclidRegular",
              fontSize: "1rem",
              padding: "1rem",
            }}
            onChange={(e) => setUpdatedDesc(e.target.value)}
            contentEditable={true}
          ></textarea>
        </div>
        <button
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "10px",
            backgroundColor: "#0047ff",
            color: "white",
            margin: "2rem 0rem",
          }}
          onClick={desUpdateHandler}
        >
          Update
        </button>
      </Modal>
      <Modal isOpen={desUpdateModal} style={customStyles}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "1.5rem",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={Success} alt="" />
            </div>
            <div style={{ textAlign: "center", fontSize: "2rem" }}>
              Updated Successfully!
            </div>
            <p style={{ textAlign: "center" }}>
              Your client description has been successfully updated to the
              Website. Thank you for updating your details!
            </p>
          </div>
          <div
            style={{
              width: "95%",
              position: "absolute",
              bottom: "2rem",
            }}
          >
            <button
              style={{
                width: "100%",
                color: "#fff",
                backgroundColor: "#0047ff",
                height: "3rem",
                borderRadius: "5px",
              }}
              onClick={() => setDesUpdateModaal(false)}
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const HomeClientLogoCard = ({ eachClient }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [clientLogoModalOpen, setClientLogoModalOpen] = useState(false);
  const [updateLogo, setUpdateLogo] = useState();
  const [showCoveImg, setShowCoverImg] = useState(true);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "39rem",
      height: "29rem",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "1rem",
      font: "Euclid Circular A",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.25)",
      // display: "flex",
      // alignItems: "center",
    },
  };

  const onChange = async (e) => {
    console.log("dropped");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    // formData.append("image", "")
    const res = await fetch(`${apiUrl}/client/uploadfile`, {
      method: "POST",
      body: formData,
    });
    const resData = await res.json();
    console.log(resData.image);
    setUpdateLogo(resData.image);
  };

  const logoUpdateHandler = () => {
    axios
      .post(`${apiUrl}/client/selectedLogo/${eachClient._id}`, {
        image: updateLogo,
      })
      .then(function (response) {
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });

    setClientLogoModalOpen(false);
    setEditLogoModal(true);
  };

  const [editLogoModal, setEditLogoModal] = useState(false);

  return (
    <>
      <div className="mapped-client-card">
        <div>
          <img src={DragDropIcon} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 0rem",
          }}
        >
          <div
            style={{
              width: "15rem",
              height: "4rem",
              overflow: "hidden",
            }}
          >
            <img
              src={eachClient.image}
              alt=""
              style={{
                width: "100%",
                objectFit: "cover",
                // objectPosition: "center",
                height: "100%",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <div>
              <img
                src={Edit}
                alt=""
                onClick={() => setClientLogoModalOpen(true)}
              />
            </div>
            <div>
              <img src={Clock} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={clientLogoModalOpen} style={customStyles}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              margin: "10px 0px",
              // fontFamily: "EuclidSemiBold",
              fontSize: "18px",
            }}
          >
            Edit Logo
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setClientLogoModalOpen(false)}
          >
            <img src={Close} alt="" />
          </div>
        </div>

        <div className="client-logo-input">
          <input
            name=""
            type="file"
            // value={eachClient.image}
            id=""
            style={{
              width: "100%",
              height: "17rem",
              border: "none",
              borderRadius: "10px",
              fontFamily: "EuclidRegular",
              fontSize: "1rem",
              padding: "1rem",
              position: "relative",
              zIndex: "10",
            }}
            onChange={(e) => {
              onChange(e);
            }}
          />
          {showCoveImg && (
            <div
              style={{
                width: "100%",
                height: "100%",
                // backgroundColor: "red",
                position: "absolute",
                top: "0",
              }}
            >
              <img
                src={eachClient.image}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          )}
          <div
            style={{
              width: "10%",
              height: "10%",
              position: "absolute",
              top: "1rem",
              right: "1rem",
              zIndex: 11,
            }}
            onClick={() => setShowCoverImg(false)}
          >
            <img src={RedBin} alt="" />
          </div>
        </div>
        <button
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "10px",
            backgroundColor: "#0047ff",
            color: "white",
            margin: "2rem 0rem",
          }}
          onClick={logoUpdateHandler}
        >
          Update
        </button>
      </Modal>
      <Modal isOpen={editLogoModal} style={customStyles}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "1.5rem",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={Success} alt="" />
            </div>
            <div style={{ textAlign: "center", fontSize: "2rem" }}>
              Added Successfully!
            </div>
            <p style={{ textAlign: "center" }}>
              Your client description has been successfully added to the
              Website. Thank you for updating your details!
            </p>
          </div>
          <div
            style={{
              width: "95%",
              position: "absolute",
              bottom: "2rem",
            }}
          >
            <button
              style={{
                width: "100%",
                color: "#fff",
                backgroundColor: "#0047ff",
                height: "3rem",
                borderRadius: "5px",
              }}
              onClick={() => setEditLogoModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

function HomeClients() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [showAddClient, setShowAddClient] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [clientDesData, setClientDesData] = useState(null);
  const [sendDescInput, setSendDescInput] = useState();

  const [sendLogo, setSendLogo] = useState();

  useEffect(() => {
    setShowDescription(true);
  }, []);

  const logoSubmitHandler = () => {
    console.log("save clickeed");
    axios
      .post(`${apiUrl}/client/create`, {
        image: sendLogo,
      })
      .then(function (response) {
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
    setShowAddClient(false);
    setLogoModalOpen(true);
  };

  const descSubmitHandler = () => {
    axios
      .post(`${apiUrl}/client/CreateDesc`, {
        desc: sendDescInput,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });

    setShowAddClient(false);
    setDesModalOpen(true);
  };

  // console.log(apiUrl);

  {
    /* making api calls */
  }
  const [clientLogoData, setclientLogoData] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [desloading, setDesLoading] = useState(true);

  const fetchClientLogos = async () => {
    try {
      const res = await axios.get(`${apiUrl}/client/all-logos`);
      setclientLogoData(res.data.logoBasedPosition);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchClientDes = async () => {
    try {
      const res = await axios.get(`${apiUrl}/client/all-desc`);
      setClientDesData(res.data.descBasedPosition);
      setDesLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchClientLogos();
    fetchClientDes();
  }, []);

  const fileInputRef = useRef(null);
  const [tempImage, setTempImage] = useState(null);

  const onChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempImage(imageUrl);
    }

    console.log("dropped");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    // formData.append("image", "")
    const res = await fetch(`${apiUrl}/client/uploadfile`, {
      method: "POST",
      body: formData,
    });
    const resData = await res.json();
    console.log(resData.image);
    setSendLogo(resData.image);
  };

  const clearImage = () => {
    setTempImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  console.log(clientLogoData);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "39rem",
      height: "29rem",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "1rem",
      font: "Euclid Circular A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.25)",
      // display: "flex",
      // alignItems: "center",
    },
  };

  const timerStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "21rem",
      // height: "13rem",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "1.5rem",
      font: "Euclid Circular A",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.25)",
    },
  };

  const [desModalOpen, setDesModalOpen] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [timerModal, setTimerModal] = useState(false);

  return (
    <>
      <div className="home-clients-container">
        <HomePage />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="client-items">
            <div
              className={showDescription ? "curved-underline" : ""}
              style={{ cursor: "pointer" }}
              onClick={() => setShowDescription(true)}
            >
              Client Descrption
            </div>
            <div
              className={showDescription ? "" : "curved-underline"}
              style={{ cursor: "pointer" }}
              onClick={() => setShowDescription(false)}
            >
              Client Logos
            </div>
          </div>
          <div className="client-items">
            <div style={{ display: "flex", columnGap: "1rem" }}>
              <div>on/off</div>
              <Switch
                className="switchtoggler"
                checkedIcon={false}
                uncheckedIcon={false}
                handleDiameter={20}
                onColor="#0047FF"
                onChange={() => setSwitchState(!switchState)}
                checked={switchState}
              />
            </div>
            <div onClick={() => setTimerModal(true)}>
              <img src={Timer} alt="" />
            </div>
          </div>
        </div>
        <div style={{ padding: "1rem 0rem" }}>
          Total Clients ({clientLogoData && clientLogoData.length})
        </div>
        {showDescription ? (
          <div>
            <div className="client-card-container">
              <div
                className="add-client-card"
                // style={{ height: "10rem", width: "30rem" ,border:"2px solid black"}}
                onClick={() => {
                  setShowAddClient(!showAddClient);
                }}
              >
                +
              </div>
              {/* OverLay */}
              {showAddClient && (
                <div
                  className="add-client-overlay"
                  // onClick={() => {
                  //   setShowAddClient(!showAddClient);
                  // }}
                >
                  <div className="add-client-logo-card">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem ",
                      }}
                    >
                      <div>Add Client Description</div>
                      <div onClick={() => setShowAddClient(!showAddClient)}>
                        <img src={Close} alt="" style={{ cursor: "pointer" }} />
                      </div>
                    </div>
                    <div className="client-logo-input">
                      <textarea
                        // type="text-area"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          padding: "1rem",
                        }}
                        onChange={(e) => {
                          setSendDescInput(e.target.value);
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "3rem",
                        margin: "2rem 0rem",
                      }}
                    >
                      <button
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          backgroundColor: "#0047ff",
                          color: "white",
                        }}
                        onClick={descSubmitHandler}
                      >
                        save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {
                <Modal isOpen={desModalOpen} style={customStyles}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      rowGap: "1.5rem",
                    }}
                  >
                    <div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img src={Success} alt="" />
                      </div>
                      <div style={{ textAlign: "center", fontSize: "2rem" }}>
                        Added Successfully!
                      </div>
                      <p style={{ textAlign: "center" }}>
                        Your client description has been successfully added to
                        the Website. Thank you for updating your details!
                      </p>
                    </div>
                    <div
                      style={{
                        width: "95%",
                        position: "absolute",
                        bottom: "2rem",
                      }}
                    >
                      <button
                        style={{
                          width: "100%",
                          color: "#fff",
                          backgroundColor: "#0047ff",
                          height: "3rem",
                          borderRadius: "5px",
                        }}
                        onClick={() => setDesModalOpen(false)}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </Modal>
              }
              {/* OverLay End */}
              {desloading ? (
                <div>Loading..</div>
              ) : (
                <>
                  {clientDesData.map((eachClient, index) => (
                    <HomeClientCard key={index} eachClient={eachClient} />
                  ))}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="client-card-container">
            <div
              className="add-client-card"
              // style={{ height: "10rem", width: "30rem" ,border:"2px solid black"}}
              onClick={() => {
                setShowAddClient(!showAddClient);
              }}
            >
              +
            </div>
            {/* OverLay */}
            {showAddClient && (
              <div
                className="add-client-overlay"
                // onClick={() => {
                //   setShowAddClient(!showAddClient);
                // }}
              >
                <div className="add-client-logo-card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>Add Client Logo</div>
                    <div onClick={() => setShowAddClient(!showAddClient)}>
                      <img src={Close} alt="" />
                    </div>
                  </div>
                  <div className="client-logo-input">
                    <input
                      type="file"
                      ref={fileInputRef}
                      id="fileUpload"
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        zIndex: 3,
                        display: "none",
                      }}
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                    <label
                      htmlFor="fileUpload"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        zIndex: "4",
                      }}
                    >
                      <img src={ImagePlacHolder} alt="" />
                    </label>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        zIndex: 2,
                        top: 0,
                        left: 0,
                        borderRadius: "1.5rem",
                      }}
                    >
                      <img
                        src={tempImage}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "1rem",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        position: "absolute",
                        // backgroundColor: "red",
                        width: "3rem",
                        height: "3rem",
                        top: "1rem",
                        right: "1rem",
                        zIndex: 4,
                      }}
                    >
                      <img src={RedBin} alt="" onClick={clearImage} />
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "3rem",
                      margin: "2rem 0rem",
                    }}
                  >
                    <button
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        backgroundColor: "#0047ff",
                        color: "white",
                      }}
                      onClick={logoSubmitHandler}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            )}
            <Modal isOpen={logoModalOpen} style={customStyles}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  rowGap: "1.5rem",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={Success} alt="" />
                  </div>
                  <div style={{ textAlign: "center", fontSize: "2rem" }}>
                    Added Successfully!
                  </div>
                  <p style={{ textAlign: "center" }}>
                    Your client Logo has been successfully added to the Website.
                    Thank you for updating your details!
                  </p>
                </div>
                <div
                  style={{
                    width: "95%",
                    position: "absolute",
                    bottom: "2rem",
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      color: "#fff",
                      backgroundColor: "#0047ff",
                      height: "3rem",
                      borderRadius: "5px",
                    }}
                    onClick={() => setLogoModalOpen(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            </Modal>
            {/* OverLay End */}
            {isLoading ? (
              <div>Loading..</div>
            ) : (
              <>
                {clientLogoData.map((eachClient, index) => (
                  <HomeClientLogoCard key={index} eachClient={eachClient} />
                ))}
              </>
            )}
          </div>
        )}
        <Modal isOpen={timerModal} style={timerStyles}>
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "18px" }}>Timer</div>
              <div>
                <img src={Close} alt="" onClick={() => setTimerModal(false)} />
              </div>
            </div>
            <div style={{ width: "100%", display: "flex", columnGap: "1rem" }}>
              <div
                style={{
                  height: "3rem",
                  borderRadius: "5px",
                  border: "2px solid #0003",
                  width: "35%",
                }}
              >
                <input
                  type="text"
                  style={{
                    border: "none",
                    backgroundColor: "#F5F5F5",
                    borderRadius: "5px",
                    padding: "1rem",
                    width: "99%",
                    height: "99%",
                  }}
                />
              </div>
              <div
                style={{
                  height: "3rem",
                  borderRadius: "5px",
                  border: "2px solid #0003",
                  width: "65%",
                }}
              >
                <select
                  name=""
                  id=""
                  style={{
                    border: "none",
                    backgroundColor: "#F5F5F5",
                    borderRadius: "5px",
                    padding: "1rem",
                    width: "99%",
                    height: "99%",
                  }}
                >
                  <option value="">Seconds</option>
                  <option value="">Minutes</option>
                  <option value="">Hours</option>
                </select>
              </div>
            </div>
            <div>
              <button
                style={{
                  width: "100%",
                  backgroundColor: "#0047ff",
                  borderRadius: "5px",
                  color: "#fff",
                  fontWeight: 600,
                  height: "3rem",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default HomeClients;
