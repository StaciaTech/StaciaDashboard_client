import { useDrag, useDrop } from "react-dnd";
import dragAndDrop from "../../../assets/DragandDropicon.svg";
import Write from "../../../assets/Write.svg";
import fix from "../../../assets/fix.svg";
import fixed from "../../../assets/fixed.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import undo from "../../../assets/undo.svg";
import Edit from "../../../assets/Edit.svg";
import { useDispatch } from "react-redux";
import { updateServiceFormData } from "../../../redux/action";
export const Card = ({
  id,
  moveCard,
  position,
  achieved,
  card,
  setSelectedProducts,
  fixHandelClick,
  redioButtonHandel,
}) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: { position },
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
      hover(item) { },
      drop: (item) => {
        moveCard(item.position, position);
      },
    }),
    [moveCard]
  );
  const opacity = isDragging ? 0.2 : 2;

  // const changeCard = (fromIndex, toIndex) => {
  //   const updatedCards = [...cards];
  //   const [movedCard] = updatedCards.splice(fromIndex, 1);
  //   updatedCards.splice(toIndex, 0, movedCard);
  //   setCards(updatedCards);
  // };
  // const handleRadioChange = (id) => {
  //   const cardIndex = cards.findIndex((card) => card.id === +id);
  //   changeCard(cardIndex, 0);
  // };

  // const changeCardLast = (fromIndex, toIndex) => {
  //   const updatedCards = [...cards];
  //   const [achievedCard] = updatedCards.splice(fromIndex, 1);
  //   achievedCard.achieved = !achievedCard.achieved;
  //   updatedCards.push(achievedCard);
  //   setCards(updatedCards);
  // };
  // const fixHandelClick = (id) => {
  //   const cardIndex = cards.findIndex((card) => card.id === +id);
  //   changeCardLast(cardIndex, cards.length - 1);
  //   // setFreezeCardOff(1);
  // };

  const [pageName, setPageName] = useState(card.page);
  // const redioButtonHandel = (product) => {
  //   const alreadySelected = selectedProducts.includes(product);

  //   if (alreadySelected) {
  //     setTimeout(() => {
  //       setPageName(false);
  //     }, 10000);
  //     setPageName(true);
  //   }
  // };

  const handle_edit = async (id) => {
    const res = await fetch(`http://localhost:8000/service/findService/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(updateServiceFormData("heading", data.selectedService.heading));
    dispatch(updateServiceFormData("des", data.selectedService.description));
    dispatch(updateServiceFormData("image", data.selectedService.image));
    dispatch(updateServiceFormData("altText", data.selectedService.altText));
    dispatch(updateServiceFormData("form", data.selectedService.form));
    dispatch(
      updateServiceFormData("serviceName", data.selectedService.pServiceName)
    );
    dispatch(
      updateServiceFormData("pServiceImage", data.selectedService.pImage)
    );
    dispatch(
      updateServiceFormData("pAlterNativeText", data.selectedService.pAltText)
    );
    history(`/ServicePage/EditService/${id}`);
  };
  const undohandeler = (product) => {
    setPageName(false);
    setSelectedProducts((prevSelected) => {
      const alreadySelected = prevSelected.includes(product);
      return alreadySelected
        ? prevSelected.filter((item) => item !== product)
        : [...prevSelected, product];
    });
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
          // position: "relative",
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
              onClick={() => undohandeler(card)}
            >
              <img src={undo} alt="undo" style={{ paddingRight: "8px" }} />
              Undo
            </div>
          </div>
        ) : (
          <div
            ref={(node) => drag(drop(node))}
            style={{ width: "100%", position: "relative", display: "flex" }}>
            <div style={{ padding: "12px 22px", width: "238px" }}>
              <img

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
                <label className="circular-checkbox">
                  <input
                    type="checkbox"
                    checked={card.primaryShowcase === true}
                    onChange={() => redioButtonHandel(card)}
                  />
                  <span className="checkmark"></span>
                  Primary Showcase
                </label>
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
                  alt="serviceImage"
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
                    display: "flex",
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
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

export const ArchiveCard = ({ key, card, fixHandelClick }) => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const handle_edit = async (id) => {
    const res = await fetch(`http://localhost:8000/service/findService/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(updateServiceFormData("heading", data.selectedService.heading));
    dispatch(updateServiceFormData("des", data.selectedService.description));
    dispatch(updateServiceFormData("image", data.selectedService.image));
    dispatch(updateServiceFormData("altText", data.selectedService.altText));
    dispatch(updateServiceFormData("form", data.selectedService.form));
    dispatch(
      updateServiceFormData("serviceName", data.selectedService.pServiceName)
    );
    dispatch(
      updateServiceFormData("pServiceImage", data.selectedService.pImage)
    );
    dispatch(
      updateServiceFormData("pAlterNativeText", data.selectedService.pAltText)
    );
    history(`/ServicePage/EditService/${id}`);
  };
  return (
    <div key={card.id}>
      <div
        style={{
          width: "467px",
          height: "215px",
          // opacity,
          borderRadius: "10px",
          border: "1px solid #0000001A",
          display: "flex",
          justifyContent: "center",
          background: "#ffffff",
          position: "relative",
        }}
        className="freeze-card"
      >
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
            onClick={() => handle_edit(card._id)}
          />
          <img
            src={fixed}
            alt=""
            style={{ paddingLeft: "5px", zIndex: 10 }}
            onClick={() => fixHandelClick(card)}
          />
        </div>
        {card.draft === true ? (
          <div
            style={{
              width: "50px",
              height: "29px",
              borderRadius: "4px",
              background: "#ffffff",
              position: "absolute",
              right: "18px",
              top: "18px",
              zIndex: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "EuclidMedium",
            }}
          >
            Draft
          </div>
        ) : (
          ""
        )}
        <div style={{ width: "100%", position: "relative", display: "flex" }}>
          <div style={{ padding: "12px 22px", width: "238px" }}>
            <img src={dragAndDrop} alt="" />

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
              <label className="circular-checkbox">
                <input type="checkbox" disabled />
                <span className="checkmark"></span>
                Primary Showcase
              </label>
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
                alt="productImage"
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
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
