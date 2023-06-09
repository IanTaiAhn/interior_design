import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientImg from "../img_input/ClientImg";
import ClientImgOut from "../img_output/ClientImgOut";
import ProcessClientImg from "../img_input/ProcessClientImg";

const FrontendApi = () => {
  const [data, setData] = useState([]);
  const [isPreviousRequestFinished, setIsPreviousRequestFinished] =
    useState(false);

  // Callback function to be called when the previous request finishes
  const handlePreviousRequestFinish = () => {
    setIsPreviousRequestFinished(true);
  };

  useEffect(() => {
    // Make a GET request to your Django API endpoint
    axios
      .get("http://127.0.0.1:8000/data/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(isPreviousRequestFinished);
  return (
    <div>
      <h1>Displays test data from backend if Django server is on</h1>
      {/* Display the fetched data */}
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
      {/* <ProcessClientImg /> */}
      <ClientImg onFinished={handlePreviousRequestFinish} />
      {/* {isPreviousRequestFinished && <ClientImgOut />} */}
    </div>
  );
};
export default FrontendApi;
