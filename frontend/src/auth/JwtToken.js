import React, { useEffect, useState } from "react";
import axios from "axios";

const BackendEndpoint = "http://127.0.0.1:8000/check_authtoken/";

const JwtToken = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("authToken"); // Replace this with the actual JWT token received from your server
    console.log("JwtToken: " + jwtToken);
    axios
      .post(BackendEndpoint, { token: jwtToken })
      .then((response) => {
        setIsTokenExpired(response.data.expired);
      })
      .catch((error) => {
        console.error("Error checking token expiration:", error);
      });
  }, []);

  return (
    <div>
      {isTokenExpired === null ? (
        <p>Loading...</p>
      ) : isTokenExpired ? (
        <p>Token has expired.</p>
      ) : (
        <p>Token is still valid.</p>
      )}
    </div>
  );
};

export default JwtToken;
