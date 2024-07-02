import { React, useState } from "react";
import Search from "../assets/search.svg";
import ProfileSettings from "../pages/Settings/ProfileSettings";
import TemplateSettings from "../pages/Settings/TemplateSettings";
import SecuritySettings from "../pages/Settings/SecuritySettings";
import NotificationSettings from "../pages/Settings/NotificationSettings";
import TermsSettings from "../pages/Settings/TermsSettings";
import "../styles/settings.css";

function SettingsLayout() {
  const [tabs, setTabs] = useState("");

  const renderComponent = () => {
    switch (tabs) {
      case "profile":
        return <ProfileSettings />;
      case "template":
        return <TemplateSettings />;
      case "security":
        return <SecuritySettings />;
      case "notification":
        return <NotificationSettings />;
      case "terms":
        return <TermsSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "1rem",
          margin: "2rem 3rem",
          backgroundColor: "#fff",
          display: "flex",
        }}
      >
        <div
          style={{
            padding: "1.5rem 2rem",
            width: "20%",
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              border: "2px solid #0001",
              borderRadius: "2rem",
            }}
          >
            <img src={Search} alt="" style={{ width: "20%", height: "60%" }} />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search"
              style={{
                width: "80%",
                height: "90%",
                border: "none",
                // borderRadius: "2rem",
                marginRight: "10px",
              }}
            />
          </div>
          <div
            className="setting-side-items"
            onClick={() => setTabs("profile")}
          >
            Profile
          </div>
          <div
            className="setting-side-items"
            onClick={() => setTabs("template")}
          >
            Templates
          </div>
          <div
            className="setting-side-items"
            onClick={() => setTabs("security")}
          >
            Login and Security
          </div>
          <div
            className="setting-side-items"
            onClick={() => setTabs("notification")}
          >
            Notification
          </div>
          <div className="setting-side-items" onClick={() => setTabs("terms")}>
            Terms and Conditions
          </div>
        </div>
        <div
          style={{ width: "2px", backgroundColor: "#0001", height: "100%" }}
        />
        <div style={{ padding: "1.5rem 2rem", width: "80%" }}>
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default SettingsLayout;
