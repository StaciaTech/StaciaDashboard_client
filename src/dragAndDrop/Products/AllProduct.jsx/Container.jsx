import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ArchiveCard, Card } from "./Card.jsx";
import Add from "../../../assets/Add.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allProduct,
  archiveCard,
  changePrimaryCard,
  newData,
} from "../../../redux/productSlice.js";

export const Container = ({
  selectedProducts,
  handleProductSelect,
  setSelectedProducts,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiUrl}/product/all-products`);
      const resData = await res.json();
      dispatch(newData(resData.productBasedPosition));
      dispatch(archiveCard(resData.archiveProduct));
      dispatch(allProduct(resData.allProduct));
    })();
  }, [dispatch]);
  const products = useSelector((state) => state.product.productList);
  const clickedArrays = useSelector((state) => state.product.archive);
  const [clickedArray, setClickedArray] = useState([]);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setCards(products);
    setClickedArray(clickedArrays);
  }, [products, clickedArrays]);

  // drag and drop card...
  const moveCard = async (id, position) => {
    const dragedId = cards.filter((items) => items.position === id)[0];
    const _id = dragedId._id;
    const res = await fetch(
      `${apiUrl}/product/update-Product/${_id}/${position}`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    dispatch(newData(data.productBasedPosition));
  };

  // change primaryShowcase
  const redioButtonHandel = async (product) => {
    const res = await fetch(
      `${apiUrl}/product/addPrimaryShowcase/${product._id}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    dispatch(newData(data.product));
    dispatch(changePrimaryCard(data.primaryShowcasePositionWise));
  };

  const [, drop] = useDrop(() => ({ accept: "card" }));

  // Function to handle the click event
  const fixHandelClick = async (item) => {
    const res = await fetch(`${apiUrl}/product/addArichve/${item._id}`, {
      method: "POST",
    });
    const data = await res.json();
    dispatch(archiveCard(data.archiveProduct));
    dispatch(newData(data.positionWise));
    dispatch(changePrimaryCard(data.primaryShowcaseProduct));
  };

  return (
    <>
      <div
        ref={drop}
        className="grid"
        style={{
          width: "100%",
          display: "grid",
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
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #0047FF",
            cursor: "pointer",
          }}
          onClick={() => history(`/admin/Product/AddNewProduct`)}
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
            position={card.position}
            moveCard={moveCard}
            cards={cards}
            setCards={setCards}
            achieved={card.achieved}
            onClick={handleProductSelect}
            card={card}
            redioButtonHandel={redioButtonHandel}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            fixHandelClick={fixHandelClick}
          />
        ))}
      </div>
      <div
        style={{
          height: "50px",
          display: "flex",
          marginBottom: "34px",
          justifyContent: "space-between",
          margin: "30px 0px 31px 0px",
        }}
      >
        <p
          style={{
            fontFamily: "EuclidMedium",
            color: "#787878",
            alignContent: "center",
          }}
        >
          Archive / Drafts {clickedArray.length}
        </p>
      </div>
      <div
        ref={drop}
        className="grid"
        style={{
          width: "100%",
          display: "grid",
          gap: "30px",
        }}
      >
        {clickedArray.map((card, index) => (
          <ArchiveCard
            id={`${card.id}`}
            moveCard={moveCard}
            cards={cards}
            setCards={setCards}
            achieved={card.achieved}
            card={card}
            fixHandelClick={fixHandelClick}
          />
        ))}
      </div>
    </>
  );
};
