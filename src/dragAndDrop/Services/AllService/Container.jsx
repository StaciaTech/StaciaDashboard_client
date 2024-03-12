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

export const Container = ({
  selectedservice,
  handleserviceelect,
  setSelectedservice,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/service/allService`);
      const resData = await res.json();
      dispatch(newData(resData.servicesPositionWaise));
      dispatch(archiveCard(resData.archiveServices));
      dispatch(allService(resData.allServices));
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
      `http://localhost:8000/service/update-service/${_id}/${position}`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    dispatch(newData(data.serviceBasedPosition));
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
    dispatch(changePrimaryCard(data.primaryShowcase));
  };

  const [, drop] = useDrop(() => ({ accept: "card" }));

  // Function to handle the click event
  const fixHandelClick = async (item) => {
    const res = await fetch(
      `http://localhost:8000/service/addArichve/${item._id}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    console.log(data);
    dispatch(archiveCard(data.archiveService));
    dispatch(newData(data.positionWise));
  };
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
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #0047FF",
            cursor: "pointer",
          }}
          onClick={() => history("/ServicePage/AddNewService")}
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
            onClick={handleserviceelect}
            card={card}
            redioButtonHandel={redioButtonHandel}
            selectedservice={selectedservice}
            setSelectedservice={setSelectedservice}
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
          Archive / Drafts
        </p>
      </div>
      <div
        ref={drop}
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "auto auto auto ",
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
