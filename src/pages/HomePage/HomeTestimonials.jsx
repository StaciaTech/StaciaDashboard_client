import React, { useState } from "react";
import HomePage from "./HomePage";
import "../../styles/HomeTestimonial.css";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import Timer from "../../assets/timer.svg";
import Edit from "../../assets/Edit.svg";
import Clock from "../../assets/Frame 29038.svg";
import Close from "../../assets/close.svg";
import DragDropIcon from "../../assets/DragandDropicon.svg";

function HomeTestimonials() {
  const navigateTo = useNavigate();
  const [testimonialSwitch, setTestimonialSwitch] = useState(false);

  const TestimonialData = [
    {
      name: "abc",
      testistimonial: "lorem ipsum lorem",
    },
    {
      name: "abc",
      testistimonial: "lorem ipsum lorem",
    },
    {
      name: "abc",
      testistimonial: "lorem ipsum lorem",
    },
    {
      name: "abc",
      testistimonial: "lorem ipsum lorem",
    },
    {
      name: "abc",
      testistimonial: "lorem ipsum lorem",
    },
    {
      name: "abc",
      testistimonial: "lorem ipsum lorem",
    },
    {
      name: "abc",
      testistimonial: "lorem ipsum lorem",
    },
  ];

  return (
    <>
      <div className="home-testimonial-container">
        <HomePage />
        <div>
          <div
            style={{
              margin: "1rem 0rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p>
              Total Testimonials({TestimonialData && TestimonialData.length})
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <span>on/off</span>
              <Switch
                className="switchtoggler"
                checkedIcon={false}
                uncheckedIcon={false}
                handleDiameter={20}
                onColor="#0047FF"
                onChange={() => setTestimonialSwitch(!testimonialSwitch)}
                checked={testimonialSwitch}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <div
              className="add-client-card"
              onClick={() =>
                navigateTo("/admin/Home/testinomials/addtestimonial")
              }
            >
              +
            </div>

            {TestimonialData.map((eachTestimonial, index) => (
              <div
                style={{
                  border: "2px solid #0001",
                  borderRadius: "1rem",
                  width: "32rem",
                  height: "10rem",

                  padding: "1rem",
                }}
              >
                <div>
                  <img src={DragDropIcon} alt="" />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem 0rem",
                  }}
                >
                  <div>
                    <div>{eachTestimonial.name}</div>
                    <div>{eachTestimonial.testistimonial}</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div
                      onClick={() =>
                        navigateTo("/admin/Home/testinomials/edit-testimonial")
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <img src={Edit} alt="" />
                    </div>
                    <div>
                      <img src={Clock} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeTestimonials;
