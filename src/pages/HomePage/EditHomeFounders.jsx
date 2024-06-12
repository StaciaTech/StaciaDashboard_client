import { React, useState, useEffect } from "react";
import "../../styles/HomeFounders.css";
import { useNavigate } from "react-router-dom";
import ReUsableForm from "../../components/ReUsableComponents/ReUsableForm";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditHomeFounders() {
  const navigateTo = useNavigate();
  const [founderFormData, setFounderFormData] = useState([]);
  const [individualFounder, setIndividualFounder] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [founderName, setFounderName] = useState("");
  const [founderDesc, setFounderDesc] = useState("");
  const [founderPos, setFounderPos] = useState("");
  // const [udateValue, setUpdateValue] = useState();
  const { register, handleSubmit, errors, getValues } = useForm();
  const onSubmit = (data) => {
    // setFounderFormData(data);
    console.log(data);
  };

  const id = useParams({});

  // console.log(id.id);

  const apiUrl = process.env.REACT_APP_API_URL;
  // console.log(`${apiUrl}/founders/findFounder/${id}`);
  useEffect(() => {
    axios
      .get(`${apiUrl}/founders/findFounder/${id.id}`)
      .then((responce) => {
        setIndividualFounder(responce.data.selectedProduct);
        setIsloading(false);
        // setFounderName(individualFounder.founderName);
        // setFounderPos(individualFounder.founderDesig);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(individualFounder);

  return (
    <>
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <div className="edit-founders-container">
          <div onClick={() => navigateTo(-1)}>Back</div>
          <div>
            {/* {individualFounder.map((founder, index) => ( */}
            <ReUsableForm
              firstLable="Position"
              secondLable="Name"
              thirdLable="Description"
              fourthLable="Image"
              firstPlaceHolder="Enter Position"
              secondPlaceHolder="Enter Name"
              save="Save"
              cancle="Cancle"
              register={register}
              handleSubmit={handleSubmit(onSubmit)}
              firstValue={individualFounder.founderDesig}
              secondValue={individualFounder.founderName}
              desValue={individualFounder.des}
              image={individualFounder.image}
              setFirstValue={setFounderPos}
              setSecondValue={setFounderName}
              setDesValue={setFounderDesc}
              type="EditFounder"
            />
            {/* ))} */}
          </div>
        </div>
      )}
    </>
  );
}

export default EditHomeFounders;
