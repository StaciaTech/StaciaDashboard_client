import React from 'react'
import "../../styles/AdminLogin.css"
import brandlogo from "../../assets/Group 547.png"


function ForgotPassword() {
  return (
    <div className="logincontainer">
        <div className="loginleft">
            <div className="imgcontainer">
        <img src={brandlogo} alt="" />

            </div>
        </div>
        <div className="loginright">
        
        <div className="text-container">

        
        <div className="header-primary">Forgot Your Password?</div>
        <div className="header-secondary">Don't worry! It happens to the best of us. Please enter the email address associated with your account below</div>
       
        <input className="inputfield" type="text" placeholder='Enter your e-mail address'/>
        <div className="btn">
            Send OTP
        </div>
        <div className="btn cancel-btn">
            Cancel
        </div>

        </div>

        
        
        
        
        
        </div>
 
    </div>
   
  )
}

export default ForgotPassword