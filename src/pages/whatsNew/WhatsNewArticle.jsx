import { React, useState } from "react";
import "../../styles/WhatsNew.css";
import WhatsNewNav from "./WhatsNewNav";
import ReUsableWhatsNewlayout from "../../components/ReUsableComponents/ReUsableWhatsNewlayout";
import Switch from "react-switch";

const SelectedArticles = [
  { id: 1, item: "apple" },
  { id: 2, item: "banana" },
  { id: 3, item: "cherry" },
  { id: 4, item: "date" },
];

const AllArticles = [
  { id: 5, item: "elephant" },
  { id: 6, item: "falcon" },
  { id: 7, item: "giraffe" },
  { id: 8, item: "hippopotamus" },
  { id: 9, item: "iguana" },
  { id: 10, item: "jaguar" },
  { id: 11, item: "kangaroo" },
  { id: 12, item: "lemur" },
  { id: 13, item: "mongoose" },
  { id: 14, item: "narwhal" },
  { id: 15, item: "octopus" },
  { id: 16, item: "penguin" },
  { id: 17, item: "quokka" },
  { id: 18, item: "rhinoceros" },
  { id: 19, item: "squirrel" },
  { id: 20, item: "tortoise" },
  { id: 21, item: "urchin" },
  { id: 22, item: "vulture" },
  { id: 23, item: "walrus" },
  { id: 24, item: "xenarthra" },
];

function WhatsNewArticle() {
  const [showWhatsNewArticle, setShowWhatsNewArticle] = useState(false);

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
          <div>Live Articles</div>
          <div>
            <Switch
              className="switchtoggler"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={20}
              onColor="#0047FF"
              onChange={() => setShowWhatsNewArticle(!showWhatsNewArticle)}
              checked={showWhatsNewArticle}
            />
          </div>
        </div>
        <div>
          <ReUsableWhatsNewlayout
            topItemsData={SelectedArticles}
            bottomItemsData={AllArticles}
          />
        </div>
      </div>
    </>
  );
}

export default WhatsNewArticle;
