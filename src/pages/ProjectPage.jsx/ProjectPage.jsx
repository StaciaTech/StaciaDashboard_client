import React from 'react'
import '../../styles/Projectstyles.css'
import ContentEditor from '../../components/projects/ContentEditor'
import Backicon from "../../assets/Backicon.svg";
import Archive from '../../components/Archive';



const ProjectPage = () => {
  const handelBack = () => {
   
  }
  return (
    <div className='project-container'>
    <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin:"1rem 0",
            }}
          >
            <div
              style={{
                display: "flex",
                // paddingTop: "17.5px",
              
                cursor: "pointer",
              }}
              onClick={() => handelBack()}
            >
              <img src={Backicon} alt="" />
              <div
                style={{
                  marginLeft: "5px",
                  color: "#787878",
                  fontSize: "16px",
                  fontFamily: "EuclidMedium",
                }}
              >
                Back / All Product Page
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Archive
                // btnStatus={btnStatus}
                // changeandupdate={changeArchive}
              />
            </div>
           

           
          </div>
          <div className="borderline">
              
              </div>

    <ContentEditor/>

    </div>

  )
}

export default ProjectPage