import { React, useState } from "react";

function ReUsableWhatsNewlayout({
  topItemsData: initialTopItemsData,
  bottomItemsData: initialBottomItemsData,
}) {
  const [topItemsData, setTopItemsData] = useState(initialTopItemsData);
  const [bottomItemsData, setBottomItemsData] = useState(
    initialBottomItemsData
  );

  const changeItemHandler = (eachItem) => {
    const newTopItemsData = topItemsData.slice(0, -1);

    newTopItemsData.unshift(eachItem);

    const newBottomItemsData = bottomItemsData.filter(
      (item) => item !== eachItem
    );

    newBottomItemsData.push(topItemsData[topItemsData.length - 1]);

    // Update state
    setTopItemsData(newTopItemsData);
    setBottomItemsData(newBottomItemsData);

    // console.log(newTopItemsData);
  };

  return (
    <>
      <div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {topItemsData.map((eachItem, index) => (
            <div className="whatsnew-product-items" key={index}>
              {eachItem.item}
            </div>
          ))}
        </div>
        <div style={{ margin: "1rem 0rem" }}>
          others({bottomItemsData.length})
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {bottomItemsData.map((eachItem, index) => (
            <div
              className="whatsnew-product-items"
              key={index}
              onClick={() => changeItemHandler(eachItem)}
            >
              {eachItem.item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ReUsableWhatsNewlayout;
