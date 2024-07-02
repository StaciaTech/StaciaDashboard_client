import { React, useState, useEffect } from "react";
import "../../styles/settings.css";

function RecoverNumber({ closeRecoverNumber }) {
  const [addNumber, setAddNumber] = useState(false);
  const [checkCode, setCheckCode] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setAddNumber(true);
    setCheckCode(false);
    setSuccess(false);
  }, []);

  const checkCodeHandler = () => {
    setAddNumber(false);
    setCheckCode(true);
    setSuccess(false);
  };
  const successHandler = () => {
    setAddNumber(false);
    setCheckCode(false);
    setSuccess(true);
  };

  return (
    <>
      <div>
        {addNumber && (
          <div>
            <div className="modal-contaier">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#000" }}>Recover Number</div>
                <div onClick={closeRecoverNumber}>X</div>
              </div>
              <p>
                Add a recovery number to ensure account access even if you
                forget your password. It's a simple and secure way to keep your
                account in your hands
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
                onClick={checkCodeHandler}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {checkCode && (
          <div>
            <div className="modal-contaier">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#000" }}>Enter Confermation Code</div>
                <div onClick={closeRecoverNumber}>X</div>
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
                  onClick={successHandler}
                >
                  Next
                </button>
              </div>
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
                Recovery Number Updated!
              </div>
              <div style={{ textAlign: "center", color: "#787878" }}>
                Success! Your recovery number has been updated. You're all set
                for secure and hassle-free account access
              </div>
            </div>

            <buttom
              className="modal-submit-button"
              onClick={closeRecoverNumber}
            >
              Done
            </buttom>
          </div>
        )}
      </div>
    </>
  );
}

export default RecoverNumber;
