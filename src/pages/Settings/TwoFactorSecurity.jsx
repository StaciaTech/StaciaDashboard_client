import { React, useState, useEffect } from "react";
import "../../styles/settings.css";

function TwoFactorSecurity({ closeTwoFactorModal }) {
  const [chooseSmsorMail, setChooseSmsorMail] = useState(false);
  const [addSelectMail, setaddSelectMail] = useState(false);
  const [addSelectNumber, setaddSelectNumber] = useState(false);
  const [confirmMail, setConfirmMail] = useState(false);
  const [confirmNumber, setConfirmNumber] = useState(false);
  const [sendOtp, setSendOpt] = useState(false);
  const [enterPassword, setEnterPssword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isNumber, setIsNumber] = useState(false);
  const [isMail, setisMail] = useState(false);
  const [newNumber, setNewNumber] = useState(false);
  const [newMail, setNewMail] = useState(false);

  useEffect(() => {
    setChooseSmsorMail(true);
    setaddSelectMail(false);
    setaddSelectNumber(false);
    setConfirmMail(false);
    setConfirmNumber(false);
    setSendOpt(false);
    setEnterPssword(false);
    setSuccess(false);
  }, []);

  const gotoMailorNumber = () => {
    setChooseSmsorMail(false);
    setaddSelectMail(true);
    setaddSelectNumber(true);
    setConfirmMail(false);
    setConfirmNumber(false);
    setSendOpt(false);
    setEnterPssword(false);
    setSuccess(false);
  };
  const addNumberHandler = () => {
    setChooseSmsorMail(false);
    setaddSelectMail(false);
    setaddSelectNumber(false);
    setConfirmMail(false);
    setConfirmNumber(true);
    setSendOpt(false);
    setEnterPssword(false);
    setSuccess(false);
  };
  const addMailHandler = () => {
    setChooseSmsorMail(false);
    setaddSelectMail(false);
    setaddSelectNumber(false);
    setConfirmMail(true);
    setConfirmNumber(false);
    setSendOpt(false);
    setEnterPssword(false);
    setSuccess(false);
  };
  const otpPageHandler = () => {
    setChooseSmsorMail(false);
    setaddSelectMail(false);
    setaddSelectNumber(false);
    setConfirmMail(false);
    setConfirmNumber(false);
    setSendOpt(true);
    setEnterPssword(false);
    setSuccess(false);
  };
  const passwordhandler = () => {
    setChooseSmsorMail(false);
    setaddSelectMail(false);
    setaddSelectNumber(false);
    setConfirmMail(false);
    setConfirmNumber(false);
    setSendOpt(false);
    setEnterPssword(true);
    setSuccess(false);
  };
  const successhandler = () => {
    setChooseSmsorMail(false);
    setaddSelectMail(false);
    setaddSelectNumber(false);
    setConfirmMail(false);
    setConfirmNumber(false);
    setSendOpt(false);
    setEnterPssword(false);
    setSuccess(true);
  };

  return (
    <>
      <div>
        {chooseSmsorMail && (
          <div className="modal-contaier">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ color: "#000" }}>
                Add extra security to Your Account
              </div>
              <div onClick={closeTwoFactorModal}>X</div>
            </div>
            <p>
              Protect your account! Enable Two-Factor Authentication for an
              extra layer of security. It's quick, easy, and keeps your
              information safe. Stay secure!
            </p>
            <p style={{ fontWeight: 600 }}>Choose your security method</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1rem",
                }}
              >
                <div style={{ color: "#000" }}>Text message (SMS)</div>
                <div>We’ll send a code to the number that you choose</div>
              </div>
              <div>
                <input
                  type="radio"
                  name="switchMailOrNumber"
                  id=""
                  style={{ width: "25px", height: "25px" }}
                  onClick={() => {
                    setIsNumber(true);
                    setisMail(false);
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1rem",
                }}
              >
                <div style={{ color: "#000" }}>Mail</div>
                <div>We’ll send a code to the email that you choose</div>
              </div>
              <div>
                <input
                  type="radio"
                  name="switchMailOrNumber"
                  id=""
                  style={{ width: "25px", height: "25px" }}
                  onClick={() => {
                    setIsNumber(false);
                    setisMail(true);
                  }}
                />
              </div>
            </div>
            <button className="modal-submit-button" onClick={gotoMailorNumber}>
              Next
            </button>
          </div>
        )}
        {isNumber && addSelectNumber && (
          <div className="modal-contaier">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ color: "#000" }}>Select or add a phone number</div>
              <div onClick={closeTwoFactorModal}>X</div>
            </div>
            <p>
              Secure your account! Add or update your phone number for quick
              updates and enhanced security.
            </p>
            <hr />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "#000" }}>9948***99</div>
              <input
                type="radio"
                name="number-selection"
                id=""
                style={{ width: "25px", height: "25px" }}
              />
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "#000" }}>Add a phone number</div>
              <input
                type="radio"
                name="number-selection"
                id=""
                style={{ width: "25px", height: "25px" }}
                onClick={() => setNewNumber(true)}
              />
            </div>
            <hr />
            <button
              style={{ marginTop: "1rem" }}
              className="modal-submit-button"
              onClick={newNumber ? addNumberHandler : otpPageHandler}
            >
              Next
            </button>
          </div>
        )}
        {isMail && addSelectMail && (
          <div className="modal-contaier">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ color: "#000" }}>Select or add a Mail</div>
              <div onClick={closeTwoFactorModal}>X</div>
            </div>
            <p>
              Secure your account! Add or update your phone number for quick
              updates and enhanced security.
            </p>
            <hr />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "#000" }}>admin@*****rp.com</div>
              <input
                type="radio"
                name="mail-selection"
                id=""
                style={{ width: "25px", height: "25px" }}
              />
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "#000" }}>Add a mail</div>
              <input
                type="radio"
                name="mail-selection"
                id=""
                style={{ width: "25px", height: "25px" }}
                onClick={() => setNewMail(true)}
              />
            </div>
            <hr />
            <button
              style={{ marginTop: "1rem" }}
              className="modal-submit-button"
              onClick={newMail ? addMailHandler : otpPageHandler}
            >
              Next
            </button>
          </div>
        )}
        {confirmMail && (
          <div>
            <div className="modal-contaier">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#000" }}>Add Mail</div>
                <div onClick={closeTwoFactorModal}>X</div>
              </div>
              <p>
                Add a mail to ensure account access even if you forget your
                password. It's a simple and secure way to keep your account in
                your hands
              </p>
              <input
                type="text"
                name=""
                id=""
                className="security-modal-inputs"
              />
              <button
                style={{ marginTop: "5rem" }}
                className="modal-submit-button"
                onClick={otpPageHandler}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {confirmNumber && (
          <div>
            <div className="modal-contaier">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#000" }}>Add Number</div>
                <div onClick={closeTwoFactorModal}>X</div>
              </div>
              <p>
                Add a number to ensure account access even if you forget your
                password. It's a simple and secure way to keep your account in
                your hands
              </p>
              <input
                type="text"
                name=""
                id=""
                className="security-modal-inputs"
              />
              <button
                style={{ marginTop: "5rem" }}
                className="modal-submit-button"
                onClick={otpPageHandler}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {sendOtp && (
          <div>
            <div className="modal-contaier">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#000" }}>Enter Confermation Code</div>
                <div onClick={closeTwoFactorModal}>X</div>
              </div>
              <p>
                Enter the 6-digit confirmation code from your phone to finalize
                account verification, adding an extra layer of security
              </p>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter your code"
                className="security-modal-inputs"
              />
              <div
                style={{
                  marginTop: "5rem",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1rem",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#fff",
                    border: "2px solid #0047ff",
                    borderRadius: "5px",
                    width: "100%",
                    height: "3rem",
                    color: "#0047ff",
                  }}
                >
                  ReSend Code
                </button>
                <button
                  className="modal-submit-button"
                  onClick={passwordhandler}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
        {enterPassword && (
          <div>
            <div className="modal-contaier">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#000" }}>Enter your password</div>
                <div onClick={closeTwoFactorModal}>X</div>
              </div>
              <p>
                For added security, please confirm your identity by re-entering
                your password before proceeding
              </p>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter your password"
                className="security-modal-inputs"
              />
              <div
                style={{
                  color: "#0047ff",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                forget password
              </div>
              <button
                style={{ marginTop: "5rem" }}
                className="modal-submit-button"
                onClick={successhandler}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {success && (
          <div
            style={{
              width: "100%",
              height: "25rem",
              fontFamily: "EuclidMedium",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "85%",
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{ fontSize: "2rem", textAlign: "center", color: "#000" }}
              >
                Two-factor authentication Done!
              </div>
              <div style={{ textAlign: "center", color: "#787878" }}>
                Two-Factor Authentication successfully completed! Your account
                is now doubly secure. Thank you for enhancing your protection
              </div>
            </div>

            <buttom
              className="modal-submit-button"
              onClick={closeTwoFactorModal}
            >
              Done
            </buttom>
          </div>
        )}
      </div>
    </>
  );
}

export default TwoFactorSecurity;
