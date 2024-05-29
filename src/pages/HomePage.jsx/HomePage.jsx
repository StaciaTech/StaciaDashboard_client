import React from "react";
import "../../styles/Homepage.css";
import dragAndDrop from "../../assets/DragandDropicon.svg";
import dragAndDropBlue from "../../assets/DragandDropiconBlue.svg";

import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const homelist = [
    {
      name: "Products",
      link: "/admin/Home/products",
    },
    {
      name: "Our Clients",
      link: "/admin/Home/service",
    },
    {
      name: "Our Service",
      link: "/admin/Home/service",
    },
    {
      name: "Events",
      link: "/admin/Home/service",
    },
    {
      name: "Case Study",
      link: "/admin/Home/service",
    },
    {
      name: "Our Projects",
      link: "/admin/Home/service",
    },
    {
      name: "Articles",
      link: "/admin/Home/service",
    },
    {
      name: "Foundation Four",
      link: "/admin/Home/service",
    },
    {
      name: "Testinomials",
      link: "/admin/Home/service",
    },
  ];

  return (
    <div className="home-container">
      <div className="home-header">
        {homelist.map((listitem) => {
          return (
            <div
              className="single-header"
              style={{
                backgroundColor:
                  location.pathname === listitem.link ? "#0047FF1A" : "#F5F5F5",
                color:
                  location.pathname === listitem.link ? "#0047FF" : "#787878",
              }}
              onClick={() => navigate(`${listitem.link}`)}
            >
              <div className="header-icon">
                <img
                  src={
                    location.pathname === listitem.link
                      ? dragAndDropBlue
                      : dragAndDrop
                  }
                  alt=""
                  style={{ cursor: "move" }}
                />
              </div>
              <div className="header-name">{listitem.name}</div>
            </div>
          );
        })}
      </div>
      <div className="line-break"></div>
    </div>
  );
};

export default HomePage;
