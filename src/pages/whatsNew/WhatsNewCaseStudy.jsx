import { React, useState } from "react";
import "../../styles/WhatsNew.css";
import WhatsNewNav from "./WhatsNewNav";
import Switch from "react-switch";
import ReUsableWhatsNewlayout from "../../components/ReUsableComponents/ReUsableWhatsNewlayout";

const SelectedCaseStudy = [
  { id: 1, item: "mercury" },
  { id: 2, item: "venus" },
  { id: 3, item: "earth" },
  { id: 4, item: "mars" },
];

const AllCaseStudy = [
  { id: 5, item: "pluto" },
  { id: 6, item: "neptune" },
  { id: 7, item: "jupiter" },
  { id: 8, item: "saturn" },
  { id: 9, item: "uranus" },
  { id: 10, item: "ceres" },
  { id: 11, item: "eris" },
  { id: 12, item: "makemake" },
  { id: 13, item: "haumea" },
  { id: 14, item: "vesta" },
  { id: 15, item: "hygiea" },
  { id: 16, item: "charon" },
  { id: 17, item: "ganymede" },
  { id: 18, item: "callisto" },
  { id: 19, item: "io" },
  { id: 20, item: "europa" },
  { id: 21, item: "titan" },
  { id: 22, item: "rhea" },
];

function WhatsNewCaseStudy() {
  const [showWhatsNewCaseStudy, setShowWhatsNewCaseStudy] = useState(false);

  return (
    <>
      <div className="whatsNew-container">
        <div>
          <WhatsNewNav />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1rem 0rem",
          }}
        >
          <div>Live CaseStudy</div>
          <div>
            <Switch
              className="switchtoggler"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={20}
              onColor="#0047FF"
              onChange={() => setShowWhatsNewCaseStudy(!showWhatsNewCaseStudy)}
              checked={showWhatsNewCaseStudy}
            />
          </div>
        </div>
        <div>
          <ReUsableWhatsNewlayout
            topItemsData={SelectedCaseStudy}
            bottomItemsData={AllCaseStudy}
          />
        </div>
      </div>
    </>
  );
}

export default WhatsNewCaseStudy;
