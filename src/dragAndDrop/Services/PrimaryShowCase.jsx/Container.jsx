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
  primaryShowcaseService,
} from "../../../redux/serviceSlice.js";

const Container = ({ handleProductSelect }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "http://localhost:8000/service/primaryShowcaseService"
      );
      const resData = await res.json();
      dispatch(primaryShowcaseService(resData.data));
    })();
  }, [dispatch]);
  const primaryShowcaseProduct = useSelector((state) => state.service.primaryShowcase);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const data = primaryShowcaseProduct.filter((item) => item.archive === false)
    setCards(data);
  }, [primaryShowcaseProduct]);


  const moveCard = async (id, position) => {
    // const positionValue = {position:position}
    console.log(id, position)
    const dragedId = cards.filter(
      (items) => items.primaryShowcasePosition === id
    )[0];
    const _id = dragedId._id;
    const res = await fetch(
      `http://localhost:8000/service/update-PrimaryService/${_id}/${position}`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    dispatch(primaryShowcaseService(data.positionbased));
  };

  const redioButtonHandel = async (services) => {
    const res = await fetch(
      `http://localhost:8000/service/addPrimaryShowcase/${services._id}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    dispatch(newData(data.service));
    dispatch(changePrimaryCard(data.primaryShowcasePositionWise));
  };

  // Function to handle the click event
  const fixHandelClick = async (item) => {
    const res = await fetch(
      `http://localhost:8000/service/addArichve/${item._id}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    dispatch(archiveCard(data.archiveservice));
    dispatch(newData(data.positionWise));
    dispatch(changePrimaryCard(data.primaryShowcaseservice));
  };
  const [, drop] = useDrop(() => ({ accept: "card" }));
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
            // alignItems: "center",
            justifyContent: "center",
            border: "2px solid #0047FF",
            cursor: "pointer",
          }}
          onClick={() => history(`/ServicePage/AddNewService`)}
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
            Add Service
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
            fixHandelClick={fixHandelClick}
          />
        ))}
      </div>
    </>
  );
};
export default Container;
