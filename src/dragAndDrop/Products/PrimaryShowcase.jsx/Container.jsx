import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "./Card.jsx";
import Add from "../../../assets/Add.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  archiveCard,
  changePrimaryCard,
  newData,
} from "../../../redux/productSlice.js";

const Container = ({ handleProductSelect }) => {
  const history = useNavigate();

  const dispatch = useDispatch();
  const primaryShowcase = useSelector((state) => state.product.primaryShowcase);
  const [cards, setCards] = useState([]);
  console.log(primaryShowcase);
  useEffect(() => {
    setCards(primaryShowcase);
  }, [primaryShowcase]);

  const moveCard = async (id, position) => {
    // const positionValue = {position:position}
    // const dragedId = cards.filter(
    //   (items) => items.primaryShowcasePosition === id
    // )[0];
    // const _id = dragedId._id;
    // console.log(dragedId, _id, position);
    // const res = await fetch(
    //   `http://localhost:8000/product/update-PrimaryShowcaseProduct/${_id}/${position}`,
    //   {
    //     method: "PATCH",
    //   }
    // );
    // const data = await res.json();
    // dispatch(newData(data.productBasedPosition));
  };

  const redioButtonHandel = async (product) => {
    const res = await fetch(
      `http://localhost:8000/product/addPrimaryShowcase/${product._id}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    dispatch(newData(data.product));
    dispatch(changePrimaryCard(data.primaryShowcase));
  };

  const fixHandelClick = async (item) => {
    //   const res = await fetch(
    //     `http://localhost:8000/product/addArichve/${item._id}`,
    //     {
    //       method: "POST",
    //     }
    //   );
    //   const data = await res.json();
    //   dispatch(archiveCard(data.archiveProduct));
    //   dispatch(newData(data.positionWise));
  };
  const [, drop] = useDrop(() => ({ accept: "card" }));
  return (
    <>
      <div
        ref={drop}
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "auto auto auto ",
          gap: "30px",
        }}
      >
        <div
          style={{
            width: "464px",
            height: "215px",
            background: "#ffffff",
            borderRadius: "10px",
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
            border: "2px solid #0047FF",
            cursor: "pointer",
          }}
          onClick={() => history(`/ProductPage/addnew`)}
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
            Add Product
          </div>
        </div>
        {cards.map((card, index) => (
          <Card
            key={index}
            id={`${card.id}`}
            primaryShowcasePosition={card.primaryShowcasePosition}
            moveCard={moveCard}
            cards={cards}
            setCards={setCards}
            achieved={card.achieved}
            onClick={handleProductSelect}
            card={card}
            redioButtonHandel={redioButtonHandel}
            // selectedProducts={selectedProducts}
            // setSelectedProducts={setSelectedProducts}
            fixHandelClick={fixHandelClick}
          />
        ))}
      </div>
    </>
  );
};
export default Container;
