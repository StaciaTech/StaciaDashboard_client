import React, { useState } from "react";
import "../../styles/AdminLogin.css";
import brandlogo from "../../assets/Group 547.png";
import { Link } from "react-router-dom";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

function CreatePassword() {
  const [passwordtype, SetPasswordtype] = useState("password");
  const [lengthcheck, setLengthCheck] = useState("neutral");
  const [casecheck, setCaseCheck] = useState("neutral");
  const [charcheck, setCharCheck] = useState("neutral");
  const pattern1 = /[a-z]/;
  const pattern2 = /[A-Z]/;
  const pattern3 = /\d/;
  const pattern4 = /[!@#$%^&*()_]/;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("neutral");

  const handleInputChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };
  const handleConfirmInputChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
    validateConfirmPassword(confirmPassword);
  };
  const validateConfirmPassword = (values) => {
    setPasswordMatch("notmatch");
    console.log("renter unmatch");
    if (values === password) {
      console.log("reenter match");
      setPasswordMatch("match");
    }
  };
  const validatePassword = (values) => {
    console.log("validating");
    values.length >= 8 ? setLengthCheck("valid") : setLengthCheck("invalid");
    {
      pattern1.test(values) && pattern2.test(values)
        ? setCaseCheck("valid")
        : setCaseCheck("invalid");
    }
    {
      pattern3.test(values) && pattern4.test(values)
        ? setCharCheck("valid")
        : setCharCheck("invalid");
    }
  };
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
          <div className="header-primary">Create Password</div>
          <div className="header-secondary">
            Choose a strong password to secure your account
          </div>
          <div className="password-container">
            <input
              className="inputfield"
              value={password}
              onChange={handleInputChange}
              type={passwordtype}
              placeholder="Enter Password"
            />
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

          <div className="password-validator-container">
            Please ensure your password is
            <ul>
              <li className={lengthcheck}>
                <div className={lengthcheck}>Atleast 8 characters long</div>
              </li>
              <li className={casecheck}>
                {" "}
                <div> Atleast one uppercase and lowercase letters </div>{" "}
              </li>
              <li className={charcheck}>
                {" "}
                <div>Atleast one number and special characters</div>{" "}
              </li>
            </ul>
          </div>

          <div className="password-container">
            <input
              className="inputfield"
              onChange={handleConfirmInputChange}
              value={confirmPassword}
              type={passwordtype}
              placeholder="Re-Enter Password"
            />
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

          <div className="passwordmatchstatus">
            {passwordMatch === "notmatch" ? "Password Doesn't Match" : ""}
          </div>

          <div className="btn">Submit</div>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
