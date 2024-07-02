import React, { useState } from "react";
import styled from "styled-components";
import staciaLogo from "../assets/StaciaLogo.svg";
import helloLogo from "../assets/helloLogo.svg";
import { Avatar, Box, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import profilePic from "../assets/ProfilePic.svg";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const TopNavbard = () => {
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin-login");
  };
  return (
    <>
      <TopNaveBard>
        <StaciaLogo>
          <img
            src={staciaLogo}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="staciaLogo"
          />
        </StaciaLogo>
        <WellCome>
          Welcome, admin! <img src={helloLogo} alt="" />
        </WellCome>
        <div style={{ position: "absolute", right: "23px" }}>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{ p: 0 }}
              onClick={() => {
                setLogoutModal(!logoutModal);
              }}
            >
              <Avatar alt="Remy Sharp" src={profilePic} />
            </IconButton>
          </Box>
        </div>
      </TopNaveBard>
      {logoutModal && (
        <div className="modalcontainer">
          <div className="modalleft">
            <img src={profilePic} alt="" />
          </div>
          <div className="modalright">
            <div className="user-details">
              <div className="username">Admin</div>
              <div className="user-email">admin@staciacorp.com</div>
            </div>
            <div className="btn-holder">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavbard;
const TopNaveBard = styled.div`
  width: 100vw;
  height: 85px;
  background-color: #0d0225;
  display: flex;
  align-items: center;
`;
const StaciaLogo = styled.div`
  // width: 201px;
  height: 24.291px;
  padding-left: 57px;
  /* background: red; */
`;
const WellCome = styled.div`
  color: #fff;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  padding-left: 75px;
  font-weight: 600;
  /* line-height: normal; */
`;
