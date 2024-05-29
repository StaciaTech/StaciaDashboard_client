import React from "react";
import { useEffect, useState } from "react";
// import { useDrop } from "react-dnd";
// import { ArchiveCard, Card } from "./Card.jsx";
import Add from "../../../assets/Add.svg";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

function ArticleContainer() {
  const history = useNavigate();

  return (
    <div>
      <div
        style={{
          width: "464px",
          height: "215px",
          background: "#ffffff",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #0047FF",
          cursor: "pointer",
        }}
        onClick={() => history("/admin/Resource/Articles/AddNewArticle")}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#0047FF",
            fontSize: "20px",
          }}
        >
          <img
            src={Add}
            alt=""
            style={{ paddingRight: "7px", cursor: "pointer" }}
          />
          Add Article
        </div>
      </div>
    </div>
  );
}

export default ArticleContainer;
