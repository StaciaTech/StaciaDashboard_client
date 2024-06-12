import React from "react";
import "../../styles/settings.css";

function PasswordModal({ closePasswordModal }) {
  return (
    <>
      <div className="modal-contaier">
        <div className="security-modal-layout">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>Current Password</div>
            <div style={{ color: "#0047ff" }} onClick={closePasswordModal}>
              Cancle
            </div>
          </div>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="enter current password"
              className="security-modal-inputs"
            />
          </div>
        </div>
        <div className="security-modal-layout">
          <div>New Password</div>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="enter new password"
              className="security-modal-inputs"
            />
          </div>
        </div>
        <div className="security-modal-layout">
          <div>Retype New Password</div>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="enter new password"
              className="security-modal-inputs"
            />
          </div>
        </div>
        <button className="modal-submit-button" onClick={closePasswordModal}>
          Save
        </button>
      </div>
    </>
  );
}

export default PasswordModal;
