import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientImg from "../img_input/ClientImg";

const FrontendApi = () => {
  const [data, setData] = useState([]);
  useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/data/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h1>Displays test data from backend if Django server is on</h1>
      {/* Display the fetched data */}
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
      <ClientImg />
    </div>
  );
};
export default FrontendApi;
