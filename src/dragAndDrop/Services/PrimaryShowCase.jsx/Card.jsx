import { useDrag, useDrop } from "react-dnd";
import dragAndDrop from "../../../assets/DragandDropicon.svg";
import Write from "../../../assets/Write.svg";
import fix from "../../../assets/fix.svg";
import { useNavigate } from "react-router-dom";
import productImage from "../../../assets/ProductImg.svg";

export const Card = ({
  id,
  moveCard,
  cards,
  setCards,
  achieved,
  primaryShowcasePosition,
  pageName,
  redioButtonHandel,
  fixHandelClick,
  card,
}) => {
  const history = useNavigate();
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
        {/* {achieved && (
      <div
        style={{
          zIndex: "10",
          position: "absolute",
          right: "17px",
          top: "166px",
          bottom: "200px",
        }}
        // onClick={() => {
        //   setFreezeCardOff(false);
        // }}
      >
        <img
          src={Edit}
          alt=""
          style={{ paddingLeft: "5px", zIndex: 10 }}
          onClick={()=>history(`/${pageName}/Edit/${id}`)}
        />
        <img
          src={fixed}
          alt=""
          style={{ paddingLeft: "5px", zIndex: 10 }}
          onClick={() => fixHandelClick(id)}
        />
      </div>
    )} */}
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
          <div style={{ width: "100%", position: "relative", display: "flex" }}>
            <div style={{ padding: "12px 22px", width: "238px" }}>
              <img
                ref={(node) => drag(drop(node))}
                src={dragAndDrop}
                alt=""
                style={{ cursor: "move" }}
              />

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
                {card.heading}
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
                {card.description}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "64px",
                }}
              >
                {/* {achieved === true ? (
                <input
                  type="checkbox"
                  name="fav_language"
                  style={{ margin: "0", height: "18px", width: "18px" }}
                  disabled
                />
              ) : ( */}
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
                <img src={card.image} alt="ServiceImage" style={{ width: "10.439rem" }} />
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
                    onClick={() => history(`/ProductPage/Edit/${id}`)}
                    style={{ cursor: "pointer" }}
                  />

                  <img
                    src={fix}
                    alt=""
                    style={{ paddingLeft: "5px" }}
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
