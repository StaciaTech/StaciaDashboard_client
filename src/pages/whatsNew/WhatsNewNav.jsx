import React from "react";
import "../../styles/WhatsNew.css";
import { useNavigate } from "react-router-dom";

function WhatsNewNav() {
  const navigateTo = useNavigate();

  return (
    <>
      <div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div
            className="whats-new-items"
            onClick={() => navigateTo("/admin/WhatsNew")}
          >
            Events
          </div>
          <div
            className="whats-new-items"
            onClick={() => navigateTo("/admin/WhatsNew/products")}
          >
            Product Updates
          </div>
          <div
            className="whats-new-items"
            onClick={() => navigateTo("/admin/WhatsNew/case-study")}
          >
            Case Study
          </div>
          <div
            className="whats-new-items"
            onClick={() => navigateTo("/admin/WhatsNew/article")}
          >
            Articles
          </div>
          <div
            className="whats-new-items"
            onClick={() => navigateTo("/admin/WhatsNew/news-room")}
          >
            Newsroom
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#f5f5f5",
            marginTop: "1rem",
          }}
        />
      </div>
    </>
  );
}

export default WhatsNewNav;
