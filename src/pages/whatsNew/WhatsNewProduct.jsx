import { React, useState } from "react";
import "../../styles/WhatsNew.css";
import WhatsNewNav from "./WhatsNewNav";
import Switch from "react-switch";
import ReUsableWhatsNewlayout from "../../components/ReUsableComponents/ReUsableWhatsNewlayout";

const SelectedProducts = [
  { id: 1, item: "Lorem" },
  { id: 2, item: "ipsum" },
  { id: 3, item: "Butter Fly" },
  { id: 4, item: "projects" },
];

const AllProducts = [
  { id: 5, item: "alpha" },
  { id: 6, item: "bravo" },
  { id: 7, item: "charlie" },
  { id: 8, item: "delta" },
  { id: 9, item: "echo" },
  { id: 10, item: "foxtrot" },
  { id: 11, item: "golf" },
  { id: 12, item: "hotel" },
  { id: 13, item: "india" },
  { id: 14, item: "juliet" },
  { id: 15, item: "kilo" },
  { id: 16, item: "lima" },
  { id: 17, item: "mike" },
  { id: 18, item: "november" },
  { id: 19, item: "oscar" },
  { id: 20, item: "papa" },
  { id: 21, item: "quebec" },
  { id: 22, item: "romeo" },
  { id: 23, item: "sierra" },
  { id: 24, item: "tango" },
];

function WhatsNewProduct() {
  const [showWhatsNewProducts, setShowWhatsNewProducts] = useState(false);

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
          <div>Live Products</div>
          <div>
            <Switch
              className="switchtoggler"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={20}
              onColor="#0047FF"
              onChange={() => setShowWhatsNewProducts(!showWhatsNewProducts)}
              checked={showWhatsNewProducts}
            />
          </div>
        </div>
        <div>
          <ReUsableWhatsNewlayout
            topItemsData={SelectedProducts}
            bottomItemsData={AllProducts}
          />
        </div>
      </div>
    </>
  );
}

export default WhatsNewProduct;
