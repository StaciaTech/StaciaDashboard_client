import React, { useState } from 'react'
import "../../styles/AdminLogin.css"
import brandlogo from "../../assets/Group 547.png"
import { Link } from 'react-router-dom'
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";


function Password() {
  const [passwordtype, SetPasswordtype] = useState("password")
  const handlepasswordtype = () => {
    passwordtype === "text"
      ? SetPasswordtype("password")
      : SetPasswordtype("text");
  };
  return (
    <div className="logincontainer">
        <div className="loginleft">
            <div className="imgcontainer">
        <img src={brandlogo} alt="" />

            </div>
        </div>
        <div className="loginright">
        
        <div className="text-container">

        
        <div className="header-primary">Enter Password</div>
        <div className="header-secondary">Please input your password to proceed further with authentication. </div>
       <div className="password-container">
       <input className="inputfield" type={passwordtype} placeholder='Enter Password'/>
       {passwordtype === "text" ? (
                <MdOutlineVisibilityOff
                  size={21}
                  style={{ verticalAlign: "middle", color: "#636363" }}
                  onClick={handlepasswordtype}
                />
              ) : (
                <MdOutlineVisibility
                  size={21}
                  style={{ verticalAlign: "middle", color: "#636363" }}
                  onClick={handlepasswordtype}
                />
              )}
       </div>
        
        <Link to="/admin/forgotpassword">
        <div className="forgot-password-text">Forgot Password?</div>
        </Link>
        <div className="btn">
            Log in
        </div>

        </div>

        
        
        
        
        
        </div>
 
    </div>
   
  )
}

export default Password