import React from "react";
import "../../styles/AdminLogin.css";
import brandlogo from "../../assets/Group 547.png";
import { Link } from "react-router-dom";

function OtpVerify() {
  return (
    <div className="logincontainer">
      <div className="loginleft">
        <div className="imgcontainer">
          <img src={brandlogo} alt="" />
        </div>
      </div>
      <div className="loginright">
        <div className="text-container">
          <div className="header-primary">Enter Your OTP</div>
          <div className="header-secondary">
            We've sent a one-time password ( 6 digit ) to your registered mobile
            number or email address. Please enter the OTP below to proceed
          </div>

          <input
            className="inputfield"
            type="text"
            placeholder="Enter OTP (6 digit)"
          />
          <div className="btn">Submit</div>
          <div className="btn cancel-btn">Cancel</div>
          <div className="otpfooter">
            {" "}
            Didn't recieve OTP <Link to="/admin/otpverify">Resend OTP</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
