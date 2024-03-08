import React from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from "../../../dragAndDrop/CaseStudy/AllCaseStudy/Container"

const CaseStudy = () => {
  // const history = useNavigate()
  return (
    <>
      <div style={{ display: "flex" }}>
        <CaseSudyPage>
          <CaseStudys>
            <div
              style={{
                height: "50px",
                display: "flex",
                marginBottom: '34px',
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
                Total Case Study ()
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
                >
                  All Case Study
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
                >
                  Primary Showcase
                </div>
              </div>
            </div>
            <DndProvider backend={HTML5Backend}>
              <Container />
            </DndProvider>
          </CaseStudys>
        </CaseSudyPage>
      </div></>
  )
}

export default CaseStudy
const CaseSudyPage = styled.div`
   min-width: calc(100vw - 356px);
  background-color: #ffffff;
  margin: 0 22px 0 18px;
  min-height: 100vh;
`;
const CaseStudys = styled.div`
  padding: 25px 59px 25px 60px;
  width: calc(1564px - 119px);
  min-height: 100vh;
`;