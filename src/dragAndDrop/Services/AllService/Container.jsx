import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Add from "../../../assets/Add.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allService,
  archiveCard,
  changePrimaryCard,
  newData,
} from "../../../redux/serviceSlice.js";
import { ArchiveCard, Card } from "./Card.jsx";

export const Container = () => {
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiUrl}/service/all-service`);
      const resData = await res.json();
      dispatch(newData(resData.serviceBasedPosition));
      dispatch(archiveCard(resData.archiveService));
      dispatch(allService(resData.allService));
    })();
  }, [dispatch]);
  const history = useNavigate();
  const service = useSelector((state) => state.service.service);
  const clickedArrays = useSelector((state) => state.service.archive);
  const [clickedArray, setClickedArray] = useState([]);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setCards(service);
    setClickedArray(clickedArrays);
  }, [service, clickedArrays]);

  const moveCard = async (id, position) => {
    const dragedId = cards.filter((items) => items.position === id)[0];
    const _id = dragedId._id;
    const res = await fetch(
      `${apiUrl}/service/update-service/${_id}/${position}`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    dispatch(newData(data.serviceBasedPosition));
  };

  const redioButtonHandel = async (services) => {
    const res = await fetch(
      `${apiUrl}/service/addPrimaryShowcase/${services._id}`,
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
    const res = await fetch(`${apiUrl}/service/addArichve/${item._id}`, {
      method: "POST",
    });
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
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #0047FF",
            cursor: "pointer",
          }}
          onClick={() => history("/admin/Service/AddNewService")}
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
            position={card.position}
            moveCard={moveCard}
            cards={cards}
            setCards={setCards}
            achieved={card.achieved}
            card={card}
            fixHandelClick={fixHandelClick}
            redioButtonHandel={redioButtonHandel}
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
          Archive / Drafts
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
