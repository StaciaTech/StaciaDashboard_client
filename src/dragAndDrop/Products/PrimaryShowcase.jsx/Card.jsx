import { useDrag, useDrop } from "react-dnd";
import dragAndDrop from "../../../assets/DragandDropicon.svg";
import Write from "../../../assets/Write.svg";
import fix from "../../../assets/fix.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFormData } from "../../../redux/action";
import { ProductContext } from "../../../context/ProductContext";
import { useContext, useState } from "react";
import axios from "axios";

export const Card = ({
  id,
  moveCard,
  primaryShowcasePosition,
  pageName,
  redioButtonHandel,
  fixHandelClick,
  card,
}) => {
  const history = useNavigate();
  const [signedUrl, SetSignedUrl] =useState("")
  const { setBtnStatus } = useContext(ProductContext)
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
      hover(item) { },
      drop: (item) => {
        moveCard(item.primaryShowcasePosition, primaryShowcasePosition);
      },
    }),
    [moveCard]
  );
  const opacity = isDragging ? 0.2 : 2;

  const dispatch = useDispatch()
  const handle_edit = async (id) => {
    const res = await fetch(`http://localhost:8000/product/findProduct/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setBtnStatus(data.selectedProduct.archive)
    dispatch(updateFormData("waterMark", data.selectedProduct.waterMark));
    dispatch(updateFormData("des", data.selectedProduct.des));
    dispatch(updateFormData("image", data.selectedProduct.image));
    dispatch(updateFormData("altText", data.selectedProduct.altText));
    dispatch(updateFormData("pDes1", data.selectedProduct.pDes1));
    dispatch(updateFormData("pDes2", data.selectedProduct.pDes2));
    dispatch(updateFormData("pImage", data.selectedProduct.pImage));
    dispatch(updateFormData("pAltText", data.selectedProduct.pAltText));
    dispatch(updateFormData("domainName", data.selectedProduct.domainName))
    dispatch(updateFormData("heading", data.selectedProduct.title));
    dispatch(updateFormData("hashTag", data.selectedProduct.hashTag))
    history(`/admin/Product/EditProduct/${id}`);
  };

  axios.post("http://localhost:8000/product/getimageurl",{
      image:card.image,
    imageType:"image/png",
    }).then(function (response) {

      console.log("signedurl :",response.data.url);
      SetSignedUrl(response.data.url)
      dispatch(updateFormData("internalUrl", response.data.url))
    })
    .catch(function (error) {
      console.log(error);
    });

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
        className={card.achieved ? "freeze-card" : ""}
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
                <img src={signedUrl} alt="ProductImage"  style={{ width: "10.439rem" }}/>
              </div>
              <div
                style={{
                  height: "25%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "90%",
                    columnGap: "0.2rem",
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
