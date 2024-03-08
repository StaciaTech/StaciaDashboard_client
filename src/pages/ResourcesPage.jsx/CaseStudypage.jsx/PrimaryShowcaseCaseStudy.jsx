import React from 'react'

const PrimaryShowcaseCaseStudy = () => {
  return (
    <div style={{ display: "flex" }}>
      <CaseSudyPage>
        <CaseStudys
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
                onClick={() => history("/ServicePage/AllService")}
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
                onClick={() => history("/ServicePage/PrimaryServices")}
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
    </div>
  )
}

export default PrimaryShowcaseCaseStudy
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