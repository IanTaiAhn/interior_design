import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientImg from "../img_input/ClientImg";

const FrontendApi = () => {
  const [data, setData] = useState([]);
  useState(false);

  useEffect(() => {
    axios
      // .get("http://127.0.0.1:8000/health")
      .get("https://web-production-a9bb.up.railway.app/health")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h1>Health Check</h1>
      {/* Display the fetched data */}
      {data && <p>{JSON.stringify(data)}</p>}
      <ClientImg />
    </div>
  );
};
export default FrontendApi;
