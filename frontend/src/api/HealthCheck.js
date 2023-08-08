import React, { useState, useEffect } from "react";
import axios from "axios";

const HealthCheck = () => {
  const [data, setData] = useState([]);

  // .get("http://127.0.0.1:8000/health")
  useEffect(() => {
    axios
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
      {data && <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default HealthCheck;
