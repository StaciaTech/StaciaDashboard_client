import { useDrag, useDrop } from "react-dnd";
import dragAndDrop from "../../../assets/DragandDropicon.svg";
import Write from "../../../assets/Write.svg";
import fix from "../../../assets/fix.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateServiceFormData } from "../../../redux/action";
import { ServiceContext } from "../../../context/ServiceContext";
import { useContext } from "react";

export const Card = ({
  id,
  moveCard,
  achieved,
  primaryShowcasePosition,
  pageName,
  redioButtonHandel,
  fixHandelClick,
  card,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: { primaryShowcasePosition },
      canDrag: id !== 0,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, moveCard]
  );
  const [, drop] = useDrop(
    () => ({
      accept: "card",
      hover(item) {},
      drop: (item) => {
        moveCard(item.primaryShowcasePosition, primaryShowcasePosition);
      },
    }),
    [moveCard]
  );
  const opacity = isDragging ? 0.2 : 2;

  const { setBtnStatus } = useContext(ServiceContext);
  const handle_edit = async (id) => {
    const res = await fetch(`${apiUrl}/service/findService/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setBtnStatus(data.selectedService.archive);
    console.log(data.selectedService.archive);
    dispatch(updateServiceFormData("des", data.selectedService.des));
    dispatch(updateServiceFormData("image", data.selectedService.image));
    dispatch(updateServiceFormData("altText", data.selectedService.altText));
    dispatch(updateServiceFormData("form", data.selectedService.form));
    dispatch(updateServiceFormData("pImage", data.selectedService.pImage));
    dispatch(
      updateServiceFormData("pAlterNativeText", data.selectedService.pAltText)
    );
    dispatch(updateServiceFormData("heading", data.selectedService.title));
    dispatch(
      updateServiceFormData("domainName", data.selectedService.domainName)
    );
    dispatch(updateServiceFormData("hashTag", data.selectedService.hashTag));
    history(`/admin/Service/EditService/${id}`);
  };
  return (
    <>
      <div
        style={{
          width: "467px",
          height: "215px",
          opacity,
          borderRadius: "10px",
          border: "1px solid #0000001A",
          display: "flex",
          justifyContent: "center",
          background: "#ffffff",
          position: "relative",
        }}
        className={achieved ? "freeze-card" : ""}
      >
        {pageName ? (
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: 400,
                display: "flex",
                paddingBottom: "10px",
              }}
            >
              Removed from primary showcase
            </div>
            <div
              style={{
                color: "#0047FF",
                fontSize: "20px",
                fontWeight: 500,
                fontFamily: "EuclidMedium",
                cursor: "pointer",
              }}
            >
              {/* <img src={undo} alt="undo" style={{ paddingRight: "8px" }} /> */}
              Undo
            </div>
          </div>
        ) : (
          <div
            ref={(node) => drag(drop(node))}
            style={{ width: "100%", position: "relative", display: "flex" }}
          >
            <div style={{ padding: "12px 22px", width: "238px" }}>
              <img src={dragAndDrop} alt="" style={{ cursor: "move" }} />

              <div
                style={{
                  color: "#0D0225",
                  fontSize: "20px",
                  margin: "0px",
                  fontFamily: "EuclidBold",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  border: "1px solid #FFFFFF",
                  marginTop: "30px",
                }}
              >
                {card.title}
              </div>
              <div
                style={{
                  width: "162px",
                  color: "#6B6084",
                  fontSize: "15px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  border: "1px solid #FFFFFF",
                  marginTop: "6px",
                }}
              >
                {card.des}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "64px",
                }}
              >
                <label className="circular-checkbox">
                  <input
                    type="checkbox"
                    checked
                    onChange={() => redioButtonHandel(card)}
                  />
                  <span className="checkmark"></span>
                  Primary Showcase
                </label>
                {/* )} */}
              </div>
            </div>
            <div style={{ width: "45%", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "75%",
                }}
              >
                <img
                  src={card.image}
                  alt="ServiceImage"
                  style={{ width: "10.439rem" }}
                />
              </div>
              <div
                style={{
                  height: "25%",
                }}
              >
                <div
                  style={{
                    float: "right",
                    paddingTop: "5px",
                    paddingRight: "17px",
                  }}
                >
                  <img
                    src={Write}
                    alt="Write"
                    onClick={() => handle_edit(card._id)}
                    style={{ cursor: "pointer" }}
                  />

                  <img
                    src={fix}
                    alt=""
                    style={{ paddingLeft: "5px", cursor: "pointer" }}
                    onClick={() => {
                      fixHandelClick(card);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
