import React from "react";
import "../../styles/settings.css";

function ProfileSettings() {
  return (
    <>
      <div>
        <div className="page-heading">User Profile</div>
        <div
          style={{
            margin: "1rem 0rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              margin: "1rem 0rem",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "6.5rem",
                width: "6.5rem",
                borderRadius: "50%",
                backgroundColor: "#0001",
              }}
            ></div>
            <div>
              <div>Name</div>
              <div>Position</div>
              <div>Stacia Corp</div>
            </div>
          </div>
          <div
            style={{
              padding: "1rem 1.5rem",
              border: "2px solid #0047ff",
              borderRadius: "10px",
              color: "#0047ff",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Upload New Photo
          </div>
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <div style={{ width: "100%", display: "flex", gap: "2rem" }}>
            <div style={{ width: "50%" }}>
              <div className="profile-input-lables">First Name</div>
              <input
                type="text"
                name=""
                id=""
                className="profile-input-fields"
              />
            </div>
            <div style={{ width: "50%" }}>
              <div className="profile-input-lables">Last Name</div>
              <input
                type="text"
                name=""
                id=""
                className="profile-input-fields"
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className="profile-input-lables">User Name</div>
            <input type="text" name="" id="" className="profile-input-fields" />
          </div>
          <div style={{ width: "100%", display: "flex", gap: "2rem" }}>
            <div style={{ width: "50%" }}>
              <div className="profile-input-lables">Email Address</div>
              <input
                type="text"
                name=""
                id=""
                className="profile-input-fields"
              />
            </div>
            <div style={{ width: "50%" }}>
              <div className="profile-input-lables">Phone Number</div>
              <input
                type="text"
                name=""
                id=""
                className="profile-input-fields"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            gap: "1rem",
            margin: "2rem 0rem",
          }}
        >
          <button
            style={{
              padding: "1rem 2rem",
              color: "#0047ff",
              border: "2px solid #0047ff",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            Cancle
          </button>
          <button
            style={{
              padding: "1rem 2rem",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#0047ff",
              color: "#fff",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileSettings;
