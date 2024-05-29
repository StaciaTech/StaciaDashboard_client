import React, { useState } from 'react'
import "../../styles/Homepage.css"
import dragAndDropBlue from "../../assets/DragandDropiconBlue.svg";
import dragAndDrop from "../../assets/DragandDropicon.svg";
import timer from "../../assets/timer.svg";
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from '../../dragAndDrop/Products/PrimaryShowcase.jsx/Container.jsx'
import { useSelector } from 'react-redux';
import Switch from "react-switch";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";



const HomeClients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector((state) => state.product.primaryShowcase);
  const [switchState, setSwitchState] = useState(false);
  const [logoActive, setLogoActive] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  function closeModal() {
    setModalIsOpen(false);
  }

  const submitModalCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "342px",
      borderRadius: "0.9rem",
    },
    overlay: {
      backgroundColor: "#0000001A",
    },
  };




  const homelist = [{
    name:"Products",
    link:"/admin/Home/products"
  },{
    name:"Our Clients",
    link:"/admin/Home/clients"
  },
  {
    name:"Our Service",
    link:"/admin/Home/service"
  },
  {
    name:"Events",
    link:"/admin/Home/service"
  },
  {
    name:"Case Study",
    link:"/admin/Home/service"
  },
  {
    name:"Our Projects",
    link:"/admin/Home/service"
  },
  {
    name:"Articles",
    link:"/admin/Home/service"
  },
  {
    name:"Foundation Four",
    link:"/admin/Home/service"
  },
  {
    name:"Testinomials",
    link:"/admin/Home/service"
  }]
  return (
    <div className="home-container">
      <div className="home-header">
        {
        
        homelist.map((listitem)=>{
          return(
            
            <div className='single-header' style={{
              backgroundColor: (location.pathname===listitem.link? "#0047FF1A" : "#F5F5F5"),
              color: (location.pathname===listitem.link? "#0047FF" : "#787878")
              }} onClick={()=>navigate(`${listitem.link}`)}>

            <div className="header-icon">
            <img
                src={ (location.pathname===listitem.link? dragAndDropBlue: dragAndDrop) }
                alt=""
                style={{ cursor: "move" }}
              />
            </div>
            <div className="header-name">
            {listitem.name}
            </div>
          </div>
          )       
            
        })
        }
      
        
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
              <div style={{display:"flex", gap:"36px"}}>
              <p
              className={!logoActive? "client-active":""}
                style={{
                  fontFamily: "EuclidMedium",
                  color: "#787878",
                  alignContent: "center",
                  cursor:"pointer"
                  
                }}
                onClick={()=>setLogoActive(false)}
              >
                Client Description
              </p>
              <p
                className={logoActive? "client-active":""}
                style={{
                  fontFamily: "EuclidMedium",
                  color: "#787878",
                  alignContent: "center",
                  cursor:"pointer"
                  
                }}
                onClick={()=>setLogoActive(true)}
              >
                Client Logo
              </p>

              </div>

              <div className="switchbutton">
                <div className="switchtext">on / off</div>
              <Switch className='switchtoggler' checkedIcon={false} uncheckedIcon={false} handleDiameter={20} onColor='#0047FF' onChange={()=>setSwitchState(!switchState)} checked={switchState} />
              <div onClick={()=>setModalIsOpen(true)} style={{display:"flex",backgroundColor:"#E5EDFF", borderRadius:"50px" ,height:"50px",width:"50px", alignItems:"center",justifyContent:"center"}}>
                <img height="22.5px" width="18px" src={timer} alt="" /></div>
              
              </div>
            </div>
            {modalIsOpen && (
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={submitModalCustomStyles}
                contentLabel="Example Modal"
              >
                <div style={{padding:"0 0.5rem"}}>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between" , margin:"0 0 1rem 0"}}>
                    <div style={{fontSize:"18px",fontWeight:"500",fontFamily:"EuclidMedium",}}>Timer</div>
                    <IoMdClose onClick={()=>closeModal()} style={{verticalAlign:"middle", cursor:"pointer"}}/>
                  </div>
                 
                    <div style={{display:'flex', justifyContent:"space-between" ,margin:"1rem 0"}}>
                    <input style={{fontSize:"1.3rem",fontWeight:"500",fontFamily:"EuclidMedium",height:"50px",width:"98px",border:"1px solid #0000001A", backgroundColor:"#F5F5F5", borderRadius:"5px",textAlign:"center"}} type="number" min={1} max={60} name="" id="" defaultValue={5} />
                    <select style={{fontSize:"1rem",fontWeight:"500",fontFamily:"EuclidMedium",height:"50px",width:"176px", border:"1px solid #0000001A",  backgroundColor:"#F5F5F5", padding:"0 5px 0 21px",borderRadius:"5px", borderRight: "16px solid transparent"}}  name="" id="">
                      <option value="Seconds">Seconds</option>
                      <option value="Minutes">Minutes</option>
                      <option value="Hours">Hours</option>
                    </select>
                    </div>

                    <div>
                      <input type="button" onClick={()=>closeModal()} value="Save" style={{width:"100%", height:"50px", backgroundColor:"#0047FF",color:"white", borderRadius:"5px",border:"1px solid #0000001A",fontSize:"1rem",fontFamily:"EuclidBold",letterSpacing:"0.15px"}}  />
                    </div>
                  
                </div>
                
              </Modal>
            )}
            
          {!logoActive ? ( 
            <>
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
            Total Clients ({products.length})
          </p>
          
        </div>
          <DndProvider backend={HTML5Backend}>
              <Container />
            </DndProvider>
            </>) : "Logo Page"}
           
          </Product>
        </ProductPage>
      </div>

    </div>
  )
}
const ProductPage = styled.div`
  // width: calc(100vw - 353px);
  width:100%;
  
  // margin: 0px 18px 0 19px;
  background-color: white;
`;
const Product = styled.div`
  // width: calc(100% - 90px);
 
  
`;

export default HomeClients