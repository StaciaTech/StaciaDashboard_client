import { React, useState } from "react";
import "../../styles/settings.css";
import Edit from "../../assets/penOnPaperEdit.svg";
import Modal from "react-modal";
import PasswordModal from "./PasswordModal";
import TwoFactorSecurity from "./TwoFactorSecurity";
import RecoverNumber from "./RecoverNumber";
import RecoverMail from "./RecoverMail";

function SecuritySettings() {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isTwoFactoOpen, setIsTwoFactorOpen] = useState(false);
  const [isRecoverNumberOpen, setIsRecoverNumberOpen] = useState(false);
  const [isRecoverMailOpen, setIsRecoverMailOpen] = useState(false);
  const openPasswordModal = () => setIsPasswordOpen(true);
  const closePasswordModal = () => setIsPasswordOpen(false);
  const openTwoFactorModal = () => setIsTwoFactorOpen(true);
  const closeTwoFactorModal = () => setIsTwoFactorOpen(false);
  const openRecoverNumber = () => setIsRecoverNumberOpen(true);
  const closeRecoverNumber = () => setIsRecoverNumberOpen(false);
  const openRecoverMail = () => setIsRecoverMailOpen(true);
  const closeRecoverMail = () => setIsRecoverMailOpen(false);

  const modalStyle = {
    overlay: {
      backgroundColor: "#0002",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "38rem",
      height: "auto",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "1.5rem",
      font: "Euclid Circular A",
    },
  };

  return (
    <>
      <div>
        <div className="page-heading">Login and Security</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1.5rem",
            margin: "2rem 0rem",
          }}
        >
          <div className="security-option-container">
            <div className="security-option-title">Password and Security</div>
            <div className="security-option" onClick={openPasswordModal}>
              <div>Change Password</div>
              <div>{">"}</div>
            </div>
            <div className="security-option" onClick={openTwoFactorModal}>
              <div>Two Factor Authentication</div>
              <div>{">"}</div>
            </div>
          </div>
          <div className="security-option-container">
            <div className="security-option-title">Password Details</div>
            <div className="security-option">
              <div>Last Password Change</div>
              <div>6 june 2024</div>
            </div>
            <div className="security-option">
              <div>Recovery Number</div>
              <div
                style={{
                  display: "flex",
                  columnGap: "1rem",
                  color: "#000",
                  alignItems: "center",
                }}
              >
                <div>9948xxxx99</div>
                <div onClick={openRecoverNumber}>
                  <img src={Edit} alt="" />
                </div>
              </div>
            </div>
            <div className="security-option">
              <div>Recovery Mail</div>
              <div
                style={{
                  display: "flex",
                  columnGap: "1rem",
                  color: "#000",
                  alignItems: "center",
                }}
              >
                <div>admin@xxxxx.com</div>
                <div onClick={openRecoverMail}>
                  <img src={Edit} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Change password Modal */}
        <Modal
          isOpen={isPasswordOpen}
          onRequestClose={closePasswordModal}
          style={modalStyle}
        >
          <PasswordModal closePasswordModal={closePasswordModal} />
        </Modal>
        {/* Change Two Factor Authentication */}
        <Modal
          isOpen={isTwoFactoOpen}
          onRequestClose={closeTwoFactorModal}
          style={modalStyle}
        >
          <TwoFactorSecurity closeTwoFactorModal={closeTwoFactorModal} />
        </Modal>
        {/* Phone Recovery */}
        <Modal
          isOpen={isRecoverNumberOpen}
          onRequestClose={closeRecoverNumber}
          style={modalStyle}
        >
          <RecoverNumber closeRecoverNumber={closeRecoverNumber} />
        </Modal>
        {/* Mail Recovery */}
        <Modal
          isOpen={isRecoverMailOpen}
          onRequestClose={closeRecoverMail}
          style={modalStyle}
        >
          <RecoverMail closeRecoverMail={closeRecoverMail} />
        </Modal>
      </div>
    </>
  );
}

export default SecuritySettings;
