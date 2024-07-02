import React, { useState, useEffect } from "react";
import "../../styles/HomeFounders.css";
import HomePage from "./HomePage";
import axios from "axios";
import Edit from "../../assets/Edit.svg";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

function HomeFounders() {
  const navigateTo = useNavigate();

  const [foundersSwitch, setFoundersSwitch] = useState(false);

  const [foundersData, setFoundersData] = useState();
  const [isLoading, setIsloading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/founders/all-founders`)
      .then((response) => {
        setFoundersData(response.data.founderBasedPosition);
        setIsloading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(foundersData);

  return (
    <div className="founders-container">
      <HomePage />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 0rem",
        }}
      >
        <div>All founders({foundersData && foundersData.length})</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <span>on/off</span>
          <Switch
            className="switchtoggler"
            checkedIcon={false}
            uncheckedIcon={false}
            handleDiameter={20}
            onColor="#0047FF"
            onChange={() => setFoundersSwitch(!foundersSwitch)}
            checked={foundersSwitch}
          />
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            flexDirection: "row",
            width: "100%",
          }}
        >
          {foundersData.map((eachFounder, index) => (
            <div key={index}>
              <div
                style={{
                  border: "2px solid #0001",
                  borderRadius: "1rem",
                  width: "29rem",
                  height: "10rem",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                }}
              >
                <div>
                  <div>{eachFounder.founderName}</div>
                  <div>{eachFounder.founderDesig}</div>
                </div>
                <div
                  onClick={() =>
                    navigateTo(`/admin/Home/founders/${eachFounder._id}`)
                  }
                >
                  <img src={Edit} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeFounders;
