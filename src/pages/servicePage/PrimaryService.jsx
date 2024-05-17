import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../../dragAndDrop/Services/PrimaryShowCase.jsx/Container";
import { useSelector } from "react-redux";

const PrimaryService = () => {
  const history = useNavigate();
  const primaryShowcase = useSelector((state) => state.service.primaryShowcase);
  return (
    <div style={{ display: "flex" }}>
      <ProductPage>
        <Product
          style={{
            margin: "25px 0px 31px 54px",
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
              Total Service ({primaryShowcase.length})
            </p>
            <div style={{ width: "316px", display: "flex" }}>
              <div
                style={{
                  width: "158px",
                  borderTopLeftRadius: "6px",
                  fontFamily: "EuclidMedium",
                  borderBottomLeftRadius: "6px",
                  border: "1px solid #0047FF",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  color: "#0047FF",
                  cursor: "pointer",
                }}
                onClick={() => history("/admin/Service/AllService")}
              >
                All Service Page
              </div>
              <div
                style={{
                  width: "158px",
                  color: "#ffffff",
                  fontFamily: "EuclidMedium",
                  borderTopRightRadius: "6px",
                  borderBottomRightRadius: "6px",
                  border: "1px solid #0047FF",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  cursor: "pointer",
                  background: "#0047FF",
                }}
                onClick={() => history("/admin/Service/PrimaryServices")}
              >
                Primary Showcase
              </div>
            </div>
          </div>
          <DndProvider backend={HTML5Backend}>
            <Container />
          </DndProvider>
        </Product>
      </ProductPage>
    </div>
  );
};

export default PrimaryService;
const ProductPage = styled.div`
  width: calc(100vw - 353px);
  margin: 0px 18px 0 19px;
  background-color: white;
`;
const Product = styled.div`
  width: calc(100% - 101px);
`;
