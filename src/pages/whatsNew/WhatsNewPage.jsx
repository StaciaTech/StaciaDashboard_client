import { React, useState } from "react";
import WhatsNewNav from "./WhatsNewNav";
import "../../styles/WhatsNew.css";
import Switch from "react-switch";
import Edit from "../../assets/Edit.svg";
import Archive from "../../assets/Frame 29038.svg";
import DragDrop from "../../assets/DragandDropicon.svg";
import { useNavigate } from "react-router-dom";

const primaryEvents = [
  {
    image:
      "https://w0.peakpx.com/wallpaper/766/443/HD-wallpaper-grey-nissan-gtr-2020-nissan-gtr-nissan-cars-behance.jpg",
    title: "lorem ipsum",
    des: "lorem ipsum",
  },
  {
    image:
      "https://w0.peakpx.com/wallpaper/766/443/HD-wallpaper-grey-nissan-gtr-2020-nissan-gtr-nissan-cars-behance.jpg",
    title: "lorem ipsum",
    des: "lorem ipsum",
  },
  {
    image:
      "https://w0.peakpx.com/wallpaper/766/443/HD-wallpaper-grey-nissan-gtr-2020-nissan-gtr-nissan-cars-behance.jpg",
    title: "lorem ipsum",
    des: "lorem ipsum",
  },
  {
    image:
      "https://w0.peakpx.com/wallpaper/766/443/HD-wallpaper-grey-nissan-gtr-2020-nissan-gtr-nissan-cars-behance.jpg",
    title: "lorem ipsum",
    des: "lorem ipsum",
  },
  {
    image:
      "https://w0.peakpx.com/wallpaper/766/443/HD-wallpaper-grey-nissan-gtr-2020-nissan-gtr-nissan-cars-behance.jpg",
    title: "lorem ipsum",
    des: "lorem ipsum",
  },
];

const WhatsNewPage = () => {
  const navigateTo = useNavigate();

  const [switchState, setSwitchState] = useState(false);

  return (
    <>
      <div className="whatsNew-container">
        <div>
          <WhatsNewNav />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "2rem 0rem",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <div>Primary ShowCase</div>
            <div>Events</div>
          </div>
          <div>
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
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            className="add-event-card"
            onClick={() => navigateTo("/admin/WhatsNew/addWhatsNew")}
          >
            +
          </div>
          {primaryEvents.map((eachevent, index) => (
            <div key={{ index }} className="primary-event-card">
              <div
                style={{
                  width: "100%",
                  height: "70%",
                  position: "relative",
                }}
              >
                <img
                  src={eachevent.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 5,
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    padding: "1rem",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div>
                    <img src={DragDrop} alt="" />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "1.5rem" }}>
                    {eachevent.title}
                  </div>
                  <div>{eachevent.des}</div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "1rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ width: "1.5rem", height: "1.5rem" }}>
                    <input
                      type="radio"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div>Primary ShowCase</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div>
                    <img src={Edit} alt="" />
                  </div>
                  <div>
                    <img src={Archive} alt="" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WhatsNewPage;
