import React from "react";
import "../../styles/Home.css";
import dotsIcon from "../../assets/6dotsIcon.svg";

const HomePage = () => {
  return (
    <div
      style={{
        marginLeft: "1rem",
        backgroundColor: "#fff",
        width: "100%",
        padding: "1rem 3rem",
      }}
    >
      <div className="home-options">
        <div>
          <div>
            <img src={dotsIcon} alt="" srcset="" />
          </div>
          <div>Products</div>
        </div>
        <div>
          <div>
            <img src={dotsIcon} alt="" srcset="" />
          </div>
          <div>
            <div>Our Clients</div>
          </div>
        </div>
        <div>
          <div>
            <img src={dotsIcon} alt="" srcset="" />
          </div>
          <div>Our Services</div>
        </div>
        <div>
          <div>
            <img src={dotsIcon} alt="" srcset="" />
          </div>
          <div>Events</div>
        </div>
        <div>
          <div>
            <img src={dotsIcon} alt="" srcset="" />
          </div>
          <div>Case Study</div>
        </div>
        <div>
          <div>
            <img src={dotsIcon} alt="" srcset="" />
          </div>
          <div>Our Projects</div>
        </div>
        <div>
          <div>
            <img src={dotsIcon} alt="" srcset="" />
          </div>
          <div>Articles</div>
        </div>
        <div>
          <div>
            <img src={dotsIcon} alt="" srcset="" />
          </div>
          <div>Foundation Four</div>
        </div>
        <div>
          <div>
            <img src={dotsIcon} alt="" srcset="" />
          </div>
          <div>Testimonials</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
