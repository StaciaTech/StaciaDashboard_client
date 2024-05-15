import React, { useState } from 'react'
import "../../styles/AdminLogin.css"
import brandlogo from "../../assets/Group 547.png"
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function ForgotPassword(){
    const navigate=useNavigate();
    const [email, SetEmail] = useState("")
    const [emailVerified, SetEmailVerified]=useState(false)
    const [otp, SetOtp]=useState(0)
    const [otpVerified, SetOtpVerified]=useState(false)

    function ForgotEmail() {
        const [tempEmail, SetTempEmail] = useState("")
        const handleInputChange = (event) => {
          const newemail = event.target.value;
          SetTempEmail(newemail);
          
        };
        const verifyEmail =()=>{
          {
            const userData = {
              email: tempEmail
            };
            axios.post("http://localhost:8000/admin/forgotpassword", userData).then((response) => {
              console.log(response,response.status, response.data);
              if(response.data.success){
                alert(response.data.message)
                SetEmail(tempEmail)
                SetEmailVerified(true)
              }
              else{
                alert(response.data.message)
              }
            });
          }
        }

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
             
              <input className="inputfield" value={tempEmail} onChange={handleInputChange} type="text" placeholder='Enter your e-mail address' onKeyDown={(e) => {
        if (e.key === "Enter")
            verifyEmail();
        }}/>
              <div className="btn"  onClick={verifyEmail}>
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
      function OtpVerify() {
        const [tempOtp, SetTempOtp] = useState()
        const handleInputChange = (event) => {
          const newotp = event.target.value;
          SetTempOtp(newotp);
          
        };
        const VerifyOtpFunction =()=>{
          {
            const userData = {
              email: email,
              otp: tempOtp
            };
            axios.post("http://localhost:8000/admin/verify-otp", userData).then((response) => {
              console.log(response,response.status, response.data);
              if(response.data.success){
                alert(response.data.message)
                SetOtp(tempOtp)
                SetOtpVerified(true)
              }
              else{
                alert(response.data.message)
              }
            });
          }
        }
        
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
                <div className="header-secondary">We've sent a one-time password ( 6 digit ) to your registered mobile number or email address. Please enter the OTP below to proceed</div>
               
                <input className="inputfield" value={tempOtp} onChange={handleInputChange} type="text" placeholder='Enter OTP (6 digit)'/>
                <div className="btn" onClick={VerifyOtpFunction}>
                    Submit
                </div>
                <div className="btn cancel-btn">
                    Cancel
                </div>
                <div className="otpfooter"> Didn't recieve OTP   <Link to="/admin/otpverify">Resend OTP</Link></div>
        
                </div>
        
                
                
                
                
                
                </div>
         
            </div>
           
          )
      }
      function CreatePassword() {
          const [passwordtype, SetPasswordtype] = useState("password")
          const [lengthcheck, setLengthCheck] = useState("neutral");
          const [casecheck, setCaseCheck] = useState("neutral");
          const [charcheck, setCharCheck] = useState("neutral");
          const pattern1 = /[a-z]/;
          const pattern2 = /[A-Z]/;
          const pattern3 = /\d/;
          const pattern4 = /[!@#$%^&*()_]/;
          const [password, setPassword] = useState('');
          const [confirmPassword, setConfirmPassword] = useState('');
          const [passwordMatch, setPasswordMatch]= useState("neutral");
        
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
          const validateConfirmPassword=(values)=>{
            setPasswordMatch("notmatch");
            console.log("renter unmatch")
            if(values===password){
              console.log("reenter match")
              setPasswordMatch("match");
            } 
           
            
          }
          const validatePassword=(values)=>{
            
            console.log("validating")
              values.length >= 8
                ? setLengthCheck("valid")
                : setLengthCheck("invalid");
              {
                pattern1.test(values) &&
                pattern2.test(values)
                  ? setCaseCheck("valid")
                  : setCaseCheck("invalid");
              }
              {
                pattern3.test(values) &&
                pattern4.test(values)
                  ? setCharCheck("valid")
                  : setCharCheck("invalid");
              }
              
          }
          const handlepasswordtype = () => {
            passwordtype === "text"
              ? SetPasswordtype("password")
              : SetPasswordtype("text");
          };

          const resetPasswordFuntion =()=>{
           if(passwordMatch==="match"&&lengthcheck==='valid'&&charcheck==='valid'&&casecheck==='valid')
            {
              const userData = {
                email: email,
                password:password
              };
              axios.post("http://localhost:8000/admin/reset-password", userData).then((response) => {
                console.log(response,response.status, response.data);
                if(response.data.success){
                  alert(response.data.message)
                 navigate('/admin')
                }
                else{
                  alert(response.data.message)
                }
              });
            }
            else{
                alert("password conditions not met!")
            }
          }
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
                <div className="header-secondary">Choose a strong password to secure your account</div>
               <div className="password-container">
               <input className="inputfield" value={password}
                      onChange={handleInputChange}  type={passwordtype} placeholder='Enter Password'/>
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
                          <div className={lengthcheck}>
                            Atleast 8 characters long
                          </div>
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
               <input className="inputfield"  onChange={handleConfirmInputChange} value={confirmPassword} type={passwordtype} placeholder='Re-Enter Password'/>
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
                {
                passwordMatch==="notmatch"? ("Password Doesn't Match"):("")
                }
               </div>
        
        
                
                <div className="btn" onClick={resetPasswordFuntion}>
                    Submit
                </div>
        
                </div>
        
                
                
                
                
                
                </div>
         
            </div>
           
          )
        }

    if(emailVerified && otpVerified){
        return <CreatePassword/>
    }
    else if(emailVerified){
        return <OtpVerify/>
    }
    else{
        return <ForgotEmail/>
    }
}

export default ForgotPassword