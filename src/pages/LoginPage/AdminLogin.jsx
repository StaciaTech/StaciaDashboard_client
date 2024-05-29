import React, { useState } from "react";
import "../../styles/AdminLogin.css";
import brandlogo from "../../assets/Group 547.png";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import axios from "axios";

function AdminLogin() {
  const [emailVerified, SetEmailVerified] = useState(false);
  const [email, SetEmail] = useState("");
  const [passwordValue, SetPasswordValue] = useState("nil");
  const navigate = useNavigate();

  function Login() {
    const [tempEmail, SetTempEmail] = useState("");
    const handleInputChange = (event) => {
      const newemail = event.target.value;
      SetTempEmail(newemail);
    };
    const verifyEmail = () => {
      {
        const userData = {
          email: tempEmail,
        };
        axios
          .post("http://localhost:8000/admin/verify-email", userData)
          .then((response) => {
            console.log(response, response.status, response.data);
            if (response.data.success) {
              // alert(response.data.message)
              SetEmail(tempEmail);
              SetEmailVerified(true);
            } else {
              alert(response.data.message);
            }
          });
      }
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
            <div className="header-primary">Welcome Back !</div>
            <div className="header-secondary">
              Kindly proceed with the login process in order to gain entry to
              your personal account.
            </div>

            <input
              className="inputfield"
              value={tempEmail}
              onChange={handleInputChange}
              placeholder="Email or Phone Number"
              onKeyDown={(e) => {
                if (e.key === "Enter") verifyEmail();
              }}
              required
            />
            <div className="btn" onClick={verifyEmail}>
              Next
            </div>
          </div>
        </div>
      </div>
    );
  }
  function Password() {
    const [passwordtype, SetPasswordtype] = useState("password");
    const [tempPassword, SetTempPassword] = useState("");
    const handleInputPasswordChange = (event) => {
      const newPassword = event.target.value;
      SetTempPassword(newPassword);
    };

    const handleSubmit = () => {
      const userData = {
        email: email,
        password: tempPassword,
      };
      axios
        .post("http://localhost:8000/admin/login", userData)
        .then((response) => {
          console.log(response, response.status, response.data);
          if (response.data.success) {
            // alert(response.data.message)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", "admin");
            navigate("/admin/dashboard");
          } else {
            alert(response.data.message);
          }
        });
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
            <div className="header-primary">Enter Password</div>
            <div className="header-secondary">
              Please input your password to proceed further with authentication.{" "}
            </div>
            <div className="password-container">
              <input
                className="inputfield"
                value={tempPassword}
                onChange={handleInputPasswordChange}
                type={passwordtype}
                placeholder="Enter Password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
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

            <div className="forgot-password-text">
              <div className="rememberme">
                <input
                  type="checkbox"
                  style={{ marginRight: "5px" }}
                  name=""
                  id=""
                />
                Remember Me{" "}
                <span style={{ fontSize: "14px" }}> (Valid for 30 Days) </span>
              </div>
              <Link to="/admin/forgotpassword">
                <div>Forgot Password?</div>
              </Link>
            </div>

            <div className="btn" onClick={handleSubmit}>
              Log in
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (emailVerified) {
    return <Password />;
  } else {
    return <Login />;
  }
}

export default AdminLogin;
