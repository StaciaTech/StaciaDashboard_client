import React, { useState } from "react";
import "../../styles/Homepage.css";
import dragAndDropBlue from "../../assets/DragandDropiconBlue.svg";
import dragAndDrop from "../../assets/DragandDropicon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "../../dragAndDrop/Products/PrimaryShowcase.jsx/Container.jsx";
import { useSelector } from "react-redux";
import Switch from "react-switch";

const HomeProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector((state) => state.product.primaryShowcase);
  const [switchState, setSwitchState] = useState(false);

  const homelist = [
    {
      name: "Products",
      link: "/admin/Home/products",
    },
    {
      name: "Our Clients",
      link: "/admin/Home/clients",
    },
    {
      name: "Our Service",
      link: "/admin/Home/service",
    },
    {
      name: "Events",
      link: "/admin/Home/service",
    },
    {
      name: "Case Study",
      link: "/admin/Home/service",
    },
    {
      name: "Our Projects",
      link: "/admin/Home/service",
    },
    {
      name: "Articles",
      link: "/admin/Home/service",
    },
    {
      name: "Foundation Four",
      link: "/admin/Home/service",
    },
    {
      name: "Testinomials",
      link: "/admin/Home/service",
    },
  ];
  return (
    <div className="home-container">
      <div className="home-header">
        {homelist.map((listitem) => {
          return (
            <DndProvider backend={HTML5Backend}>
              <div
                className="single-header"
                style={{
                  backgroundColor:
                    location.pathname === listitem.link
                      ? "#0047FF1A"
                      : "#F5F5F5",
                  color:
                    location.pathname === listitem.link ? "#0047FF" : "#787878",
                }}
                onClick={() => navigate(`${listitem.link}`)}
              >
                <div className="header-icon">
                  <img
                    src={
                      location.pathname === listitem.link
                        ? dragAndDropBlue
                        : dragAndDrop
                    }
                    alt=""
                    style={{ cursor: "move" }}
                  />
                </div>
                <div className="header-name">{listitem.name}</div>
              </div>
            </DndProvider>
          );
        })}
      </div>
      <div className="line-break"></div>

      <div style={{ display: "flex" }}>
        <ProductPage>
          <Product
            style={{
              // margin: "25px 0px 31px 54px",
              margin: "1rem",
              backgroundColor: "",
            }}
          >
            <div
              style={{
                height: "50px",
                display: "flex",
                marginBottom: "34px",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontFamily: "EuclidMedium",
                  color: "#787878",
                  alignContent: "center",
                }}
              >
                Total Products ({products.length})
              </p>
              <div className="switchbutton">
                <div className="switchtext">on / off</div>
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
            <DndProvider backend={HTML5Backend}>
              <Container />
            </DndProvider>
          </Product>
        </ProductPage>
      </div>
    </div>
  );
};
const ProductPage = styled.div`
  // width: calc(100vw - 353px);
  width: 100%;

  // margin: 0px 18px 0 19px;
  background-color: white;
`;
const Product = styled.div`
  // width: calc(100% - 90px);
`;

export default HomeProduct;
