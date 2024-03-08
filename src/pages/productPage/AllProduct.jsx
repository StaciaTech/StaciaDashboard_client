import React from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "../../dragAndDrop/Products/AllProduct.jsx/Example";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../App.css";
export const AllProduct = () => {
  const products = useSelector((state) => state.product.productList);
  const history = useNavigate();

  return (
    <>
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
                Total Products ({products.length})
              </p>
              <div style={{ width: "316px", display: "flex" }}>
                <div
                  style={{
                    width: "158px",
                    background: "#0047FF",
                    borderTopLeftRadius: "6px",
                    fontFamily: "EuclidMedium",
                    borderBottomLeftRadius: "6px",
                    border: "1px solid #0047FF",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                  onClick={() => history("/ProductPage/AllProduct")}
                >
                  All Product Page
                </div>
                <div
                  style={{
                    width: "158px",
                    color: "#0047FF",
                    fontFamily: "EuclidMedium",
                    borderTopRightRadius: "6px",
                    borderBottomRightRadius: "6px",
                    border: "1px solid #0047FF",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={() => history("/ProductPage/PrimaryProducts")}
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
    </>
  );
};
const ProductPage = styled.div`
  width: calc(100vw - 353px);
  margin: 0px 18px 0 19px;
  background-color: white;
`;
const Product = styled.div`
  width: calc(100% - 101px);
`;
