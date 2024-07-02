import React from "react";
import WhatsNewNav from "./WhatsNewNav";
import "../../styles/WhatsNew.css";

function WhatsNewNews() {
  return (
    <>
      <div className="whatsNew-container">
        <div>
          <WhatsNewNav />
        </div>
        <div>Coming Soon</div>
      </div>
    </>
  );
}

export default WhatsNewNews;
